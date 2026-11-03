# Compliance: the legal rulebook for building and launching Y&M STORE

> **Not legal or tax advice.** This is a developer's summary of research done on 3 Nov 2026. Every item marked
> **[verify]** must be confirmed by an Egyptian lawyer (consumer law, PDPL) or accountant (VAT, e-receipts) before launch.

Laws referred to:
- **CPL**: Consumer Protection Law 181/2018. **ER**: its Executive Regulations.
- **PDPL**: Personal Data Protection Law 151/2020, with Executive Regulations in Decree 816/2025. **PDPC**: the Personal Data Protection Centre.
- **CPA**: the Consumer Protection Agency (جهاز حماية المستهلك).
- **ETA**: the Egyptian Tax Authority.

Decisions referred to (full list in `docs/PROJECT.md`):
- **D-01**: Y&M is a **sole proprietorship (منشأة فردية)** with several branches. The PDPL **permit** path applies, not the company licence.
- **D-03 / D-10**: English is the default language, with a complete Arabic version at `/ar`.
- **D-07**: cash only for now (cash on delivery and in store). No payment gateway yet.
- **D-16**: hosting on a local server in Egypt; the database stays in Egypt.
- **D-19**: Umami (cookieless), no ad pixels until the PDPL permit is granted.
- **D-20**: a product with no price is never shown (DB CHECK).

---

## Top risks (the three things that can get the shop fined today)

