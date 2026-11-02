# Build brief (shared by all builder agents)

Project: /home/user/ym-store — Next.js 15 App Router, React 19, TypeScript, Tailwind v4 (CSS-first config in app/globals.css). Demo store for "Y.M Store", a small Instagram-based clothing shop (Middle East market likely: cash on delivery + WhatsApp ordering matter). Placeholder brand data until the real store details arrive.

## Already built (READ these first; do NOT rewrite them — if you truly need a change, make the smallest additive edit and mention it in your report)
- app/globals.css — tokens: bg, surface, surface-2, ink, muted, line, accent (deep forest, ONLY for primary action/selected state), sale (price cuts/errors), ok, scrim (70%). Radii: --radius-card 12, --radius-input 8, --radius-badge 6. --shadow-float ONLY for floating UI (drawers, dialogs, menus). Utility classes: .btn .btn-primary .btn-secondary .link-quiet .field (16px inputs) .eyebrow .price (tabular, nowrap) .tap (44px on coarse pointer) .no-scrollbar.
- lib/store-config.ts (name, whatsapp, currency, dir, shipping fee/threshold, delivery estimate, returns days), lib/types.ts, lib/format.ts (formatPrice, SIZES)
- data/products.ts (categories, products, getProduct, getProductById, getCategory, productsIn, totalStock)
- components/CartProvider.tsx (useCart: lines, count, subtotal, shipping, total, toFreeShipping, add, setQty, remove, clear, isOpen, open, close, lastAdded)
- components/ProductImage.tsx (use this for ALL product imagery; no external image URLs — image hosts are blocked here and real photos come later), components/ProductCard.tsx, Header.tsx, Footer.tsx, app/layout.tsx

## Design rules (from the user's UI/UX notes + our research — follow them)
1. One obvious main action per screen, solid accent, full-width on mobile. Never two equally loud buttons; alternatives become .btn-secondary or quiet text links under it.
2. No gradients, no rainbow icon tiles, no drop shadows on cards — hairline `border-line` borders. Shadow only on floating things.
3. Horizontal carousels: let the next card peek (~30% visible) so swiping is obvious.
4. Fewer choices up front (≤6 tiles/options), bigger, with a clear selected state (accent ring/fill).
5. Multi-step flows: steps joined by a line inside one container; done = check, current = bold ring, future = dim.
6. Dialogs/sheets: 70% scrim (bg-scrim) behind them; Esc closes; focus moves into them; body scroll locked.
7. Important notices inline in content, never styled like an ad banner.
8. Forms: ≤8 fields, guest by default, autocomplete/inputmode/enterkeyhint attributes, 16px text, labels above fields, inline validation.
9. Mobile first: check at 375px — no horizontal page scroll, 44px targets via .tap, fixed bottom bars use `padding-bottom: env(safe-area-inset-bottom)` and content gets bottom spacing so the bar never hides the last row.
10. Real copy, no placeholder fluff ("Welcome back 👋"). Show full cost early (delivery fee / free threshold), concrete delivery date, returns window, COD.
11. Size: buttons not dropdowns, sold-out sizes visible but disabled/struck through, size guide link right next to the sizes, low-stock note only when true (≤3 left) — no fake urgency.
12. Use logical CSS properties (ms/me/ps/pe/start/end) so dir="rtl" works.
13. Accessible: semantic HTML, aria labels on icon buttons, visible focus, alt text, aria-live for cart updates.

## Process rules
- No new npm dependencies.
- Only create/edit the files assigned to you. Other agents are editing other files in parallel.
- Verify with `cd /home/user/ym-store && npx tsc --noEmit` and `npx eslint <your files>`. Do NOT run `next build` or `next dev` (another agent may be running; the lead will build at the end).
- Do not commit. Report: files created, any shared-file edits, anything left undone.
- Research for context (optional skim): research/a-browse.md, research/b-pdp-checkout.md, research/c-evidence.md.
