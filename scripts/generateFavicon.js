import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

/**
 * Creates a valid multi-size Windows .ICO buffer from an array of PNG buffers
 * @param {Array<{ size: number, buffer: Buffer }>} pngEntries 
 * @returns {Buffer}
 */
function createIcoFromPngs(pngEntries) {
  const count = pngEntries.length;
  // Header: 6 bytes
  // Directory: 16 bytes per entry
  // Followed by raw PNG data
  const headerSize = 6 + (16 * count);
  let totalDataSize = 0;
  for (const entry of pngEntries) {
    totalDataSize += entry.buffer.length;
  }

  const icoBuffer = Buffer.alloc(headerSize + totalDataSize);
  
  // ICONDIR Header
  icoBuffer.writeUInt16LE(0, 0); // Reserved (must be 0)
  icoBuffer.writeUInt16LE(1, 2); // Resource type: 1 for icon (.ICO)
  icoBuffer.writeUInt16LE(count, 4); // Number of images

  let currentOffset = headerSize;
  let dirOffset = 6;

  for (const entry of pngEntries) {
    const { size, buffer } = entry;
    const width = size >= 256 ? 0 : size;
    const height = size >= 256 ? 0 : size;

    icoBuffer.writeUInt8(width, dirOffset);        // Width
    icoBuffer.writeUInt8(height, dirOffset + 1);    // Height
    icoBuffer.writeUInt8(0, dirOffset + 2);         // Color count (0 = >=8bpp)
    icoBuffer.writeUInt8(0, dirOffset + 3);         // Reserved (0)
    icoBuffer.writeUInt16LE(1, dirOffset + 4);      // Color planes (1)
    icoBuffer.writeUInt16LE(32, dirOffset + 6);     // Bits per pixel (32bpp)
    icoBuffer.writeUInt32LE(buffer.length, dirOffset + 8); // Size of image data in bytes
    icoBuffer.writeUInt32LE(currentOffset, dirOffset + 12); // File offset of image data

    buffer.copy(icoBuffer, currentOffset);

    currentOffset += buffer.length;
    dirOffset += 16;
  }

  return icoBuffer;
}

async function generateFavicons() {
  console.log('Generating Golden AURA EVENTS Favicons...');

  const logoPath = 'public/images/aura.logo.png';
  if (!fs.existsSync(logoPath)) {
    throw new Error(`Logo file not found at ${logoPath}`);
  }

  // 1. Trim the transparent padding from aura.logo.png
  const trimmedBuffer = await sharp(logoPath).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedBuffer).metadata();
  console.log(`Trimmed logo: ${trimmedMeta.width}x${trimmedMeta.height}`);

  // Base canvas size: 512x512
  const canvasSize = 512;
  const targetWidth = 430;
  const targetHeight = Math.round(targetWidth * (trimmedMeta.height / trimmedMeta.width));

  // Resize trimmed logo to fit inside the 512x512 badge
  const resizedLogo = await sharp(trimmedBuffer)
    .resize(targetWidth, targetHeight, { fit: 'contain' })
    .toBuffer();

  const logoLeft = Math.round((canvasSize - targetWidth) / 2);
  const logoTop = Math.round((canvasSize - targetHeight) / 2);

  // SVG for luxury dark circle with radiant champagne-gold border and subtle inner radial glow
  const badgeSvg = `
    <svg width="${canvasSize}" height="${canvasSize}" viewBox="0 0 ${canvasSize} ${canvasSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Subtle warm radial glow -->
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#241C14" stop-opacity="0.95" />
          <stop offset="60%" stop-color="#120E0A" stop-opacity="0.98" />
          <stop offset="100%" stop-color="#090807" stop-opacity="1" />
        </radialGradient>
        <!-- Elegant champagne-gold linear gradient for the perimeter ring -->
        <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFF4D0" />
          <stop offset="35%" stop-color="#EECB76" />
          <stop offset="70%" stop-color="#D8B46A" />
          <stop offset="100%" stop-color="#9C7932" />
        </linearGradient>
      </defs>
      <!-- Circular dark luxury disc -->
      <circle cx="256" cy="256" r="248" fill="url(#goldGlow)" />
      <!-- Perimeter champagne-gold rim -->
      <circle cx="256" cy="256" r="248" fill="none" stroke="url(#ringGold)" stroke-width="8" opacity="0.95" />
      <!-- Inner subtle decorative hairline ring -->
      <circle cx="256" cy="256" r="236" fill="none" stroke="#EECB76" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.45" />
    </svg>
  `;

  // Composite the golden logo on top of the circular dark badge
  const masterBadgeBuffer = await sharp(Buffer.from(badgeSvg))
    .composite([
      {
        input: resizedLogo,
        left: logoLeft,
        top: logoTop,
      }
    ])
    .png()
    .toBuffer();

  // Also create a pure transparent square version
  const transparentMasterBuffer = await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      {
        input: resizedLogo,
        left: logoLeft,
        top: logoTop,
      }
    ])
    .png()
    .toBuffer();

  // Save master versions
  await sharp(masterBadgeBuffer).toFile('public/images/aura.logo-favicon.png');
  console.log('✓ Created public/images/aura.logo-favicon.png (512x512)');

  // Generate standard PNG sizes:
  const sizes = [16, 32, 48, 64, 180, 192, 512];
  const pngBuffers = {};

  for (const s of sizes) {
    const buf = await sharp(masterBadgeBuffer)
      .resize(s, s, { kernel: sharp.kernel.lanczos3 })
      .png({ compressionLevel: 9 })
      .toBuffer();
    pngBuffers[s] = buf;
  }

  // Save standard files in public/
  await sharp(pngBuffers[32]).toFile('public/favicon.png');
  await sharp(pngBuffers[32]).toFile('public/favicon-32x32.png');
  await sharp(pngBuffers[16]).toFile('public/favicon-16x16.png');
  await sharp(pngBuffers[180]).toFile('public/apple-touch-icon.png');
  console.log('✓ Created public/favicon.png (32x32)');
  console.log('✓ Created public/favicon-32x32.png');
  console.log('✓ Created public/favicon-16x16.png');
  console.log('✓ Created public/apple-touch-icon.png (180x180)');

  // Generate multi-size favicon.ico (16, 32, 48)
  const icoEntries = [
    { size: 16, buffer: pngBuffers[16] },
    { size: 32, buffer: pngBuffers[32] },
    { size: 48, buffer: pngBuffers[48] },
  ];
  const icoBuffer = createIcoFromPngs(icoEntries);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log('✓ Created public/favicon.ico (Multi-size 16x16, 32x32, 48x48)');
}

generateFavicons().catch(console.error);
