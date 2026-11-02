# UI/UX notes from four Instagram reels

**How these were made:** I downloaded each reel with yt-dlp, along with its caption. I pulled frames at 1 fps (the scene-change filter found no hard cuts in reels 1–2 because they use smooth transitions). I transcribed the voiceover locally with whisper.cpp (`ggml-base.en`), so the spoken claims below come from the audio, not only from what's on screen. Hex values were sampled from the 720p frames. Treat them as estimates: JPEG compression and anti-aliasing shift them by a few points.

---

## Reel 1: "Six more UX laws, proven on screen"

- **Source:** https://www.instagram.com/reel/Del7XTgsuwI/ (@motion_ui_interface, about 97 s). This is Part 4 of a series called "UX Laws in Action".
- **Format:** each law gets a two-word headline, then a ✕ (bad) vs ✓ (good) phone mockup side by side, then a metric under each, a two-line "Why it works", and finally a "RULE" pill. A segmented progress bar at the top shows which of the six laws you're on.

### The six laws, in brief

| # | Law | ✕ Bad | ✓ Good | Metric shown | Rule |
|---|---|---|---|---|---|
| 01 | **Closure** | Carousel cards fit the screen exactly ("cards fit exactly") | The next card is cut off at the edge ("next card peeks") | 0% vs 32% of the next card visible (the frame label says 48px of card 3 shows) | Let the next card peek. |
| 02 | **Figure-ground** | Confirmation dialog over a page with no backdrop | 70% dark backdrop behind the dialog | Contrast of the page behind: 17.4:1 → 2.5:1 | Dim what's behind the focus. |
| 03 | **Banner blindness** | Bright "CARD EXPIRES FRIDAY!" banner at the top, styled like an ad | The same warning placed inline in the transaction feed, styled like a row | 0 looks vs 2 looks at the notice (a modeled gaze path, citing Benway & Lane 1998) | Don't make important things look like ads. |
| 04 | **Parkinson's law** | Type the full street, city and postcode ("type it all") | Postcode lookup: type the postcode, pick the address, the rest autofills | 30 keys vs 7 keys | Fill in what you already know. |
| 05 | **Uniform connectedness** | Checkout stepper drawn as four loose circles (Cart, Ship, Pay, Done) | The same steps joined by one line inside a container | 4 groups vs 1 group seen (Palmer & Rock 1994) | Connect the steps of a flow. |
| 06 | **Choice overload** | A "Jams" grid of 24 options | 6 larger options with a clear selected state and "Added to cart" | 3% vs 30% of shoppers who stopped bought (Iyengar & Lepper 2000 jam study) | Show fewer options up front. |

Why each one works (paraphrased from the voiceover):
- **Closure:** the eye fills in shapes that are cut off. When two cards fit exactly, it looks like the whole set. A cropped edge signals that the row continues.
- **Figure-ground:** people split every screen into a front and a back. Without a backdrop, the page behind keeps high contrast and competes with the dialog for attention.
- **Banner blindness:** users have learned to skip anything that looks like an ad. Bright boxes at the top get filtered out first.
- **Parkinson's law:** a task expands to fill the effort it's given. Every keystroke you remove is effort the user never has to spend.
- **Connectedness:** a connecting line makes items read as one group and also shows the order to go through them, with a start, an end and a next step.
- **Choice overload:** every extra option is one more comparison. Past a certain point, people stop comparing and leave.

