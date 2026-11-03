# Y&M STORE

Phone-first store and back-office for a men's designer-clothing shop with several branches in Alexandria, Egypt.
Three sides in one Next.js app: customer `app/[lang]/(store)`, owner `app/[lang]/admin`, developer `app/[lang]/dev`.
English is default at `/`, complete Arabic at `/ar`. Cash only (delivery or branch pickup) for now.
Folders named here are the target structure; create each one when its module starts.

Read before working:
- `docs/PROJECT.md`: decisions and the reason behind each. Check it before changing any behaviour.
- `docs/ARCHITECTURE.md`: structure, data model, order and stock flows, deploy.
- `docs/MODULES.md`: the build plan. Tick a point there when its check passes.
- `docs/COMPLIANCE.md`: Egyptian consumer law, data protection (PDPL) and tax. Read it when touching prices, checkout, orders, invoices or personal data.

## How to work
1. **Read first.** Trace the real flow end to end before editing. State assumptions. When two readings exist, ask.
2. **Climb the ladder, stop at the first rung that holds:** needed at all? → already in this repo (`lib/`, `server/`, `components/`) → stdlib/Web API → native platform (HTML, CSS, Postgres constraint) → installed dependency → one line → minimum code.
3. **Surgical diffs.** Every changed line traces to the task. Match the surrounding style. Mention unrelated problems; fix only your own.
4. **Done is a passing check.** Non-trivial logic (money, stock, order status, dates, auth, validation) leaves one small `*.test.ts` beside it. UI changes pass the Playwright smoke at 360×800 in `en` and `ar`.

## Where code goes
- `app/` is routing and thin glue. A page reads through `server/`. A colocated `actions.ts` parses input with `lib/validate.ts` and calls `server/`.
- Used by one route: colocate it (`_components/`, `actions.ts`). Used by two or more: `components/` (UI) or `lib/` (pure logic).
- `server/<domain>.ts` is the data access layer, the only code touching the DB, the session or `process.env`.
  - Every file starts with `import "server-only"`.
  - Every admin/dev function calls `requireRole()` itself and returns only the fields the caller needs.
- Mutations run in one transaction with `audit()`.
- Search `lib/` and `server/` before writing a helper, and extend the existing one.
- Server Components by default; `"use client"` only for state or events.

## Code rules
- One function per concern, reused everywhere: `placeOrder`, `setStatus`, `activeProducts`, `formatPrice`, `t`.
- Write plain functions and types. A new abstraction needs a second real caller.
- Validate at trust boundaries with `lib/validate.ts`; trust internal calls.
- Money is integer EGP including VAT. Checkout re-reads prices from the DB.
- Comments say why, in one line. Mark a deliberate shortcut with `// ponytail: <ceiling>, <upgrade path>`.
- Keep to the dependency list in `docs/ARCHITECTURE.md` (Stack). Ask the developer before adding one.

## UI rules
- Design at 360px first, then check 390, 412, 768 and 1280. The page never scrolls sideways, in LTR or RTL.
- Every user-visible string comes from `dictionaries/en.json` and `dictionaries/ar.json`, same key in both.
- Use logical CSS only (`ms-`, `pe-`, `start`, `end`). Numbers and prices stay LTR inside Arabic text.
- Put the main action in a sticky bottom bar with `env(safe-area-inset-bottom)`. Touch targets are at least 44px; inputs are 16px.
- Reuse the tokens and classes in `app/globals.css` (`.btn`, `.field`, `.price`, `.tap`).

## Invariants (legal, keep them intact)
- A product shows on the store only when `status='active'` and `price > 0`, enforced by a DB CHECK.
- Shown prices include VAT. The delivery fee shows before the order is placed.
- The invoice, order confirmation and policies always include Arabic and the seller's legal details from `settings`.
- Personal data is limited to name, phone and address. Developer access to it is audited.

## Commands
Scripts are in `package.json`. Local DB: `docker compose -f docker/compose.yml up -d db`.

## Git
One branch per module (`m3-data-model`). Commit only when the developer asks.
