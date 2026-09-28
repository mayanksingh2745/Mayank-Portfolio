import os
import sys
from PIL import Image, ImageFilter
from rembg import remove, new_session

def process_one():
    os.makedirs('public/avatar', exist_ok=True)
    session = new_session('u2net_human_seg')
    
    input_path = 'public/photos/pose1-ch.png'
    print(f"Opening {input_path}...")
    img = Image.open(input_path).convert('RGB')
    
    print("Running rembg with u2net_human_seg...")
    output = remove(img, session=session, alpha_matting=True, alpha_matting_foreground_threshold=240, alpha_matting_background_threshold=10)
    
    # Save test png
    output.save('public/avatar/pose-portrait-test.png')
    print("Saved public/avatar/pose-portrait-test.png")
    
    # Also save webp max 1400 height
    w, h = output.size
    if h > 1400:
        new_w = int(w * (1400 / h))
        output_resized = output.resize((new_w, 1400), Image.Resampling.LANCZOS)
    else:
        output_resized = output
        
    output_resized.save('public/avatar/pose-portrait.webp', 'WEBP', quality=92)
    print("Saved public/avatar/pose-portrait.webp")

if __name__ == '__main__':
    process_one()
