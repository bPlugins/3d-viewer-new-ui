# 3D Viewer — new UI (React)

Standalone React build of the redesigned 3D Viewer admin UI, to be ported into the
WordPress plugin once the visuals are signed off.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # writes to docs/, see "Hosting" below
```

**Live:** https://bplugins.github.io/3d-viewer-new-ui/

## Hosting

Served as a GitHub Pages *project* page from `main` / `docs`, no build step on
GitHub's side — `npm run build` writes straight into `docs/`, which is committed.

- `vite.config.js` sets `base: '/3d-viewer-new-ui/'` so every emitted asset URL
  carries the repo name. Get that wrong and the page loads with no JS/CSS: view
  source and you'd see requests for `/assets/…` (site root) instead of
  `/3d-viewer-new-ui/assets/…` (Pages URL).
- `src/lib/paths.js` exports `asset(path)`, used everywhere an `<img>` points at
  something in `public/assets/` (`OnboardingLayout`, `StepModel`, `AddNew`'s
  `PREVIEW_SRC`). It resolves against `import.meta.env.BASE_URL` instead of a
  hardcoded `/assets/…`, for the same reason.
- `public/.nojekyll` stops GitHub Pages running the build through Jekyll.
- Routing is hash-based already (`#/onboarding/1`, …), which is what makes a
  project page this simple: everything before the `#` is just the Pages URL, so
  there's no server-side rewrite to configure and no 404.html trick needed —
  unlike path-based routing, which breaks on a refresh of any route but `/`.

To deploy a change: `npm run build`, commit the updated `docs/`, push `main`.
First-time setup on GitHub: **Settings → Pages → Source: Deploy from a branch →
Branch: `main` / `docs`**.

## Routes

Hash routing, deliberately tiny — the plugin will own real routing.

| URL | Screen |
| --- | --- |
| `#/onboarding/1` … `/3` | Onboarding: Model · Customize · Publish |
| `#/add-new/model` · `settings` · `style` · `preview` | Add New (4 tabs) |
| `#/settings/general` · `woo` · `shortcode` · `selectors` | 3D Viewer Settings (4 tabs) |

## Stack

Plain React 18 + Vite, hand-written CSS. No UI library, no CSS framework, no icon
package — icons are inline SVG so nothing extra has to be bundled when this moves
into the plugin.

```
src/
  styles/base.css         .bp3d-app scope: resets + wp-admin hardening
  styles/tokens.css       onboarding design tokens
  styles/admin.css        admin design tokens + admin components
  styles/onboarding.css   onboarding layout + components
  styles/wp-chrome.css    mock wp-admin chrome (preview only)
  components/             OnboardingLayout, Stepper, Highlights, icons
  screens/                StepModel (1), StepCustomize (2), StepPublish (3)
  admin/                  AdminLayout, TabStrip, SettingRow, controls, icons
  admin/WpChrome.jsx      mock admin bar + admin menu (preview only)
  pages/                  AddNew, Settings
```

## Naming — everything is `bp3d`

This UI is going to render inside wp-admin, next to WordPress core's own CSS and
whatever every other active plugin enqueues, so nothing it defines may be a name
anyone else could plausibly pick. One prefix, no exceptions:

| | pattern | examples |
| --- | --- | --- |
| admin classes | `bp3d-*` | `.bp3d-panel`, `.bp3d-row__title`, `.bp3d-btn--save` |
| onboarding classes | `bp3d-ob-*` | `.bp3d-ob-card`, `.bp3d-ob-stepper__dot` |
| admin tokens | `--bp3d-*` | `--bp3d-primary`, `--bp3d-row-desc` |
| onboarding tokens | `--bp3d-ob-*` | `--bp3d-ob-card-w`, `--bp3d-ob-step-active` |
| shared tokens | `--bp3d-*` | `--bp3d-font`, `--bp3d-viewport` |
| mount node | `#bp3d-root` | |

BEM modifiers still use `--`, so `.bp3d-btn--primary` is the *primary* modifier
of `.bp3d-btn`, not a custom property. The two never collide because custom
properties only ever appear after `--bp3d`.

These replace the previous `wp-*` / `ob-*` names. `wp-` in particular was a
collision waiting to happen: WordPress core already ships `.wp-editor-container`,
`.wp-core-ui`, `.wp-badge` and dozens more, and this UI had its own `.wp-editor`.

## Scoping — `.bp3d-app`

`App` renders a single `<div class="bp3d-app">` around everything, and that class
is the whole contract with wp-admin. It works in both directions:

