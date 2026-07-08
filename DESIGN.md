# DESIGN - Rice Focus (source of truth)

Product name and concept are fixed: **Rice Focus**, a pixel-art rice cooker countdown timer. Single static index.html, no build step, no external deps beyond Google Fonts. Any redesign that adds a framework, a bundler, or a network dependency is a regression.

## Layout / IA intent

- 1 page, 1 centered column, everything visible without scrolling on a phone in portrait. Order top to bottom: title + subtitle, pixel-cooker canvas (the hero), countdown display, status label, presets row, +/- adjuster, start/reset controls, keyboard hint (hover-capable devices only), tiny footer.
- The canvas is the hero and the mascot. Nothing may ever cover it, push it below the fold on a 375px-wide viewport, or shrink it to make room for new UI.
- No nav, no secondary pages, no footer link farm. If a feature needs a second page, it does not belong in this product.
- Touch targets stay at 44px minimum (already true; protect it).

## Hero / landing concept

The product IS the landing page. No marketing section, no feature list. The cooker sits idle with its face, label reads "SET YOUR COOKING TIME", presets show rice varieties (15m SUSHI, 20m WHITE, 25m JASMINE, 30m LONG GRAIN, 45m BROWN). The pitch is delivered by looking at it for 2 seconds. First paint must already be in Press Start 2P and full palette (no font flash).

## Key screens (states of the 1 page)

1. **Idle / set**: face awake, presets and adjuster active, subtle idle animation (blink or steam wisp) so the page never looks dead in a screenshot.
2. **Starting**: pour rice, add water, close lid sequence + start chime. This is the "it responded to me" moment; it must run on the same tap that starts the timer (which also unlocks Web Audio).
3. **Cooking**: countdown in golden tabular digits, cooker bubbles/steams in stepped frames, controls recede (dim, do not vanish). Tab-title should mirror the remaining time (e.g. "12:40 - Rice Focus") so a backgrounded tab still does its job.
4. **Done / celebration**: "RICE IS READY!", face lights up, steam burst, Twinkle Twinkle chiptune. Hold this state until the user acts; never auto-reset. This is the screenshot frame.
5. **Post-done**: reset control + (planned bet) a SHARE affordance with pre-filled post text and URL.

## Empty / loading / error state intent

- **Empty**: none in the classic sense; idle IS the empty state and must be charming on its own.
- **Loading**: near-zero by design (1 file). The only loading risk is the Google Font; treat font flash as a bug (subset/inline or swap strategy per BRAND.md).
- **Error**: only 1 real failure mode exists, blocked/undelivered audio. Web Audio must be created inside the start-tap gesture; if the context is suspended or the tab was asleep at 0:00, show an unmissable visual finish (full-screen-ish flash of the celebration frame + document.title "RICE IS READY!") so silence never means a missed alert. No network errors are possible; keep it that way (fully offline after first load).
- **Reduced motion**: honor prefers-reduced-motion with fewer frames, but never remove the finish alert.

## Metadata / OG intent (X-readiness, mandatory)

- Full OG + Twitter card set already exists and is correct in structure: og:title, og:description, 1200x630 og-image.png, summary_large_image, canonical. Keep PNG (scrapers do not render SVG; this was already fixed in commit 808a03b).
- OG image intent: the celebration frame, not the idle frame. The image should show the cooker with its lit face, steam, and "RICE IS READY!" in golden Press Start 2P on the dark brown field, so the X card itself sells the payoff. Verify og-image.png matches current art; regenerate from the canvas art if it drifted.
- Copy intent: og:description leads with the toy, not the utility ("cute pixel-art rice cooker... chiptune sounds" is on-voice; keep that register).
- Title stays "Rice Focus - Pixel Rice Cooker Timer" (name preserved, keyword honest).

## Screenshot-worthy moment to engineer

The 4 seconds after 0:00. Engineering targets: (a) the celebration must look complete in a single still frame, since most shares are screenshots not videos; (b) the SHARE button (SUGGESTIONS.md item 4) appears only in this state with pre-filled text like "my rice timer sings twinkle twinkle when the rice is done" + URL; (c) the celebration loops gently so a screen recording of any 4-second window makes a clean GIF. Secondary shareable: the preset row with rice-variety sublabels, which reads as thoughtful craft in screenshots.

## Data honesty

This product makes no real-data claims: no APIs, no fetch, no "live" or "updated" language, no fabricated stats. Cook times are presented as friendly presets, not sourced authority; keep it that way (do not add "chef-approved" or similar without a source). Nothing requires disclosure.

**Deploy truth (as of 2026-07-08)**: the live URL serves a stale build behind repo HEAD (6a740a9). Verified by diff: live is missing rice-variety sublabels (2590b41), keyboard shortcuts (54f4399), and the preset "XX MIN SET" flash + keyboard hint (6a740a9). OG tags and og-image.png ARE live. Before any X post, Michael must redeploy so the served page matches HEAD; no code fix needed.

## Carried-forward build queue (from SUGGESTIONS.md, still valid)

1. Share button in the done state (M) - highest leverage for the X launch
2. Persist last-used time in localStorage (S)
3. Pause/resume mid-cook (M)
4. Sound toggle persisted to localStorage (M)
5. 60-min WILD/black rice preset after verifying a sensible default time (S-M)
