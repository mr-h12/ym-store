# F. Launch research: payments, shipping, stack, SEO, trust, security, the three sides

> Research collected 3 Nov 2026; decisions that followed are in `docs/PROJECT.md`.
> Legal rules (consumer law, PDPL, tax) are in `docs/COMPLIANCE.md` and are not repeated here.

Each fact is tagged **V** (verified on the official or vendor page) or **R** (reported by third parties: blogs,
news, comparison sites). Items marked **[verify]** still need checking with a vendor, lawyer or accountant. Prices are
as found on the research date and change often.

Starting point: Next.js 15.5, React 19, Tailwind v4 on branch `ym-redesign`. 54 real products in `data/catalog.json`,
all priced `0` ("Price on WhatsApp"), placeholder sizes, a localStorage cart, and checkout that ends in a WhatsApp
message. No backend, admin, payments or policies; English only.

---

## 1. Payments (Egypt)

| Option | Fee | Notes |
|---|---|---|
| **Paymob** | **2.75% + EGP 3 per card payment (V)**, no monthly fee (V), weekly settlement (V) | One contract covers cards, Meeza, Apple Pay, Google Pay, wallets (Vodafone Cash and others) and valU/Sympl/Souhoola instalments. Hosted checkout, payment links, webhook, test keys. Hotline 19079 |
| **Kashier** | 2.75% + EGP 3 (vendor snippet) or 2.85% + EGP 3 (R), plus 14% VAT on the fee | **InstaPay QR and Request-to-Pay through its API**. Settles in 3 days (R) |
| Fawry | Quoted per merchant (R: 1.5–2.5%) | Cash codes payable at about 225k outlets; needs reconciliation |
| Geidea / PaySky | Quoted per merchant | Nothing extra for this shop |
| **Cash on delivery** | No gateway fee; courier charges apply (see §2) | 55–70% of Egyptian e-commerce. Fashion refusal rates run 15–35% (R) |

- **Onboarding** for any gateway needs a commercial register, tax card, national ID, a business bank account, and a
  **live site with terms, returns and contact pages**. So the legal pages come first.
- **Recommendation at the time:** start with Paymob payment links sent over WhatsApp (zero code), then Paymob hosted
  checkout plus one HMAC-checked webhook. Keep COD. Ask an InstaPay or wallet deposit from first-time customers outside
  Alexandria, or above an order value the owner sets.
- **Decision D-07: cash only for now** (cash on delivery, branch pickup, in store). No gateway or webhook in phase 1;
  Paymob is later phase L4. WhatsApp confirmation before dispatch is the main protection against refusals.
- The old `storeConfig.payment` text ("cash or Visa") must match what is actually accepted.

## 2. Shipping

- **Bosta** is the only courier found with public rates, API docs, open-package support and official plugins.
  - Default plan, before 14% VAT (V):

    | Zone | EGP |
    |---|---|
    | Alexandria | 102 |
    | Cairo / Giza | 97 |
    | Delta and Canal | 110 |
    | Upper Egypt | 124–140 |
    | Sinai / New Valley | 160 |

  - Returns: Alexandria 92. **Open-package option EGP 7.** Exchange 117. Extra 1% on COD above EGP 2,000. Paid out
    weekly on Wednesdays.
  - API: REST, webhooks with a custom auth header, A6 label PDFs. **No sandbox.**
- Mylerz, J&T, Turbo, Aramex and Sprint exist but publish no rates. Ask for quotes once volume grows.
- **Same day in Alexandria:** no courier offers it inside the city. Use the shop's own rider or a local bike courier,
  who collects cash the same day and can wait while the customer tries pieces on.
- **Cutting refusals:**
  - confirm every order on WhatsApp before dispatch;
  - allow opening the package (EGP 7, much cheaper than a EGP 92 return);
  - make size exchanges cheap;
  - ask a deposit from risky orders;
  - block customers who keep refusing.
