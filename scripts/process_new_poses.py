import os
import sys
import io
import shutil
import base64
import json

# Ensure UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

from PIL import Image, ImageFilter, ImageEnhance
from rembg import remove, new_session

NEW_POSES = [
    {
        "raw_src": r"C:\Users\Mayank\.gemini\antigravity-ide\brain\2f551aa1-5abb-43e6-8561-9eee4e5bd7f7\pose_experience_raw_1790627985073.jpg",
        "saved_photo": "public/photos/pose-experience-raw.jpg",
        "key": "pose-experience",
        "label": "Experience (Track Record / Systems)",
        "halo_color": (255, 91, 46), # Tomato #FF5B2E
    },
    {
        "raw_src": r"C:\Users\Mayank\.gemini\antigravity-ide\brain\2f551aa1-5abb-43e6-8561-9eee4e5bd7f7\pose_about_raw_1790628012888.jpg",
        "saved_photo": "public/photos/pose-about-raw.jpg",
        "key": "pose-about",
        "label": "About (Foundation / Story)",
        "halo_color": (139, 92, 255), # Violet #8B5CFF
    },

]

def add_subtle_cinematic_grade(image: Image.Image) -> Image.Image:
    """Enhance contrast, subtle warm/cool balance, and smooth alpha edges."""
    r, g, b, a = image.split()
    
    # Slight contrast enhancement on RGB
    rgb = Image.merge("RGB", (r, g, b))
    enhancer = ImageEnhance.Contrast(rgb)
    rgb_enhanced = enhancer.enhance(1.06)
    
    # Subtle sharpness boost
    sharp_enhancer = ImageEnhance.Sharpness(rgb_enhanced)
    rgb_enhanced = sharp_enhancer.enhance(1.10)
    
    # Smooth alpha feathering to avoid jagged cutout edges
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
    os.makedirs("public/photos", exist_ok=True)
    os.makedirs("public/avatar", exist_ok=True)

    manifest_file = "public/avatar/manifest.json"
    manifest = {"poses": [], "placeholders": {}}
    if os.path.exists(manifest_file):
        with open(manifest_file, "r", encoding="utf-8") as f:
            manifest = json.load(f)

    print("Initializing rembg session with u2net_human_seg...")
    session = new_session("u2net_human_seg")

    for pose in NEW_POSES:
        key = pose["key"]
        print(f"\nProcessing {key}...")
        
        # Copy raw file
        if os.path.exists(pose["raw_src"]):
            shutil.copy2(pose["raw_src"], pose["saved_photo"])
            print(f"Copied raw source to {pose['saved_photo']}")
        else:
            print(f"Raw source {pose['raw_src']} does not exist!")
            continue

        img = Image.open(pose["saved_photo"]).convert("RGB")
        orig_w, orig_h = img.size
        print(f"Original dimensions: {orig_w}x{orig_h}")

        # Background removal
        cutout = remove(
            img,
            session=session,
            alpha_matting=True,
            alpha_matting_foreground_threshold=240,
            alpha_matting_background_threshold=10,
            alpha_matting_erode_size=5
        )

        graded = add_subtle_cinematic_grade(cutout)

        # Target height 1400px
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
        print(f"Saved {webp_path} ({final_img.width}x{final_img.height})")

        blur_b64 = generate_blur_placeholder(final_img)
        manifest["placeholders"][key] = blur_b64

        # Remove existing if present
        manifest["poses"] = [p for p in manifest["poses"] if p.get("key") != key]
        manifest["poses"].append({
            "key": key,
            "label": pose["label"],
            "source": pose["saved_photo"],
            "output_webp": webp_path,
            "width": final_img.width,
            "height": final_img.height,
            "is_real_image": True
        })

    with open(manifest_file, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print("\nSuccessfully updated manifest.json!")

if __name__ == "__main__":
    main()
