# NOVA Home Care
Live-demo: https://nova-home-care.netlify.app/

A fictional local cleaning and property-care business in Cotonou, Benin — built as a portfolio case study demonstrating full-cycle frontend work: business definition, brand direction, UX/IA, content strategy, a design system, and implementation in semantic HTML, CSS, and vanilla JavaScript.

**This is a fictional case study.** NOVA Home Care is not a real business. Testimonials and team bios are illustrative placeholder content written for this portfolio project, not records of real customers or staff. The hero and gallery photography (credited below) are real, legitimately-licensed stock photos used to represent the intended visual style — they are not photos of an actual NOVA property or an actual NOVA job, and should not be read as such.

## Structure

- `index.html`, `services.html`, `pricing.html`, `about.html`, `gallery.html`, `faq.html`, `quote.html` — the eight-page site (Home, Services, Pricing, About, Gallery, FAQ, Request a Quote; Contact folded into the footer for this build).
- `css/tokens.css` — design tokens (color, type, spacing, motion).
- `css/base.css` — resets and base typography.
- `css/layout.css` — container/grid/section layout.
- `css/components.css` — component styles.
- `css/utilities.css` — small reusable utility classes.
- `js/` — modular vanilla JavaScript, all of it progressive enhancement over a fully functional no-JS baseline.
- `assets/` — images, icons, fonts.
- `fr/` — the complete French mirror of all seven pages (see Localization below).

## Fonts

Sourced from Google Fonts (SIL Open Font License), served locally from `assets/fonts/` — no external font CDN request at runtime.

| Family | File | Weights used | Source |
|---|---|---|---|
| Fraunces | `fraunces-variable.woff2` | 500, 600 (variable font — one file covers both) | fonts.google.com/specimen/Fraunces |
| Work Sans | `work-sans-variable.woff2` | 400, 500, 600 (variable font — one file covers all three) | fonts.google.com/specimen/Work+Sans |
| IBM Plex Mono | `ibm-plex-mono-regular.woff2`, `ibm-plex-mono-medium.woff2` | 400, 500 | fonts.google.com/specimen/IBM+Plex+Mono |

## Photography