- **On the site:** map the 27 governorates to zones, one fee per zone set by the owner. The checkout gets a governorate
  select that adds the fee to the total. A fee of `0` that is never shown breaks the duty to show the full price before
  the order. (Decision: zones and fees are editable in the admin, starting from placeholders; Bosta API is phase L3.)

## 3. Stack, admin and hosting

### 3a. First comparison (before the owner's full-stack brief)

| Option | USD/month | Owner admin | Effort |
|---|---|---|---|
| **A. WhatsApp-first:** current site + prices + orders logged to a Google Sheet or DB | ~1 | Developer edits prices and stock, or a Sheet | Lowest |
| **B. Shopify Basic, headless** (keep this Next.js front-end) | **~$35–45** ($29 billed yearly or $39 monthly, plus hosting) | **Shopify admin and mobile app in Arabic (V)**: products, per-size stock, orders, discounts, invoices | Low. Cart and checkout move to Shopify. Paymob, Kashier, Bosta apps install in one click. COD has no Shopify fee (V). **About 2% extra on third-party gateways (R)** |
| C. Shopify's own theme | $29–39 | Same | Lowest code, but **loses the redesign** |
| D. Wuilt (Egyptian platform) | **Free in Egypt since Apr 2025 (R)** | Arabic, Bosta/Aramex/Mylerz built in | Throws away the design |
| E. Custom: Neon/Supabase + Payload admin inside Next.js | $0–25 | Payload admin, built by us | Medium-high. We own stock, orders, webhooks, security |
| Medusa / Saleor | $29–4,000 | | Overkill |

- **Hosting:** **Vercel Hobby forbids commercial use (V)**; a shop needs Pro at $20/month, or Cloudflare Workers via
  OpenNext at $0–5. Cloudflare has a Cairo point of presence (R). Vercel's nearest region is Frankfurt (`fra1`).
- **Domain:** a `.com` costs about $12/year. `.com.eg` needs a commercial register or trademark plus a local agent and
  costs $40–100+ a year (R). Optional.
- **Messages:**
  - Order emails: Resend free tier (3k/month).
  - WhatsApp Cloud API in Egypt (R, July 2026): **utility $0.0036, marketing $0.0644** per message, plus VAT. Keep the
    free WhatsApp Business app until volume needs automation.
  - SMS is expensive (Twilio $0.40 per segment). Skip it.
- **Images:** 112 JPGs (17 MB). `next/image` with AVIF/WebP, `sizes`, fixed aspect ratio, `priority` only on the first
  row.

### 3b. Custom stack (after the owner asked for a full system the shop itself uses)

| Area | Pick | Why / cost |
|---|---|---|
| Hosting | 1 VPS with **Coolify** (Hetzner Frankfurt, about $6/month), or an Egyptian VPS / Huawei Cloud Cairo (about $30–40/month) | Same Docker stack either way |
| DB | **Postgres 17**, nightly `pg_dump` to R2 (or Neon Frankfurt for managed point-in-time restore) | $0 |
| ORM | **Drizzle** | Small, SQL-first, plain migrations |
| Auth | **Better Auth** (admin + phone-number plugins) | Self-hosted; staff roles, customer phone OTP |
| OTP | WhatsApp authentication template (about $0.004), SMS fallback (Twilio about $0.40) | Only for login and sensitive order actions |
| Images | **Cloudflare R2** + `next/image` | 10 GB free, no egress fees |
| Jobs | **pg-boss** (lives in Postgres) | E-receipts, Bosta, WhatsApp, emails, backups |
| i18n | Native `app/[lang]` + JSON dictionaries, `dir="rtl"`, `Intl` `ar-EG` | No extra dependency; next-intl only if plurals get messy |
| Email | Resend free (3k/month) | |
| Errors / uptime | Sentry Developer (free) or GlitchTip self-hosted; UptimeRobot / Better Stack (free) | |
| CI | GitHub Actions: `tsc`, lint, unit, Playwright smoke; Dependabot | |
| **Total** | **about $9/month** (Frankfurt) or **about $35–45/month** (Egypt-resident) | Plus card fees if a gateway is added |

