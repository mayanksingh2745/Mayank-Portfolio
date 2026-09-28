# Mayank Singh — Cinematic Poster Portfolio

A production-grade, poster-series portfolio engineered for AI Engineer, Data Scientist, Applied ML, and Forward Deployed Engineer opportunities.

> **Concept: "The Avatar Walks The Page"**  
> One continuous poster scene anchored by a centered cutout avatar of Mayank Singh. As you scroll, the avatar changes pose while the halo glow, giant typographic background word, and technical side panels smoothly shift across 8 dedicated sections.

---

## 🌟 Architecture & Poster Layer Stack

Every section is composed of a 5-layer visual depth stack:
1. **Dark Base `#0A0A0C`**: Soft radial vignette, subtle film grain noise filter, and a diagonal venetian blinds light sweep drifting across the viewport at 6% opacity.
2. **Dynamic Halo**: Glowing circle behind the head (0.6x avatar height) with soft outer gaussian aura, slow 6-second breathing scale pulse, and drifting ambient dust particles. Transitions section colors:
   - Hero: Gold (`#D9B36A`)
   - Impact: Cobalt (`#3D5AFE`)
   - Experience: Tomato (`#FF5B2E`)
   - Projects: Mint (`#7CE3B5`)
   - Skills: Butter (`#FFD84A`)
   - About: Violet (`#8B5CFF`)
   - Credentials: Gold (`#D9B36A`)
   - Contact: Tomato (`#FF5B2E`)
3. **Giant Background Word**: 22–28vw heavy typography set in **Bricolage Grotesque** with tight tracking and muted accent tint, positioned behind the avatar so the cutout naturally overlaps the letters.
4. **Centered Avatar Cutout**: Centered waist-up cutout resting on the bottom edge of the viewport with a bottom gradient fade into `#0A0A0C`, rim-light halo reflections, and subtle cursor-following 3D head tilt.
5. **Foreground Details**: Split 3-column layout (left & right technical panels) featuring 1px hairline glass chips, code terminals, live telemetry, and modal triggers. Text strictly lives left and right of the avatar and never covers the face.

---

## 🧑‍💻 Studio Poses & Avatar Generation

All 5 poses are **100% authentic, real studio photographs** of Mayank Singh located in `public/photos/`:

| Pose Key | Role / Section | Original Studio Source | Generated Cutout (WebP) |
|---|---|---|---|
| `pose-portrait` | Hero, About | `public/photos/pose1-ch.png` | `public/avatar/pose-portrait.webp` |
| `pose-laptop` | Impact, Experience | `public/photos/pose2-ch.png` | `public/avatar/pose-laptop.webp` |
| `pose-reading` | Skills | `public/photos/pose3-ch.png` | `public/avatar/pose-reading.webp` |
| `pose-present` | Projects, Credentials | `public/photos/pose4-ch.png` | `public/avatar/pose-present.webp` |
| `pose-wave` | Contact | `public/photos/pose5-ch.png` | `public/avatar/pose-wave.webp` |

No synthetic cartoon filters or generic placeholders were used. Every pose was cut out using `rembg` (`u2net_human_seg`) with alpha matting and feathered edges (1–2px), color-graded with contrast boost and rim-light tint, and saved to `public/avatar/` as max 1400px high WebP files with blur placeholders.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+
- Python 3.10+ (only required if re-running background removal scripts)

### 2. Installation
```bash
git clone <repo-url>
cd portfolio-2
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local` to enable live contact form dispatching:
```bash
cp .env.example .env.local
```
Configure your email credentials:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=mayanksingh2745@gmail.com
```
*(If omitted, contact form submissions log safely to the server stdout without throwing errors).*

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🔄 How To: Workflows & Customization

### Re-running Avatar Background Removal
To re-process raw photos or generate new pose cutouts:
```bash
python scripts/process_all_avatars.py
```
This script automatically:
1. Runs `u2net_human_seg` neural matting over all images in `public/photos/`.
2. Applies edge feathering, contrast enhancement, and halo tinting.
3. Resizes to 1400px height while maintaining aspect ratio and alpha transparency.
4. Generates base64 blur placeholders in `public/avatar/manifest.json`.

### Swapping a Pose Image
To swap any pose with a new photo:
1. Place your new photo in `public/photos/` (or directly place a transparent PNG/WebP into `public/avatar/pose-<name>.webp`).
2. Update the file path or pose offsets in `data/content.ts`:
```typescript
// data/content.ts
export const siteContent = {
  // ...
  poseOffsets: {
    "pose-portrait": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
    // ...
  }
};
```

### Editing Content & Copy
All site text, metrics, links, roles, projects, skills, and credentials live in a single typed configuration file:
- **`data/content.ts`**
*(No text or numbers are hardcoded inside components).*

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub / GitLab:
```bash
git add .
git commit -m "feat: complete cinematic poster portfolio"
git push origin main
```
2. Import the project into **Vercel** (`https://vercel.com/new`).
3. Set the Framework Preset to **Next.js**.
4. Add your Environment Variables (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_EMAIL`).
5. Click **Deploy**.

---

## 📋 Remaining TODOs

1. **GenAI & LLM Fine-Tuning Project**: Finish benchmarking domain perplexity and LoRA adapter weights; update `data/content.ts` to replace the "Under Implementation" placeholder with the live repo.
2. **Enterprise RAG Project**: Benchmark hybrid search recall (BM25 + Dense vector) and add live demo endpoint to `data/content.ts`.
3. **Optional Depth Parallax**: For high-end GPUs, a Three.js / React Three Fiber displaced plane can be toggled in `components/AvatarStage.tsx` if a displacement depth map is extracted.