- **Nothing leaks out.** No stylesheet here may select `html`, `body` or a bare
  element outside `.bp3d-app`. The design tokens live on `.bp3d-app`, not
  `:root`, so they are not visible to the rest of the admin page either.
- **Nothing leaks in.** wp-admin styles bare elements globally — `p`,
  `h1`–`h6`, `ul`, `select`, `input[type=…]`. `base.css` restates the browser
  defaults this UI was measured against for each of them.

The specificity is deliberate and the ordering matters:

| selector | specificity | beats | loses to |
| --- | --- | --- | --- |
| `.bp3d-app :where(p)` | `(0,1,0)` | wp-admin's `p` `(0,0,1)` | `.bp3d-row__desc` `(0,1,0)`, on source order |
| `.bp3d-app input` | `(0,1,1)` | wp-admin's `input[type=text]` `(0,1,1)` | — it outranks component classes |

So `base.css` **must** be imported before `onboarding.css` and `admin.css` — it
relies on losing the tie to component rules. And the `(0,1,1)` block at the
bottom of `base.css` may only ever name properties no component sets, because
nothing in this UI can override it.

Plain `:where(.bp3d-app) :where(p)` does *not* work here: at zero specificity
wp-admin's `p { line-height: 1.5 }` wins, which silently reflows every
description row in the Settings screens.

`.bp3d-app` also carries `--bp3d-viewport`, which the two full-height screens use
instead of `100vh`. Under `body.wp-admin` it drops to `calc(100vh - 32px)` for
the toolbar, and the wrapper takes negative margins to bleed back out of
`#wpcontent`'s gutter and `#wpbody-content`'s footer padding.

`global.css` is the standalone harness only — `html`/`body` for `npm run dev`.
It is not part of what gets ported.

### Mock wp-admin chrome

Every screen renders inside a fake WordPress shell — admin bar across the top,
admin menu down the left — so the preview reads the way the plugin will in place.
`WpChrome.jsx` plus `wp-chrome.css`, using WordPress's own metrics and "fresh"
scheme colours: 32px bar, 160px menu folding to 36px under 960px, `#1D2327`
chrome, `#2C3338` hover/submenu, `#2271B1` current, `#72AEE6` links. Class names
mirror WordPress's (`#wpadminbar` → `.bp3d-adminbar`, `#adminmenu` →
`.bp3d-adminmenu`, `#wpcontent` → `.bp3d-wpcontent`) so the swap is obvious.

The 3D Viewer submenu carries the three live routes — **Add New**, **Settings**
and **Onboarding** — and highlights whichever one matches the current hash.
`All 3D Viewers`, `Presets` and `Help & Demos` are inert placeholders, there to
make the menu read like a real plugin's.

The menu icons in `admin/wpIcons.jsx` are hand-drawn approximations of Dashicons
in the same visual language, not copies of the Dashicons paths.

Two things follow from the chrome:

- **`?chrome=0` turns it off.** The fidelity table below was measured against
  exports that only ever showed the content column, so the diffs have to be run
  without the shell. `http://localhost:5173/?chrome=0#/add-new/model`. Verified
  to render pixel-identically to the build that preceded the chrome.
- **View at ≥1440px** to see the screens at their designed width. The content
  well is the window minus the 160px menu, and the layout was drawn for a 1280px
  column — so 1440 gives it exactly that, where 1280 squeezes it to 1120.

The shell re-points `--bp3d-viewport` at `calc(100vh - 32px)`, which is the whole
reason both full-height screens (`.bp3d-admin`, `.bp3d-ob-page`) fit the well
without either of them knowing the chrome exists.

### Still to do when porting

- `AdminLayout` renders mock WordPress chrome (screen options, admin notice,
  footer), and `WpChrome` wraps the screens in a fake admin bar and menu.
  WordPress supplies all of that; drop both. The plugin only registers its menu
  entry and renders into `#wpbody-content`.
- Image `src`s are absolute `/assets/…` paths. They need to come from
  `plugins_url()`, passed in via `wp_localize_script`.
- Inter is loaded from Google Fonts in `index.html`; that becomes a
  `wp_enqueue_style` call, or a bundled font.

## How the values were derived

The Figma MCP connector is not authorised in this workspace, and `information.md`
stops mid-sentence at `### header (h2)` — it only ever specifies two text styles.
So every number in the token files was measured off the 1x PNG exports in
`assets/images/figma/`, then verified by rendering each screen headlessly at the
same viewport and diffing it against its export band by band.

