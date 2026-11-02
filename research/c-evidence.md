# C. Evidence-based e-commerce UX guidance for the apparel store demo

Compiled 2026-11-02 from public sources only.

**How the sources were checked:** WebFetch could not reach baymard.com, which is blocked by the session's network allowlist. All Baymard figures below come from Baymard page titles and excerpts returned by web search. Each finding is labelled:
- **[B]**: the figure appears in Baymard's own page title or text, as returned by search.
- **[2nd]**: the figure was reported by secondary sources and could not be confirmed against Baymard's primary text.

Treat **[2nd]** numbers as directional. Re-verify before quoting them externally.

---

## 1. Cart abandonment: why people leave

| # | Finding | Number | Source | What it means for the demo |
|---|---|---|---|---|
| 1.1 | Average documented online cart abandonment rate, averaged across ~49 studies **[B]** | **70.22%** (Sep 2025; older version 70.19%) | https://baymard.com/lists/cart-abandonment-rate | Treat checkout as a leaky funnel. Every step in the demo needs a reason to exist. |
| 1.2 | Share who abandoned because they were "just browsing / not ready to buy"; Baymard excludes this group from the reasons below **[B/2nd]** | 42–43% | https://baymard.com/lists/cart-abandonment-rate | Support "save for later" or wishlist, and keep the cart persistent, for not-ready shoppers. |
| 1.3 | Top reason (2025, US adults): extra costs (shipping, tax, fees) were too high **[2nd, consistent across sources]** | **39%** (47% in the 2023 survey) | https://baymard.com/lists/cart-abandonment-rate | Show shipping cost and the free-shipping threshold on the product page and in the cart. Never let the total surprise the shopper at the last step. |
| 1.4 | Delivery was too slow **[2nd]** | 21% (2025); 24% (2023) | https://baymard.com/lists/cart-abandonment-rate | Show a concrete delivery date early: on the product page and in the cart. |
| 1.5 | Didn't trust the site with credit card information (2025; n=1,026 US adults) **[B]** | **19%** | https://baymard.com/research-articles/perceived-security-of-payment-form | Make the payment section visually distinct, with lock icons and reassuring microcopy. |
| 1.6 | Site required account creation **[2nd]** | 19% (2025); 25% (2023) | https://baymard.com/lists/cart-abandonment-rate | Make guest checkout the default. Offer account creation only after the order is placed. |
| 1.7 | Too long or complicated checkout process **[B]** | ~18% ("nearly 1 in 5") | https://baymard.com/lists/cart-abandonment-rate | Keep the field count minimal (see section 5). |
| 1.8 | Preferred payment method missing **[2nd]** | ~13% | https://baymard.com/lists/cart-abandonment-rate | Show the accepted payment marks, including wallets such as Apple Pay, Google Pay and PayPal, even if they are mocked. |
| 1.9 | Potential conversion gain from better checkout design at large sites **[B]** | **+35.26%** | https://baymard.com/research/checkout-usability | Checkout is the highest-leverage surface to polish in the demo. |

## 2. Product list and filtering (PLP)

| # | Finding | Number | Source | What it means for the demo |
|---|---|---|---|---|
| 2.1 | Sites with "poor" to "mediocre" product list UX **[B]** | **58% desktop / 78% mobile** | https://baymard.com/research/ecommerce-product-lists | Mobile filtering is where most sites fail, so design the mobile filter flow first. |
| 2.2 | Sites that don't offer filters for the attributes they already show in list items, such as colour or price **[B]** | **38%** | https://baymard.com/research-articles/have-filters-for-list-item-info | Every attribute shown on a card (colour swatches, price, size availability) must also be filterable. |
| 2.3 | Sites that don't display applied filters on the PLP **[2nd]** | 28% | https://baymard.com/research-articles/current-state-product-list-and-filtering | Show removable "applied filter" chips above the grid, plus "Clear all". |
| 2.4 | Sites that don't promote filters within the product list **[B]** | **61%** | https://baymard.com/research-articles/promoting-product-filters | Put quick-filter chips (Size, Colour, Price) at the top of the list, especially on mobile. |
| 2.5 | Sites that don't allow several values of the same filter (OR logic, e.g. S + M) **[B/2nd]** | 14–15% | https://baymard.com/research-articles/current-state-product-list-and-filtering | Size and colour filters must be multi-select checkboxes, not radio buttons. |
| 2.6 | Sites that don't combine variations into one list item **[B, 2025]** | 42% | https://baymard.com/research-articles/current-state-product-list-and-filtering | Show one card per style with colour swatches, not one card per colour. NN/g agrees: show variants under a single listing (https://www.nngroup.com/articles/products-with-multiple-variants/). |
| 2.7 | Size filter should sit near the top of the sidebar and be expanded by default (apparel guidance) **[B]** | n/a | https://baymard.com/research-articles/5-essential-filters | Apparel shoppers filter by size first. Put it first. |
| 2.8 | Older Baymard test: product-finding tasks were abandoned at a 67–90% rate on sites with mediocre list tools, versus 17–33% on slightly optimized sites **[2nd, 2015]** | 67–90% vs 17–33% | https://www.smashingmagazine.com/2015/04/the-current-state-of-e-commerce-filtering | Good filters roughly halve abandonment during product finding. |
| 2.9 | On mobile, filters live in a separate overlay, so users bounce back and forth between it and the list **[B]** | n/a | https://baymard.com/research/ecommerce-product-lists | Make the filter sheet show the live result count ("Show 42 items") and keep applied chips visible on the list. |
| 2.10 | NN/g: listing-page product photos should be consistent and show the product clearly **[NN/g]** | n/a | https://www.nngroup.com/articles/product-photos-listing-pages/ | Use a consistent aspect ratio and background on cards. A hover or second image showing the item on a model is a plus. |

