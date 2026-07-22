# DESIGN - Rice Focus (source of truth)

Product name and concept are fixed: **Rice Focus**, a pixel-art rice cooker countdown timer. The release is 3 static files: `index.html`, `og-image.png`, and `favicon.svg`. There is no app build step, framework, backend, account, analytics, or runtime network dependency beyond Google Fonts. Adding those is a regression.

## Layout / IA intent

- 1 page, 1 centered cartridge in portrait, everything visible without horizontal scrolling. Order top to bottom: title + subtitle, pixel-cooker canvas, countdown, status, presets, +/- adjuster, start/reset controls, keyboard hint on hover-capable devices.
- The canvas is the hero and mascot. Scale it uniformly on narrow phones and pair it with the controls in a 2-column cartridge on short landscape screens. Never crop or cover it.
- No nav, no secondary pages, no footer link farm. If a feature needs a second page, it does not belong in this product.
- Touch targets stay at 44px minimum (already true; protect it).

## Hero / landing concept

The product IS the landing page. No marketing section, no feature list. The cooker sits idle with its face, label reads "SET YOUR COOKING TIME", presets show rice varieties (15m SUSHI, 20m WHITE, 25m JASMINE, 30m LONG GRAIN, 45m BROWN). The pitch is delivered by looking at it for 2 seconds. First paint must already be in Press Start 2P and full palette (no font flash).

## Key screens (states of the 1 page)

1. **Idle / set**: face awake, presets and adjuster active, subtle idle animation (blink or steam wisp) so the page never looks dead in a screenshot.
2. **Starting**: tip the rice cup and water jug around their lips, pour from each lip into the open pot, close the lid, then play the start chime. This is the "it responded to me" moment; it must run on the same tap that starts the timer (which also unlocks Web Audio).
3. **Cooking**: countdown in golden tabular digits, cooker bubbles/steams in stepped frames, setup controls leave the interaction path, and the tab title mirrors remaining time (for example, "12:40 | Rice Focus"). Timer truth comes from an absolute wall-clock deadline set on the START tap, not interval tick counts.
4. **Done / celebration**: "RICE IS READY!", face lights up, steam burst, Twinkle Twinkle chiptune. Hold this state until the user acts; never auto-reset. This is the screenshot frame.
5. **Post-done**: SHARE FINISH uses native sharing when available and a clipboard fallback otherwise. COOK AGAIN restores the last valid duration.

## Empty / loading / error state intent

- **Empty**: none in the classic sense; idle IS the empty state and must be charming on its own.
- **Loading**: near-zero by design (1 file). The only loading risk is the Google Font; treat font flash as a bug (subset/inline or swap strategy per BRAND.md).
- **Error**: the main failure mode is blocked or suspended audio. Web Audio is created and resumed inside the START gesture. The timer still reconciles from wall-clock time on `visibilitychange`, `focus`, and `pageshow`, then holds an unmissable visual finish and "Rice is ready! | Rice Focus" tab title even if sound cannot play.
- **Reduced motion**: honor prefers-reduced-motion with fewer frames, but never remove the finish alert.

## Metadata / OG intent (X-readiness, mandatory)

- Full OG + Twitter card set already exists and is correct in structure: og:title, og:description, 1200x630 og-image.png, summary_large_image, canonical. Keep PNG (scrapers do not render SVG; this was already fixed in commit 808a03b).
- OG image intent: the celebration frame, not the idle frame. The image should show the cooker with its lit face, steam, and "RICE IS READY!" in golden Press Start 2P on the dark brown field, so the X card itself sells the payoff. Verify og-image.png matches current art; regenerate from the canvas art if it drifted.
- Copy intent: og:description leads with the toy, not the utility ("cute pixel-art rice cooker... chiptune sounds" is on-voice; keep that register).
- Title stays "Rice Focus | Pixel Rice Cooker Timer" (name preserved, keyword honest).

## Screenshot-worthy moment to engineer

The 4 seconds after 0:00. Engineering targets: (a) the celebration must look complete in a single still frame, since most shares are screenshots not videos; (b) the SHARE button (SUGGESTIONS.md item 4) appears only in this state with pre-filled text like "my rice timer sings twinkle twinkle when the rice is done" + URL; (c) the celebration loops gently so a screen recording of any 4-second window makes a clean GIF. Secondary shareable: the preset row with rice-variety sublabels, which reads as thoughtful craft in screenshots.

## Data honesty

This product makes no real-data claims: no APIs, no fetch, no "live" or "updated" language, no fabricated stats. Cook times are presented as friendly presets, not sourced authority; keep it that way (do not add "chef-approved" or similar without a source). Nothing requires disclosure.

**Deploy truth (2026-07-22)**: product commit `a6fd331` is live as Vercel deployment `dpl_6jSNyq5SinhhUgDGDPf8ApHYScht` at `rice-cooker-timer.vercel.app`. Two production builds were byte-identical, the stable URL passed the same 67/67 browser matrix, all 3 public files match the gated hashes, and all 9 private-path probes return 404.

## Carried-forward build queue (from SUGGESTIONS.md, still valid)

1. Share button in the done state: SHIPPED
2. Persist last-used time in localStorage: SHIPPED
3. Pause/resume mid-cook: deferred, not a release blocker
4. Sound toggle persisted to localStorage: deferred; the current persona values a loud finish
5. 60-min WILD/black rice preset: deferred until the default time is sourced and labeled honestly
