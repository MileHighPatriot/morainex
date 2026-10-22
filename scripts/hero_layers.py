"""Build the hero's lights-off base and additive light layers from hero-2048.webp.

The page stacks house-off with each house-<zone> layer using mix-blend-mode: plus-lighter.
The zone weights sum to one, so with every layer at full opacity the stack equals the source photo.

Run: python3 scripts/hero_layers.py
Writes public/images/house-*.webp at 2048 and 1280 wide.
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public/images/hero-2048.webp"
OUT = ROOT / "public/images"

img = Image.open(SRC).convert("RGB")
W, H = img.size
a = np.asarray(img).astype(np.float32) / 255.0

# Light zones in source-image fractions: (x0, y0, x1, y1). Order is the switch-on order.
zones = {
    "soffit": [(0.34, 0.41, 1.00, 0.58)],
    "upper": [(0.57, 0.05, 1.00, 0.43)],
    "interior": [(0.52, 0.52, 0.86, 0.80)],
    "wash": [(0.85, 0.47, 1.00, 0.86), (0.40, 0.72, 1.00, 0.88)],
}


def soft_mask(rects, blur=30):
    mask = Image.new("L", (W, H), 0)
    draw = ImageDraw.Draw(mask)
    for x0, y0, x1, y1 in rects:
        draw.rectangle((x0 * W, y0 * H, x1 * W, y1 * H), fill=255)
    return np.asarray(mask.filter(ImageFilter.GaussianBlur(blur))).astype(np.float32) / 255.0


# Outline of the house, so the dusk sky around it never darkens.
SILHOUETTE = [
    (0.577, 0.298), (1.0, 0.052), (1.0, 0.96), (0.30, 0.80), (0.33, 0.748),
    (0.351, 0.583), (0.351, 0.546), (0.577, 0.498),
]

masks = {name: soft_mask(rects) for name, rects in zones.items()}
total = sum(masks.values())
outline = Image.new("L", (W, H), 0)
ImageDraw.Draw(outline).polygon([(x * W, y * H) for x, y in SILHOUETTE], fill=255)
outline = np.asarray(outline.filter(ImageFilter.GaussianBlur(3))).astype(np.float32) / 255.0
house = (np.clip(total, 0, 1) * outline)[..., None]

# Lights off inside the house only: a soft knee, so everything lit flattens to dusk grey.
lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
knee = 0.07
target = np.where(lum < knee, lum, knee + (lum - knee) * 0.11)
ratio = np.clip(target / np.maximum(lum, 1e-4), 0, 1)[..., None]
dark = a * ratio * (1.0 + (1.0 - ratio) * (np.array([0.8, 0.9, 1.18]) - 1.0))
off = np.clip(a * (1.0 - house) + dark * house, 0, 1)
light = np.clip(a - off, 0, 1)


def save(arr: np.ndarray, name: str) -> None:
    im = Image.fromarray((np.clip(arr, 0, 1) * 255).round().astype(np.uint8))
    for width in (2048, 1280):
        out = im if width == W else im.resize((width, round(H * width / W)), Image.LANCZOS)
        out.save(OUT / f"{name}-{width}.webp", quality=84, method=6)


save(off, "house-off")
for name, m in masks.items():
    weight = np.where(total > 1e-4, m / np.maximum(total, 1e-4), 0)[..., None]
    save(light * weight, f"house-{name}")
