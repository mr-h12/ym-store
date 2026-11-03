# Y&M STORE: module plan

Each point is one small, checkable change. Phase 1 = M0-M12. Later = L1-L6.

## How to use this file

- Tick a point (`[x]`) only when its check passes.
- One branch per module, named after it, for example `m3-data-model`.
- A module is done when all of its points' checks pass, plus `tsc`, lint, unit tests, and the Playwright smoke at 360×800 in `en` and `ar`.

## Verification

- The docs step (M0) is done when every decision in §15 and §19 of the plan is in `docs/PROJECT.md` and `CLAUDE.md` is under about 80 lines.
- Each later module is done when all of its points' checks pass, plus `tsc`, lint, unit tests and the Playwright smoke at 360×800 in en and ar.

## M0. Docs and guardrails

- [x] **M0.1** Create `CLAUDE.md`, `docs/PROJECT.md`, `ARCHITECTURE.md`, `MODULES.md`, `COMPLIANCE.md`, `owner-questionnaire-ar.md`, `research/f-launch-research.md` — _Check:_ every decision D-01…D-33 appears in PROJECT.md.
- [x] **M0.2** Add a Docs section to README — _Check:_ the links resolve.
- [ ] **M0.3** Send the owner questionnaire — _Check:_ the answers come back and are pasted into PROJECT.md.

## M1. Foundation

- [ ] **M1.1** `docker/compose.yml` with `db` (Postgres 17) and `.env.example` — _Check:_ `docker compose up -d db` is healthy.
- [ ] **M1.2** Install drizzle-orm, drizzle-kit, postgres, server-only, tsx, @playwright/test; add `server/db.ts` — _Check:_ `tsc` passes; importing `server/db.ts` from a client component fails the build.
- [ ] **M1.3** `server/env.ts` fails fast on missing env vars, and is the only place reading `process.env` — _Check:_ unset `DATABASE_URL` and the app stops with a clear message.
- [ ] **M1.4** Scripts `db:generate`, `db:migrate`, `test`, `e2e` — _Check:_ each script runs.
- [ ] **M1.5** CI workflow (tsc, lint, unit) — _Check:_ green on push.

## M2. i18n and phone-first shell

- [ ] **M2.1** Move routes under `app/[lang]`; middleware maps `/` to `en` and `/ar` to `ar`, with the language cookie — _Check:_ `/` and `/ar` render.
- [ ] **M2.2** `dictionaries/en.json` and `ar.json`, plus `lib/i18n.ts` (`getDictionary`, `t`) — _Check:_ a unit test fails when the two files' keys differ.
- [ ] **M2.3** `<html lang dir>` per language; IBM Plex Sans Arabic scoped with `:lang(ar)` — _Check:_ the `ar` page has `dir=rtl`.
- [ ] **M2.4** Language key in the header and mobile menu, keeping the current path — _Check:_ e2e switches on the product page and stays on it.
- [ ] **M2.5** Move existing hard-coded strings into the dictionaries — _Check:_ grep finds no English UI text in components.
- [ ] **M2.6** Shell pass at 360px: header, bottom bar, safe area — _Check:_ Playwright screenshot at 360×800 in en and ar, no horizontal scroll.

## M3. Data model and import

- [ ] **M3.1** `db/schema.ts` with every table in ARCHITECTURE.md §5 and its CHECK constraints — _Check:_ the migration applies to an empty DB.
- [ ] **M3.2** Constraint tests: active + price 0 fails, stock −1 fails — _Check:_ `*.test.ts` passes.
- [ ] **M3.3** `scripts/import-catalog.ts`: 54 products and 112 photos copied to `uploads/`, all drafts. It refuses to run on prod without `--force` — _Check:_ the counts match.
- [ ] **M3.4** Seed settings, branches and zones with placeholders — _Check:_ the admin shows them (after M8).

## M4. Auth, roles and audit

