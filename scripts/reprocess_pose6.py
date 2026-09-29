import os
import sys
import io
import json
from PIL import Image, ImageFilter, ImageEnhance
from rembg import remove, new_session

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

def add_subtle_cinematic_grade(image: Image.Image) -> Image.Image:
    r, g, b, a = image.split()
    rgb = Image.merge("RGB", (r, g, b))
    enhancer = ImageEnhance.Contrast(rgb)
    rgb_enhanced = enhancer.enhance(1.06)
    sharp_enhancer = ImageEnhance.Sharpness(rgb_enhanced)
    rgb_enhanced = sharp_enhancer.enhance(1.10)
    a_smooth = a.filter(ImageFilter.GaussianBlur(radius=0.7))
    er, eg, eb = rgb_enhanced.split()
    return Image.merge("RGBA", (er, eg, eb, a_smooth))

def generate_blur_placeholder(image: Image.Image) -> str:
    import base64
    tiny = image.resize((32, int(32 * (image.height / image.width))), Image.Resampling.BOX)
    tiny_blur = tiny.filter(ImageFilter.GaussianBlur(radius=1.5))
    buffer = io.BytesIO()
    tiny_blur.save(buffer, format="WEBP", quality=30)
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/webp;base64,{b64}"

def main():
    src = "public/photos/pose6-ch.png"
    print(f"Loading {src}...")
    img = Image.open(src).convert("RGB")
    print(f"Original size: {img.size}")

    print("Removing background with u2net_human_seg...")
    session = new_session("u2net_human_seg")
    cutout = remove(
        img,
        session=session,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=5
    )

    # Standard portfolio avatar dimensions: 1050 x 1400
    CANVAS_W = 1050
    CANVAS_H = 1400

    # Resize cutout cleanly to 1050x1400
    final_img = cutout.resize((CANVAS_W, CANVAS_H), Image.Resampling.LANCZOS)
    final_img = add_subtle_cinematic_grade(final_img)

    bbox = final_img.split()[3].getbbox()
    print(f"Final dimensions: {final_img.size}, bounding box: {bbox}")

    key = "pose-projects"
    webp_path = f"public/avatar/{key}.webp"
    png_path = f"public/avatar/{key}.png"

    final_img.save(webp_path, "WEBP", quality=92, method=6)
    final_img.save(png_path, "PNG", optimize=True)
    print(f"Saved {webp_path} and {png_path}")

    manifest_file = "public/avatar/manifest.json"
    manifest = {"poses": [], "placeholders": {}}
    if os.path.exists(manifest_file):
        with open(manifest_file, "r", encoding="utf-8") as f:
            manifest = json.load(f)

    manifest["poses"] = [p for p in manifest["poses"] if p.get("key") != key]
    manifest["poses"].append({
        "key": key,
        "label": "Projects (Selected Systems / Pen to Temple)",
        "source": src,
        "output_webp": webp_path,
        "width": CANVAS_W,
        "height": CANVAS_H,
        "is_real_image": True
    })
    manifest["placeholders"][key] = generate_blur_placeholder(final_img)

    with open(manifest_file, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print("Updated manifest.json successfully!")

if __name__ == "__main__":
    main()
