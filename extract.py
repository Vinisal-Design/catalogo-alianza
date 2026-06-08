# -*- coding: utf-8 -*-
"""Extrai foto real + dados estruturados dos 3 catalogos Alianza."""
import fitz, os, io, json, re, unicodedata

SRC = r"C:\Users\Vinig\Downloads\Alianza"
OUT_IMG = r"C:\dev\catalogo-alianza\public\products"
OUT_DATA = r"C:\dev\catalogo-alianza\data\products.json"

CATS = {
    "Catalogo masculino (3).pdf": {"cat": "masculino", "label": "Masculino"},
    "Catalogo  Alianza  (4).pdf": {"cat": "feminino", "label": "Feminino"},
    "Catalogo  Jaquetas .pdf": {"cat": "jaquetas", "label": "Jaquetas Feminina"},
}

# Map by real filename (com unicode), resolved at runtime
def cat_for(fname):
    low = fname.lower()
    if "masculino" in low: return ("masculino", "Masculino")
    if "jaqueta" in low:   return ("jaquetas", "Jaquetas Feminina")
    return ("feminino", "Feminino")

def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-zA-Z0-9]+", "-", s).strip("-").lower()
    return s

def parse_product(text):
    """Parse nome / REF / preco / cor de um bloco de texto."""
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    ref = price = color = None
    name_parts = []
    for l in lines:
        up = l.upper()
        if up.startswith("REF"):
            m = re.search(r"(\d{3,7})", l)
            ref = m.group(1) if m else l.split(":")[-1].strip()
        elif "R$" in up:
            m = re.search(r"(\d+[.,]\d{2})", l)
            price = m.group(1).replace(".", ",") if m else None
        elif up in ("CATALOGO", "ALIANZA", "J E A N S", "JEANS", "CATÁLOGO"):
            continue
        else:
            # cor: linha curta toda maiuscula sem digitos, depois do preco
            name_parts.append(l)
    # Heuristica de cor: ultima linha curta em CAPS que nao faz parte do nome do produto
    KNOWN_COLORS = {"OFF WHITE","BEGE","FÚSCIA","FUSCIA","PRETA","PRETO","AZUL ROYAL",
                    "BLACK","BRANCA","BRANCO","ROSA","VERDE MILITAR","VINHO","ROSA BEBÊ",
                    "ROSA BEBE","AZUL","VERMELHO","CINZA","MARROM"}
    cleaned = []
    for p in name_parts:
        if p.upper() in KNOWN_COLORS:
            color = p
        else:
            cleaned.append(p)
    name = " ".join(cleaned).strip()
    name = re.sub(r"\s+", " ", name)
    return name, ref, price, color

products = []
files = sorted([f for f in os.listdir(SRC) if f.lower().endswith(".pdf")])
log = []
for fname in files:
    cat, label = cat_for(fname)
    d = fitz.open(os.path.join(SRC, fname))
    for pno in range(len(d)):
        p = d[pno]
        text = p.get_text().strip()
        up = text.upper()
        # pular capas: tem "CATALOGO" e nao tem REF
        if "REF" not in up:
            log.append(f"SKIP cover {fname} p{pno}: {text[:40]!r}")
            continue
        name, ref, price, color = parse_product(text)
        # extrair maior imagem por area renderizada
        imgs = p.get_images(full=True)
        best = None; best_area = 0
        for img in imgs:
            xref = img[0]
            try:
                rects = p.get_image_rects(xref)
            except Exception:
                rects = []
            area = max((r.width * r.height for r in rects), default=0)
            if area > best_area:
                best_area = area; best = xref
        slug = f"{cat}-{ref or 'na'}-{slugify(color) if color else slugify(name)[:20]}-{pno}"
        img_name = f"{slug}.jpg"
        img_path = os.path.join(OUT_IMG, img_name)
        saved = False
        if best is not None:
            try:
                pix = fitz.Pixmap(d, best)
                if pix.n - pix.alpha >= 4:  # CMYK
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                pix.save(img_path, jpg_quality=90) if hasattr(pix,'jpg_quality') else pix.save(img_path)
                saved = True
            except Exception as e:
                log.append(f"IMG fail {fname} p{pno}: {e}")
        if not saved:
            # fallback: render pagina inteira em 2x
            pm = p.get_pixmap(matrix=fitz.Matrix(2, 2))
            pm.save(img_path)
        products.append({
            "id": slug, "category": cat, "categoryLabel": label,
            "name": name, "ref": ref, "price": price, "color": color,
            "image": f"/products/{img_name}", "sourcePage": pno, "sourceFile": fname,
        })
    d.close()

with io.open(OUT_DATA, "w", encoding="utf-8") as fh:
    json.dump(products, fh, ensure_ascii=False, indent=2)

with io.open(r"C:\dev\catalogo-alianza\extract.log", "w", encoding="utf-8") as fh:
    fh.write(f"TOTAL produtos: {len(products)}\n")
    by = {}
    for pr in products: by[pr["category"]] = by.get(pr["category"],0)+1
    fh.write(f"Por categoria: {by}\n\n")
    for pr in products:
        fh.write(f"{pr['category']:10} | REF {pr['ref'] or '???':7} | R$ {pr['price'] or '???':7} | {pr['color'] or '-':14} | {pr['name']}\n")
    fh.write("\n--- LOG ---\n" + "\n".join(log))
print("OK")
