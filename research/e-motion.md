# E. Motion for a calm premium fashion shop (CSS-first, 2025–26)

Stack: Next.js 15.5 / React 19.1 / Tailwind v4, no animation lib. Mood: calm, black/silver, so motion is quiet and short.
Shared tokens: `--ease-out: cubic-bezier(0.23,1,0.32,1)`, `--ease-drawer: cubic-bezier(0.32,0.72,0,1)`. Small UI stays under 300ms. Exits run faster than entries.

## 1. Product-card hover (back view + subtle zoom)
- Stack the back-view image over the front at `opacity:0`. On hover, crossfade it to 1 over 300–400ms `ease`. Shopify Dawn ships the same pattern as "Show second image on hover". For fashion it shows another angle of the garment.
- Zoom: `scale(1.03–1.05)` on the image (not the card), 500–700ms `--ease-out`, inside an `overflow:hidden` frame. Keep it subtle. Dawn merchants often ask to switch zoom off.
- Gate it: `@media (hover:hover) and (pointer:fine) { .card:hover … }`. On touch, a tap would fire a sticky hover. On mobile, show the back view in the PDP gallery instead.
- Use `loading="lazy"` on the back image so its download doesn't delay LCP.

## 2. Staggered reveals on scroll
- `animation-timeline: view()` ships in Chrome 115+, Safari 26 (Sept 2025) and **Firefox 159 (27 Oct 2026, on by default)**. Firefox users still on older versions don't get it. MDN still marks it "limited availability", not Baseline.
- Always wrap it: `@supports (animation-timeline: view()) { .reveal { animation: rise linear both; animation-timeline: view(); animation-range: entry 0% entry 40%; } }`. Outside `@supports`, content stays visible. Never ship `opacity:0` as the default state.
- Use `rise` = `opacity 0→1` + `translateY(12–16px)→0`. Scroll-linked animation can't stagger by time, so vary `animation-range` per column instead (e.g. `entry 0% entry 40%`, then `entry 5% entry 45%`).
- Want a time-based one-shot stagger (30–80ms per item, 300–500ms each)? Use one IntersectionObserver that adds `data-in` once, then `unobserve`. Delay by index with `transition-delay: calc(var(--i)*60ms)`. This works everywhere and plays once, which suits a calm brand better than motion that scrubs with the scroll.

## 3. Hero entrance
- CSS only, on load: fade the image in plus `scale(1.04→1)` over 1.2–1.6s `--ease-out`. Then stagger the copy and CTA: `opacity` + `translateY(8px)`, 500ms, 80–120ms apart. This is the one place for slow, "editorial" timing.
- The hero image is the LCP element. Don't hold it at `opacity:0` waiting on JS. Use a CSS `@keyframes` with `animation-fill-mode: both` on server-rendered markup, keep `priority` on `next/image`, and keep the animation short so LCP isn't pushed back.

## 4. Add-to-bag feedback
- Button: `:active { scale: .97 }` at 120–160ms. On success, swap the label ("Added") with an opacity crossfade, using an optional `blur(2px)` mid-swap, for about 200ms.
- Bag count: bump the badge with a 1→1.15→1 keyframe over 300ms, then open the mini-drawer (section 5) or a toast. Set `aria-live="polite"` on the count/toast so the update is announced, not only shown.
- Skip confetti and fly-to-cart arcs. They're off-tone for a calm luxury brand, and the badge plus drawer is enough feedback.

## 5. Drawer and bottom sheet (`@starting-style`, `allow-discrete`)
- Baseline Newly available since Aug 2024: `@starting-style` (Chrome 117, Firefox 129, Safari 17.5) and `transition-behavior: allow-discrete` (Safari 17.4).
- Pattern on `<dialog>` or `[popover]`:
  `transition: translate 320ms var(--ease-drawer), opacity 200ms, display 320ms allow-discrete, overlay 320ms allow-discrete;`
  `@starting-style { translate: 100% 0 }` for a side drawer, `0 100%` for a bottom sheet.
- Write `allow-discrete` inside the shorthand. Placed before it, it gets ignored. Apply it only to `display`/`overlay`. Exit animations depend on `display` transitions, and `overlay` is not Baseline, so in Firefox the exit and backdrop fade can just snap. That's acceptable progressive enhancement.
- Timing: enter about 300–350ms, exit about 200ms. Animate the backdrop's opacity only, never `backdrop-filter` blur, which is expensive in Safari.

## 6. Card → product page (View Transitions)
- Same-document VT (`document.startViewTransition`) is Baseline Newly available since Oct 2025: Chrome 111, Safari 18, Firefox 144. Firefox 144 has no transition *types*.
- Cross-document `@view-transition { navigation: auto }` works in Chrome 126 and Safari 18.2, but **not Firefox**. It only fires on full page loads, so it does **not** cover Next `<Link>` soft navigations. Not the tool here.
- Next 15 (our version): `experimental.viewTransition: true` plus `import { unstable_ViewTransition as ViewTransition } from 'react'`. The Next 15 docs say "not recommended for production". By Next 16.3 docs (Oct 2026) it is no-config and imported as `ViewTransition` (React 19.3), and route navigations trigger it automatically.
- Recipe: wrap the card image and the PDP hero in `<ViewTransition name={\`p-${id}\`} share="morph" default="none">`, with `::view-transition-group(.morph){animation-duration:400ms}`. The morph only pairs if the PDP renders in the same commit, so it needs prefetched pages. A Suspense fallback breaks the pair. Add `::view-transition{pointer-events:none}` so clicks during the transition reach the page.
- Recommendation: either ship it as an opt-in flag (unsupported browsers just navigate normally), or wait until we upgrade to Next 16.3+.

## 7. Mobile tap feedback
- `:active { scale: .97 }` with `transition: scale 120ms var(--ease-out)` on buttons, cards and swatches (range .95–.98). Add `-webkit-tap-highlight-color: transparent` only when this replaces the highlight. Make release faster than press.

## 8. Performance and reduced motion
- Animate only `transform`/`translate`/`scale` and `opacity`, the only compositor-only properties. Never animate `height`, `top` or `box-shadow`. Use `will-change` sparingly, only on elements that are actively animating, because each layer costs memory.
- INP: feedback must not wait on JS. Do `:active` and the optimistic badge bump first, then the network call. CLS: reserve image aspect-ratio boxes. Reveals use transform, never layout.
- `@media (prefers-reduced-motion: reduce)`: drop translate/scale/zoom and the VT morph (`::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation-duration:0s !important }`). Keep short opacity fades (≤200ms), since reduced motion means less motion, not none. React does not handle this for you.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline/view
- https://developer.mozilla.org/Firefox/Releases/159
- https://web.dev/blog/baseline-entry-animations
- https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition
- https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available
- https://nextjs.org/docs/15/app/api-reference/config/next-config-js/viewTransition
- https://nextjs.org/docs/app/guides/view-transitions
- https://react.dev/reference/react/ViewTransition
