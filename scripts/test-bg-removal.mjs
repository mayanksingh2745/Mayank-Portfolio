import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function testOne() {
  console.log('Testing background removal on pose1-ch.png...');
  const inputPath = path.resolve('public/photos/pose1-ch.png');
  const fileUrl = `file://${inputPath.replace(/\\/g, '/')}`;
  
  const blob = await removeBackground(fileUrl);
  const buffer = Buffer.from(await blob.arrayBuffer());
  
  // Save raw cutout
  fs.mkdirSync('public/avatar', { recursive: true });
  const rawPath = 'public/avatar/pose-portrait-raw.png';
  fs.writeFileSync(rawPath, buffer);
  console.log(`Saved raw cutout to ${rawPath}`);
  
  // Optimize with sharp: max 1400px tall, webp, keep alpha
  await sharp(buffer)
    .resize({ height: 1400, withoutEnlargement: true })
    .webp({ quality: 90, alphaQuality: 100 })
    .toFile('public/avatar/pose-portrait.webp');
    
  console.log('Generated public/avatar/pose-portrait.webp');
}

testOne().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
