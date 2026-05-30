# Rice Focus - Suggestions

## Evangelist Persona

The ideal evangelist is a home cook who lives in r/JapaneseFood or r/MealPrepSunday, cooks rice 3-4 times a week, and currently just guesses the time or uses their phone's built-in timer. They are 25-35, probably own a rice cooker but also cook on the stovetop. They screenshot the pixel art cooker animation mid-cook and post it with "ok this timer is adorable" to a Discord cooking server or as a tweet. They bounce in 5 seconds if the UI looks like a generic timer app with no personality. They share because the pixel face on the cooker is charming and the Twinkle Twinkle finish is a genuine surprise. What they use instead: the iPhone Clock app or a sticky note with the time written on it.

## Ground-Truth Findings

### Working and Honest

- **Repo HEAD is the source of truth.** The latest commit (2590b41) added rice variety sublabels (SUSHI, WHITE, JASMINE, LONG GRAIN, BROWN) to preset buttons.
- **No fabricated data.** No fake API calls, no pseudo-live data, no stale "updated daily" claims, no example.com links, no invented facts about real people or places.
- **No false authority claims.** Cook times are presented as presets, not as authoritative or sourced from external data.
- **Core animation and timer work end to end.** Static HTML file, no build step, no broken imports, no external dependencies beyond Google Fonts.
- **Audio works** (Web Audio API, no server-side requirement).
- **Mobile touch targets** are 44px, correct.

### Deploy Mismatch (Flag, Not Fix)

The live URL (https://rice-cooker-timer.vercel.app) still serves the OLD build without rice variety sublabels on preset buttons. Repo HEAD is ahead by at least 1 commit. This will resolve on next Vercel deploy. No action needed in code.

### Keyboard Support

Keyboard support for +/- adjuster was explicitly flagged as deferred in the prior pass notes. It was NOT in the code before this pass. Now implemented.

## Prioritized Plan

### Quick Wins (S effort, no deploy needed to verify logic)

1. **[DONE this pass] Keyboard shortcuts** - Arrow left/right and -/+/= adjust time by 1 min; Enter/Space starts cooking when idle; R/Escape resets after done. Zero dependencies, pure additive JS. Effort: S. Deploy needed: yes (to go live, already pushed to repo).

2. **Timer label feedback during preset selection** - When user clicks a preset, flash a brief "XX MIN SET" confirmation in the timer-label area, so they know the button registered. Currently there is no feedback other than the timer number changing. Effort: S. Deploy needed: yes.

3. **Visible keyboard hint** - Add a tiny line below the controls like "ARROWS: +/- TIME | ENTER: START" that appears only on non-touch devices (check `matchMedia('(hover:hover)')`). Low-noise, helps discoverability. Effort: S. Deploy needed: yes.

### Medium Wins (M effort)

4. **Share button with pre-filled text** - After "RICE IS READY!" appears, show a "SHARE" button that opens a pre-filled tweet: "just used this pixel rice cooker timer and it played twinkle twinkle when my rice was done https://rice-cooker-timer.vercel.app". The animation moment is the most shareable thing; capitalizing on it in-app closes the loop. Effort: M. Deploy needed: yes.

5. **Persistent last-used time** - Remember the last preset or custom time in localStorage and restore it on next visit. Small quality-of-life improvement for repeat users. Effort: S. Deploy needed: yes.

6. **Pause and resume** - Allow pausing the timer mid-cook (e.g., if user needs to check the rice). Currently the only option is to wait or hard-reset. Add a PAUSE button that appears during the cooking state. Effort: M. Deploy needed: yes.

### Bigger Bets (L effort)

7. **Sound toggle** - Some users run this on a laptop in a quiet office. A single mute/unmute icon button in the corner (persisted to localStorage) would make it usable in more contexts. Effort: M-L. Deploy needed: yes.

8. **Additional rice type: wild rice or black rice** - Add a 60-minute preset with a "WILD" sublabel for users who cook wild rice blends. Low effort to add the button, but requires research on a sensible default time. Effort: S-M. Deploy needed: yes.

## Notes on Current State

- No package.json, no build step. This is a single static HTML file.
- No CLAUDE.md or DESIGN.md in the project root.
- og-image.png exists and is correctly referenced.
- .vercel/ directory is present but not committed (gitignored).
