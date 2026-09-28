import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function check() {
  const dir = './public/photos';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const meta = await sharp(fullPath).metadata();
    const stats = await sharp(fullPath).stats();
    console.log(`File: ${file}`);
    console.log(`  Dimensions: ${meta.width}x${meta.height}`);
    console.log(`  Channels: ${meta.channels}, HasAlpha: ${meta.hasAlpha}`);
    if (meta.hasAlpha && stats.channels[3]) {
      console.log(`  Alpha min: ${stats.channels[3].min}, max: ${stats.channels[3].max}, mean: ${stats.channels[3].mean.toFixed(2)}`);
    }
  }
}

check().catch(console.error);