![Closure: the next card peeks](uiux-frames/r1-closure.jpg)
![Figure-ground: 70% backdrop](uiux-frames/r1-figure-ground.jpg)
![Parkinson's law: postcode lookup, 30 → 7 keys](uiux-frames/r1-parkinson.jpg)

### Layout and spacing
- Each comparison is a pair of equal-width panels with a circular "VS" chip between them. The bad version is always on the left and the good one on the right.
- Closure: let roughly a third of the next card (about 32%, 48px) show past the edge.
- Figure-ground: a 70% scrim. The dialog is a centered card with two equal-width buttons, a ghost Cancel and a solid white Delete.
- Banner fix: put the warning inside the content list with a warning icon and an inline "Update" pill, instead of a separate block above the balance.
- Stepper: the steps sit in a container with a dashed outline. Done steps show a check, the current step has a bold numbered ring, and future steps are dim numbers.
- Choice: going from 24 options to 6 also makes each tile bigger (a 3×2 grid instead of a dense 6×4).

### Typography
- Sans-serif throughout, likely SF Pro or Inter. I couldn't confirm which from the frames.
- Headline: bold white in about two lines, with the key word in the cyan accent ("Half a card **says swipe.**", "Dim the **background.**").
- Eyebrow: small tracked uppercase gray text ("LAW 02 — FIGURE-GROUND").
- Labels on the mockups: tiny uppercase tracked pills ("✕ NO BACKDROP", "✓ 70% BACKDROP").
- Metrics: large bold numerals, red for bad and cyan for good, with a small caption under each.

### Colors (estimated)
| Role | Hex |
|---|---|
| Page background (near-black navy) | `#010609` |
| Card or panel surface | `#0d1625` |
| Dialog surface | `#182037` |
| Accent cyan (good, key words) | `#37cbff` |
| "Bad" red-pink (labels and metrics, rendered dim) | `#a64a65` (looks closer to `#e5486f` at full brightness) |
| Primary button and headline white | `#fefefe` |

### Components shown
Horizontal card carousel, confirmation dialog with a scrim, home or banking summary with a balance and transaction list, inline warning row, address form with postcode lookup and autocomplete, checkout stepper, product option grid with a selected state, progress segments, status pills ("SYNCING"), and a "Follow" CTA pill.

### Interaction and animation
- The bad mockup builds first, then the good one. The metric counts up (0% → 31% → 32%), and a "Why it works" line types in, followed by the rule pill.
- A tap ripple and a selection ring mark the good-side interaction (selecting a card, tapping "Update", picking the address).
- An animated gaze path with a "looks" counter illustrates banner blindness.
- Law transitions are a blur or fade, with the top progress bar advancing one segment per law.

### Before/after comparisons
All six laws are shown as before/after pairs (see the table above).

### Tools and apps mentioned
None. The reel cites studies instead: Benway & Lane 1998, Palmer & Rock 1994, Iyengar & Lepper 2000, and Parkinson 1955.

### On-screen text (short quotes)
"Six more laws, proven on screen." · "Half a card says swipe." · "Banners get skipped." · "Shrink the task." · "Lines make groups." · "Fewer choices, more yes." · Closing card: "Twenty-four laws. Four parts." with a one-line summary per law, plus "Save this for your next design review."

![Summary card](uiux-frames/r1-summary.jpg)

---

## Reel 2: "Your dashboard looks AI-made: 5 tells, 5 fixes"

- **Source:** https://www.instagram.com/reel/Dc-4jNbtyJg/ (about 82 s). The series is titled "De-AI your UI · 01".
- **Format:** one SaaS dashboard is fixed one tell at a time. Each step has a red "TELL 0X" chip and headline, numbered pink markers and callouts on the problem, then the fix animates in and the chip turns green with a one-line fix pill.

![Before: the dashboard with 5 tells marked](uiux-frames/r2-before.jpg)

### The five tells and their fixes
| # | Tell (what looks generated) | Fix | Fix pill |
|---|---|---|---|
| 01 | **Gradients** (purple → blue) on the header, the Upgrade button and the chart fill, carrying no meaning | Remove every gradient and use a single flat accent color (teal-green) only on the primary action | One flat accent |
| 02 | **Icon + pastel tile** on every KPI card, each in a different color (blue, green, purple, orange) | Drop the icon tiles. Four colors for four numbers is decoration, not information | The number is the hero |
| 03 | **No hierarchy**: four identical KPI cards ("482 × 160" each), same size, same weight, same green badge. "A dashboard with no hierarchy is a spreadsheet with padding." | One large primary metric card (Revenue, with a Subscriptions / One-time breakdown) and three small secondary cards stacked beside it | One primary. Three secondary. |
| 04 | **Shadows and big radii everywhere**: 16px corners and drop shadows on cards, inputs, badges and the chart | Hairline borders instead of shadows. Smaller parts get smaller radii (shown as 16→12 on cards, 16→8 on inputs/search, 16→6 on badges). Keep shadows only for things that float above the page, like the "⋯" menu (Export / Filter / Share) | Shadow only on what floats |
| 05 | **Placeholder copy and shapeless numbers**: "Welcome back, Jordan 👋", "+12.5% from last month" on every card | Replace the greeting with a real title and period ("Revenue · Aug 1 to Aug 31, 2026"). Use concrete deltas ("+12.5% vs Jul", "+0.4 pt", "−0.2 pt"), tabular digits so amounts line up in columns, and a sparkline instead of a badge | Numbers with a shape |

![Tell 4 fix: the radius scale and shadow only on the floating menu](uiux-frames/r2-shadows.jpg)
![Tell 3 fix: one primary metric and three secondary](uiux-frames/r2-hierarchy.jpg)
![Tell 5 fix: a named period, tabular digits and a sparkline](uiux-frames/r2-copy.jpg)

### Layout and spacing
- Layout: an icon-only left rail, a top bar (title, search, bell, avatar, primary button), a KPI area, a full-width chart with 7d/30d/90d segmented tabs, and a "Recent transactions" table with status pills.
- KPI area after the fix: about a 60/40 split, with the large primary card on the left and three stacked secondary cards on the right.
- The secondary cards put the label and value on the left and a right-aligned delta.
- The transaction table right-aligns amounts on a shared edge (a dashed guide is shown) so the decimals line up.

### Typography
- Geometric sans throughout, looking like Inter. The headline is extra-bold white.
- After the fix the primary number is much larger (about 2× the secondary values). The secondary values are bold but smaller, and the labels are muted gray.
- Tabular (monospaced) figures for currency columns.
- Chips use small, tracked uppercase text ("TELL 04 · SHADOWS").

### Colors (estimated)
| Role | Hex |
|---|---|
| Page and app background | `#090e10` |
| Card surface | `#11161a` |
| Flat accent (Upgrade button, "fix" chips) | `#1fcca5` |
| Positive delta text | `#50cd85` |
| Primary text | `#fcffff` |
| Muted label | `#999dab` |
| Before: gradient header, left → right | `#5b40c7` → `#394fc8` |
| Before: Upgrade button | `#5e3fe7` |
| Annotation or "tell" pink | `#e54271` |

### Components shown
KPI or stat cards, a primary metric card with a breakdown, delta badges vs inline deltas, sparkline, line chart with gridlines and a 7d/30d/90d segmented control, a data table with avatar initials and status pills (Paid, Pending, Refunded), an overflow "⋯" menu, a search input, a notification bell, an avatar, and a primary button.

### Interaction and animation
- Numbered markers pulse onto each problem, and callout lines with labels ("header", "button", "chart fill", "cards", "inputs", "badges") point at the offending parts.
- Each fix morphs in place: the gradient drains to flat, the tiles fade out, the cards resize into the 1+3 layout, and the radius labels tick down.
- The chip and fix pill change from red to green when a tell is fixed.
- The only element that keeps a shadow is a menu opening over the table, which is what the rule is about.

### Before/after comparisons
The whole reel is one before → after. The first frame is the generic purple-gradient dashboard, and the last is a flat, hierarchical, data-labeled one.

### Tools and apps mentioned
- **"UX Engine"**, described as a Claude Code plugin with commands `/ux-design` (design a screen from a brief), `/ux-audit` (find every AI tell), `/ux-review` (review the UI of a PR) and `/restyle` ("kill the AI look"). It's shown as $79 one-time, with a 30-day refund and 12 months of updates, and the reel says "link in bio".
- This is the creator's own product pitch. I haven't evaluated the plugin, and none of the design advice depends on it.

### On-screen text (short quotes)
"Your dashboard looks AI-made." · "Gradients with nothing to say." · "Four colors, four numbers." · "Same size, same weight." · "When everything floats." · "Welcome back, Jordan." · "Five tells, gone."

---

## Reel 3: "Hick's Law: too many options kills apps"

- **Source:** https://www.instagram.com/reel/Derh6MRlvot/ (Ben Broch, @brochbuilds, "AI SaaS builder", about 39 s).
- **Format:** a talking head with burned-in captions and a fixed white title bar at the top. Under the speaker, a light-themed UI card animates each point: a bad version, a tap, then the fixed version. A small ring timer in the card's top-right corner shows "time to decide". It's red and slow on the cluttered screen (2.8s, 3.4s) and green and fast on the fixed one (0.4s).

### The law and five rules
**Hick's Law** (W. E. Hick, 1952): the time it takes to decide grows with the number of choices. On screen it's given as `RT = a + b·log₂(n + 1)` and drawn as a curve that rises fast and then flattens, while a "What's for dinner?" grid grows from 2 to 4 to 8 to 16 options. The speaker's point is that slow deciders are the ones who leave. He cites Tinder (keep swiping), Snapchat (send a photo to friends) and TikTok (go to the next video) as apps built around one main action.

| # | Rule | ✕ Bad (shown) | ✓ Good (shown) |
|---|---|---|---|
| 1 | Give every screen one obvious main action. | Checkout with a row of equal small buttons (Promo code, Add note, Schedule, Split bill, Send as gift, Place order) | One full-width "Place order · $24.50" button. The extras collapse into a "More options" link underneath |
| 2 | Make the main button look more important than everything around it. | Event invite (Team offsite) with Maybe, Decline, Propose new time and Accept all as identical gray buttons | A solid orange "✓ Accept" button. Maybe, Decline and Propose new time become small text links |
| 3 | Hide advanced options until someone needs them. | Photo editor showing six sliders (exposure, contrast, highlights, shadows, warmth, tint) at once | Two sliders, an "Advanced · 4 more ›" row, and a solid Save button |
| 4 | Never let two buttons look equally important. | "Go Premium" paywall with two identical orange buttons, "Start free trial" and "Subscribe now" | One full-width "Start free trial" button. The other choice drops to secondary text |
| 5 | If an option isn't relevant yet, don't show it. | Empty inbox ("No messages") that still shows a full toolbar of message-action buttons | The empty inbox shows only a centered "Compose" button |

The opening example shows the same idea: a "Welcome back" home screen with 15–32 tiles (Search, Alerts, Settings, Calendar, Files and more) is replaced by one "→ Get started" button. The tile count is crossed out ("~~32 options~~").

![One main action instead of 32 options](uiux-frames/r3-one-action.jpg)
![Hick's Law: 16 options and the decision-time curve](uiux-frames/r3-hicks-law.jpg)
![Rule 1: one "Place order" button, extras hidden](uiux-frames/r3-checkout.jpg)
![Rule 4, the bad case: two equally loud buttons](uiux-frames/r3-equal-buttons.jpg)

### Layout and spacing
- The main action is full width or nearly full width, with generous height. Secondary actions become a single quiet link directly under it ("More options", "Cancel anytime").
- In the invite example the primary button sits on its own and the alternatives are stacked text below it, not buttons in a row.
- The empty state centers one call to action in the empty area.
- Progressive disclosure is done with one summary row ("Advanced · 4 more ›") instead of a separate screen.

### Typography
- Bold black sans for titles ("Checkout", "Go Premium") over a small gray subtitle ("Taco Lab · 3 items · 25–35 min").
- Labels on the left in gray and values right-aligned in dark text ("Tip … 15%").
- The video title bar uses heavy black text on white, and the captions are bold white with a shadow.

### Colors (estimated)
| Role | Hex |
|---|---|
| Card surface | `#f1f4f2` |
| Settings-row fill | `#e7ecea` |
| Primary button orange-red | `#ec583d` |
| Slow timer ring (bad) | `#f72a51` |
| Checkmarks and fast timer (good) | `#59ca98` |
| Premium plan box tint | `#f3edf4` |

### Components shown
Home screen tile grid, checkout summary with key-value rows and an order card, event invitation card with RSVP actions, photo editor with sliders, paywall with plan price and feature checklist, empty inbox with a toolbar, comment sheet with an input and a "Post" button.

### Interaction and animation
- A fingertip taps the target on each mockup. On the bad version it hesitates over the crowd of options. On the good version it goes straight to the main button.
- The decision-time ring drains in red on cluttered screens and stays short and green on the fixed ones.
- The Hick's Law grid doubles step by step while a stopwatch fills and dots climb the curve.

### Before/after comparisons
Every rule is a before/after on the same screen (see the table). The opening "Welcome back" screen, 32 options → 1 "Get started", is the clearest one.

### Tools and apps mentioned
- Tinder, Snapchat and TikTok, cited as single-action apps. They're examples, not tools.
- **Product pitch:** "Comment UX and I'll send you the checklist." The end frames show a "UX checklist for your app" landing page, a "More laws worth knowing" page (Miller's law, Chunking, Cognitive load) and a "One prompt checks your whole app" page for Claude Code or Codex. This is the creator's lead magnet. I didn't request it or evaluate it.

### On-screen text (short quotes)
"Hick's Law: too many options kills apps" · "Welcome back · 1 option" · "What's for dinner?" · "16 options" · "Place order · $24.50" · "Advanced · 4 more" · "No messages"

---

## Reel 4: "Your dashboard, on a phone: 5 spots break at 375px"

- **Source:** https://www.instagram.com/reel/Deq_kvJBI3g/ (@designmotionhq, "UX Patterns · Design + Motion", about 57 s).
- **Format:** the same dark style as Reel 2. A portfolio dashboard is checked on a 375px phone, a red line marks where the 786px page overflows the 375px screen, and five numbered markers show what breaks. Each fix has a red "FIX 0X" chip and a problem headline, then a green chip, a solution headline, and often the CSS line that fixes it. A row of five dots at the bottom fills in as each fix lands.

### The five fixes
| # | What breaks at 375px | Fix | CSS or setting shown |
|---|---|---|---|
| 1 | **Tables:** all six columns stay, so Status, Waiting on and Needed-by are hidden behind a horizontal swipe ("swipe to see status") | Under 640px, each row becomes a card: ID and tag, a status pill, the title, then label/value lines (Needed by, Cost, Approver) | Breakpoint `< 640px : cards` |
| 2 | **Big numbers:** at 48px, "+€5.3M" wraps and the plus sign sits alone on its own line | Keep the figure on one line and cap its size on phones | `.kpi-value { white-space: nowrap; font-variant-numeric: tabular-nums; font-size: 30px; /* max ~30px */ }` |
| 3 | **Inputs:** iOS Safari zooms the page when you tap a field with text under 16px (shown at 14px) | Use 16px input text on phones, plus the right keyboard and autofill hints | `font-size: 16px` · `inputmode="numeric"` · `autocomplete="cc-number"` · `enterkeyhint="next"` |
| 4 | **Touch targets:** a thumb misses 28px Approve/Reject buttons ("28px : missed") | 44px minimum height, but only on touch screens. Mouse layouts stay dense | `@media (pointer: coarse) { min-height: 44px }` |
| 5 | **Bottom bar:** a fixed "2 selected · Approve selected" bar sits under the home indicator and hides the last row of the list | Pad the bar with the safe-area inset and leave space under the content so the last row can scroll clear | `position: fixed; bottom: 0;` → `padding-bottom: env(safe-area-inset-bottom)` |

![Fix 1: under 640px the table becomes cards](uiux-frames/r4-table-to-cards.jpg)
![Fix 2: one line, size capped at about 30px](uiux-frames/r4-big-numbers.jpg)
![Fix 4: 44px targets for coarse pointers only](uiux-frames/r4-touch-targets.jpg)
![Fix 5: safe-area padding under a fixed bar](uiux-frames/r4-safe-area.jpg)

### Layout and spacing
- Reference width is 375px (a common phone width), and the table → card switch happens below 640px.
- The mobile card puts the ID and a status pill on one line, a bold title under them, then label-left / value-right rows. Overdue dates are red ("5 Oct · overdue").
- Touch layouts get taller buttons (44px). Pointer layouts keep compact buttons and the "⋯" overflow menu.
- The fixed action bar needs safe-area padding at the bottom, and the scrolling content needs extra space at its end so the bar never covers the last item.

### Typography
- Same Inter-like geometric sans as Reel 2, with extra-bold white headlines.
- Monospace for IDs (CR-0151 · ASH), code and measurement tags ("48px · wraps", "30px · one line").
- KPI values use tabular numbers. A size slider (16–64) shows the cap moving from 48 down to about 30.
- Input text at 16px minimum on phones, which is a functional rule (it prevents iOS zoom), not only a style choice.

### Colors (estimated)
| Role | Hex |
|---|---|
| Page background | `#090e10` |
| Card surface | `#11161b` |
| Accent green (Approve, fix chips, status pills) | `#1be5ad` (most saturated pixel; the rendered fill reads a little darker) |
| Problem red (FIX chips, "48px · wraps", overdue) | `#da4f68` |
| Primary text | `#fcffff` |
| Muted text | `#666b70` |

The background and text colors match Reel 2 exactly, and both reels pitch the same plugin, so they appear to come from the same creator or studio.

### Components shown
Mobile dashboard (Portfolio, with "Off track" and "At risk" counts and a Forecast vs budget KPI), data table, responsive card list, status pills ("Waiting for decision"), KPI card, card-payment form (name, card number, expiry, CVC) with a numeric keypad, Approve/Reject buttons with an overflow menu, fixed bulk-action bar ("2 selected · Approve selected"), and a code panel (kpi.css).

### Interaction and animation
- A red overflow line slides across to show the page is wider than the screen. A pulsing touch blob shows a missed tap ("28px : missed") and the zoom that happens when the 14px field is tapped ("14px : iOS zoom").
- The table morphs into cards. The plus sign snaps back onto the number's line. The changed CSS lines highlight green with a dot.
- Touch and Mouse panels side by side compare `pointer: coarse` with `pointer: fine`.
- The bottom bar shows a striped overlap zone over the last row, then lifts above the home indicator.

### Before/after comparisons
Every fix is a before → after. Fix 2 shows the two cards side by side ("48px · wraps" vs "30px · one line"), and the end screen is the same 375px dashboard with all five fixes applied.

### Tools and apps mentioned
- **"UX Engine 2.3"**, a Claude Code plugin from the same seller as in Reel 2. A terminal mock shows `> make it responsive` checking every screen at 375px. The reel claims "Inputs that zoom on iOS: UX Engine 2.3 0% · Claude alone 53%" and "Blind duels: 2.3 preferred 20 of 24 vs Claude alone", measured on "8 app screens × 3 runs". "Link in bio".
- This is a product pitch and the numbers are the seller's own. I haven't verified them, and all five fixes are standard CSS/HTML that work without it.

### On-screen text (short quotes)
"Your dashboard, on a phone." · "Five spots break." · "Columns hide behind a swipe." · "The plus sign lands alone." · "Under 16px, iOS zooms in." · "Thumbs miss 28px buttons." · "The bar hides your last row." · "Five fixes, one 375px screen."

---

## Combined takeaways to act on

**Layout and hierarchy**
1. Pick one hero metric per dashboard and make it visibly bigger. Group the rest as secondary. Avoid a grid of identical cards.
2. In horizontal carousels, let the next card peek, roughly a third of a card, so people know they can scroll.
3. Join the steps of a multi-step flow with a connecting line or container so they read as one path with a clear next step.
4. Show fewer options up front, around 6 rather than 24. Make each one larger and give it an obvious selected state. Hick's Law is the reason: decision time grows with every option added.
5. Give every screen one obvious main action, and make it the most prominent thing on the screen (full width, solid accent).
6. Never let two buttons look equally important. Turn the alternatives into secondary buttons or plain text links under the main action (Maybe / Decline under Accept, "Cancel anytime" under the trial button).
7. Hide advanced or not-yet-relevant options. Put advanced settings behind a "N more ›" row, and let an empty state show only the action that fills it (an empty inbox shows Compose, not a bulk-action toolbar).

**Color and surfaces**
8. Use one flat accent color, reserved for the primary action and meaningful states. No decorative gradients.
9. Don't color-code things that aren't categories. Drop per-card icon tiles and let the number carry the card.
10. Separate surfaces with hairline borders, not shadows. Keep shadows for things that float above the page (menus, popovers, dialogs).
11. Scale corner radius to element size, for example cards 12, inputs 8 and badges 6, instead of 16 everywhere.
12. Put a dark backdrop of about 70% behind modals so the page behind loses contrast and the dialog stands alone.

**Content and data**
13. Replace placeholder copy ("Welcome back, Name 👋") with a real title and an explicit period ("Revenue · Aug 1 to Aug 31, 2026").
14. Write deltas against a named baseline ("+12.5% vs Jul"). Use "pt" for changes to a percentage, and don't stamp the same badge on every card.
15. Use tabular figures and right-align currency columns so the decimals line up. Add a sparkline when the trend matters more than the delta.

**Forms and messaging**
16. Fill in what you already know: postcode lookup, autofill and sensible defaults. Count keystrokes, since the reel's example went from 30 to 7.
17. Don't style important warnings like ad banners. Put them inline, in the content the user is already reading, styled like content.
18. On phones, set input text to at least 16px so iOS Safari doesn't zoom when a field is tapped. Add `inputmode`, `autocomplete` and `enterkeyhint` so each field gets the right keyboard and autofill.

**Mobile and responsive**
19. Check every screen at 375px wide. Below about 640px, turn table rows into cards (status pill at the top, label-left / value-right rows) instead of hiding columns behind a horizontal swipe.
20. Keep large figures on one line (`white-space: nowrap`) and cap their size on phones, around 30px, so a sign or unit never wraps onto its own line.
21. Make touch targets at least 44px tall, but only for coarse pointers (`@media (pointer: coarse)`), so mouse layouts can stay dense.
22. Pad fixed bottom bars with `env(safe-area-inset-bottom)` and leave space under the scrolling content so the bar never hides the last row.

**Process**
23. In design reviews, check a screen for the "AI-made" tells (gradients, rainbow icon tiles, uniform cards, shadows and radii everywhere, placeholder copy) before shipping.
24. When you argue for a design change, show a ✕/✓ pair side by side with one number on each (contrast ratio, keystrokes, items visible, seconds to decide). Reels 1 and 3 show how persuasive that format is.
