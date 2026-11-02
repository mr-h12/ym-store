# Product page and checkout UX: fashion e-commerce benchmark

**Purpose:** pick product-page (PDP) and checkout patterns for an **original** clothing-store demo for a small Instagram/WhatsApp-first store in the Middle East, where cash on delivery (COD) is common.
**Date:** 2026-11-02

> **How this was researched.** Everything here comes from web search results. Direct page fetches were blocked in this session: ounass.ae, tabby.ai, baymard.com and ixd.prattsi.org did not resolve. Any claim tagged **[pattern]** is a well-known, long-standing UI convention of that site that I could not re-check live this session. Check it against the live site before you copy any detail. Every other claim has a source link.

---

## 1. Per-site findings

### SSENSE (luxury and streetwear, Canada)
- **Gallery:** large editorial images stacked vertically on desktop, so you scroll to see more. A design critique says *"the user can only see more images upon scrolling down."* On mobile you swipe through a carousel. **[pattern]**
- **Size and fit:** detailed measurements and materials are on the PDP, and the critique praises this. Size is picked from a dropdown. **[pattern]**
- **Checkout:** about 3 screens, *"straightforward checkout,"* with large black buttons making the next step clear. ([Pratt critique 2023](https://ixd.prattsi.org/2023/09/design-critique-ssense/))
- **Complaints:** search is weak, filters are limited, navigation loses your place, bot checks are excessive, and the wishlist/bag sometimes fails ([app reviews](https://justuseapp.com/en/app/1418754101/ssense-shop-designer-fashion/reviews), [FashionBeans](https://www.fashionbeans.com/article/is-ssense-legit)). Most Trustpilot complaints are about returns and refunds ([Trustpilot](https://www.trustpilot.com/review/www.ssense.com?page=9)).
- **Arabic/RTL, COD, BNPL:** none.

### ASOS (fast fashion, UK and global)
- **Gallery:** about 4 to 5 images plus a catwalk video. Swipe on mobile. Shows the model's height and the size they wear. **[pattern]**
- **Size and fit:** **Fit Assistant** (powered by Fit Analytics) sits near the Size dropdown, with a link to the size guide next to the selector ([ASOS help](https://www.asos.com/au/customer-care/product-stock/what-is-fit-assistant), [size guide help](https://www.asos.com/customer-care/product-stock/where-can-i-find-your-size-guide-and-care-instructions/)).
- **Stock:** shows "Low in stock" next to individual sizes in the dropdown. **[pattern]**
- **Delivery and returns:** a short line on the PDP with an expandable info block. **[pattern]**
- **Cart and checkout:** the bag is a full page. Guest checkout exists, but if the email is already registered you are made to log in. Guest orders can't be cancelled, and they don't link to an account created later ([ASOS guest checkout](https://www.asos.com/us/customer-care/technical/can-i-check-out-as-a-guest/)).
- **Payment:** cards, PayPal, and BNPL through Klarna (pay in 3) and Clearpay (4 payments) ([ASOS Klarna](https://www.asos.com/payments-and-deliveries/klarna), [new ways to pay](https://asos.com/payments-and-deliveries/new-ways-to-pay)).
- **Arabic/RTL:** no Arabic site. No COD.

### Net-a-Porter (luxury, YNAP)
- **Gallery:** high-resolution images with zoom, an editorial look, and a note of the size the model is wearing. **[pattern]** Model sizing is often in small print, and critics say this can mislead ([FASHION mag](https://fashionmagazine.com/style/they-saidwe-said-mary-katrantzou-breaks-the-size-barrier-by-creating-a-larger-range-for-net-a-porter/)).
- **Size and fit:** "Size & Fit" notes such as "fits true to size" and "model is 177cm wearing S". YNAP says size and fit are the **main reason for returns**, and it piloted 3D-avatar virtual try-on on Mr Porter ([FashionUnited](https://fashionunited.in/news/fashion/yoox-net-a-porter-launches-virtual-try-on-pilot-for-mr-p/2024022243797)).
- **Returns:** 28 days, tags must be attached ([NAP help, Oman](https://www.net-a-porter.com/en-om/content/help/exchanges-and-returns)). Delivers to GCC with a regional storefront. Arabic support is limited. **[pattern]**

### Nike
- **Gallery:** thumbnail rail plus a large image on desktop, a swipe carousel on mobile, and some product videos. **[pattern]**
- **Size picker:** a **grid of size buttons**, with sold-out sizes greyed and struck through. A "Size Guide" link sits right above the grid. **[pattern]** A third-party UX test scored Nike's size guide 89% overall (Success 93%, Satisfaction 81%) ([Glare/Zurb](https://glare.zurb.com/docs/decision-map/measure/concepts/ecommerce/size-guide)). Nike gets more than 500k size complaints a year, and fit is the top return reason for shoes ([Bloomberg 2019](https://www.bloomberg.com/news/articles/2019-05-09/sick-of-getting-returned-sneakers-nike-tries-a-new-sizing-app)).
- **Cart and checkout:** Baymard benchmarks the account-selection step (guest or sign in) ([Baymard Nike](https://baymard.com/checkout-usability/benchmark/step-type/account/9146-nike)). App reviews complain about forced account creation and payment errors ([Kimola](https://kimola.com/reports/nike-app-feedback-analysis-report-unlock-user-insights-app-store-us-146530)).
- **Region:** Nike sells in the Gulf through regional partners and is not fully Arabic-native. Check the partner site before relying on this.

### Shein (ultra-fast fashion)
- **Gallery:** 6 to 10 or more images plus **customer review photos** on the PDP. **[pattern]**
- **Size and fit:** reviews show the reviewer's height, weight and size ordered, a "true to size / small / large" fit poll, and a size-recommendation tool on some PDPs ([RetailBoss](https://retailboss.co/how-to-accurately-select-shein-sizes)). This is the most useful fit data of any site here.
- **Stock and urgency:** the BEUC complaint (2025) to the EU says Shein uses fake-looking scarcity ("only xx left"), countdown timers, exit pop-ups ("Are you sure you want to leave?") and at least 8 dark-pattern types ([BEUC PDF](https://www.beuc.eu/sites/default/files/publications/BEUC-PR-2025-023_complaint_against_SHEIN_for_dark_patterns_fuelling_over-consumption.pdf), [Euronews](https://www.euronews.com/next/2025/06/05/consumer-groups-lodge-complaint-about-sheins-online-nudging-with-eu-commission), [The Fashion Law](https://www.thefashionlaw.com/shein-dark-patterns-and-the-business-of-overconsumption/)).
- **Region:** has an Arabic/RTL storefront and offers COD in the GCC. **[pattern]**

### Namshi (GCC fashion, now part of noon)
- **Gallery:** swipe carousel. The PDP shows a delivery estimate ("Get it by…") and a returns badge. **[pattern]**
- **Payment:** cards, noon credits, **COD**, and split into 4 with **Tabby or Tamara** ([Namshi KSA](https://www.namshi.com/saudi-en/kavalee/), [Namshi UAE](https://www.namshi.com/uae-en/varessa/), [Tabby x Namshi](https://tabby.ai/en-SA/press/namshi)).
- **Returns:** 14 days, with courier pickup or drop-off ([ClicFlyer guide](https://blog.clicflyer.com/en/how-to-order-from-namshi-ksa-app)).
- **Arabic/RTL:** a full Arabic version (/saudi-ar/), fully mirrored. **[pattern]**
- **Complaints:** exchanges arrive in the wrong size, the size you want to swap to is out of stock, pickups don't happen, and refunds are partial (shipping fee kept) ([Trustpilot](https://ch.trustpilot.com/review/namshi.com), [SmartCustomer](https://www.smartcustomer.com/reviews/namshi.com?page=3)).

### Ounass (GCC luxury, Al Tayer)
- **Delivery:** at launch, under 2 hours in Dubai, same day across the UAE, and 48 hours in the GCC ([Gulf Business](https://gulfbusiness.com/?p=93967)). Later reporting gives an 8pm cut-off and AED 50 express, free over AED 500 ([Grazia ME](https://graziamagazine.com/me/articles/8-same-day-delivery-fashion-retailers-dubai/)).
- **Service:** in-home styling, and 30-day returns according to third-party sources. **COD** is listed by coupon and affiliate sites ([Gulf News coupons](https://coupons.gulfnews.com/stores/ounass-uae)). Tabby is offered. **[pattern]**
- **Arabic/RTL:** full Arabic storefront. The PDP has editorial copy, "Size & Fit", and the delivery time shown near the add-to-bag button. **[pattern]**
- **Complaints:** a paid same-day order arrived the next day and the express fee was not refunded ([Trustpilot](https://pt.trustpilot.com/review/ounass.ae?page=3)).

### Noon Fashion
- **Model:** marketplace PDP. A sticky "Add to cart" sits at the bottom on mobile, with a delivery-date promise ("Get it tomorrow") and a seller/express badge. **[pattern]**
- **Payment:** cards, **COD (only in some areas)**, and Tabby or Tamara over 4 to 12 months ([AR-Pay guide](https://ar-pay.com/blog/en/articles/shop-from-noon-ksa-big-deal/)).
- **Returns:** a 15-day policy is mentioned in the app listing ([App Store](https://apps.apple.com/app/id1269038866), [noon return policy](https://www.noon.com/bahrain-en/return-policy/)).
- **Arabic/RTL:** full Arabic support. **[pattern]**
- **Complaints:** marketplace pages are dense and busy, and seller quality is inconsistent ([ClicFlyer](https://blog.clicflyer.com/ar/are-noon-products-original-and-legit)).

### Small Instagram/WhatsApp-first stores in the Middle East (Shopify plus apps)
- **Typical stack:** a Shopify theme, plus a **one-page COD form app** that collects name, phone, city and address on the PDP or in a popup and skips checkout entirely. These apps add a **floating WhatsApp button** and send an **automatic WhatsApp order confirmation** ([CodForm](https://apps.shopify.com/codform-1), [Codleadform](https://open.store/shopify-apps/codleadform), [Confirmify](https://apps.shopify.com/confirmify), [CODbot](https://apps.shopify.com/codbot-cod-sms-verification)).
- **Why:** vendor sources say COD is more than 80% of B2C transactions across KSA, UAE, Egypt and Jordan. COD return/refusal rates are said to be 20 to 30%, against 5 to 10% for prepaid orders. Confirming over WhatsApp reduces fake orders ([eGrow](https://www.egrow.com/en/blog/saudi-arabia-cod-ecommerce-guide-2026), [eGrow UAE](https://www.egrow.com/en/blog/uae-cod-ecommerce-2026), [Egyptian Streets](https://egyptianstreets.com/2025/12/23/how-an-egyptian-app-is-tackling-cash-on-delivery-fraud-with-whatsapp/)). These are vendor figures, so treat them as directional.
- **Weak points:** the store looks like a template, there is little size information (often just "message us for size"), trust signals are weak, the Arabic is machine-translated, and every WhatsApp order has to be handled by hand.

### Cross-cutting research
- Baymard: **83% of desktop and 87% of mobile apparel sites give insufficient size information.** Put the size-guide link right next to the size selector. The browser Back button should close the size-guide overlay. 63% of sites don't use proper buttons for choosing a size ([Baymard apparel size info](https://baymard.com/research-articles/apparel-size-information), [5 best practices](https://baymard.com/blog/apparel-5-best-practices)).
- **Sticky add-to-cart on mobile:** results are mixed. Add-to-cart rates usually rise (+6 to +16% conversion in some apparel tests), but one test saw −7.7% conversion. The bar works best when it shows the price and the chosen size or variant ([CleanCommit](https://cleancommit.io/ab-tests/mobile-bottom-sticky-add-to-cart-button/), [Blend apparel test](https://blendcommerce.com/en-au/blogs/ab-tests-shopify/adding-a-sticky-cta-to-the-product-detail-page), [Zipify](https://zipify.com/mobile-sticky-button-split-test-results/)).

---

## 2. Feature matrix

| Site | Gallery | Size picker / fit | Stock msg | Delivery & returns on PDP | Sticky ATC (mobile) | Cart | Guest | Checkout steps | COD | BNPL | Arabic/RTL |
|---|---|---|---|---|---|---|---|---|---|---|---|
| SSENSE | Vertical stack, editorial | Dropdown + measurements | Minimal | Lower on page | Partial | Page | Yes | ~3 | No | No | No |
| ASOS | 4–5 imgs + video | Dropdown + Fit Assistant | "Low in stock" per size | Expandable block | Yes | Page | Yes (with caveats) | ~1 long page | No | Klarna/Clearpay | No |
| Net-a-Porter | Hi-res + zoom | Size & Fit notes, model size | Low-stock flag | Help links | Yes | Page | Yes | ~3 | No | Limited | Partial |
| Nike | Thumbs + carousel + video | **Button grid**, sold-out struck through | Per size | Accordion | Yes | Drawer-ish/page | Yes | ~3 | Regional | Regional | Partner sites |
| Shein | 6–10 + UGC photos | Fit poll + body data in reviews | Aggressive urgency | Below fold | Yes | Page | Forced/soft login | ~1 page | Yes (GCC) | Yes (GCC) | Yes |
| Namshi | Carousel | Buttons + size guide | Per size | **Delivery-date estimate near CTA** | Yes | Page | Account | ~2–3 | **Yes** | **Tabby, Tamara** | **Full** |
| Ounass | Editorial carousel | Size & Fit | Low-stock | **Delivery time near CTA** | Yes | Page | Account | ~3 | Yes | Tabby | **Full** |
| Noon Fashion | Carousel | Buttons | "Only X left" | **"Get it tomorrow"** | **Yes** | Page | Account (OTP) | ~2 | Yes (some areas) | **Tabby, Tamara** | **Full** |
| IG/WA Shopify | Basic | Often missing | None | Rare | Varies | Skipped | n/a | **1 form** | **Yes** | Rare | Often poor |

Most cells are **[pattern]** unless sourced in section 1.

## 3. Scores (1–5)

| Site | Clarity | Speed to purchase | Trust signals | Mobile UX | Accessibility | Total /25 |
|---|---|---|---|---|---|---|
| SSENSE | 4 | 4 | 3 | 3 | 3 | 17 |
| ASOS | 4 | 4 | 4 | 4 | 4 | 20 |
| Net-a-Porter | 4 | 3 | 5 | 4 | 3 | 19 |
| Nike | 5 | 4 | 4 | 4 | 4 | 21 |
| Shein | 2 | 5 | 2 | 4 | 2 | 15 |
| Namshi | 4 | 4 | 3 | 4 | 3 | 18 |
| Ounass | 4 | 3 | 5 | 4 | 3 | 19 |
| Noon Fashion | 3 | 5 | 3 | 4 | 3 | 18 |
| IG/WA Shopify (typical) | 2 | 5 | 2 | 3 | 2 | 14 |

The scores are qualitative judgement. Accessibility is judged from contrast, button-based size selection and how navigable the page is, not from a WCAG audit.

---

## Top 6 patterns to adopt
1. **Size buttons with the size guide next to them** (Nike, Baymard). Use tappable size chips. Show sold-out sizes struck through but still visible, with an optional "notify me". Put a "Size guide" link beside the label, opening a bottom sheet that the Back button closes. Add a fit line (*"Model 170cm wears S. Fits true to size."*) and measurements in cm.
2. **Delivery promise and payment reassurance right under the CTA** (Namshi, Ounass, Noon). For example: *"Delivered in Riyadh by Thu · Cash on delivery available · Free exchange within 14 days"*. Show prices in SAR or AED.
3. **A sticky mobile bar that shows the price and selected size.** Tapping "Add" with no size chosen scrolls to the size chips and highlights them. Next to it, a secondary **"Order on WhatsApp"** button pre-fills the product name, size, colour and link.
4. **A one-page COD-first checkout as a slide-in drawer.** Fields: name, phone (+966/+971 with country code), city, district and address, with no account needed. The payment selector lists COD, Card/Apple Pay/Mada, and Tabby/Tamara ("4 interest-free payments of X"). Confirm the order by WhatsApp afterwards.
5. **Real fit social proof** (from Shein, without the dark patterns). Show customer photos from Instagram and a "Runs small / True / Large" poll with the reviewer's height and size ordered.
6. **Arabic-first, fully RTL.** Use logical CSS properties, flip the carousel direction, use Arabic or Western numerals consistently, and put a one-tap AR/EN switch in the header. Swipe gallery with pinch zoom, 4–6 images, and alt text on every image.

## 3 anti-patterns to avoid
1. **Fake urgency and guilt-tripping** (Shein, cited by BEUC): countdown timers, unverifiable "only 2 left" messages, and "Are you sure you want to leave?" pop-ups. Only show stock levels that are real.
2. **Hidden or vague size information and "DM us for size"** (typical IG stores; 83–87% of apparel sites, per Baymard). This drives COD refusals and exchange churn, which are Namshi's top complaints.
3. **Forced account creation, or checkout split across many screens** (Nike app and Shein complaints; ASOS guest-order limitations). Also: don't hide COD fees or express-delivery terms until the last step. Show them up front, and refund them when the promise is missed (Ounass complaint).