The two styles `information.md` *does* specify both check out against the exports:

| style | spec | measured |
| --- | --- | --- |
| paragraph | Inter 500 / 14px / 140% / 0 tracking | 20px line pitch = 14 × 1.4 ✓ |
| card-header (h4) | Inter 600 / 14px / 130% / 0 tracking | 10px cap height = 14px Inter ✓ |

### Onboarding (`tokens.css`)

| token | value |
| --- | --- |
| page background | `#EEF1FA` |
| card | 740 × auto, 38px padding, 12px radius, 1px `#CDEEFF`, no shadow |
| brand pill | 194 × 55, 42px from page top, 48px above the card |
| h2 | Inter 700 / 30px / 1.2 / −0.005em, `#0F172A` |
| eyebrow | 16px `#475569` (screens 1 & 3) · 12px `#94A3B8` (screen 2) |
| stepper | 24px dot, active `#2563EB`, idle `#F0F4FA`/`#475569`, 51 × 2px connector |
| primary button | 45px tall, 8px radius, `#3B52F6` |

### Admin (`admin.css`)

| token | value |
| --- | --- |
| page background | `#F8F9FA`, 1185px container, 48px gutters |
| panel / card | white, 1px `#E5E7EB`, 10px radius, 19px panel padding |
| tab strip | `#F5F8FF`, 44px pills, active `#1B5CF0` |
| page title | 30px `#111827` (Add New) · 22px `#000` (Settings) |
| setting row | 72–74px pitch, 40px icon tile, 14px title / 14px desc `#6B7280` |
| toggle | 41 × 24, on `#10B981`, off `#FDA4AF`, destructive `#EF4444` |
| buttons | Publish/tabs `#1B5CF0`, Save Changes `#3B52F6`, Reset `#E5FFF1`/`#00A44C`, Reset All `#FCDDDD`/`#EF4444` |
| MIME tile | 178 × 50, 14px gutter, checked fill `#F4F6F8`, check `#00BF7C` |
| Live Preview card | header 47 · 12 · stage 337 × 193 · 11 · controls 56; divider at each block edge, 15px side inset, 32px control chips `#F9FAFB` 12px apart (header button has no chip) |

## Fidelity

Every screen is rendered headlessly at 1280px wide and at the export's own height,
then compared to its export with an antialiasing-tolerant pixel diff: a pixel only
counts as different if it has no match anywhere in a 1px neighbourhood of the other
image (threshold 40/255, both directions). That cancels out font-rasteriser halos
and sub-pixel rounding, so what remains is genuine layout or colour difference.

`% UI` excludes the photographic assets (the decorative blob, the chair hero, the
headphones preview), which cannot match exactly — they are scaled and cropped, and
the blob is hand-placed differently in each onboarding frame.

| Screen | % UI different | notes |
| --- | --- | --- |
| Settings — Shortcode | **0.10 %** | |
| Onboarding 3 — Publish | **0.11 %** | |
| Add New — Model | **0.11 %** | |
| Onboarding 2 — Customize | **0.13 %** | |
| Settings — Woo | **0.13 %** | |
| Settings — General | **0.21 %** | action-bar button height, see 11 |
| Add New — Style | **0.25 %** | 2-line row height, see 12 |
| Add New — Settings | **0.28 %** | 2-line row height, see 12 |
| Add New — Preview | **0.28 %** | |
| Settings — Selectors | 0.95 % | 0.88 % of it is Figma's wrong active tab, see 9 |
| Onboarding 1 — Model | 1.14 % | card-width normalisation, see 1 |

Reproduce with the scripts used to build this table — render each route, then run
the tolerant diff against `assets/images/figma/`.

The `bp3d` rename and the `.bp3d-app` scoping were checked the same way, against
the build that preceded them rather than against Figma. All eleven routes come
out **byte-identical** standalone, and identical again under the same tolerant
diff when rendered inside a page carrying wp-admin's global stylesheet rules,
body classes and `#wpwrap` / `#wpcontent` / `#wpbody-content` nesting.

## Design inconsistencies found in the Figma file

Places where the exported frames disagree with each other. Each was resolved toward
the more developed frame and is a one-line change if you want it the other way.

1. **Onboarding card width.** Screens 2 and 3 export a 740px card; screen 1 exports
   686px. Normalised to 740 via `--bp3d-ob-card-w` so the card does not resize between steps.
   This is why screen 1 below the hero no longer lines up with its own export — the
   hero is `width: 100%`, so a wider card gives a proportionally taller hero.