## 3. Product page (PDP): images, size, reviews, delivery

| # | Finding | Number | Source | What it means for the demo |
|---|---|---|---|---|
| 3.1 | Apparel sites that fail to provide sufficient sizing information **[B]** | **83% desktop / 87% mobile** | https://baymard.com/research-articles/apparel-size-information | Ship a real size guide with garment measurements in cm/in, a "model is 180 cm wearing M" line and fit notes (runs small / true to size). |
| 3.2 | Sites that don't use buttons for size selection, or implement them incorrectly. In testing, drop-downs caused users to overlook the size selector **[B]** | **63%** | https://baymard.com/research-articles/apparel-5-best-practices | Size must be a row of visible buttons, with out-of-stock sizes shown but disabled. Never use a `<select>`. |
| 3.3 | Sites that don't show apparel on a human model **[B]** | **75%** | https://baymard.com/research-articles/apparel-5-best-practices | Include at least one on-model photo per product. |
| 3.4 | Test sites lacking a size finder or recommendation tool **[B]** | 36% | https://baymard.com/research-articles/apparel-size-information | A simple "Find my size" helper (height/weight leading to a suggestion) is a differentiator. It is optional. |
| 3.5 | The size guide link must sit next to the size selector and be prominent. The browser Back button should close the size guide and not leave the PDP **[B]** | n/a | https://baymard.com/research-articles/apparel-size-information | Open the size guide as a modal or sheet beside the size buttons, and push a history state so Back closes it. |
| 3.6 | Users who try to judge product size from images **[B]** | **42%** | https://baymard.com/research-articles/current-state-ecommerce-product-page-ux | Include on-model and scale shots. For accessories, show an in-hand or worn image. |
| 3.7 | Sites with no "in scale" image **[B]** | 28% | https://baymard.com/research-articles/current-state-ecommerce-product-page-ux | Same as 3.6. |
| 3.8 | Sites that don't let users upload images with reviews **[B]** | 34% | https://baymard.com/research-articles/current-state-ecommerce-product-page-ux | Show customer photos and fit feedback ("Runs small" bar) in reviews. |
| 3.9 | Sites that don't respond to negative reviews **[B]** | 87% | https://baymard.com/research-articles/current-state-ecommerce-product-page-ux | Include at least one negative review with a brand reply. It builds credibility. |
| 3.10 | Sites that show shipping speed ("3–5 business days") instead of a delivery date **[B title; % 2nd]** | **41%** | https://baymard.com/research-articles/shipping-speed-vs-delivery-date | Write "Arrives Thu 6 Nov". Eye-tracking showed users ignore the shipping method names and read only the dates. |
| 3.11 | Sites that don't allow buying temporarily out-of-stock items with a longer delivery time **[B]** | 68% | https://baymard.com/research-articles/current-state-ecommerce-product-page-ux | Optional: "Back in stock — ships by 20 Nov" instead of a dead end. |
| 3.12 | Sites with "mediocre" or worse product page UX, leading US/EU sites **[2nd, 2025]** | ~51% | https://baymard.com/research/product-page | The PDP is still widely under-designed, so there is room to stand out. |
| 3.13 | NN/g core PDP set: clear product options, a visible add-to-cart, clear feedback after adding, and shipping cost known before checkout **[NN/g]** | n/a | https://www.nngroup.com/articles/ecommerce-product-pages/ ; https://www.nngroup.com/articles/ecommerce-expectations/ | After add-to-cart, show a confirmation (mini-cart drawer or toast) with the item, size, subtotal and "Checkout". |

## 4. Cart

