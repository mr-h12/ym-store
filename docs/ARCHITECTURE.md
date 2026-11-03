# Y&M STORE: architecture

Decisions behind this file are in `docs/PROJECT.md` (D-23 onwards). The build order is in `docs/MODULES.md`.

## 1. Shape

- **One Next.js 15 app, a monolith.** Customer, admin and dev are route groups in the same app. No separate API server, no monorepo, no microservices.
- **Server Components by default.** `"use client"` only where a component needs state or events (cart, size picker, sheets, forms with live feedback).
- **Writes go through Server Actions**, which call domain functions. Route Handlers are used only for `/api/health`, and later for webhooks and the POS connector.
- **The database is the source of truth.** The cart stays on the device (`CartProvider`, localStorage) until checkout.

## 2. Stack

Fixed list. A new dependency needs the developer's OK.

| Need | Choice |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4 (already in place) |
| DB | PostgreSQL 17 (Docker) |
| DB access | `drizzle-orm` + `drizzle-kit` (migrations), `postgres` driver, `server-only` (DAL boundary) |
| Auth | `better-auth` (email+password, `twoFactor` TOTP plugin; roles `owner`/`dev` on the user) |
| Images | Local disk volume `uploads/`, served through `next/image` (sharp); Cloudflare caches them |
| i18n | Native: `app/[lang]` + `dictionaries/{en,ar}.json` + one `t()` helper, with no i18n library |
| Validation | Small hand-written helpers in `lib/validate.ts` (phone, text, int, enum), with no schema library |
| Tests | Unit tests with `node:test` run by `tsx --test`; e2e with `@playwright/test` at 360×800 en/ar |
| Analytics | Umami (own container, cookieless) |
| Ops | Docker Compose (app, postgres, umami, cloudflared), `pg_dump` + `age` encryption + `rclone` to R2, GitHub Actions |

### Running costs (from the stack research)

| Area | Pick | Cost |
|---|---|---|
| Hosting | Local mini-PC (chosen, see §8); fallback Hetzner Frankfurt VPS | Local: hardware about EGP 15-25k once, plus UPS. Frankfurt: about $6-9/month |
| DB | Postgres 17 on the server, nightly `pg_dump` to R2 | $0 |
| Images | Local disk + `next/image`, cached by Cloudflare | $0 |
| Email (later) | Resend free tier (3k/month) | $0 |
| Errors / uptime | Sentry Developer (free) or GlitchTip self-hosted; UptimeRobot / Better Stack (free) | $0 |
| CI | GitHub Actions: `tsc`, lint, unit tests, Playwright smoke; Dependabot | $0 |
| Jobs (later) | pg-boss, lives in Postgres; added with e-receipts or Bosta | $0 |
| Reference totals from research | about $9/month on a Frankfurt VPS, or about $35-45/month Egypt-resident cloud; plus Paymob fees per card payment once it is added | |

## 3. Folder structure (TARGET)

This is the **target** layout. Folders are created as the modules that need them start; do not scaffold empty folders ahead of time.

Pattern: **layer first, then feature inside each layer**. `app/` holds routing and thin glue only. The existing root layout stays as it is: no `src/` move.

```
app/                                   ROUTING ONLY: pages, layouts, colocated actions/components
  [lang]/                              en (default, at /) | ar (/ar)
    (store)/                           customer side; route group = its own layout, no URL change
      page.tsx  shop/  product/[slug]/  search/  checkout/  track/  my-orders/  stores/
      order/[no]/ (page, confirmed/, invoice/, return/)
      policies/[slug]/  authenticity/  size-guide/  help/  contact/  privacy/request/
      checkout/actions.ts              ← Server Action beside the page that uses it
    admin/                             owner side; layout.tsx calls requireRole('owner')
      _components/                     ← private folder: admin-only UI, not routable
      orders/ (page, [id]/, actions.ts)  products/ (…, actions.ts)  stock/  delivery/
      returns/  reports/  settings/  audit/
    dev/                               developer side; layout.tsx calls requireRole('dev')
      _components/  health/  privacy/  breaches/  audit/
  api/health/route.ts                  Route Handlers only for health, and later webhooks and the POS
  sitemap.ts  robots.ts  manifest.ts
components/                            SHARED UI used by more than one side (existing store components stay)
server/                                DATA ACCESS LAYER: the only code touching the DB or process.env
  env.ts  db.ts  auth.ts  audit.ts                     (each file starts `import "server-only"`)
  catalog.ts  stock.ts  orders.ts  returns.ts  delivery.ts  branches.ts  settings.ts  privacy.ts
db/                                    Drizzle: schema.ts, migrations/
lib/                                   pure, isomorphic: format, money, phone, validate, i18n,
                                       whatsapp (existing), order-number, dates
dictionaries/   en.json  ar.json
content/policies/                      returns|shipping|privacy|terms|authenticity . en|ar .tsx
scripts/        import-catalog.ts  backup.sh  restore.sh  create-users.ts
tests/e2e/                             Playwright; unit tests sit beside code as *.test.ts
docker/         Dockerfile  compose.yml  .env.example
docs/           PROJECT.md  ARCHITECTURE.md  MODULES.md  COMPLIANCE.md  owner-questionnaire-ar.md
public/products/                       existing photos (become seed input; uploads/ volume after import)
```

