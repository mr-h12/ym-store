# D. Y&M STORE redesign: gap research (look, WhatsApp, Egypt trust, bilingual)

Fills the gaps that `fashion-ecommerce-survey.md` and `docs/uiux-notes.md` don't cover. Sources are mostly practitioner
and vendor blogs (no controlled studies were found), so treat them as direction, not proof. I computed the contrast ratios
myself (WCAG 2.x formula).

## 1. Black and gold that reads premium, not cheap
- **The page is white; black is the frame; gold is the jewellery.** Use white `#FFFFFF` for the product grid
  (the photos are already on white), near-black `#0A0A0A` for the header, footer and primary buttons, and gold only for
  the logo, one hairline rule, and active or selected states. Sources warn that black and gold "can quickly look too bling"
  and that gold should be kept to key buttons and links.
  [UKBF thread](https://www.ukbusinessforums.co.uk/threads/colours-for-luxury-website.348217/post-2582663) ·
  [Slider Revolution](https://www.sliderrevolution.com/design/gold-website-design-examples/)
- **Two golds, never `#FFD700`.** Bright gold is 1.4:1 on white and fails WCAG
  ([UW contrast table](https://www.washington.edu/docs/best-practices/uw-specific/uw-colors-contrast-table/)).
  - `--gold: #C9A24D` for use on black: 8.26:1 on `#0A0A0A`, so it passes AA for any text size. Use it for the logo, nav
    underline and the "Same-day Alexandria" strip.
  - `--gold-ink: #8A6A1F` for gold text on white: 5.05:1, so it passes AA. Use it for small labels like "NEW" and the
    brand name above the product title.
  - Flat colour only. No gradients, foil textures or glow; CXL ties a "cheap" feel to clutter and stock imagery more than
    to colour. [CXL](https://cxl.com/blog/optimize-luxury-brand/)
- **Type pairing (Google Fonts, OFL licence):**
  - Display: **Bodoni Moda** (the Vogue-era Didone look) or **Cormorant Garamond**.
  - UI and body: **Jost** (Futura-like) or **Inter**.
  - Recommended: **Bodoni Moda 500 for H1/H2 only + Jost 400/500 for everything else.**
  - Write the brand names on cards in Jost caps, `letter-spacing: .12em`, 11–12px, coloured `--gold-ink`.
  [Made Good Designs](https://madegooddesigns.com/?p=39993) · [Volusion](https://volusion.com/blog/ecommerce-font-pairings-that-look-good-together/)
- **Grid on white-background photos:**
  - Set the card background to `#F5F5F3` (not pure white), so the white packshots read as objects rather than bleeding
    into the page.
  - Use a 3:4 ratio (already in the demo), `object-fit: contain` with 8% padding, and no borders or shadows.
  - Under the image: the brand (gold-ink caps), then the product name (black, 14px), then "Ask for price" in muted grey.
  - Avoid stock or lifestyle filler imagery; CXL says overused photos are what reads as cheap. [CXL](https://cxl.com/blog/optimize-luxury-brand/)

## 2. WhatsApp ordering with no listed prices
- **Use `https://wa.me/20XXXXXXXXXX?text=<encodeURIComponent(msg)>`.** Write the number as digits only, with no `+`,
  leading 0, spaces or dashes. The text lands editable in the chat box and nothing is sent until the customer taps send.
  A click-to-chat link can't be tracked, so log clicks yourself (for example with a `data-` attribute and analytics).
  [Bird](https://bird.com/explained/whatsapp/what-is-a-whatsapp-click-to-chat-link) · [Unipile](https://www.unipile.com/fr/?p=275019)
- **Prefilled message.** Keep it short, since Meta's short links cap prefill at 140 characters. Include the product page
  URL so the owner sees the photo preview:
  `Hi Y&M 👋 Price & sizes for: {Brand} {Product} – size {S/M/L}? {url}`
  An Arabic variant: `السلام عليكم، عايز أعرف سعر {Product} مقاس {size} 🙏 {url}`
- **Button copy.**
  - Product page primary CTA (full width, black, white text, WhatsApp glyph): **"Ask price on WhatsApp"**
  - Subline under it: **"Replies within minutes · 10am–12am"**. Use the store's real hours.
  - Product card: a muted-grey text link **"Ask for price"**. Avoid "Contact us for price" (it reads like B2B) and
    "DM for price" (it reads like a typical Instagram store, ranked 12th in the survey).
  - Vendor guidance says to keep the label clear and short.
  [Magecomp](https://magecomp.com/blog/request-quote-hide-product-prices-shopify.md) · [WISDM](https://wisdmlabs.com/?p=338935)
- **Don't use WhatsApp green with white text:**
  - `#25D366` with white text is 1.98:1 and fails WCAG.
  - Keep the CTA in the brand black and put the green only in the 24px glyph.
  - On the floating button, use a `#0A0A0A` icon on `#25D366` (9.98:1).
- **Floating button (mobile):**
  - Put it bottom-right, 56px, at `right:16px; bottom: calc(16px + env(safe-area-inset-bottom))`.
  - Hide it on the product page, where the sticky CTA already is WhatsApp. Never let it cover the sticky bar or the
    cookie/consent banner.
  - Use only one floating button. Give it `aria-label="Chat on WhatsApp"`.
  [Infobip](https://www.infobip.com/blog/add-whatsapp-button-to-website) · [Go4whatsup](https://www.go4whatsup.com/guides/whatsapp-chat-button-website/) · [GitNexa](https://www.gitnexa.com/blogs/how-to-add-whatsapp-chat-buttons-for-mobile-users)

## 3. Egypt: COD, same-day delivery, governorates, trust
- **Cash on delivery is the default trust signal.** Estimates of COD's share of Egyptian online payments run from 39%
  to 70% depending on the survey. Shoppers pay cash because they distrust entering a card online.
  [Cash Matters](https://www.cashmatters.org/blog/39-of-consumers-in-egypt-prefer-cash-for-ecommerce-transactions) · [P&S](https://www.psmarketresearch.com/market-analysis/egypt-e-commerce-market) · [eGrow](https://www.egrow.com/en/blog/egypt-cod-ecommerce-2026)
- **Delivery copy.** Egyptian stores state times by region, with Greater Cairo and Alexandria fastest and other
  governorates slower. [Noe shipping page](https://noe.it.com/en/shipping) · [2B delivery page](https://2b.com.eg/en/delivery)
  - Top strip (black, with `--gold` text): **"Same-day delivery in Alexandria · Shipping to all 27 governorates"**
  - Under the product-page CTA, three lines with icons:
    - "Alexandria: same day if you order before {cutoff}"
    - "Other governorates: {2–5} days"
    - "Pay cash or Visa on delivery"
  - Swap in the store's real cutoff and timings. Put the delivery fee in the WhatsApp reply if prices stay off the site.
- **Trust signals worth showing:**
  - "Original brands" with a short note on sourcing. This matters most given the luxury labels the store sells.
  - A physical address in Alexandria with a map link.
  - Instagram @y_m_storee with a follower count and a 6-photo feed strip.
  - A real WhatsApp number shown as text.
  - The exchange policy in one line, e.g. "Exchange within {N} days, tags on".
  - Merchant guides call clear policies "essential for conversion".
  [Shuttle](https://www.shuttleglobal.com/blog/the-most-popular-payment-methods-in-egypt/) · [CartDNA](https://cartdna.com/en/shopify-payment-guide/africa/egypt)
- **Wallets.** InstaPay and Vodafone Cash are widely used. Add their logos next to "Cash · Visa" only if the store
  actually accepts them. [Shuttle](https://www.shuttleglobal.com/blog/the-most-popular-payment-methods-in-egypt/)

## 4. Bilingual: English UI with Arabic touches
- **Scope.** Keep `<html lang="en" dir="ltr">`. Add Arabic in only four places:
  - the address
  - the delivery strip ("توصيل في نفس اليوم داخل إسكندرية")
  - the WhatsApp CTA subline ("اسأل عن السعر")
  - the footer tagline
  A full RTL toggle is already listed as a next step in the survey. Skip it until the store asks for it.
- **Markup.** Wrap each Arabic fragment as `<span lang="ar" dir="rtl">` (or `<p lang="ar" dir="rtl">` for a block). For
  user or unknown-direction strings, such as product names that mix Arabic and Latin, use `<bdi>`.
  [MDN bdi](https://developer.mozilla.org/en-US/Web/HTML/Element/bdi) · [W3C bidi techniques](https://www.w3.org/International/geo/html-tech/tech-bidi.html)
- **Font.** Use **IBM Plex Sans Arabic** (OFL) and scope it with `:lang(ar){font-family:var(--font-ar)}`. Its geometric
  strokes sit well beside Jost. **Cairo** is the alternative if you want a bolder, more geometric Arabic for the strip.
  Load it through `next/font/google` with `subsets:['arabic']` and only weights 400 and 600.
  [Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic) · [Lemonade](https://lemonadedigitalmedia.com/en/free-arabic-fonts-every-designer-needs/)
- **Sizing.** Arabic looks smaller at the same px. Set `:lang(ar){font-size:1.08em; line-height:1.7}` and never
  letter-space Arabic, because tracking breaks the joins between letters.

---

## 5. Chosen direction (2026-11-03): "Gallery White"

The owner saw the black/silver build on a phone and rejected the look and the colours. Two research passes followed
(premium multi-brand menswear stores, and logo/type/hero/FAB/accent handling). The findings, with the caveat that live
pages were blocked and most claims rest on search excerpts:

- None of the best-regarded multi-brand menswear stores (Mr Porter, END., SSENSE, Farfetch, Ounass, Level Shoes, Kith,
  Aimé Leon Dore) uses a black page with silver or gold text. All use a white or off-white page, black type, a light grey
  product tile and at most one accent. "Luxury is signalled by restraint." Black-and-gold reads cheap when overdone.
- Brand name in small bold caps above a regular-weight product name is the standard card pattern on every reference store.
- A glossy 3D JPG logo loses its detail at header size and dates the page; luxury labels flattened their logos for
  screens. Keep the chrome artwork for the favicon, OG image, social posts and the contact banner.
- Full-height dark text heroes on phones push products below the fold. Baymard: 33% of users start by scrolling the
  home page for visual products. Cap the hero at about 40–55svh and show the first products above the fold.
- WhatsApp green `#25D366` with white text is 1.98:1 (fails AA). A floating button must never cover links or sticky
  bars; the old one overlapped "See all" and card corners.
- Dark vs light backgrounds: no reliable evidence that dark converts better; readability research is a wash, and
  white-background supplier packshots glow as bright blocks on dark pages.

Four directions were mocked up with the real photos (Gallery White, Ink & Paper, Night Editorial, Warm Luxe); the
owner chose **A, Gallery White**, a text wordmark instead of the logo image, no floating button, and "Ask price on
WhatsApp" as the only button while a product has no price.

Tokens now in `app/globals.css`: bg `#ffffff`, tile `#f4f4f4`, ink `#111111`, muted `#6e6e6e` (5.1:1 on white,
4.6:1 on the tile), line `#e8e8e8`, sale `#b00020` (7.3:1), no accent (primary actions are black). Type: Inter only,
IBM Plex Sans Arabic for Arabic snippets. The earlier §1 black/metal advice is superseded by this section.
