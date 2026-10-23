import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Enhanced Radiant Color Palette (Brighter, more luminous gold & ivory)
const COLORS = {
  black: [9, 8, 7],               // #090807 Deep luxury black
  champagneGold: [238, 203, 118],  // #EECB76 Vibrant, radiant champagne gold
  brightGold: [255, 236, 155],     // #FFEC9B Brilliant, luminous gold highlight
  warmGold: [218, 175, 82],        // #DAAF52 Rich warm gold for dimension
  antiqueGold: [184, 142, 62],     // #B88E3E Antique gold shading
  ivory: [255, 253, 245],          // #FFFDF5 Pure luminous warm ivory
};

function lerpColor(c1, c2, t) {
  const clampT = Math.max(0, Math.min(1, t));
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * clampT),
    Math.round(c1[1] + (c2[1] - c1[1]) * clampT),
    Math.round(c1[2] + (c2[2] - c1[2]) * clampT)
  ];
}

async function generateBrandedLogos() {
  const inputPath = 'images/aura-logo-.jpeg';
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const width = info.width;
  const height = info.height;

  const rgbaBuffer = Buffer.alloc(width * height * 4);
  const darkRgbaBuffer = Buffer.alloc(width * height * 4);

  // Lotus center detection: (x: 540 to 714, y: 430 to 635)
  const isLotus = (x, y) => {
    if (x >= 545 && x <= 709 && y >= 430 && y <= 635) {
      const dx = Math.abs(x - 627);
      if (y < 490) return dx <= 38; // center top petal
      return dx <= 80;              // lower petals
    }
    return false;
  };

  const isCenterPetal = (x, y) => {
    return x >= 595 && x <= 660 && y >= 430 && y <= 490;
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * info.channels;
      const dstIdx = (y * width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const gray = (r + g + b) / 3;

      // Darkness measurement: 0 (white background) to 255 (full black stroke)
      const darkness = 255 - gray;

      if (darkness <= 5) {
        // Transparent
        rgbaBuffer[dstIdx] = 0;
        rgbaBuffer[dstIdx + 1] = 0;
        rgbaBuffer[dstIdx + 2] = 0;
        rgbaBuffer[dstIdx + 3] = 0;

        // Dark background
        darkRgbaBuffer[dstIdx] = COLORS.black[0];
        darkRgbaBuffer[dstIdx + 1] = COLORS.black[1];
        darkRgbaBuffer[dstIdx + 2] = COLORS.black[2];
        darkRgbaBuffer[dstIdx + 3] = 255;
        continue;
      }

      // Boosted alpha curve for solid, vivid, luminous strokes without edge noise
      const normDarkness = Math.min(1, Math.max(0, (darkness - 3) / 235));
      const alpha = Math.min(255, Math.round(255 * Math.pow(normDarkness, 0.72) * 1.15));

      let strokeColor;

      if (y >= 735 && y <= 940) {
        // REGION 1: "AURA" Wordmark
        // Brilliant luminous warm ivory at top with radiant champagne gold sheen
        const t = (y - 735) / (925 - 735);
        strokeColor = lerpColor(COLORS.ivory, COLORS.champagneGold, t * 0.65);

      } else if (y >= 960 && y <= 1030) {
        // REGION 2: "EVENTS" Wordmark and horizontal decorative lines
        // Radiant champagne gold with brilliant diamond center
        const distFromCenter = Math.abs(x - 627);
        if (distFromCenter < 40 && (y >= 982 && y <= 1012)) {
          strokeColor = lerpColor(COLORS.champagneGold, COLORS.brightGold, 0.85);
        } else {
          strokeColor = COLORS.champagneGold;
        }

      } else if (isLotus(x, y)) {
        // REGION 3: The Central Lotus Emblem
        if (isCenterPetal(x, y)) {
          // Center top petal: luminous ivory with brilliant gold crest
          const pt = (y - 430) / (490 - 430);
          strokeColor = lerpColor(COLORS.brightGold, COLORS.ivory, pt * 0.9);
        } else {
          // Side petals: glowing warm ivory blending to radiant champagne gold
          const pt = (y - 480) / (635 - 480);
          strokeColor = lerpColor(COLORS.ivory, COLORS.champagneGold, pt * 0.75);
        }

      } else {
        // REGION 4: Floral arch, flowers, leaves, decorative branches & curtains
        if (y < 360) {
          // Upper arch and crown: brilliant gold highlight blending to radiant champagne gold
          const t = Math.min(1, (y - 190) / 170);
          strokeColor = lerpColor(COLORS.brightGold, COLORS.champagneGold, t);
        } else if (y > 580) {
          // Lower side swags and curtain bases: radiant champagne gold with warm gold depth
          const t = Math.min(1, (y - 580) / 150);
          strokeColor = lerpColor(COLORS.champagneGold, COLORS.warmGold, t * 0.5);
        } else {
          // Mid floral foliage and swags: lateral ambient light
          const distFromCenter = Math.abs(x - 627);
          const lateralLight = Math.min(1, Math.max(0, (distFromCenter - 220) / 260));
          strokeColor = lerpColor(COLORS.champagneGold, COLORS.brightGold, lateralLight * 0.5);
        }
      }

      // 1. Transparent PNG
      rgbaBuffer[dstIdx] = strokeColor[0];
      rgbaBuffer[dstIdx + 1] = strokeColor[1];
      rgbaBuffer[dstIdx + 2] = strokeColor[2];
      rgbaBuffer[dstIdx + 3] = alpha;

      // 2. Dark Background PNG (composite over #090807)
      const aNorm = alpha / 255;
      darkRgbaBuffer[dstIdx] = Math.round(COLORS.black[0] * (1 - aNorm) + strokeColor[0] * aNorm);
      darkRgbaBuffer[dstIdx + 1] = Math.round(COLORS.black[1] * (1 - aNorm) + strokeColor[1] * aNorm);
      darkRgbaBuffer[dstIdx + 2] = Math.round(COLORS.black[2] * (1 - aNorm) + strokeColor[2] * aNorm);
      darkRgbaBuffer[dstIdx + 3] = 255;
    }
  }

  // Save the full-res transparent logo
  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile('public/images/aura.logo.png');
  console.log('✓ Generated public/images/aura.logo.png (Brighter Transparent)');

  // Save the full-res dark background logo
  await sharp(darkRgbaBuffer, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile('public/images/aura.logo-dark.png');
  console.log('✓ Generated public/images/aura.logo-dark.png (Brighter Dark Background)');
}

generateBrandedLogos().catch(console.error);
