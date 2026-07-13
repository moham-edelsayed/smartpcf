import os
from PIL import Image, ImageDraw, ImageFilter

def process():
    base_path = 'main_slide.jpg'
    l1_path = 'logo1.jpg'
    l2_path = 'logo2.jpg'
    
    if not os.path.exists(base_path): 
        print("Base slide not found.")
        return
        
    base = Image.open(base_path).convert("RGBA")
    logo1 = Image.open(l1_path).convert("RGBA")
    logo2 = Image.open(l2_path).convert("RGBA")
    
    def remove_white(img, threshold=210):
        data = img.getdata()
        new_data = []
        for item in data:
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                # Make white transparent
                new_data.append((item[0], item[1], item[2], 0))
            else:
                new_data.append(item)
        img.putdata(new_data)
        return img

    print("Removing white backgrounds...")
    logo1 = remove_white(logo1, 230)
    logo2 = remove_white(logo2, 230)

    base_w, base_h = base.size
    
    # Target width for logos (around 15-18% of slide width looks good for corner logos)
    target_w = int(base_w * 0.17)
    
    # Resize Logo 1 (Institute)
    ratio1 = target_w / float(logo1.size[0])
    target_h1 = int(float(logo1.size[1]) * ratio1)
    logo1 = logo1.resize((target_w, target_h1), Image.Resampling.LANCZOS)
    
    # Resize Logo 2 (Ministry)
    # Ministry logo should be slightly wider if it's rectangular, but we'll use same width
    target_w2 = int(base_w * 0.15)
    ratio2 = target_w2 / float(logo2.size[0])
    target_h2 = int(float(logo2.size[1]) * ratio2)
    logo2 = logo2.resize((target_w2, target_h2), Image.Resampling.LANCZOS)
    
    # Coordinates (top left and top right with some padding)
    pad_x = int(base_w * 0.03)
    pad_y = int(base_h * 0.03)
    
    x1 = pad_x
    y1 = pad_y
    
    x2 = base_w - target_w2 - pad_x
    y2 = pad_y
    
    print("Masking old logos...")
    draw = ImageDraw.Draw(base)
    # The background of the slide is very dark blue/black. Let's sample a pixel from top middle
    bg_color = base.getpixel((int(base_w/2), pad_y)) 
    
    # Draw patches over the original messed up logos so they don't show through transparency
    # Left patch (circle for Institute)
    r = int(target_w / 2) + 10
    cx = x1 + int(target_w/2)
    cy = y1 + int(target_h1/2)
    draw.ellipse((cx-r, cy-r, cx+r, cy+r), fill=bg_color)
    
    # Right patch (rectangle for Ministry)
    draw.rectangle((x2-20, y2-20, x2+target_w2+20, y2+target_h2+20), fill=bg_color)
    
    # To make the patches blend better, apply a slight blur to the regions
    # (Simplified for now, solid color is usually fine for very dark backgrounds)
    
    print("Pasting new logos...")
    base.paste(logo1, (x1, y1), logo1)
    base.paste(logo2, (x2, y2), logo2)
    
    # Save the final image
    base = base.convert("RGB")
    output_path = 'final_slide_fixed.jpg'
    base.save(output_path, quality=98)
    print(f"Successfully saved to {output_path}")

try:
    process()
except Exception as e:
    print(f"Error: {e}")