### Where a new file goes

- Used by one route only → colocate it in that route (`_components/`, `actions.ts`).
- Used by 2+ routes → `components/` (UI) or `lib/` (pure logic).
- Touches the DB, the session or secrets → `server/<domain>.ts`.

### Dependency direction

- `app` → `components`, `server`, `lib`.
- `components` → `lib` (never `server`).
- `server` → `db`, `lib`.
- `lib` → nothing app-specific.

The `server-only` import turns a wrong import into a **build error**, so no lint plugin is needed.

## 4. Why this structure (research, Nov 2026)

- **Official Next.js:**
  - Project structure is unopinionated.
  - Route groups `(name)` add a layout without changing the URL.
  - Private folders `_name` keep colocated files out of routing.
  - Code can live outside `app/`.

  ([project structure](https://nextjs.org/docs/app/getting-started/project-structure), [colocation](https://nextjs.org/docs/app/building-your-application/routing/colocation))
- **Official Next.js data-security guide:** for new projects, use a **Data Access Layer**:
  - `server-only` modules;
  - **authorization checks inside every DAL function** (middleware or layout checks alone are not enough);
  - return **minimal DTOs**;
  - **only the DAL reads `process.env`**.

  ([data security](https://nextjs.org/docs/15/app/guides/data-security), [security blog](https://nextjs.org/docs/security))
- **Community, 2026:** the hybrid "layer first, then feature" avoids the duplication or ownership fights that feature-first causes for shared UI. It suits e-commerce, keeps pages thin, and Server Actions replace internal API routes. ([Bitsmiths](https://bitsmiths.studio/blogs/nextjs-directory-structure), [Groovy Web](https://www.groovyweb.co/blog/nextjs-project-structure-full-stack), [freeCodeCamp](https://www.freecodecamp.org/news/reusable-architecture-for-large-nextjs-applications/), [Achromatic Drizzle kit](https://www.achromatic.dev/docs/starter-kits/pro-nextjs-drizzle/folder-structure))
- **Rejected:**
  - Feature-Sliced Design: too many layers for a 1-dev, 1-shop app.
  - `src/` move: churn with no gain.
  - Repository classes or interfaces: one implementation each, so plain functions win.
  - A separate API server: Server Actions cover it.

## 5. Data model (Drizzle, `db/schema.ts`)

Rules the DB itself enforces:

- `CHECK (status <> 'active' OR price > 0)` on products.
- `CHECK (stock >= 0)` on variants.
- `CHECK (compare_at IS NULL OR sale_ends_at IS NOT NULL)`.
- Unique `order.number` and unique `product.slug`.

Money is **integer EGP including VAT**. VAT is shown on invoices as `total − total/1.14` [the accountant confirms the rate].

| Table | Key columns |
|---|---|
| `products` | slug, brand, category, name_en/ar, desc_en/ar, price, compare_at, sale_ends_at, status (draft/active/archived), timestamps |
| `variants` | product_id, colour_en/ar, colour_hex, size, sku, barcode, stock |
| `product_images` | product_id, colour_en, path, sort, alt_en/ar |
| `branches` | name_en/ar, address_en/ar, map_url, hours_en/ar, phone, pickup, cr_no, cr_office, tax_no |
| `zones` | governorate_en/ar, fee, days_min, days_max, active |
| `orders` | number, name, phone, address fields (governorate, area, street, building, floor, landmark), method (delivery/pickup), zone_id/branch_id, subtotal, fee, total, status, terms_version, lang, created_at |
| `order_items` | order_id, variant_id, product snapshot (name_en/ar, colour, size, unit price), qty |
| `order_events` | order_id, from, to, by_user, note, at |
| `returns` | order_id, items jsonb, kind (exchange/refund/defect), reason, status, created_at |
| `settings` | key, value jsonb (legal name, email, hours, return_days, refund_days, whatsapp, flags such as `whatsapp_confirm`, `pos_connected`) |
| `audit_log` | user_id, action, entity, entity_id, before jsonb, after jsonb, at |
| `privacy_requests` | phone, kind (access/correct/erase), status, notes, created_at, done_at |
| `breaches` | detected_at, summary, records, pdpc_notified_at, users_notified_at, actions |
| better-auth tables | `user.role` ∈ owner, dev |

## 6. Core flows

Each rule has one source of truth.

- **Order status machine:** one map in `server/orders.ts`. `new → confirmed → packed → shipped → delivered`, with the side exits `cancelled` (before shipped), `refused` and `returned`. Every change goes through `setStatus()`, which checks the map, writes `order_events` and audit, and **restocks** on cancelled/refused/returned.
- **Place order:** `placeOrder()` in one transaction:
  1. validate;
  2. re-read the prices from the DB (never trust the client);
  3. decrement stock (the CHECK constraint rejects overselling);
  4. insert the order and items;
  5. return the number.

  Rate-limited per IP.
- **Legal windows:** `lib/dates.ts` holds `addWorkingDays()` (Egypt weekend Fri/Sat; holidays as a list in settings) for the 7-working-day change window, plus the 14/30-day return windows read from settings.
- **Auth guard:** `requireRole(role)` in `server/auth.ts` is called **inside every admin/dev function in `server/`** (the DAL is the security boundary). Layouts call it too, but only for redirects. Customer order reads return a DTO with the address masked.
- **Audit:** `audit(tx, action, entity, before, after)` in `server/audit.ts`, called in the same transaction as the change.
- **i18n:** `getDictionary(lang)` plus `t(dict, key)`. Prices use `Intl.NumberFormat('en-EG'|'ar-EG')` with Western digits. Legal documents (invoice, confirmation, policies) always include Arabic.
- **Visibility rule:** the storefront queries only `status='active'`, in one shared `activeProducts()` query.

## 7. Phone-first design rules (customer site and admin)

Statcounter, 2026: **64-75% of Egyptian web traffic is mobile, and 88-91% of mobile is Android** ([source](https://gs.statcounter.com/os-market-share/mobile/egypt)). Design for a mid-range Android first.

- **Baseline width 360px** (common Android), also tested at 390/412 (iPhone, Pixel) and at 768 and 1280. No horizontal scroll at 360px, in both LTR and RTL.
- **Thumb zone:**
  - the main action sits in a sticky bottom bar (Add to bag / Place order) with `env(safe-area-inset-bottom)`;
  - the language key and bag are in the header;
  - filters open as a bottom sheet;
  - touch targets are at least 44px.
- **Speed budget on 4G mid-range Android:**
  - LCP under 2.5s, INP under 200ms, CLS under 0.1;
  - JavaScript under about 150KB gzipped on first load;
  - images AVIF/WebP via `next/image` with a correct `sizes`, and `priority` only on the first image;
  - no carousel libraries, CSS scroll-snap instead.
- **Forms:**
  - 16px inputs;
  - `inputmode="tel"` for the Egyptian phone format (01x xxxx xxxx), with `autocomplete` and `enterkeyhint`;
  - an address format that suits Egypt: governorate → area → street/building/floor → landmark.
- **RTL:**
  - logical CSS only;
  - mirror arrows, not logos or photos;
  - keep numbers and prices LTR inside RTL text;
  - Arabic font IBM Plex Sans Arabic, 1.08em, no letter-spacing.
- **Admin on the phone too:**
  - the owner runs everything from the phone;
  - the admin is an **installable PWA** (manifest + icon, no offline mode);
  - tables become cards below 640px;
  - product photos upload straight from the camera (`<input type="file" accept="image/*" capture>`).
- **Checks:**
  - Playwright smoke tests at 360×800 in `en` and `ar`;
  - Lighthouse mobile at 90 or above on home, product and checkout;
  - a manual check on one real Android phone before launch.

## 8. Hosting and deploy

### Local server (chosen)

- A **dedicated mini-PC** at the main branch, separate from the POS machine: 16GB RAM, SSD (about EGP 15-25k), plus a **UPS**.
- Docker Compose: `app` (Next standalone), `postgres`, `umami`, `cloudflared`. All services `restart: unless-stopped`.
- Public access through **Cloudflare Tunnel** (`cloudflared`): no open ports, free, and Cloudflare caches images and static pages at its Cairo edge.
- The database stays in Egypt, which removes the transfer-abroad issue for the DB. WhatsApp, Cloudflare and Sentry still need the transfer permit.

### Risks and mitigations

| Risk | Mitigation |
|---|---|
| Power cuts | UPS, auto-start on power-on, containers `restart: unless-stopped` |
| ISP outages | The site goes down (Cloudflare serves cached pages only). A second ISP or a 4G backup router is optional |
| Hardware failure | Nightly backups plus a documented rebuild (`docker compose up`) on any machine |
| Physical security | A locked place and disk encryption |

### Backups

Off-site backup in two places:

- **Nightly:** `scripts/backup.sh` runs `pg_dump` → `age` encryption → Cloudflare R2 via `rclone`.
- **Weekly:** an external disk taken to another branch.
- **Restore drill:** one before launch, then one every month, with `scripts/restore.sh`.

### Fallback: Frankfurt VPS

The same compose file on a Hetzner Frankfurt VPS (about $9/month), behind Cloudflare. Use it if the local server is unreliable. It needs the transfer permit for the DB too.

### CI and deploy

- **CI** (GitHub Actions): `tsc --noEmit`, `eslint`, unit tests, Playwright against compose.
- **Deploy:** `git pull && docker compose up -d --build` on the server, with migrations run on start.

## 9. Server runbook (filled in during M11)

To be written in M11.5. It must let a second developer rebuild the server from this section alone. It will cover:

- UPS setup.
- Auto-start on power-on (machine and containers).
- Cloudflare Tunnel token.
- Weekly disk swap to another branch.