### 3c. What was decided
- **Custom build** (D-02); Shopify dropped.
- **Hosting on a local server** at the main branch (D-16, round 4): a dedicated mini-PC (16GB RAM, SSD, about
  EGP 15–25k) with a UPS, Docker Compose, public access through **Cloudflare Tunnel** (no open ports, Cairo edge
  caching). The DB stays in Egypt, which removes the transfer-abroad issue for the DB itself.
- Local-server risks and mitigations: power cuts (UPS, auto-start, `restart: unless-stopped`); ISP outages (site down,
  Cloudflare serves cached pages only; optional second ISP or 4G router); hardware failure (nightly backups,
  `docker compose up` on any machine); physical security (locked place, disk encryption).
- **Backups in two places:** nightly encrypted `pg_dump` to Cloudflare R2, plus a weekly external disk at another branch.
  One restore drill before launch, then monthly.
- **Fallback:** the same compose file on a Hetzner Frankfurt VPS (about $9/month), behind Cloudflare. That needs the
  transfer permit for the DB too.
- Images on a local `uploads/` volume rather than R2; no job queue in phase 1 (pg-boss arrives with e-receipts or Bosta).

## 4. SEO, marketing and analytics

- **Bilingual:**
  - `app/[lang]/` with `<html lang dir>` per language; `hreflang` for `ar-EG`, `en-EG` and `x-default`.
  - next-intl, or a hand-rolled middleware plus JSON dictionaries (about 40 lines). Decided: native, no library.
  - Slugs stay in Latin script. Arabic copy in light Egyptian dialect, titles in MSA plus Latin brand names.
- **Structured data:**
  - `Product` + `Offer` (price > 0, EGP, availability).
  - `MerchantReturnPolicy` and `OfferShippingDetails` once, at Organization level.
  - `ClothingStore` with address, map coordinates, hours and `sameAs` links.
  - Never fake ratings.
- **Basics:** `app/sitemap.ts`, `app/robots.ts`, per-product `generateMetadata` with an Open Graph image (what WhatsApp
  and Instagram link previews show), and a **Google Business Profile** for the Alexandria shop, the best return for
  local searches.
- **Google Merchant Center:** Egypt **has no free listings**; Shopping and Performance Max ads are available in EGP. The
  feed needs a price. Counterfeit-policy risk is high for Philipp Plein; start with Nike, which has GTINs.
- **Meta:** Instagram and Facebook shops only link out to the site, and the catalogue needs prices. Pixel **and**
  Conversions API from a route handler with `event_id` deduplication; a `Contact` event on WhatsApp clicks.
  **Click-to-WhatsApp ads** suit this shop.
- **TikTok:** Pixel and Events API work in Egypt. TikTok Shop is not available there.
- **Consent and analytics:** the PDPL makes opt-in the safe choice for pixels. Use cookieless analytics (Vercel
  Analytics, Plausible about $9/month, or Umami $0) and a small Accept / Essential-only banner gating the pixels. Google
  Consent Mode v2 is not required for Egypt. **Decided (D-19): Umami self-hosted, no pixels until the PDPL permit.**

## 5. Trust and conversion (local benchmarks)

| Shop | What it leans on |
|---|---|
| G Store | Numbered authenticity certificate, COD, 30-day returns |
| Sold Attire, The Closet EG | Lifetime authenticity guarantee |
| Pepper's Luxury | Around since 2011, physical shops |
| dstore | "Authorized online reseller" only for brands it really is authorized for |
| Mobaco | Arabic switch in the header |
| Concrete | Home fitting |