- [ ] **M4.1** better-auth with email+password and TOTP 2FA; `user.role` — _Check:_ login works and 2FA is enforced.
- [ ] **M4.2** `server/auth.ts` `requireRole()`; admin and dev layouts call it — _Check:_ e2e as a logged-out user gets redirected; a dev opening an owner-only action is blocked.
- [ ] **M4.3** `server/audit.ts` `audit()` — _Check:_ a unit test confirms the audit row is written in the same transaction.
- [ ] **M4.4** Script to create the owner and 2 dev accounts — _Check:_ 3 users exist.

## M5. Storefront on the DB

- [ ] **M5.1** `server/catalog.ts`: `activeProducts`, `productBySlug`, `search` (ILIKE across en/ar names and brand) — _Check:_ unit tests.
- [ ] **M5.2** Home, shop, category and product pages read from the DB through the existing components — _Check:_ e2e shows a product in both languages.
- [ ] **M5.3** Price display: VAT included, sale price with old price, %, and end date. Sold-out sizes shown disabled — _Check:_ e2e.
- [ ] **M5.4** Search page — _Check:_ the Arabic and English query returns the item.
- [ ] **M5.5** The cart keeps working, quantity capped at stock — _Check:_ e2e add-to-bag.

## M6. Checkout and order hub

- [ ] **M6.1** `server/delivery.ts`: zones and pickup branches; the checkout shows the fee before the order is placed — _Check:_ e2e total = subtotal + fee.
- [ ] **M6.2** `placeOrder()` transaction, `lib/order-number.ts`, IP rate limit — _Check:_ a concurrency test on the last unit leaves exactly one success.
- [ ] **M6.3** `/order/[no]/confirmed` with every Art. 37 detail in Arabic and English, a WhatsApp copy link, and the device's order list saved — _Check:_ e2e.
- [ ] **M6.4** `/track` (phone + number) → `/order/[no]` timeline with the address masked — _Check:_ a wrong phone gives 404.
- [ ] **M6.5** Change/cancel inside 7 working days and before shipping (`lib/dates.ts`) — _Check:_ unit tests on working days.
- [ ] **M6.6** `/order/[no]/invoice`, printable, Arabic + English, legal details, VAT line — _Check:_ print preview is one A4 page.
- [ ] **M6.7** `/order/[no]/return` request inside the 14/30-day window — _Check:_ e2e, and an expired order blocks the request.
- [ ] **M6.8** `/my-orders` from the device list — _Check:_ e2e.

## M7. Content and legal pages

- [ ] **M7.1** `/stores` from `branches` — _Check:_ every branch renders with its map link.
- [ ] **M7.2** Policies (returns, shipping, privacy, terms) in en and ar, marked "lawyer review pending" — _Check:_ every page is linked from the footer.
- [ ] **M7.3** `/authenticity`, `/size-guide`, `/help`, `/contact` — _Check:_ the pages render in both languages.
- [ ] **M7.4** `/privacy/request` form that writes `privacy_requests` — _Check:_ e2e.
- [ ] **M7.5** The footer shows the legal details from `settings` — _Check:_ CR and tax number are visible on every page.
- [ ] **M7.6** Localised 404 and error pages — _Check:_ e2e on a bad URL.

## M8. Admin (owner, phone-first PWA)

- [ ] **M8.1** Admin layout with phone navigation, plus `manifest.ts` so it installs as an app — _Check:_ Lighthouse PWA install check passes.
- [ ] **M8.2** Dashboard: orders to confirm, today's orders, low stock — _Check:_ the numbers match the DB.
- [ ] **M8.3** Orders list (status tabs) and detail; `setStatus()` with the machine and restock; a "Confirm on WhatsApp" button behind the `whatsapp_confirm` setting, reusing `lib/whatsapp.ts` — _Check:_ unit tests on transitions; e2e.
- [ ] **M8.4** Product editor: en/ar fields, size×colour grid, camera upload, compare_at + end date, activate — _Check:_ e2e covering create → price → stock → active → visible on the store.
- [ ] **M8.5** Stock page: adjust with a required reason (audited) — _Check:_ an audit row is written.
- [ ] **M8.6** Delivery zones and pickup branches editor — _Check:_ the checkout reflects the change.
- [ ] **M8.7** Returns: approve or reject, restock — _Check:_ stock goes up.
- [ ] **M8.8** Reports: sales per day, best sellers, refusal rate, CSV export — _Check:_ the CSV opens in Excel with Arabic text intact (UTF-8 BOM).
- [ ] **M8.9** Settings (legal details, return days, flags) and the audit log view — _Check:_ an edit appears in the audit log.

