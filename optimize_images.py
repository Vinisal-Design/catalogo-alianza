# -*- coding: utf-8 -*-
"""Converte fotos JPEG -> WebP, resize max 800px, atualiza products.json."""
import os, io, json
from PIL import Image

IMG_DIR = r"C:\dev\catalogo-alianza\public\products"
DATA = r"C:\dev\catalogo-alianza\src\products.json"
MAX_W = 800
QUALITY = 82

before = after = 0
report = []
for fn in os.listdir(IMG_DIR):
    if not fn.lower().endswith((".jpg", ".jpeg")):
        continue
    src = os.path.join(IMG_DIR, fn)
    before += os.path.getsize(src)
    im = Image.open(src).convert("RGB")
    if im.width > MAX_W:
        h = round(im.height * MAX_W / im.width)
        im = im.resize((MAX_W, h), Image.LANCZOS)
    dst_name = os.path.splitext(fn)[0] + ".webp"
    dst = os.path.join(IMG_DIR, dst_name)
    im.save(dst, "WEBP", quality=QUALITY, method=6)
    after += os.path.getsize(dst)
    os.remove(src)
    report.append((fn, dst_name))

# update products.json: .jpg -> .webp
with io.open(DATA, encoding="utf-8") as fh:
    data = json.load(fh)
for p in data:
    p["image"] = p["image"].rsplit(".", 1)[0] + ".webp"
with io.open(DATA, "w", encoding="utf-8") as fh:
    json.dump(data, fh, ensure_ascii=False, indent=2)

with io.open(r"C:\dev\catalogo-alianza\_optimize.log", "w", encoding="utf-8") as fh:
    fh.write(f"convertidas: {len(report)}\n")
    fh.write(f"antes:  {before/1024/1024:.2f} MB\n")
    fh.write(f"depois: {after/1024/1024:.2f} MB\n")
    fh.write(f"reducao: {100*(1-after/before):.1f}%\n")
print(f"OK {len(report)} imgs | {before/1024/1024:.1f}MB -> {after/1024/1024:.1f}MB")
