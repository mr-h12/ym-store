# Fashion e-commerce survey: what the Y.M Store demo is built on

This summarises three research files in this folder:
- `a-browse.md`: browse and catalogue UX on 10 sites
- `b-pdp-checkout.md`: product page and checkout UX on 8 sites plus Instagram/WhatsApp stores
- `c-evidence.md`: Baymard, NN/g, web.dev and WCAG findings with numbers

**How reliable this is:** the scores are qualitative. Live pages and baymard.com were blocked by this session's network
settings, so the claims rest on search-result excerpts and known site behaviour. The research files tag each claim with
its source and confidence. "Every clothing site on the internet" can't be surveyed. These 18 sites were picked because they
are the most-cited leaders, plus Gulf regional peers.

## Combined ranking (average of clarity, speed to purchase, trust, mobile and accessibility, out of 5)

| # | Site | Avg /5 | Best at | Weak at |
|---|---|---|---|---|
| 1 | Nike | 4.2 | Size buttons, fit info, clear PDP hierarchy | App forces sign-in for some flows |
| 2 | ASOS | 4.0 | Filters, saved items, delivery messaging | Guest-order limits |
| 2 | Everlane | 4.0 | Trust (transparent pricing), clean grid | Info hidden in tabs |
| 4 | Net-a-Porter / Ounass | 3.8 | Premium trust, delivery promise near CTA | Slower to purchase |
| 4 | H&M | 3.8 | Swatches on cards, 2-column mobile grid, filter chips | Busy home page |
| 6 | Namshi / Noon Fashion | 3.6 | COD, Tabby/Tamara, delivery date, Arabic/RTL | Clutter, exchange complaints |
| 6 | COS / Arket / Mango / Aritzia | 3.6 | Calm editorial layout, good type | Some info depth missing |
| 8 | Uniqlo | 3.4 | Fit reviews with height/weight, size helper | 2024 redesign pushed filters off-screen |
| 9 | SSENSE | 3.4 | Minimal and fast | Low contrast, small type |
| 10 | Shein | 3.0 | Speed and price | Fake urgency (BEUC complaint, 2025) |
| 11 | Massimo Dutti / & Other Stories | 2.8–3.0 | Imagery | Small type, hidden actions |
| 12 | Typical Instagram/WhatsApp store | 2.8 | Fast for loyal followers | "DM for price/size", no size info |
| 13 | Zara | 2.4 | Imagery | Tiny text, ambiguous "+", poor filters, endless scroll |

**No single site wins on everything.** The demo takes the best pattern from each: Nike and Uniqlo for sizing, H&M and
ASOS for browsing and filters, Everlane and COS for calm clarity and trust, and Namshi, Ounass and Noon for COD, delivery date and WhatsApp.
It avoids Zara's legibility problems and Shein's fake urgency.

## Numbers that shaped the design (from c-evidence.md)
- 70% average cart abandonment. Top reasons: extra costs 39%, slow delivery 21%, card-trust concerns 19%, forced account 19%.
- Checkouts average 11.3 fields; 8 is enough. 62% of sites don't make guest checkout the most prominent option.
- 83–87% of apparel sites lack enough sizing info. 63% handle size selection badly.
- 41% of sites show shipping speed instead of a delivery date. 78% of mobile product lists are poor to mediocre.

## How each pattern was implemented in the demo
| Pattern | Source | Where in the demo |
|---|---|---|
| Size buttons, sold-out sizes struck through, size guide next to them | Nike, Baymard | Product page |
| Delivery date, fee, COD and returns right under Add to bag | Namshi, Ounass, Noon | Product page, bag |
| Sticky mobile add bar that scrolls you to sizes if none is picked | ASOS, Nike | Product page (mobile) |
| Order on WhatsApp as a quiet secondary action | Gulf Instagram stores | Product page, bag, checkout |
| Sticky filter bar, size filter first, removable chips, state kept in the URL | Baymard, H&M | Shop |
| 3:4 cards, one badge, swatches with +N, labelled quick-add sizes | H&M, Uniqlo (not Zara's "+") | Product card |
| Mini-bag drawer on add, free-delivery progress, itemised totals | NN/g, Baymard | Bag drawer |
| Guest COD-first checkout, ≤8 fields, autocomplete, connected 3-step stepper | Baymard, web.dev, UI/UX notes | Checkout |
| Next card peeks in carousels; 70% scrim on dialogs; one flat accent | UI/UX notes (reel 1, reel 2) | Throughout |
| 16px inputs, 44px touch targets on coarse pointers, safe-area bars | UI/UX notes (reel 4), WCAG 2.2 | Throughout |

## Not built yet (next steps once real store data arrives)
- Real product photos (on-model + detail shots), real prices and currency
- Arabic/RTL as default with an EN switch: the layout already uses logical properties, so flipping `dir` in `lib/store-config.ts` works
- Reviews with fit signal ("Runs small / True / Large"), Tabby/Tamara instalments, address lookup
