# BRAND - Rice Focus

## Positioning line (in Dani's language)

"The little pixel rice cooker that times your rice and sings when it's done."

Secondary framing for the X post: a tiny, single-page web toy that happens to be a genuinely good kitchen timer. Lead with the little guy, not with "timer app."

## Palette direction

Keep and defend the existing warm 8-bit kitchen palette. It is already distinctive; do not modernize it.

- Base: dark toasted brown `#2a1f14` (background, theme-color)
- Cream: `#f0deb8` (canvas field, body text)
- Golden: `#f8d878` (headline, timer digits, moments of joy)
- Shadow brown: `#805010` (pixel text-shadows), border brown `#5a3a1a`, muted tan `#b89858`
- Accent rule: golden is earned. Reserve `#f8d878` for the title, the countdown digits, and the celebration. Everything else stays in browns and tans so the finish moment visibly glows.
- Never introduce: pure white, pure black, neon, gradients, glassmorphism blur. Any new color must look like it came off a SNES cartridge.

## Type system

- 1 typeface only: **Press Start 2P**, everywhere, no exceptions. A second font would break the fiction.
- Scale (existing, keep): title ~1.1rem, countdown 2rem tabular, labels 0.5rem, sublabels 0.4rem, hints 0.35rem. Pixel fonts read small; compensate with letter-spacing and color, never with a fallback sans.
- Mitigate the load flash: preconnect to fonts.gstatic.com and use `font-display: swap` consciously, or inline/subset the font so first paint is already in character (bounce trigger 3).
- All-caps labels are the voice of the machine ("SET YOUR COOKING TIME", "RICE IS READY!"). Keep them.

## Spacing and motion personality

- Spacing: chunky and honest. 3 to 4px borders, visible rectangles, no rounded-corner softness beyond the existing 4px. Layout is a single centered column with generous dark margin around the cream canvas, like a cartridge label.
- Motion: stepped, never eased. Animations move in discrete pixel frames (steps() timing or frame ticks), the way the pour/water/lid sequence already does. No spring physics, no fade-blur, no parallax. A pixel world that suddenly tweens smoothly reads as fake.
- Sound is part of motion: the start chime and the Twinkle Twinkle finish are brand assets. Any new interaction sound must be chiptune from the same Web Audio voice.
- Tempo: slow and cozy during the cook, quick and delighted at the finish.

## Voice and tone rules

1. The machine speaks in caps, short, warm: "20 MIN SET", "RICE IS READY!". Never corporate ("Your session has completed").
2. No exclamation inflation: 1 exclamation mark max, and only at the finish.
3. Never claim authority on cook times. Presets are friendly defaults ("SUSHI", "BROWN"), not culinary law.
4. No growth language anywhere: no "sign up", "pro", "unlock", "streak". This is a gift, not a funnel.
5. README and meta copy should stay modest: "One page, no account, no backend" is the right register. Do not claim offline support while the page still loads its font from Google Fonts.

## 3 reference products to measure taste against

1. **Unpacking**: pixel art with warmth and story; every sprite feels touched by a human
2. **Poolsuite.net**: 100 percent committed aesthetic world, zero off-theme UI elements
3. **Neal.fun**: single-purpose, instantly legible, craft visible within 2 seconds, nothing asked of the visitor

## 3 anti-references (never look like these)

1. **Generic AI-template slop**: Inter font, indigo-to-purple gradient hero, glassmorphism cards, emoji-bullet feature grid, "Built with love" footer. 1 pixel of that vocabulary kills the fiction.
2. **online-stopwatch.com / generic timer sites**: ad-cluttered, utilitarian, zero personality; the exact thing Dani bounces from in 5 seconds.
3. **Sterile iOS Clock minimalism**: beautiful but characterless; if this ever looks "clean" instead of "cozy", it has lost its only differentiation against the timer she already owns.
