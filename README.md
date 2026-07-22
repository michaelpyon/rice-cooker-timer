# Rice Focus

A cozy pixel-art rice cooker countdown timer. One page, no account, no backend.

Live: https://rice-cooker-timer.vercel.app

## Features

- Pixel-art rice cooker animation (pour rice, add water, close lid, cook)
- Chiptune sound effects (start chime + Twinkle Twinkle when done)
- Preset times (15, 20, 25, 30, 45 min) plus +/- 1 min adjuster
- Responsive portrait and short-landscape layouts with 44px touch targets
- Wall-clock countdown that reconciles after background throttling or sleep
- Remaining time in the tab title
- Last-used duration saved locally
- Done-state sharing through the Web Share API or clipboard fallback

## Run locally

The app logic and pixel art live in 1 HTML file. Open it directly or serve the directory.

```
open index.html
```

Or serve it:

```
python3 -m http.server 8000
```

## Deploy

The repo is linked to the existing Vercel project. Build the allowlisted public artifact, then deploy that exact output.

```
npx vercel pull --yes --environment=production
npx vercel build --prod
npx vercel deploy --prebuilt --prod
```

`.vercelignore` restricts production to `index.html`, `og-image.png`, and `favicon.svg`. Internal product docs and local tool state must stay private.

## Files

- `index.html` - HTML, CSS, JavaScript, audio, and canvas pixel art
- `favicon.svg` - drawn pixel-cooker icon
- `og-image.svg` - editable social-card source
- `og-image.png` - 1200x630 production social card
- `PERSONA.md`, `BRAND.md`, `DESIGN.md` - private product source of truth