## M9. Developer side

- [ ] **M9.1** `/dev` health: DB, last migration, last backup, git SHA; plus `/api/health` — _Check:_ curl returns 200 with JSON.
- [ ] **M9.2** Privacy tool: find by phone → export JSON / anonymise (orders kept) — _Check:_ a unit test confirms personal data is gone and totals remain.
- [ ] **M9.3** Breach log with a 72h countdown — _Check:_ e2e.
- [ ] **M9.4** Developer views of customer data are written to the audit log — _Check:_ an audit row is written.

## M10. SEO and performance

- [ ] **M10.1** `generateMetadata` per language with hreflang; `sitemap.ts` and `robots.ts` — _Check:_ the sitemap lists en and ar URLs.
- [ ] **M10.2** Product and ClothingStore JSON-LD for active products only — _Check:_ Google's Rich Results test passes.
- [ ] **M10.3** Image `sizes` and `priority` checked, AVIF on — _Check:_ Lighthouse mobile ≥ 90 on home, product and checkout.

## M11. Ops and deploy

- [ ] **M11.1** `docker/Dockerfile` (standalone) and the full compose file (app, db, umami, cloudflared); migrations run on start — _Check:_ `docker compose up` gives a working site locally.
- [ ] **M11.2** `scripts/backup.sh` and `restore.sh` (age + rclone to R2), cron nightly — _Check:_ a restore drill into a fresh DB gives the same row counts.
- [ ] **M11.3** Sentry or GlitchTip DSN, UptimeRobot on `/api/health` — _Check:_ a test error shows up; an uptime alert arrives.
- [ ] **M11.4** CI runs e2e against compose — _Check:_ green.
- [ ] **M11.5** Write the server runbook into ARCHITECTURE.md (UPS, auto-start, Tunnel token, weekly disk swap) — _Check:_ a second developer can rebuild from it.

## M12. Launch checklist

- [ ] **M12.1** The owner's answers are in: real prices, sizes and stock, legal numbers, zones — _Check:_ there are no draft products the owner wants live.
- [ ] **M12.2** The lawyer has reviewed the policies; the PDPL permit and transfer permit are filed (COMPLIANCE.md) — _Check:_ filing receipts are recorded.
- [ ] **M12.3** The accountant has confirmed VAT and e-receipt status — _Check:_ the decision is recorded in PROJECT.md.
- [ ] **M12.4** Manual QA on a real Android phone in en and ar, and an accessibility pass (WCAG 2.2 AA) — _Check:_ the checklist is ticked.
- [ ] **M12.5** Domain and Google Business Profile — _Check:_ the site is live on the domain.

## Later phases

These are not broken into points yet. Each gets its points when it starts.

### L1. POS connector

- [ ] After access to the POS repo. POS is the master for stock; online orders are pushed to the POS; a `pos_connected` switch keeps manual mode available.

### L2. In-store till and ETA e-receipts

- [ ] pg-boss queue, a UUID chain per POS, QR on receipts.

### L3. Bosta API

- [ ] Create shipments, webhook, label printing.

### L4. Paymob

- [ ] Hosted checkout plus HMAC webhook.

### L5. Staff role and customer accounts

- [ ] Staff role with its own permissions entry; customer phone-OTP accounts.

### L6. WhatsApp Cloud API and marketing pixels

- [ ] WhatsApp Cloud API, and marketing pixels once the PDPL marketing licence and consent banner are in place.