Hero and gallery images are licensed via the [Unsplash License](https://unsplash.com/license) (free to use, no attribution legally required — credited here anyway as good practice). All images are unaltered crops of the originals, resized/compressed for web delivery.

| File | Used on | Photographer | Source |
|---|---|---|---|
| `hero-interior.jpg` | Homepage hero | Minh Pham | unsplash.com/photos/a-living-room-filled-with-furniture-and-a-large-window-OtXADkUh3-I |
| `gallery-move-in-move-out.jpg` | Gallery | Francesca Tosolini | unsplash.com/photos/rectangular-brown-wooden-coffee-table-and-gray-3-seat-sofa-DmOhItSo49k |
| `gallery-deep-cleaning.jpg` | Gallery | Bailey Alexander | unsplash.com/photos/a-living-room-filled-with-furniture-and-a-kitchen-PE4pFgcYzoQ |
| `gallery-short-term-rental.jpg` | Gallery | Spacejoy | unsplash.com/photos/gray-and-white-sofa-set-trG8989WjFA |
| `gallery-regular-cleaning.jpg` | Gallery | Francesca Tosolini | unsplash.com/photos/beige-couch-and-armchair-tHkJAMcO3QE |
| `gallery-office-cleaning.jpg` | Gallery | Caroline Badran | unsplash.com/photos/modern-office-with-wooden-accents-and-dual-monitors-KHeILQy5c-k |
| `gallery-process.jpg` | Gallery | Francesca Tosolini | unsplash.com/photos/brown-couch-with-two-white-throw-pillows-lLDh9JppH2c |

**Not yet sourced:** About page team photos remain visual placeholders (`media-placeholder`) — real photography, AI-generated portraits, or illustrated avatars still need to be decided before that page is asset-complete.

## Business model (fictional, designed for this case study)

Every fact below was deliberately chosen to be internally consistent and realistic for a small Cotonou cleaning company — none of it describes a real business.

| Fact | Decision |
|---|---|
| Starting prices | Regular Cleaning 15,000 FCFA · Short-Term Rental Turnover 15,000 FCFA · Office Cleaning 20,000 FCFA · Deep Cleaning 25,000 FCFA · Move-In/Move-Out 30,000 FCFA |
| Recurring discounts | Weekly −15%, Biweekly −10%, Monthly −5% (locked from the start, unchanged) |
| Pricing variables | Property/office size, condition, frequency, or turnaround timing only — no add-on catalog, no hidden fees |
| Satisfaction guarantee | Report an issue within 24 hours → complimentary re-clean of the affected area → applies to the agreed scope, not an automatic refund |
| Operating hours | Monday–Saturday, 7:30 AM–6:00 PM, closed Sundays. Requests outside these hours are answered once NOVA reopens |
| Service area | Cotonou (Akpakpa, Cadjehoun, Fidjrossè, Ganhi, Gbegamey, Haie Vive, Jonquet, Missèbo, Zogbo) plus neighboring Abomey-Calavi and Godomey |
| Property access | Customer present, or an agreed key/access arrangement per visit — NOVA doesn't hold keys indefinitely |
| Supplies & equipment | NOVA brings standard supplies/equipment; unusual products for a specific surface are discussed beforehand |
| Recurring plan changes | Change frequency, pause, or cancel any time with 24 hours' notice before the next visit |
| Single-visit reschedule/cancel | 24 hours' notice, no charge |
| Airbnb turnaround | Same-day turnovers when there's at least a 3-hour gap between checkout and check-in, confirmed by a human in advance |
| Payment | Mobile Money (MTN MoMo or Moov Money) or cash, due on completion; recurring plans billed per visit. No online payment on this static site |

## Fictional contact information — how it was made safe

This project needed contact details that look complete without any risk of reaching a real person:

- **Email** — `hello@novahomecare.example`, using the `.example` top-level domain reserved by [RFC 2606](https://www.rfc-editor.org/rfc/rfc2606) specifically for documentation and demos. It can never resolve to a real registered domain.
- **Phone / WhatsApp** — `+229 00 00 00 00`. There's no internationally standardized "fictional number" range for Benin (unlike, say, the US's 555 convention), so an all-zero subscriber number was used deliberately — that pattern is never assigned to a real line by any telecom numbering plan, which is why it's also the universal convention for placeholder phone numbers. The WhatsApp link (`wa.me/22900000000`) uses the same digits for the same reason.

Both are visually complete and realistic-looking in the UI (nothing reads as "TBD" to a visitor) while being genuinely inert — clicking them will not reach anyone.

## Localization (English / French)

NOVA serves a Francophone city, so the site ships as two full, hand-translated page sets rather than one page with a translation layer:

- `index.html`, `services.html`, `pricing.html`, `about.html`, `gallery.html`, `faq.html`, `quote.html` — English, at the site root.
- `fr/index.html`, `fr/services.html`, `fr/pricing.html`, `fr/about.html`, `fr/gallery.html`, `fr/faq.html`, `fr/quote.html` — French, real HTML pages, not a JS-driven string swap.

**Why real pages instead of a JS toggle:** French works with JavaScript completely disabled — it's just a normal link to a normal page. A client-side language switch would have broken the project's own no-JS baseline for half its visitors.

**Approved terminology** (locked during the Step 8.2 QA pass, so recurring concepts translate the same way everywhere instead of drifting page to page):

| English | Approved French |
|---|---|
| Cleaning | Nettoyage |
| Regular Cleaning | Nettoyage régulier |
| Deep Cleaning | Nettoyage en profondeur |
| Move-In / Move-Out | Emménagement / Déménagement |
| Short-Term Rental Turnover | Nettoyage entre séjours |
| Office Cleaning | Nettoyage de bureaux |
| Recurring Plans | Formules récurrentes |
| Quality Check | Contrôle qualité |
| Checklist | Liste de contrôle |
| Request a Free Quote | Demander un devis gratuit |
| Message on WhatsApp / WhatsApp Us | Nous écrire sur WhatsApp |
| View Services / See full services | Voir tous les services |
| See Pricing | Voir les tarifs |
| See full pricing | Voir tous les tarifs |
| View Details | Voir les détails |
| Request received | Demande reçue |
| Included / Not included | Inclus / Non inclus |

("Nettoyage entre séjours" was chosen over a literal "nettoyage entre locataires" — the latter reads as long-term tenant turnover in French; "entre séjours" ["between stays"] is the term that actually matches short-term/Airbnb-style hosting.)

**What's shared vs. duplicated:** `css/`, `js/`, and `assets/` are not duplicated — every French page reaches them via `../`. Only the HTML content is translated. This also means a design or business-fact change made once in `css/` propagates to both languages automatically; only copy needs to be kept in sync by hand.

**The language switcher** (`EN | FR`) sits in the header, and always links to the *equivalent* page in the other language (e.g., `fr/pricing.html` ↔ `../pricing.html`), not back to a homepage. It's duplicated in the mobile drawer and, on narrow viewports, only shows there — the header-level switcher hides below 1024px because the primary CTA button and the menu button already fill that space; this was caught and fixed during testing (see QA note below).

**`<link rel="alternate" hreflang>`** tags connect each page to its translation and mark English as `x-default`, for correct SEO handling if this were ever deployed to a real domain (the relative paths used here would need to become absolute URLs at that point).

**JavaScript localization:** `navigation.js`, `motion.js`, and `gallery.js` have no user-facing text, so they're unchanged. `quote.js` is the one script that injects text at runtime (validation errors, step progress, the "sending" state) — it reads `document.documentElement.lang` once and picks the matching string set from a small table at the top of the file, so one script correctly serves both `/quote.html` and `/fr/quote.html`.

**Facts are identical in both languages** — prices, hours, the guarantee, service area, and every policy in the Business Model table below are the same numbers/words translated, never re-decided per language. Verified with a cross-language grep audit, not just spot-checked.

## Status

Content, brand direction, UX/IA, design system, photography, the full fictional business model, and English/French localization are locked and internally consistent across every page in both languages. The only remaining placeholder is About-page team photography (see above) — everything else a visitor can ask about (price, scope, hours, guarantee, access, payment, service area) has a real, consistent answer in whichever language they're reading.