**Copy for Y&M:**
- an authenticity statement, plus a numbered authenticity card in the bag;
- the physical shops with a map and hours;
- "open before you pay" (COD);
- a 14-day exchange (the law anyway);
- Alexandria same day, the rest of Egypt in 2–4 days;
- WhatsApp help in the same place on every page;
- fit notes per brand ("Plein runs small");
- real Instagram customer photos (with permission);
- Google reviews.

## 6. Security, accessibility (WCAG 2.2 AA) and operations

- **Security:**
  - Validate every order and webhook route on the server (zod or a hand check; decided: hand-written `lib/validate.ts`).
  - Check the HMAC on Paymob webhooks and Bosta's custom header (when those arrive).
  - Rate-limit the order endpoint.
  - Static CSP and HSTS headers in `next.config` `headers()`.
  - Secrets never in `NEXT_PUBLIC_`.
  - Admin login with 2FA.
- **WCAG 2.2:**
  - Targets at least 24px (we use 44px).
  - Sticky bar, WhatsApp button and any banner must never cover the focused element (2.4.11); use `scroll-padding`.
  - Carousels need buttons as well as swipe (2.5.7).
  - Help in the same place on every page (3.2.6).
  - Don't make customers re-enter data (3.3.7).
- **Operations:**
  - A daily order check, with WhatsApp confirmation before dispatch.
  - Weekly reconciliation of courier cash (and gateway payouts later).
  - Monthly invoice export for the accountant.
  - Order backups.
  - Breach response under 72 hours (PDPL).
  - Update the delivery fee table when courier prices change.

## 7. The three sides: page research

### 7a. Customer side (about 30 screens; MVP = 20)
- **Shopping:** home, `/shop`, category, product, **search (AR/EN)**, bag.
- **Checkout:** guest, phone first, governorate fee, accept-policies box. (Payment: cash only, D-07.)
- **Order confirmed** `/order/[no]/confirmed`: states the 7-working-day change right and links the invoice.
- **Order hub** `/order/[no]`, opened from `/track` with order number + phone: timeline, modify/cancel, invoice
  `/order/[no]/invoice`, return/exchange request `/order/[no]/return` (14/30-day window, size exchange first).
- **Info pages:** size guide per brand, authenticity, stores, policies, FAQ/help, contact (WhatsApp first).
- **Data rights:** `/privacy/request` (see, correct, delete).
- 404/500 in both languages; **language key (عربي / EN) in the header** on every page.
- **Later:** phone-OTP account area, wishlist, back-in-stock alerts per size, verified reviews with fit rating, brand
  pages, lookbook. **Skip:** loyalty, gift cards, live chat (WhatsApp covers it).
- Decided (D-09, D-15): **no customer accounts**; the device keeps its order numbers, plus lookup by phone + number.

