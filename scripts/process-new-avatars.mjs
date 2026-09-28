import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const NEW_POSES = [
  {
    key: 'pose-experience',
    label: 'Experience (Arms Crossed / Systems)',
    src: 'C:/Users/Mayank/.gemini/antigravity-ide/brain/2f551aa1-5abb-43e6-8561-9eee4e5bd7f7/pose_experience_raw_1790627985073.jpg',
    savedRaw: 'public/photos/pose-experience-raw.jpg'
  },
  {
    key: 'pose-about',
    label: 'About (Thoughtful / Story)',
    src: 'C:/Users/Mayank/.gemini/antigravity-ide/brain/2f551aa1-5abb-43e6-8561-9eee4e5bd7f7/pose_about_raw_1790628012888.jpg',
    savedRaw: 'public/photos/pose-about-raw.jpg'
  },
  {
    key: 'pose-credentials',
    label: 'Credentials (Portfolio / Verified)',
    src: 'C:/Users/Mayank/.gemini/antigravity-ide/brain/2f551aa1-5abb-43e6-8561-9eee4e5bd7f7/pose_credentials_raw_1790628040325.jpg',
    savedRaw: 'public/photos/pose-credentials-raw.jpg'
  }
];

async function run() {
  fs.mkdirSync('public/avatar', { recursive: true });
  fs.mkdirSync('public/photos', { recursive: true });

  const manifestPath = 'public/avatar/manifest.json';
  let manifest = { poses: [], placeholders: {} };
  if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  }

  for (const item of NEW_POSES) {
    console.log(`\nProcessing ${item.key}...`);
    // Copy raw image
    fs.copyFileSync(item.src, item.savedRaw);
    console.log(`Saved raw image to ${item.savedRaw}`);

    // Remove background
    const fileUrl = `file://${path.resolve(item.savedRaw).replace(/\\/g, '/')}`;
    console.log(`Running background removal on ${fileUrl}...`);
    const blob = await removeBackground(fileUrl);
    const buffer = Buffer.from(await blob.arrayBuffer());

    const webpPath = `public/avatar/${item.key}.webp`;
    const pngPath = `public/avatar/${item.key}.png`;

    // Process with sharp: resize to height 1400, maintain aspect ratio
    const processed = await sharp(buffer)
      .resize({ height: 1400, fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    const metadata = await sharp(processed).metadata();

    await sharp(processed)
      .webp({ quality: 92, alphaQuality: 100 })
      .toFile(webpPath);
    console.log(`Saved ${webpPath} (${metadata.width}x${metadata.height})`);

    await sharp(processed)
      .png({ compressionLevel: 8 })
      .toFile(pngPath);
    console.log(`Saved ${pngPath}`);

    // Create blur placeholder
    const tinyBuffer = await sharp(processed)
      .resize({ width: 32 })
      .blur(1.5)
      .webp({ quality: 30 })
      .toBuffer();
    const blurBase64 = `data:image/webp;base64,${tinyBuffer.toString('base64')}`;

    // Update manifest
    manifest.placeholders[item.key] = blurBase64;
    // Remove if already exists
    manifest.poses = manifest.poses.filter(p => p.key !== item.key);
    manifest.poses.push({
      key: item.key,
      label: item.label,
      source: item.savedRaw,
      output_webp: webpPath,
      width: metadata.width,
      height: metadata.height,
      is_real_image: true
    });
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`\nUpdated ${manifestPath} successfully!`);
}

run().catch(err => {
  console.error('Error processing new avatars:', err);
  process.exit(1);
});
