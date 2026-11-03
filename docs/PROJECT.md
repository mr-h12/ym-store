# Y&M STORE: project memory

This file records what the project is, who it serves, and every decision with the reason behind it.
Check here before changing any behaviour. Items marked **[verify]** need an Egyptian lawyer or accountant.

## What Y&M STORE is

- A shop selling **men's designer clothing**.
- A **sole proprietorship (منشأة فردية)** with **several branches in Alexandria**. The main branch is New Hadara.
- Instagram: **@y_m_storee**.
- The developer builds and runs the system. **The developer is not the owner.** Answers about the business (prices, tax status, delivery, legal numbers) come from the owner through the questionnaire.
- Goal: a real, legal, phone-first online store plus the back-office the shop itself uses. English is the default at `/`; a complete Arabic version is at `/ar`. Cash only for now (cash on delivery or branch pickup).

## The three sides

All three live in one Next.js app.

| Side | Route | Who uses it | What it does |
|---|---|---|---|
| Customer | `app/[lang]/(store)` | Shoppers, mostly on mid-range Android phones | Browse, search, bag, checkout (cash), order hub (track, change/cancel, invoice, return), policies, stores, privacy requests |
| Owner | `app/[lang]/admin` | The owner (1 account, does everything), from the phone as an installable PWA | Orders and status, products, stock, delivery zones and branches, returns, reports, settings, audit log |
| Developer | `app/[lang]/dev` | 2 developer accounts | Health, privacy tool (export/anonymise), breach log, audit of developer access to customer data |

## Decisions log

D-01 to D-20 come from rounds 1-3 (§15 of the plan). D-21 and D-22 come from round 4 (§19). D-23 onwards are the architecture decisions (Part B).

| ID | Decision | Why | Date |
|---|---|---|---|
| D-01 | Sole proprietorship (منشأة فردية) with several shops | PDPL needs a 1-year permit (Art. 37), owner personally responsible, probably no separate DPO [verify]; stock, till and ETA POS registration are per branch; each branch may have its own CR entry [verify] | 2026-11-03 |
| D-02 | Custom full-stack build; Shopify dropped | The owner wants a complete system the shop itself uses, with prices on the site | 2026-11-03 |
| D-03 | English is the default language; Arabic through the language key | Owner's choice. CPL Art. 5 risk is mitigated by a full Arabic version one click away, and Arabic (or bilingual) invoices, receipts, confirmations and policies in any language | 2026-11-03 |
| D-04 | Tax status unknown; e-receipt module is optional and switchable | The developer is not the owner; the question goes to the owner questionnaire | 2026-11-03 |
| D-05 | Optional connection to the existing POS, with manual updates always possible | The shop already has a POS the developer built; a "POS connection: on/off" setting plus manual editing in the admin | 2026-11-03 |
| D-06 | Roles: 1 Owner + 2 Developer accounts; staff later | Two roles now; a small role→permission map in code makes Staff one new entry; 2FA for everyone; developer access to customer data is logged (PDPL) | 2026-11-03 |
| D-07 | Cash only for now (cash on delivery and in store) | No gateway or webhook needed yet; Paymob is a later phase; WhatsApp confirmation before dispatch protects against refusals | 2026-11-03 |
| D-08 | Delivery details unknown; zones and fees editable in the admin | Moved to the owner questionnaire; start from placeholder values | 2026-11-03 |
| D-09 | No customer accounts; past orders still visible | The device stores its order numbers, plus lookup by phone + order number; no login, no OTP | 2026-11-03 |
| D-10 | Full Arabic version with a language key on every page (English default) | `app/[lang]` with `en`/`ar`, `dir="rtl"`, every string translated; key in header and mobile menu, remembered in a cookie, keeps the current page | 2026-11-03 |
| D-11 | Phone-first; must fit phones perfectly | 64-75% of Egyptian web traffic is mobile, 88-91% of it Android (Statcounter 2026); rules in ARCHITECTURE.md | 2026-11-03 |
| D-12 | POS details pending until the developer has repo access | Connector built in a later phase; phase 1 is manual mode; planned direction: POS is stock master, the site pushes online orders to it | 2026-11-03 |
| D-13 | Branches: one combined stock figure online, main branch (New Hadara) fulfils, `/stores` page, branch pickup paid in cash | Follows the recommendation; pickup is a delivery option | 2026-11-03 |
| D-14 | Send the owner questionnaire | Placeholders the owner can edit in the admin until it is answered | 2026-11-03 |
| D-15 | "My orders" without an account, as recommended | Device keeps its order numbers, plus lookup by phone + order number; address partly hidden | 2026-11-03 |
| D-16 | Host on a local server; Frankfurt VPS documented as fallback | Same Docker stack; public access through Cloudflare Tunnel; DB stays in Egypt | 2026-11-03 |
| D-17 | Order confirmation by manual WhatsApp for now, possibly removed later | One "Confirm on WhatsApp" button in the order detail, behind a setting, so it is easy to remove | 2026-11-03 |
| D-18 | Phase 1 scope as proposed | See §18 of the plan, now MODULES.md M0-M12 | 2026-11-03 |
| D-19 | Umami self-hosted; no pixels until the PDPL permit | No non-essential cookies, so no cookie banner in phase 1 | 2026-11-03 |
| D-20 | Import catalog.json + 112 photos as drafts; a product with no price is never shown | Hidden prices are illegal (CPL Arts. 4, 7, 64); `status='active'` requires `price > 0` (DB CHECK) | 2026-11-03 |
| D-21 | Dedicated mini-PC (16GB RAM, SSD, about EGP 15-25k) plus a UPS at the main branch, separate from the POS machine | Keeps the site off the POS machine; UPS covers power cuts | 2026-11-03 |
| D-22 | Off-site backup in two places: nightly encrypted `pg_dump` to Cloudflare R2, plus a weekly external disk kept at another branch; restore drill before launch, then monthly | A local server needs off-site copies; a backup is only trusted once restored | 2026-11-03 |
| D-23 | One monolith Next.js app; customer, admin and dev are route groups | One developer, one shop: no separate API server, monorepo or microservices; Server Actions cover writes | 2026-11-03 |
| D-24 | Layer first, then feature; `app/` holds routing and thin glue only; no `src/` move | Avoids the shared-UI duplication of feature-first; keeps pages thin; no churn | 2026-11-03 |
| D-25 | `server/` is the data access layer: `server-only` in every file, auth check inside each function, minimal DTOs, only place reading `process.env` | Next.js data-security guide: layout or middleware checks alone are not enough; a wrong import becomes a build error | 2026-11-03 |
| D-26 | Native i18n (`app/[lang]`, JSON dictionaries, one `t()`), no i18n library | No extra dependency; move to next-intl only if plurals get messy | 2026-11-03 |
| D-27 | Hand-written validation helpers in `lib/validate.ts`, no schema library | Few inputs (phone, text, int, enum); a few lines beat a dependency | 2026-11-03 |
| D-28 | Images on a local disk volume `uploads/`, served through `next/image` | Fits the local server; Cloudflare caches them at the edge | 2026-11-03 |
| D-29 | Money is integer EGP including VAT | Shown prices must include taxes (CPL Art. 7); integers avoid rounding errors; VAT shown on invoices as `total - total/1.14` [accountant confirms the rate] | 2026-11-03 |
| D-30 | Legal invariants enforced by DB CHECK constraints (active ⇒ price > 0, stock ≥ 0, compare_at ⇒ sale_ends_at) | The database rejects an illegal state whatever code path writes it | 2026-11-03 |
| D-31 | No job queue until e-receipts or Bosta arrive; then pg-boss | YAGNI: nothing in phase 1 needs background jobs | 2026-11-03 |
| D-32 | Merged into D-19 (Umami runs as its own container in the compose stack) | Kept so later IDs stay stable | 2026-11-03 |
| D-33 | Frankfurt (Hetzner) VPS kept as the documented fallback, same compose file | Use if the local server proves unreliable; needs the transfer permit for the DB too | 2026-11-03 |
| D-34 | Static UI demo on Cloudflare Pages from `ym-redesign` (`STATIC_EXPORT=1 npm run build`, output `out/`), with a demo bar and `noindex` | Show the owner the design before the backend exists; free, commercial use allowed, a preview URL per branch, same Cloudflare account as the future Tunnel. Static export stops working once M1 adds the DB, so the demo is frozen on a `demo` branch then | 2026-11-03 |