1. **Hidden prices are illegal.** "Price on WhatsApp/inbox" breaks the CPL.
   - Art. 4 requires essential product data, especially the price.
   - Art. 7 requires the price to be announced clearly, including taxes.
   - **Art. 64 penalty:** a fine of EGP 10k–500k, or the product's value if that is higher. It doubles on a repeat
     offence (Art. 69), up to about EGP 2m, and the shop can be closed for up to 3 months.
   - The CPA **referred 6 Facebook shops to the public prosecutor (النيابة)** for answering "Inbox" instead of showing a
     price (examples: Polo eg, ADAM Watches).
     ([Elwatan 2020](https://www.elwatannews.com/news/details/4925434),
     [Youm7 Feb 2026](https://www.youm7.com/story/2026/2/1/عدم-وضع-السعر-على-المنتج-يعرضك-لغرامة-تصل-لـ500-ألف/7285680))
   - The same rule covers the Instagram page.
   - **Every product needs a real EGP price, VAT included, before it is shown.** Prices also unlock Google Shopping ads,
     Meta catalogue ads and Product rich results.
2. **Arabic is mandatory (CPL Art. 5; ER Art. 4).** Adverts, product data, invoices and electronic contracts must be in
   Arabic. English can sit alongside it. English plus "Arabic touches" does not comply. Product pages, checkout, policies
   and the order confirmation all need Arabic. Because English is the default (D-03), the mitigation is: every page has a
   full Arabic version one click away, and invoices, receipts, order confirmations and policies are **always Arabic (or
   bilingual)** whatever language is selected.
3. **The PDPL grace period ended on 1 Nov 2026.** The shop needs a PDPC permit (D-01), a cross-border transfer permit
   for anything stored abroad, an Arabic privacy notice, and a marketing licence before any promotional WhatsApp, SMS or
   email. Fines run about EGP 100k–5m. See [Data protection (PDPL)](#data-protection-pdpl).
   ([CMS](https://cms.law/en/int/legal-updates/egypt-s-pdpl-executive-regulations-issued-one-year-compliance-countdown-begins),
   [Riad & Riad](https://riad-riad.com/egypts-pdpl-grace-period-ends-1-november-2026-is-your-business-licensed/),
   [SOG](https://sog.eg/en/blog/egypt-pdpl-website-compliance-checklist))

---

## 1a. On every page (footer), in Arabic and English (CPL Arts. 5, 37; ER Arts. 9, 14)
- Legal name and trade name (Y&M STORE).
- **Commercial register number (رقم السجل التجاري) and the office that issued it**, and the **tax card number (رقم
  البطاقة الضريبية)**. Add the VAT number if registered. Each branch may have its own commercial register entry [verify].
- Full address, phones, WhatsApp, **email** and opening hours.
- Links to every policy page, plus a CPA complaints line (hotline 19588 [verify]).

## 1b. On every product page and the cart (CPL Arts. 4, 7, 37)
- **Price in EGP including VAT (14% [verify with the accountant])**, plus the delivery fee before the order is placed.
  Show the total before the order button.
- Essential product data: brand, material, country of origin where known, real sizes and real stock.
- Delivery time and place, and the return/withdrawal rules (a link plus a one-line summary).
- Sale rules: see [Sales and discounts](#sales-and-discounts).
- Authenticity rules: see [Counterfeit and authenticity](#counterfeit-and-authenticity).

## 1c. Checkout and after the order (CPL Arts. 37, 38, 10, 40)
- **Before the customer confirms (Art. 37):** seller identity, total with VAT and delivery, delivery date, and
  withdrawal rights.
- **Immediately after:** a saveable written confirmation (page, email or WhatsApp) that repeats those details.
- **The customer can change or correct the order within 7 working days (Art. 38).** Egypt's weekend is Friday and
  Saturday; public holidays do not count [verify the holiday list each year].
- **An invoice for every sale (Art. 10)**, at no charge, in Arabic. It must show:
  - commercial register number, tax ID, date and invoice number;
  - items and the total with VAT;
  - warranty and return periods;
  - how to reach the CPA.
- **Late delivery (Art. 40):** if no date was agreed and delivery takes more than 30 days, the customer may cancel and
  gets a full refund including shipping.
- **Keep a record of every transaction.** Orders must be stored in the database, not only in WhatsApp chats.

## 1d. Required policy pages (Arabic first, English mirror)
| Page | Must say |
|---|---|
| **Returns and exchange** (سياسة الاستبدال والاسترجاع) | 14 days from receipt with no reason needed (Arts. 17, 40). 30 days for defects (Art. 21). **Refund within 7 days of the return, by the original payment method** (cash for now, D-07). Who pays return shipping. Exclusions: worn or altered items, and opened underwear. Art. 18 requires a **CPA-approved statement** of these rights, shown prominently [verify the wording with the CPA] |
| **Shipping and delivery** | Fee per governorate, times (Alexandria same day, others N days), the 30-day maximum, inspection on delivery, branch pickup |
| **Privacy notice** (PDPL) | Controller identity and contact, DPO contact if any, what is collected and why, legal basis, recipients (courier, hosting), **transfers abroad**, retention periods, rights (access, correction, erasure, objection), security, how to complain to the PDPC. Arabic, plain, linked at every form |
| **Cookies** | Analytics and ad pixels stay off until the visitor opts in. Phase 1 uses cookieless Umami and no pixels, so no banner is needed yet (D-19) |
| **Terms of sale** | Seller identity, how an order is formed, prices, payment methods (cash only, D-07), delivery, withdrawal, complaints, governing law |
| **Authenticity** | Where the stock comes from, and that supplier invoices exist. No brand logos used as your own branding |

All policy pages ship marked "draft, lawyer review pending" until the lawyer signs them off.

## 1e. Off-site registrations needed before launch
- **Commercial register** with e-commerce activity (code 117 per [Arqam 2026](https://www.arqamweb.com/ar/)) [verify],
  **tax card**, and a bank account in the business name. Payment gateways require all of these when they are added later.
- **VAT and tax regime:** see [Tax](#tax).
- **PDPC:** permit, cross-border transfer permit, marketing licence. A lawyer files these. See [PDPL](#data-protection-pdpl).
- **Trademark:** register "Y&M STORE" with the Egyptian trademark office.

---

## Sales and discounts
CPA rules for Black Friday 2026 ([Youm7 Oct 2026](https://www.youm7.com/story/2026/10/27/تخفيضات-الجمعة-البيضاء-لعام-2026-تحت-مجهر-الأجهزة-الرقابية-حماية/7595400)):
- Show the **old price, the new price, the true discount % and the end date**.
- Fake discounts are fined up to **EGP 2m or twice the product's value**.

## Counterfeit and authenticity
- Never use "replica", "mirror", "high copy" or similar words anywhere (site, ads, social).
- Do not claim to be an "authorized dealer" or "official reseller" of a brand unless the shop really is.
- **Keep supplier invoices for every item sold.** Trademark Law 82/2002 Art. 113 and the misleading-advert rules apply.
  ([Mondaq](https://www.mondaq.com/trademark/1477738/trademark-infringement-in-egypt-legal-remedies-and-enforcement))
- Google Merchant Center's counterfeit policy is strict for some brands (high risk for Philipp Plein); start ads with
  brands that have GTINs, such as Nike. ([Google counterfeit policy](https://support.google.com/merchants/answer/6149993))

---

## Tax
All of this is for the accountant to confirm. Tax status is unknown today (D-04) and is in the owner questionnaire.
- **VAT:** registration is mandatory above **EGP 500k turnover a year**. Some sources claim 250k [verify]. A designer
  clothing shop with several branches is probably already over it. ([ETA VAT FAQ](https://eta.gov.eg/ar/node/1379))
- **Rate:** 14% [verify]. Money in the app is integer EGP including VAT; the invoice shows VAT as `total − total/1.14`.
- **Simplified regime (Law 6/2025):** for turnover under EGP 20m, tax is 0.4–1.5% of turnover. **Staying in it requires
  issuing e-receipts** (ETA statement, March 2026).
  ([Amereller on Law 6/2025](https://amereller.com/publication/egypt-law-no-6-of-2025-granting-incentives-and-tax-benefits-for-smes/),
  [Daily News Egypt](https://www.dailynewsegypt.com/2026/03/08/e-invoice-e-receipt-compliance-required-to-benefit-from-simplified-tax-system-eta-head/))
- **E-receipts (B2C):** check whether the shop's tax registration number is listed in an ETA phase decision. The latest
  are 281/2025 and 361/2025.
  ([ETA decision 281/2025](https://www.eta.gov.eg/ar/news/sdwr-qrar-rqm-281-lsnt-2025-alkhas-balmrhlt-alfryt-althanyt-mn-almrhlt-alryysyt-althamnt),
  [Sovos](https://sovos.com/regulatory-updates/global-vat/egypt-tax-authority-extends-e-receipt-obligations-for-b2c-transactions/),
  [KPMG](https://kpmg.com/us/en/taxnewsflash/news/2025/07/tnf-egypt-new-taxpayers-required-to-comply-with-mandate-to-issue-electronic-receipts-for-b2c-transactions.html))
- Fines for e-receipt violations go up to **EGP 50k per violation**.

### ETA e-receipt: technical summary (later phase L2, only if the shop is in a phase)
- Register POS devices on the ETA portal, per branch (D-01), plus one for "Web" [verify that the web case needs its own device].
- Each device gets an OAuth token using its POS headers.
- Each receipt UUID is a SHA-256 that includes the previous receipt's UUID, so receipts form a **chain per device** and
  must be issued in order (a job queue, pg-boss).
- QR format `{url}#Total:..,IssuerRIN:..`. Send within 24 hours. Returns reference the original UUID.
- Build it in the app rather than run Odoo next to the site.
- ([ETA e-receipt API](https://sdk.invoicing.eta.gov.eg/ereceiptapi/), [FAQ](https://sdk.invoicing.eta.gov.eg/receiptissuancefaq/),
  [Wafeq guide](https://www.wafeq.com/en-eg/tax-and-reporting/e-receipt-system))

---

## Data protection (PDPL)

### Permit or licence
- **Sole proprietor (Y&M, per D-01): apply for a permit (ER Art. 37).** Valid 1 year, renewed yearly. The owner is
  personally responsible. A separate DPO is probably not needed [verify].
- Company (for reference, if the legal form changes): a 3-year **licence** (ER Art. 35). A DPO must be appointed and
  registered first; registration lasts 2 years, needs the PDPC exam, and is decided within 30 working days.

File on **portal.pdpc.gov.eg**. The PDPC decides within 90 working days, and **no reply counts as a rejection**.

**Fees:** sole-proprietor permits are free up to 25k records (company licences up to 100k). So **likely EGP 0, but the
shop still has to apply.**

### A. Submit to the PDPC
| # | Document | Contents / attachments | Priority |
|---|---|---|---|
| 1 | Controller **permit** (sole proprietor, Art. 37); a **licence** if a company (Art. 35) | National ID + criminal record certificate (or commercial register extract for a company); address; activity; data types and number of records; retention periods; storage method and location; how data is deleted and corrected; consent mechanism; technical infrastructure and security; DPO details (company only); a written undertaking; tax card (expected) | 1 |
| 2 | **Cross-border transfer** permit/licence (Arts. 24/25) | Destination country, recipient, purpose, data and volume, security, storage locations, retention, plus customer consent and a transfer impact assessment. The DB stays in Egypt (D-16), but WhatsApp, Cloudflare and Sentry still move data abroad, so this is still needed | 1 |
| 3 | **DPO registration** (Art. 8) | ID, photo, qualifications, experience, criminal record certificate, PDPC exam pass. Company only; probably not needed for Y&M [verify] | 1 (company) |
| 4 | **Electronic direct marketing** licence (Arts. 29–30) | Opt-in/opt-out process, consent register. Needed before any promotional WhatsApp/SMS/email | 2 |
| 5 | CCTV licence/permit (Art. 31) | Only if shop cameras cover public space. EGP 500/year or EGP 1,000 per 3 years | 3 |
| – | Processor licence / sensitive-data licence | Not needed while the shop takes no card data; when Paymob is added, it tokenises cards [verify] | – |

### B. Keep internally
| # | Document | Priority |
|---|---|---|
| 1 | **Privacy notice AR/EN**: controller (and DPO) contacts, data, purposes, legal basis, recipients (courier, hosting, later Paymob), transfers abroad, retention, rights, how to complain to the PDPC | 1 |
| 2 | **Consent register** (DB table: who, what, when, notice version, withdrawal) + separate unticked consent boxes | 1 |
| 3 | **Cookie banner + cookie notice** (pixels load only after opt-in). Not needed in phase 1 (no non-essential cookies, D-19) | 1 (when pixels come) |
| 4 | **Record of processing** (data map; the PDPC has a template) | 1 |
| 5 | **Breach response plan + breach register** (PDPC within 72 hours; customers within 3 working days after that) | 1 |
| 6 | Transfer impact assessment (for anything abroad) | 1 |
| 7 | DPO appointment letter + published contact (company only) | 1 |
| 8 | Data-subject request procedure + log | 2 |
| 9 | Processing agreements + vendor list (hosting, Bosta, Resend, WhatsApp, Meta, Cloudflare, Sentry; Paymob later) | 2 |
| 10 | Retention schedule (marketing-consent proof: 3 years) | 2 |
| 11 | Information-security policy (access, 2FA, backups, logs) | 2 |
| 12 | Marketing opt-in/out records | 2 (when marketing starts) |
| 13 | Staff confidentiality undertakings + training log; CCTV sign | 3 |

### Penalties (now that the grace period has ended)
The PDPC first orders a fix, then can warn, suspend or publish the violation. In court:

| Violation | Fine |
|---|---|
| Unlawful processing | EGP 100k–1M |
| Controller duties not met | EGP 300k–3M |
| No DPO (where required) | EGP 200k–2M |
| **Unlawful transfer abroad** | **EGP 500k–5M plus prison** |
| Licence/permit breaches | EGP 500k–5M |

The manager is personally liable. A settlement before charges costs half the minimum fine.

### Order of work
1. Confirm the legal form (D-01: sole proprietorship, so the permit path).
2. File the permit.
3. Keep the DB in Egypt (D-16) and file the transfer permit for the services that remain abroad.
4. Publish the privacy notice and consent boxes (and the cookie banner once pixels are planned).
5. Write the data map, breach plan and request procedure.
6. Collect the vendor agreements.
7. File the marketing licence.

### PDPC guidelines and texts
[Privacy notice](https://pdpc.gov.eg/assets/pdf-data/Guidelines/Privacy%20Notice.pdf) ·
[DPO](https://pdpc.gov.eg/assets/pdf-data/Guidelines/DPO.pdf) ·
[Consent](https://pdpc.gov.eg/assets/pdf-data/Guidelines/DSConsent.pdf) ·
[Decree 816/2025 text](https://alhasswalawfirm.com/law-library/decree-816-2025) ·
[Law 151 EN](https://www.acc.com/sites/default/files/program-materials/upload/Data%20Protection%20Law%20-%20Egypt%20-%20EN%20-%20MBH.PDF) ·
[Kooch portal guide](https://kooch.co/en/post/egypt-pdpl-licensing-portal-october-2026)

---

## Developer obligations in code
Each legal rule has one place in the code that enforces it. Locations follow `docs/ARCHITECTURE.md`; the module that
builds each one is in `docs/MODULES.md`. Never weaken these.

| Rule | Source | Where the code enforces it | Module |
|---|---|---|---|
| No product shown without a price | CPL Arts. 4, 7, 64 | `CHECK (status <> 'active' OR price > 0)` on `products` in `db/schema.ts`; storefront reads only through `activeProducts()` in `server/catalog.ts` | M3, M5 |
| Imported catalogue starts hidden | CPL Art. 7 | `scripts/import-catalog.ts` inserts every product as `draft` | M3 |
| Shown price includes VAT | CPL Art. 7 | Money is integer EGP incl. VAT; `formatPrice` in `lib/format.ts`; no "ex VAT" price anywhere | M5 |
| Delivery fee and total shown before the order | CPL Art. 37 | `server/delivery.ts` zones; checkout shows subtotal + fee = total before the button | M6 |
| Price is never trusted from the client | CPL Art. 7 (charged = shown) | `placeOrder()` in `server/orders.ts` re-reads prices from the DB | M6 |
| No overselling (real stock) | CPL Art. 4 | `CHECK (stock >= 0)` on `variants`; stock decremented inside the `placeOrder()` transaction | M3, M6 |
| Sale shows old/new price, %, end date | CPA sale rules | `CHECK (compare_at IS NULL OR sale_ends_at IS NOT NULL)`; product card and page render all four | M3, M5 |
| Seller legal details on every page | CPL Arts. 5, 37; ER 9, 14 | Footer reads legal name, CR no. + office, tax no., VAT no., email, hours from `settings` / `branches` | M7 |
| Arabic always available; legal documents always Arabic | CPL Art. 5; ER Art. 4 | `dictionaries/ar.json` with a unit test that fails when keys differ from `en.json`; invoice, confirmation and policies render Arabic regardless of `lang` | M2, M6, M7 |
| Art. 37 details before and after the order | CPL Arts. 37, 38 | Checkout summary and `/order/[no]/confirmed` (seller, total, delivery date, withdrawal rights, WhatsApp copy) | M6 |
| Change/cancel within 7 working days | CPL Art. 38 | `addWorkingDays()` in `lib/dates.ts` (Fri/Sat weekend, holidays from `settings`), with unit tests | M6 |
| Return window 14 days, defects 30 days, refund 7 days | CPL Arts. 17, 21, 40 | `return_days`, `defect_days`, `refund_days` in `settings`; `/order/[no]/return` blocks expired orders | M6 |
| Invoice for every sale | CPL Art. 10 | `/order/[no]/invoice`: Arabic + English, CR/tax no., date, number, items, VAT line, return periods, CPA contact | M6 |
| Late delivery over 30 days can be cancelled | CPL Art. 40 | Zone `days_max` shown at checkout; owner can cancel with full refund incl. fee via `setStatus()` | M6, M8 |
| Transaction records kept | CPL | `orders`, `order_items` (price snapshot), `order_events`; anonymisation keeps totals | M3, M9 |
| Terms accepted are recorded | CPL Art. 37 | `orders.terms_version` | M6 |
| Collect only the data needed | PDPL | Order form collects name, phone, address only | M6 |
| Customer order view hides personal data | PDPL | `/track` needs phone + order number; the order DTO masks the address | M6 |
| Developer access to personal data is audited | PDPL | Every `/dev` read of customer data calls `audit()` in `server/audit.ts` | M9 |
| Every admin change is audited | PDPL (security) | `audit()` in the same transaction as each mutation | M4, M8 |
| Access control and 2FA | PDPL (security) | better-auth with TOTP; `requireRole()` inside every admin/dev function in `server/` | M4 |
| Data-subject rights (access, correct, erase) | PDPL | `/privacy/request` writes `privacy_requests`; `/dev` privacy tool exports JSON or anonymises (orders and tax records kept) | M7, M9 |
| Breach reported to PDPC within 72 hours | PDPL | `breaches` table and `/dev` breach log with a 72h countdown | M9 |
| No pixels before consent and permit | PDPL | Umami only (cookieless); no Meta/TikTok/Google tags in the code until the permit and a consent banner exist | M11, L6 |
| No promotional messages before the marketing licence | PDPL Arts. 29–30 | WhatsApp is used only for order confirmation (utility), never marketing | M8, L6 |
| Encrypted off-site backups | PDPL (security) | `scripts/backup.sh`: `pg_dump` + `age` + `rclone` to R2 | M11 |
| No "replica"/"authorized dealer" claims | Trademark Law 82/2002; misleading ads | Copy review in `/authenticity` and product text; no brand logos as site branding | M7 |
| Structured data never fakes ratings | Google policy | Product JSON-LD for active products only, no rating fields without real reviews | M10 |

---

## To-do for owner / lawyer / accountant

**Owner**
- [ ] Real EGP prices including VAT for all 54 products; any item without a price stays hidden.
- [ ] Legal name, commercial register number and issuing office, tax card number, per branch.
- [ ] Business email, branch addresses, phones and hours.
- [ ] Real sizes and stock per item; supplier invoices kept for every brand.
- [ ] Delivery fees per zone, Alexandria same-day cutoff, return-shipping rule.
- [ ] Confirm whether shop cameras cover public space (CCTV permit).
- [ ] Hire a lawyer for the PDPC filings; register the "Y&M STORE" trademark.

**Lawyer**
- [ ] Confirm the PDPL permit path for a sole proprietorship and whether a DPO is needed [verify].
- [ ] File the PDPC permit, cross-border transfer permit, and (before any marketing) the marketing licence.
- [ ] Review and sign off the returns, shipping, privacy, terms and authenticity pages, in Arabic.
- [ ] Get the CPA-approved returns-rights statement wording (Art. 18) [verify].
- [ ] Confirm the CPA hotline (19588) [verify] and the e-commerce activity code on the commercial register [verify].
- [ ] Confirm whether each branch needs its own commercial register entry [verify].
- [ ] Review the breach plan, record of processing and vendor processing agreements.

**Accountant**
- [ ] Confirm VAT registration, the threshold (500k vs 250k) [verify] and the 14% rate.
- [ ] Confirm the regime: standard or simplified (Law 6/2025).
- [ ] Check whether the tax registration number is in an ETA e-receipt phase decision (281/2025, 361/2025), and whether
      the web shop needs its own POS registration [verify].
- [ ] Confirm the invoice layout (fields, VAT line) before launch.
- [ ] Agree a monthly export of invoices and sales.

---

## Legal sources

**Consumer protection and advertising**
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
- [Amereller](https://amereller.com/publication/the-egyptian-personal-data-protection-regime-what-you-need-to-know-ahead-of-31-october-2026/)
- PDPC guidelines and texts: listed under [PDPC guidelines and texts](#pdpc-guidelines-and-texts)

**Tax**
- [ETA VAT FAQ](https://eta.gov.eg/ar/node/1379)
- [ETA decision 281/2025](https://www.eta.gov.eg/ar/news/sdwr-qrar-rqm-281-lsnt-2025-alkhas-balmrhlt-alfryt-althanyt-mn-almrhlt-alryysyt-althamnt)
- [Daily News Egypt, Mar 2026 (simplified regime needs e-receipts)](https://www.dailynewsegypt.com/2026/03/08/e-invoice-e-receipt-compliance-required-to-benefit-from-simplified-tax-system-eta-head/)
- [Amereller on Law 6/2025](https://amereller.com/publication/egypt-law-no-6-of-2025-granting-incentives-and-tax-benefits-for-smes/)
- [Sovos e-receipt phases](https://sovos.com/regulatory-updates/global-vat/egypt-tax-authority-extends-e-receipt-obligations-for-b2c-transactions/)
- [ETA e-receipt API](https://sdk.invoicing.eta.gov.eg/ereceiptapi/) · [ETA FAQ](https://sdk.invoicing.eta.gov.eg/receiptissuancefaq/) · [Wafeq e-receipt guide](https://www.wafeq.com/en-eg/tax-and-reporting/e-receipt-system) · [KPMG on e-receipts](https://kpmg.com/us/en/taxnewsflash/news/2025/07/tnf-egypt-new-taxpayers-required-to-comply-with-mandate-to-issue-electronic-receipts-for-b2c-transactions.html)

**Trademark and domains**
- [Mondaq trademark infringement](https://www.mondaq.com/trademark/1477738/trademark-infringement-in-egypt-legal-remedies-and-enforcement)
- [Domain.EG](https://domain.eg/locale/en)
