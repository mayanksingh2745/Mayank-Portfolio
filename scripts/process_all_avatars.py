import os
import sys
import io
import base64
import json
import numpy as np

# Ensure UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

from PIL import Image, ImageFilter, ImageEnhance, ImageOps
from rembg import remove, new_session

POSES = [
    {
        "source": "public/photos/pose1-ch.png",
        "key": "pose-portrait",
        "label": "Portrait (Hero / About)",
        "halo_color": (217, 179, 106), # Gold #D9B36A
    },
    {
        "source": "public/photos/pose2-ch.png",
        "key": "pose-laptop",
        "label": "Laptop (Impact / Experience)",
        "halo_color": (61, 90, 254), # Cobalt #3D5AFE
    },
    {
        "source": "public/photos/pose3-ch.png",
        "key": "pose-reading",
        "label": "Reading (Skills)",
        "halo_color": (255, 216, 74), # Butter #FFD84A
    },
    {
        "source": "public/photos/pose4-ch.png",
        "key": "pose-present",
        "label": "Present (Projects / Credentials)",
        "halo_color": (124, 227, 181), # Mint #7CE3B5
    },
    {
        "source": "public/photos/pose5-ch.png",
        "key": "pose-wave",
        "label": "Wave (Contact)",
        "halo_color": (255, 91, 46), # Tomato #FF5B2E
    },
]

def add_subtle_cinematic_grade(image: Image.Image, halo_color: tuple) -> Image.Image:
    """Enhance contrast, subtle warm/cool balance, and smooth alpha edges."""
    r, g, b, a = image.split()
    
    # Slight contrast enhancement on RGB
    rgb = Image.merge("RGB", (r, g, b))
    enhancer = ImageEnhance.Contrast(rgb)
    rgb_enhanced = enhancer.enhance(1.08)
    
    # Subtle sharpness boost
    sharp_enhancer = ImageEnhance.Sharpness(rgb_enhanced)
    rgb_enhanced = sharp_enhancer.enhance(1.12)
    
    # Smooth alpha feathering (1-2px)
    # Filter alpha to avoid jagged cutout edges
    a_smooth = a.filter(ImageFilter.GaussianBlur(radius=0.7))
    
    er, eg, eb = rgb_enhanced.split()
    return Image.merge("RGBA", (er, eg, eb, a_smooth))

def generate_blur_placeholder(image: Image.Image) -> str:
    """Generate tiny base64 blur placeholder."""
    tiny = image.resize((32, int(32 * (image.height / image.width))), Image.Resampling.BOX)
    tiny_blur = tiny.filter(ImageFilter.GaussianBlur(radius=1.5))
    buffer = io.BytesIO()
    tiny_blur.save(buffer, format="WEBP", quality=30)
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/webp;base64,{b64}"

def main():
    os.makedirs("public/avatar", exist_ok=True)
    print("Initializing rembg session...")
    session = new_session("u2net_human_seg")
    
    placeholders = {}
    stats = []

    for pose in POSES:
        src = pose["source"]
        key = pose["key"]
        print(f"\nProcessing {key} from {src}...")
        
        if not os.path.exists(src):
            print(f"Warning: source {src} not found! Skipping.")
            continue
            
        img = Image.open(src).convert("RGB")
        orig_w, orig_h = img.size
        
        # Background removal
        cutout = remove(
            img,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=5
        )
        
        # Color grade & rim-edge smoothing
        graded = add_subtle_cinematic_grade(cutout, pose["halo_color"])
        
        # Target height max 1400px
        w, h = graded.size
        target_h = 1400
        if h > target_h:
            target_w = int(w * (target_h / h))
            final_img = graded.resize((target_w, target_h), Image.Resampling.LANCZOS)
        else:
            final_img = graded
            
        webp_path = f"public/avatar/{key}.webp"
        png_path = f"public/avatar/{key}.png"
        
        final_img.save(webp_path, "WEBP", quality=92, method=6)
        final_img.save(png_path, "PNG", optimize=True)
        
        blur_b64 = generate_blur_placeholder(final_img)
        placeholders[key] = blur_b64
        
        stat_info = {
            "key": key,
            "label": pose["label"],
            "source": src,
            "output_webp": webp_path,
            "width": final_img.width,
            "height": final_img.height,
            "is_real_image": True,
        }
        stats.append(stat_info)
        print(f"  [DONE] Saved {webp_path} ({final_img.width}x{final_img.height})")

    # Save metadata and blur placeholders
    with open("public/avatar/manifest.json", "w") as f:
        json.dump({"poses": stats, "placeholders": placeholders}, f, indent=2)
    print("\nSaved public/avatar/manifest.json with all pose metadata & placeholders!")

if __name__ == "__main__":
    main()
