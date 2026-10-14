#!/usr/bin/env python3
"""Builds public/og-image.jpg (1200x630) from the hero portrait.

Social previews (WhatsApp, Telegram, LinkedIn, X) want a wide 1.91:1 image;
the previous file was a 304x304 square, so link previews looked cramped.

Requirements: Pillow with Raqm for correct Persian shaping
    python3 -c "from PIL import features; print(features.check('raqm'))"

Usage:
    python3 scripts/generate-og-image.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PORTRAIT = ROOT / "src/assets/hero-portrait.jpg"
OUTPUT = ROOT / "public/og-image.jpg"
FONTS = ROOT / "node_modules/vazirmatn/fonts/ttf"

W, H = 1200, 630
DARK_TEAL = (4, 39, 43)
TEAL_DEEP = (10, 66, 71)
GOLD = (201, 154, 46)
GOLD_LIGHT = (232, 204, 120)
OFF_WHITE = (248, 250, 249)
MUTED = (170, 190, 188)


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


def gradient(size, top, bottom):
    """Vertical gradient built from a 1px column, then stretched."""
    column = Image.new("RGB", (1, size[1]))
    for y in range(size[1]):
        ratio = y / max(size[1] - 1, 1)
        column.putpixel(
            (0, y),
            tuple(round(top[i] + (bottom[i] - top[i]) * ratio) for i in range(3)),
        )
    return column.resize(size, Image.BILINEAR)


def rounded_portrait(size, radius):
    portrait = Image.open(PORTRAIT).convert("RGB").resize(size, Image.LANCZOS)
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255)
    framed = Image.new("RGB", size, GOLD)
    framed.paste(portrait, (0, 0), mask)
    return framed, mask


def main():
    canvas = gradient((W, H), DARK_TEAL, TEAL_DEEP).convert("RGB")
    draw = ImageDraw.Draw(canvas)

    # gold inner frame + corner accents
    draw.rectangle((26, 26, W - 27, H - 27), outline=GOLD, width=2)
    for x, y in ((26, 26), (W - 27, 26), (26, H - 27), (W - 27, H - 27)):
        draw.rectangle((x - 6, y - 6, x + 6, y + 6), fill=GOLD)

    # portrait (left) with a gold bezel
    size = (430, 430)
    box = (92, (H - size[1]) // 2)
    frame = Image.new("RGB", (size[0] + 8, size[1] + 8), GOLD)
    portrait, mask = rounded_portrait(size, 18)
    frame.paste(portrait, (4, 4), mask)
    canvas.paste(frame, (box[0] - 4, box[1] - 4))

    right = W - 92
    name_font = font("Vazirmatn-ExtraBold.ttf", 66)
    role_font = font("Vazirmatn-SemiBold.ttf", 40)
    body_font = font("Vazirmatn-Regular.ttf", 29)
    phone_font = font("Vazirmatn-Bold.ttf", 34)
    latin_font = font("Vazirmatn-Medium.ttf", 25)

    def rtl(text, xy, f, fill):
        draw.text(xy, text, font=f, fill=fill, anchor="rm", direction="rtl")

    y = 168
    rtl("پرستو خوئینی", (right, y), name_font, OFF_WHITE)
    y += 62
    rtl("وکیل پایه یک دادگستری", (right, y), role_font, GOLD_LIGHT)
    y += 34
    draw.line((right - 360, y, right, y), fill=GOLD, width=3)
    y += 44
    rtl("دعاوی ملکی و ثبتی، اسناد تجاری و تنظیم قرارداد", (right, y), body_font, MUTED)
    y += 40
    rtl("دفتر وکالت: تهران، سعادت‌آباد", (right, y), body_font, MUTED)
    y += 62
    rtl("۰۹۱۲ ۸۷۵ ۴۱۷۷", (right, y), phone_font, GOLD_LIGHT)

    draw.text(
        (right - 300, H - 76),
        "vakilkhoini.ir",
        font=latin_font,
        fill=MUTED,
        anchor="lm",
        direction="ltr",
    )

    canvas.save(OUTPUT, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"wrote {OUTPUT.relative_to(ROOT)} ({OUTPUT.stat().st_size / 1024:.0f} kB)")


if __name__ == "__main__":
    main()