## Open items

- **POS connector:** sync direction and API wait for access to the POS repo. Phase 1 runs in manual stock mode.
- **Owner questionnaire answers** (`docs/owner-questionnaire-ar.md`): legal name, CR number and office per branch, tax card, VAT status, accountant, branch addresses/hours/phones, email, prices for all 54 products, real sizes and stock, delivery fees and cutoff, pickup branches, return terms, supplier invoices, PDPL filing consent, cameras, domain.
- **Lawyer:** review all policies; file the PDPC permit and the cross-border transfer permit (WhatsApp, Cloudflare and Sentry still transfer data abroad); confirm whether a separate DPO is needed; confirm the CPA-approved returns statement wording.
- **Accountant:** confirm VAT registration and rate, and whether the shop is in an ETA e-receipt phase.
- **[verify] items:**
  - Sole proprietor needs no separate DPO.
  - Each branch may have its own commercial register entry.
  - CPA complaints hotline 19588.
  - Commercial register e-commerce activity code 117.
  - VAT threshold (EGP 500k; some claim 250k).
  - CPA-approved statement of return rights (Art. 18) wording.
  - ETA POS registration for the web case.
  - No processor or sensitive-data licence needed while a gateway tokenises cards.
  - VAT rate of 14% for the invoice VAT line.

## Glossary

| Term | Meaning |
|---|---|
| COD | Cash on delivery. The courier collects cash when the order arrives |
| CPA | Consumer Protection Agency (جهاز حماية المستهلك), enforces Law 181/2018 |
| PDPL | Personal Data Protection Law 151/2020 and its executive regulations (Decree 816/2025) |
| PDPC | Personal Data Protection Centre, which issues the permits and licences (portal.pdpc.gov.eg) |
| DPO | Data protection officer, registered with the PDPC |
| ETA e-receipt | Egyptian Tax Authority electronic receipt for B2C sales; receipts form a hash chain per POS device and carry a QR code |
| AWB | Air waybill: the courier's shipment label and tracking number |
| Zone | A delivery area (governorate) with one fee and a delivery-days range, stored in `zones` |
| Branch pickup | Delivery option where the customer collects the order at a branch and pays cash there |
| Order hub | `/order/[no]`: the customer's page for one order (timeline, change/cancel, invoice, return), opened from `/track` with phone + order number |
| DAL | Data access layer: the `server/` folder, the only code touching the DB, session or secrets |
| Compare-at price | The old price shown crossed out during a sale; must come with a sale end date |

## Where things are

- `docs/ARCHITECTURE.md`: stack, folder structure, data model, core flows, phone-first rules, hosting and backups.
- `docs/MODULES.md`: the build plan with checkable points; status is tracked there.
- `docs/COMPLIANCE.md`: legal must-haves (consumer law, tax, PDPL) with sources and the lawyer/accountant list.
- `docs/owner-questionnaire-ar.md`: the 12 Arabic questions for the owner.
- `research/f-launch-research.md`: the full research report and sources.