| # | Finding | Number | Source | What it means for the demo |
|---|---|---|---|---|
| 4.1 | Extra costs are the #1 abandonment reason (see 1.3) **[2nd]** | 39% | https://baymard.com/lists/cart-abandonment-rate | Show the itemised subtotal, shipping (or "Free over €X — you're €12 away"), tax note and total in the cart. |
| 4.2 | Shoppers want shipping cost before entering checkout **[NN/g]** | n/a | https://www.nngroup.com/articles/ecommerce-expectations/ | Estimate shipping in the cart without asking for a full address. |
| 4.3 | Just-browsing intent is large (see 1.2) | 42–43% | https://baymard.com/lists/cart-abandonment-rate | Keep the cart persistent (localStorage). Offer "Move to wishlist". |

## 5. Checkout: guest, fields, steps, address

| # | Finding | Number | Source | What it means for the demo |
|---|---|---|---|---|
| 5.1 | Average checkout in 2024: **5.1 steps and 11.3 form fields** (down from 11.8 in 2021 and 12.7 in 2019). Most sites need only **8 fields** **[B]** | 11.3 avg vs 8 ideal | https://baymard.com/research-articles/checkout-flow-average-form-fields | Target 8 or fewer visible fields, not counting card fields. |
| 5.2 | Guest checkout can be done in 6–8 fields including card fields **[B, 2019]** | 6–8 | https://baymard.com/research-articles/checkout-flow-average-form-fields | One full-name field, email, address lookup, phone (optional) and payment. Hide "Address line 2" and "Company" behind links. |
| 5.3 | Most default checkouts can cut form elements by 20–60% **[B]** | 20–60% | https://baymard.com/lists/cart-abandonment-rate | Billing address defaults to "same as shipping". web.dev recommends this too. |
| 5.4 | Sites that fail to make guest checkout the most prominent option **[B]** | **62%** | https://baymard.com/research-articles/current-state-of-checkout-ux | Make "Continue as guest" the primary button at the top of the account gate, or skip the gate entirely. |
| 5.5 | Sites where guest checkout is needlessly hard to find **[B]** | 44% | https://baymard.com/ecommerce-design-examples/48-account | Same as 5.4. |
| 5.6 | Mobile sites rated "mediocre" or worse on checkout UX (apps: 46%) **[2nd, 2025]** | ~63% | https://baymard.com/research-articles/current-state-of-checkout-ux | Test the whole checkout at 375 px width first. |
| 5.7 | Sites with no fully automatic address lookup **[B]** | **55%** | https://baymard.com/research-articles/automatic-address-lookup | Add a type-ahead address field. A mocked suggestion list is fine for the demo. Keep "enter manually" available. |
| 5.8 | Manually entered shipping addresses containing typos **[B]** | **9%** | https://baymard.com/research-articles/automatic-address-lookup | Address lookup reduces both errors and typing effort. Lookup must tolerate misspellings. |
| 5.9 | Average checkout has 39 usability issues (344 sites) **[B, audit page]** | 39 | https://baymard.com/checkout-usability/benchmark/expert-audit | Self-audit the demo checkout against this list. |

## 6. Mobile forms (web.dev / Google)

Source for this section: https://web.dev/articles/payment-and-address-form-best-practices

| # | Finding | What it means for the demo |
|---|---|---|
| 6.1 | Use standard `autocomplete` tokens on every field. Prefix them with `shipping` or `billing` when there are two address sections. | Use `name`, `email`, `tel`, `shipping street-address`, `shipping postal-code`, `shipping country`, `cc-name`, `cc-number`, `cc-exp`, `cc-csc`. |
| 6.2 | Card number field: `type="text"` with `inputmode="numeric"`, not `type="number"`. | The numeric keypad appears without spinner or rounding bugs. Apply the same to postcode and CVC where the format is numeric. |
| 6.3 | Use `type="email"` and `type="tel"` for the matching fields. | The correct mobile keyboard appears and autofill matches. |
| 6.4 | Every input needs a `<label for>`. Don't rely on placeholders. | Use visible labels above fields. |
| 6.5 | Default billing to the shipping address, with an option to edit. | This removes about 6 fields. |
| 6.6 | Avoid custom widgets such as custom selects and date pickers, because they break autofill. | Use native `<select>` for country and plain inputs for card expiry. |

## 7. Trust