2. **Onboarding blue.** Screens 2 and 3 use `#3B52F6`; screen 1 uses `#1B5CF0`.
   Standardised on `#3B52F6` (`--bp3d-ob-primary`); `--bp3d-ob-primary-alt` holds screen 1's value.
3. **Admin blues.** Two are in use and both were kept, because each is consistent
   across frames: `#1B5CF0` for tabs / Enable / Publish / the shortcode chip, and
   `#3B52F6` for Save Changes and Save Change.
4. **Highlight body text boxes.** In onboarding screen 3 the "Easy Setup" column
   wraps at a ~140px text box while "Interactive Experience" needs ~152px — the
   Figma text layers are hand-sized. Implemented as one consistent 3-column grid, so
   "Easy Setup" breaks after "model" instead of after "3D". Columns 2 and 3 match
   the export exactly.
5. **Feature card widths.** In onboarding screen 2 the last card ("And much more")
   exports 9px wider than the cards above it. Implemented at a consistent width.
6. **Onboarding footer layout.** Figma exports screen 2 with "Upgrade to Pro"
   grouped beside the primary button, and screen 3 with "Go to Dashboard" spread
   evenly between Back and the primary button — via `.bp3d-ob-footer__end`, only
   screen 2 wrapped its link with the button. Unified on screen 2's grouping:
   screen 3's `Go to Dashboard` now sits in the same wrapper, next to `Add Your
   First 3D Model`, rather than centered in the row.
7. **Add New panel height.** Frames 2–4 hold the panel at 1177px even where the tab
   content is far shorter; frame 1 is 964px. Implemented content-sized with a
   `min-height` on `.bp3d-editor`, so a short tab cannot collapse the card, but Style
   and Preview end ~190px above their export.
8. **Settings panel height.** All four settings frames hold the panel at exactly
   963px, so that one *is* implemented as a `min-height`.
9. **Model (8) — WooCommerce Selectors.** The frame shows "Shortcode Generator" as
   the active tab while displaying selector content; implemented with the correct
   tab active, which is the single largest remaining diff on that screen (0.88 %).
   Its rows are also spaced at a 100px pitch against 74px on every other settings
   tab. Matched, via `.bp3d-rows--loose` — delete that one class to make the tab
   consistent with the rest of the page.
10. **Setting row pitch.** The Add New panel exports its rows at a 72px pitch and the
    Settings page at 74px, so `.bp3d-editor .bp3d-row` carries a slightly tighter padding
    than `.bp3d-row`. Both now match their own export.
11. **Action-bar button height.** Model (5) exports the Save/Reset buttons at 44px
    tall, Model (6) and (7) at 40px. Implemented at 40px (the majority), so the
    General tab's action bar sits 4px shorter than its own export.
12. **Row description line-height.** Model (2) exports a 2-line setting row at 92px
    and Model (3) at 94px — the same component, 1px apart per description line.
    Implemented at 20px line-height, so the Style tab's four rows drift ~2px each.
13. **Card padding.** The Model tab's cards inset their content by 19px; the
    Settings/Style cards inset by 29px on the left and 13px on the right. Carried as
    a `.bp3d-card--rows` modifier rather than normalised, since both are visible.
14. **Decorative blob.** `onboarding-bg.png` is placed at a slightly different size
    and offset in each onboarding frame. Anchored bottom-right with its visible edge
    flush with the page bottom, as screen 1 exports it (screens 2 and 3 leave a
    25px gap). The PNG has ~67px of transparent padding below the shape, hence
    `bottom: -67px`.

    It's `position: fixed`, not `absolute` — pinned to the *viewport* corner,
    not the page. Steps 2 and 3 run to 1120–1393px of content, taller than most
    browser windows, so an absolutely-positioned blob would sit at the bottom of
    that whole scrollable page and never be seen without scrolling all the way
    down. Fixed keeps it in view the whole time, like a background. Confirmed
    with a scroll-and-screenshot test (window shorter than the page, captured at
    two scroll offsets): the blob is pixel-identical at both, while the content
    behind it scrolls normally.

## Assets

`public/assets/` holds the three images the UI loads:

- `onboarding-image.png`, `onboarding-bg.png` — copied from `assets/images/`
- `model-preview.jpg` — the headphones photo, extracted from the original
  `.fig` archive rather than cropped from a screenshot, so it is full resolution

`assets/images/figma/` holds the reference exports; they are not bundled.