**Baymard numbers behind these choices:**
- Forced account creation causes **about 18%** of checkout abandonment, so guest checkout.
  ([cart abandonment](https://baymard.com/blog/reduce-cart-abandonment))
- **83–87%** of apparel sites give too little size information, so a size guide per brand and fit notes.
  ([apparel size information](https://baymard.com/research-articles/apparel-size-information))
- Baymard's order-tracking guideline lists the key details a tracking page must show; this shaped the order hub.
  ([order tracking](https://baymard.com/guidelines/913-key-order-tracking-details))

### 7b. Owner side `/admin` (about 32 pages; MVP = 21)
- Researched roles: Owner, Manager, Cashier, Packer/Rider, plus Developer. **Decided (D-06): 1 Owner + 2 Developer
  accounts**, permissions as a small role map in code so Staff can be added later; 2FA for everyone.
- **MVP pages researched:**
  - login + 2FA (PIN switch at the till);
  - dashboard: today's sales (web vs shop), orders waiting for WhatsApp confirmation, low stock, rider cash outstanding,
    failed e-receipts;
  - orders: status steps New → Confirmed (WhatsApp) → Packed → Shipped → Delivered / Refused / Returned; detail with
    confirm button, rider or Bosta label, invoice print; receipt print in 80 mm and A4;
  - in-store till `/admin/pos` and till sessions (opening float / closing count);
  - products (AR/EN, size×colour grid, SKU/barcode, photos, compare-at price, ETA item code);
  - stock per variant (every adjustment needs a reason), low-stock alerts, barcode labels;
  - customers (COD refusal count, blocklist that forces prepay);
  - returns/exchanges (window enforced, restock);
  - discounts (before/after price, %, end date);
  - delivery zones and fees; rider runs; Bosta shipments; COD reconciliation;
  - reports (sales, best sellers, refusal rate, VAT, CSV); e-receipt log;
  - staff and roles, audit log, store settings, integrations.
- **Later:** stock counts, payouts, home-page content, WhatsApp templates, purchase orders/suppliers.
- **Hardware (if the till is built here):** 80 mm receipt printer (Xprinter XP-Q838L, about EGP 1,600–2,200), label
  printer (XP-235B, about EGP 1,800–3,600), USB barcode scanner. Printing via the browser (`window.print` + 80 mm CSS).
- **One stock record for web and shop**, every movement logged.
- Decided (D-05, D-12): the shop already has a POS the developer built; the connector waits for repo access. Phase 1 is
  **manual stock mode** in the admin; the till and e-receipts are later phases (L1, L2).
- **ETA e-receipt** (if the shop is in a phase): per-device registration and OAuth token, SHA-256 UUID chain per device
  so receipts go in order through a queue, QR `{url}#Total:..,IssuerRIN:..`, sent within 24 hours, returns reference the
  original UUID, fines up to EGP 50k per violation. Build it ourselves rather than run Odoo. Details in `docs/COMPLIANCE.md`.

### 7c. Developer side `/dev` (role `dev`)
- **MVP:** health page (DB ping, last webhook per provider, queue depth, env vars, git SHA, latest migration, last
  backup); webhook inspector + replay (`webhook_events` with raw body, HMAC result, status; idempotent handlers); job
  list with retry; audit-log viewer; **privacy tool** (find by phone, export JSON, anonymise while keeping orders and tax
  records); **breach log** with a 72-hour countdown; seed script that refuses to run against production.
- **External:** Sentry/GlitchTip, uptime monitor on `/api/health`, GitHub Actions CI, Dependabot.
- **Later:** staging with test keys; feature flags as a `settings` table, not a paid service.
- Phase 1 keeps only what applies without a gateway or queue: health, privacy tool, breach log, dev-access audit.

## 8. Mobile in Egypt

Statcounter, 2026: **64–75% of Egyptian web traffic is mobile, and 88–91% of mobile is Android**
([Statcounter](https://gs.statcounter.com/os-market-share/mobile/egypt)). Design for a mid-range Android first.

Rules that follow (decided, D-11):
- Baseline width **360px**; also test 390, 412, 768, 1280. No horizontal scroll in LTR or RTL.
- Main action in a sticky bottom bar with `env(safe-area-inset-bottom)`; language key and bag in the header; filters as
  a bottom sheet; touch targets at least 44px.
- Speed budget on 4G mid-range Android: LCP under 2.5s, INP under 200ms, CLS under 0.1; first-load JS under about 150KB
  gzipped; AVIF/WebP via `next/image` with correct `sizes`; no carousel libraries (CSS scroll-snap).
- Forms: 16px inputs; `inputmode="tel"` for 01x xxxx xxxx with `autocomplete` and `enterkeyhint`; address as
  governorate → area → street/building/floor → landmark.
- RTL: logical CSS only; mirror arrows, not logos or photos; numbers and prices stay LTR; IBM Plex Sans Arabic at 1.08em,
  no letter-spacing.
- Admin on the phone too: installable PWA (no offline mode), tables become cards below 640px, photo upload straight from
  the camera.
- Checks: Playwright at 360×800 in `en` and `ar`; Lighthouse mobile at 90+ on home, product, checkout; one real Android
  phone before launch.

---

## Sources

**Law and regulators**
- [Law 181/2018 + Executive Regulations (Andersen EN)](https://eg.andersen.com/wp-content/uploads/2025/07/Law-No.-181-of-2018.pdf)
- [Law 181 Arabic text (eecourts)](https://elec.eecourts.gov.eg/assets/laws/16%20-%20%D9%82%D8%A7%D9%86%D9%88%D9%86%20%D8%AD%D9%85%D8%A7%D9%8A%D8%A9%20%D8%A7%D9%84%D9%85%D8%B3%D8%AA%D9%87%D9%84%D9%83.pdf)
- [Shalakany on the Consumer Protection ERs](https://shalakany.com/the-executive-regulations-of-the-consumer-protection-law-no-181-of-2018/)
- [Elwatan: Facebook pages referred to prosecution](https://www.elwatannews.com/news/details/4925434)
- [Youm7 Feb 2026, price display fine](https://www.youm7.com/story/2026/2/1/%D8%B9%D8%AF%D9%85-%D9%88%D8%B6%D8%B9-%D8%A7%D9%84%D8%B3%D8%B9%D8%B1-%D8%B9%D9%84%D9%89-%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC-%D9%8A%D8%B9%D8%B1%D8%B6%D9%83-%D9%84%D8%BA%D8%B1%D8%A7%D9%85%D8%A9-%D8%AA%D8%B5%D9%84-%D9%84%D9%80500-%D8%A3%D9%84%D9%81/7285680)
- [Youm7 Oct 2026, CPA sale rules](https://www.youm7.com/story/2026/10/27/%D8%AA%D8%AE%D9%81%D9%8A%D8%B6%D8%A7%D8%AA-%D8%A7%D9%84%D8%AC%D9%85%D8%B9%D8%A9-%D8%A7%D9%84%D8%A8%D9%8A%D8%B6%D8%A7%D8%A1-%D9%84%D8%B9%D8%A7%D9%85-2026-%D8%AA%D8%AD%D8%AA-%D9%85%D8%AC%D9%87%D8%B1-%D8%A7%D9%84%D8%A3%D8%AC%D9%87%D8%B2%D8%A9-%D8%A7%D9%84%D8%B1%D9%82%D8%A7%D8%A8%D9%8A%D8%A9-%D8%AD%D9%85%D8%A7%D9%8A%D8%A9/7595400)
- [Parlmany: distance contracts](https://www.parlmany.com/News/7/536633/)
- [Elwatan: returns rights](https://www.elwatannews.com/news/details/8378329)
- [Nilex: consumer protection for online stores](https://nilexdigitalsystems.com/articles/consumer-protection-law-egypt-online-stores)
- [Arqam: 2026 online-store requirements](https://www.arqamweb.com/ar/)
- [Chambers Advertising 2025 (Egypt)](https://chambers.com/downloads/gpg/1012/007_egypt.pdf)

**Data protection (PDPL)**
- [CMS](https://cms.law/en/int/legal-updates/egypt-s-pdpl-executive-regulations-issued-one-year-compliance-countdown-begins)
- [Shalakany PDPL ERs](https://shalakany.com/wp-content/uploads/2025/12/New-Executive-Regulations-for-Egypts-Personal-Data-Protection-Law-.pdf)
- [Baker McKenzie Jan 2026](https://www.bakermckenzie.com/-/media/files/insight/publications/2026/01/egypt_important-data-protection-update.pdf)
- [Clyde & Co](https://www.clydeco.com/en/insights/2026/01/egypt-regulatory-update-on-data-privacy)
- [Riad & Riad](https://riad-riad.com/egypts-pdpl-grace-period-ends-1-november-2026-is-your-business-licensed/)
- [SOG checklist](https://sog.eg/en/blog/egypt-pdpl-website-compliance-checklist)
- [PDPC privacy-notice guideline](https://pdpc.gov.eg/assets/pdf-data/Guidelines/Privacy%20Notice.pdf)
- [PDPC DPO guideline](https://pdpc.gov.eg/assets/pdf-data/Guidelines/DPO.pdf)
- [PDPC consent guideline](https://pdpc.gov.eg/assets/pdf-data/Guidelines/DSConsent.pdf)
- [Decree 816/2025 text](https://alhasswalawfirm.com/law-library/decree-816-2025)
- [Law 151 EN](https://www.acc.com/sites/default/files/program-materials/upload/Data%20Protection%20Law%20-%20Egypt%20-%20EN%20-%20MBH.PDF)
- [Kooch portal guide](https://kooch.co/en/post/egypt-pdpl-licensing-portal-october-2026)
- [Amereller](https://amereller.com/publication/the-egyptian-personal-data-protection-regime-what-you-need-to-know-ahead-of-31-october-2026/)

**Tax**
- [ETA VAT FAQ](https://eta.gov.eg/ar/node/1379)
- [ETA decision 281/2025](https://www.eta.gov.eg/ar/news/sdwr-qrar-rqm-281-lsnt-2025-alkhas-balmrhlt-alfryt-althanyt-mn-almrhlt-alryysyt-althamnt)
- [Daily News Egypt, Mar 2026 (simplified regime needs e-receipts)](https://www.dailynewsegypt.com/2026/03/08/e-invoice-e-receipt-compliance-required-to-benefit-from-simplified-tax-system-eta-head/)
- [Amereller on Law 6/2025](https://amereller.com/publication/egypt-law-no-6-of-2025-granting-incentives-and-tax-benefits-for-smes/)
- [Sovos e-receipt phases](https://sovos.com/regulatory-updates/global-vat/egypt-tax-authority-extends-e-receipt-obligations-for-b2c-transactions/)
- [ETA e-receipt API](https://sdk.invoicing.eta.gov.eg/ereceiptapi/)
- [ETA e-receipt FAQ](https://sdk.invoicing.eta.gov.eg/receiptissuancefaq/)
- [Wafeq e-receipt guide](https://www.wafeq.com/en-eg/tax-and-reporting/e-receipt-system)
- [KPMG on e-receipts](https://kpmg.com/us/en/taxnewsflash/news/2025/07/tnf-egypt-new-taxpayers-required-to-comply-with-mandate-to-issue-electronic-receipts-for-b2c-transactions.html)

**Trademark and domains**
- [Mondaq trademark infringement](https://www.mondaq.com/trademark/1477738/trademark-infringement-in-egypt-legal-remedies-and-enforcement)
- [Domain.EG](https://domain.eg/locale/en)

**Payments**
- [Paymob pricing](https://paymob.com/en/pricing)
- [Paymob developer docs](https://developers.paymob.com/paymob-docs/developers)
- [Kashier pricing](https://www.kashier.io/pricing)
- [Kashier InstaPay](https://developers.kashier.io/docs/accept-payments/instapay)
- [Fawry checkout](https://developer.fawrystaging.com/docs/express-checkout/checkout-integration-overview)
- [Geidea pay-by-link](https://geidea.net/egypt/en/online-selling/pay-by-link)
- [Digitology payment gateway guide](https://digitology.co/payment-gateway-egypt/)
- [Kerolos gateway comparison](https://www.kerolosxgad.com/writing/payment-gateways-egypt-comparison)
- [CBE licensing (Matouk Bassiouny)](https://matoukbassiouny.com/egypts-central-bank-issues-the-licensing-framework-for-psos-and-psps/)

**Shipping**
- [Bosta rate plan](https://tracking.bosta.co/pricings/default-plan)
- [Bosta API](https://docs.bosta.co/docs/how-to/create-your-first-delivery/)
- [Bosta webhooks](https://docs.bosta.co/docs/how-to/get-delivery-status-via-webhook/)
- [Mylerz plugin](https://wordpress.org/plugins/mylerz/)
- [J&T Egypt app](https://apps.shopify.com/j-t-egypt-1)
- [Turbo](https://turbo.info/en/about)
- [COD refusal rates (buy.com.eg)](https://buy.com.eg/en/blog/cod-in-egypt)
- [EasySell COD guide](https://easysellapp.com/blogs/wiki/egypt-ecommerce-cod-market-entry-shopify-2026)

**Stack and hosting**
- [Vercel fair use](https://vercel.com/docs/limits/fair-use-guidelines)
- [Vercel pricing](https://vercel.com/pricing)
- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/)
- [Cloudflare Cairo](https://blog.cloudflare.com/cairo)
- [Shopify languages](https://help.shopify.com/en/manual/your-account/languages)
- [Shopify manual payments](https://help.shopify.com/manual/payments/manual-payments)
- [Paymob Shopify app](https://apps.shopify.com/paymob-accept-card-alpha)
- [Kashier Shopify plugin](https://developers.kashier.io/docs/plugins/shopify)
- [Medusa pricing](https://docs.medusajs.com/cloud/pricing)
- [Supabase pricing](https://supabase.com/pricing)
- [Neon pricing](https://neon.com/pricing)
- [Neon regions](https://neon.com/docs/introduction/regions)
- [Huawei Cloud Cairo](https://datacentremagazine.com/articles/huawei-cloud-expands-global-footprint-with-new-cairo-region)
- [Hetzner 2026 prices](https://findstack.com/resources/hetzner-price-increase-2026)
- [R2 pricing](https://upstash.com/kb/cloudflare-r2-pricing-in-2026-storage-operations-and-real-monthly-bills)
- [Better Auth phone number](https://better-auth.com/docs/plugins/phone-number)
- [Drizzle vs Prisma](https://makerkit.dev/blog/tutorials/drizzle-vs-prisma)
- [Wuilt free in Egypt](https://www.wamda.com/2025/08/wuilt-raises-2-million-expand-free-website-builder-mena)
- [Resend pricing](https://resend.com/pricing)
- [Twilio Egypt SMS](https://www.twilio.com/en-us/sms/pricing/eg)
- [WhatsApp API pricing](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing)
- [ChatMaxima Egypt rates](https://chatmaxima.com/whatsapp-api-pricing/egypt/)

**SEO and marketing**
- [Google merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- [Google product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)
- [Free listings countries](https://support.google.com/merchants/answer/13692890)
- [Merchant Center currencies](https://support.google.com/merchants/answer/160637)
- [Counterfeit policy](https://support.google.com/merchants/answer/6149993)
- [next-intl middleware](https://next-intl.dev/docs/routing/middleware)
- [Next.js 15 CSP guide](https://nextjs.org/docs/15/app/guides/content-security-policy)
- [Meta CAPI dedupe](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)

**UX research and mobile**
- [Baymard: cart abandonment](https://baymard.com/blog/reduce-cart-abandonment)
- [Baymard: order tracking](https://baymard.com/guidelines/913-key-order-tracking-details)
- [Baymard: apparel size information](https://baymard.com/research-articles/apparel-size-information)
- [Statcounter: mobile OS share, Egypt](https://gs.statcounter.com/os-market-share/mobile/egypt)

**Hardware**
- [Xprinter XP-Q838L](https://eg.pricena.com/en/product/xprinter-xp-q838l-80mm-thermal-receipt-printer-usb-price-in-Egypt-36225532)

**Benchmarks**
- [G Store](https://www.gstoreee.com/)
- [Sold Attire](https://soldattire.com/)
- [The Closet EG](https://eg.theclosetonlineshop.com/)
- [Pepper's Luxury](https://peppersluxury.com/who-we-are)
- [Luxury Brands EG reviews](https://luxurybrandseg.com/pages/reviews)
- [dstore](https://dstoreegypt.com/)
- [Mobaco](https://www.mobaco.com/)