| # | Finding | Number | Source | What it means for the demo |
|---|---|---|---|---|
| 7.1 | Users judge security by "gut feeling" from the visuals. Payment fields that are encapsulated and visually distinct, with 1–2 security icons, are perceived as more secure **[B]** | 19% abandon over card trust | https://baymard.com/research-articles/perceived-security-of-payment-form | Put card fields in a bordered or shaded box with a lock icon and "Encrypted & secure" microcopy. |
| 7.2 | Trust seals tested: Norton was the most trusted. Trust seals beat SSL seals **[B]** | n/a | https://baymard.com/research-articles/site-seal-trust | Don't fake real brand seals in the demo. Use generic "Secure checkout" and "30-day free returns" badges. |
| 7.3 | Returns information drives apparel purchase confidence. *No hard number was found in accessible sources.* | n/a | (inferred from the sizing findings in 3.1) | Show "Free returns within 30 days" next to the add-to-cart button and in the cart. |

## 8. Accessibility: target size (WCAG 2.2)

| # | Finding | Number | Source | What it means for the demo |
|---|---|---|---|---|
| 8.1 | SC 2.5.8 Target Size (Minimum), Level AA, new in WCAG 2.2: pointer targets must be **at least 24×24 CSS px**, or spaced so that a 24 px circle centred on each target doesn't intersect another target. Inline text links are exempt. | 24×24 px | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | Size buttons, swatches, filter chips, quantity steppers and "remove" icons must each have a hit area of at least 24 px. |
| 8.2 | SC 2.5.5 Target Size (Enhanced), Level AAA: **44×44 CSS px**. | 44×44 px | https://www.w3.org/WAI/WCAG21/Understanding/target-size.html | Aim for 44 px on mobile for primary controls: size buttons, add-to-cart, filter toggle and checkout CTA. Colour swatches can be visually 28 px with 44 px of padded hit area. |

---

## 15 rules for the demo (ranked by expected impact)

1. **Show the full cost early.** Show the shipping cost or free-shipping threshold on the product page, and the itemised total in the cart. No surprises at payment. (Extra costs are the #1 abandonment reason: 39%.)
2. **Guest checkout by default.** Make "Continue as guest" the primary action, or skip the account gate. Offer account creation after the order is placed. (Forced accounts: 19%. 62% of sites fail at this.)
3. **8 fields or fewer in checkout.** Use one name field, hide Address line 2 and Company behind links, and default billing to "same as shipping". (Average is 11.3 fields; 8 is enough.)
4. **Size as visible buttons, never a dropdown.** Show out-of-stock sizes disabled with a strikethrough, and require a size before add-to-cart with an inline error. (63% get this wrong.)
5. **Real size guide next to the size buttons.** Include garment measurements, model height and size, and fit notes. Open it as a sheet that Back closes. (83–87% of sites have insufficient sizing info.)
6. **Concrete delivery date** ("Arrives Thu 6 Nov") on the product page, in the cart and in the shipping options, rather than "3–5 days". (41% of sites don't; slow delivery causes 21% of abandonments.)
7. **Correct autocomplete, input types and inputmode on every checkout field.** Mobile autofill turns typing into a few taps. (web.dev)
8. **Address lookup with a manual fallback.** (55% of sites lack it; 9% of typed addresses contain typos.)
9. **Mobile-first filtering.** Promote Size, Colour and Price chips at the top of the list. Make values multi-select. Show applied-filter chips with "Clear all" and a live result count in the filter sheet. (78% of mobile sites score poor to mediocre.)
10. **Filter every attribute shown on cards.** One card per style with colour swatches, not one per colour. (38% and 42% of sites fail these.)
11. **On-model imagery.** Include at least one on-model photo and one scale or detail shot per product, and let swatches change the gallery. (75% of sites don't show products on a model; 42% of users judge size from images.)
12. **Payment section that looks secure.** Use a distinct bordered panel, a lock icon, "encrypted" microcopy and visible accepted-payment marks, including wallets. (19% abandon over card trust.)
13. **Clear add-to-cart feedback.** Open a mini-cart drawer showing the item, size, subtotal and "Checkout" or "Keep shopping". Keep the cart persistent across visits. (NN/g; 42–43% of shoppers are just browsing.)
14. **Reviews with fit signal and photos.** Show the rating distribution, a "Runs small / True / Large" bar, customer photos, and at least one negative review with a brand reply. (34% and 87% of sites miss these.)
15. **Touch targets of at least 24 px everywhere (WCAG 2.2 AA), and 44 px for primary mobile controls.** This includes swatches, size buttons, chips, qty steppers, the remove icon and CTAs. Also show "Free 30-day returns" near add-to-cart and in the cart as a low-cost reassurance.

---

### Gaps and caveats
- baymard.com was unreachable from this session (network allowlist), so primary pages were not opened. Numbers marked [2nd] need checking against Baymard's own text.
- No Baymard percentage was found for pagination versus "load more". Baymard has an article on the topic, but its findings weren't accessible. Default: use a "Load more" button that shows a count ("Showing 24 of 120").
- No accessible hard number was found for the effect of returns policy on apparel conversion.
