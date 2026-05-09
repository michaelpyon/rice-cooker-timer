# Rice Focus

A pixel-art rice cooker countdown timer. One page, no dependencies, works offline after first load.

Live: https://rice-cooker-timer.vercel.app

## Features

- Pixel-art rice cooker animation (pour rice, add water, close lid, cook)
- Chiptune sound effects (start chime + Twinkle Twinkle when done)
- Preset times (15, 20, 25, 30, 45 min) plus +/- 1 min adjuster
- Mobile-friendly, 44px touch targets
- Tab-safe timer (uses setInterval that survives background tabs)

## Run locally

It's a single HTML file. Open it.

```
open index.html
```

Or serve it:

```
python3 -m http.server 8000
```

## Deploy

Linked to Vercel. Push to main, or run `npx vercel --prod`.

## Files

- `index.html` - everything (HTML, CSS, JS, pixel art rendering)
- `og-image.svg` - social share preview
