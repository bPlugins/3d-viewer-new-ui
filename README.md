# 3D Viewer — new UI (React)

Standalone React build of the redesigned 3D Viewer admin UI, to be ported into the
WordPress plugin once the visuals are signed off.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

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
  styles/tokens.css       onboarding design tokens
  styles/admin.css        admin design tokens + admin components
  styles/onboarding.css   onboarding layout + components
  components/             OnboardingLayout, Stepper, Highlights, icons
  screens/                StepModel (1), StepCustomize (2), StepPublish (3)
  admin/                  AdminLayout, TabStrip, SettingRow, controls, icons
  pages/                  AddNew, Settings
```

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

## Design inconsistencies found in the Figma file

Places where the exported frames disagree with each other. Each was resolved toward
the more developed frame and is a one-line change if you want it the other way.

1. **Onboarding card width.** Screens 2 and 3 export a 740px card; screen 1 exports
   686px. Normalised to 740 via `--card-w` so the card does not resize between steps.
   This is why screen 1 below the hero no longer lines up with its own export — the
   hero is `width: 100%`, so a wider card gives a proportionally taller hero.
2. **Onboarding blue.** Screens 2 and 3 use `#3B52F6`; screen 1 uses `#1B5CF0`.
   Standardised on `#3B52F6` (`--primary`); `--primary-alt` holds screen 1's value.
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
6. **Onboarding footer layout.** Screen 2 groups "Upgrade to Pro" beside the primary
   button; screen 3 spreads "Go to Dashboard" evenly between Back and the primary
   button. Both are reproduced as exported, since both read as deliberate.
7. **Add New panel height.** Frames 2–4 hold the panel at 1177px even where the tab
   content is far shorter; frame 1 is 964px. Implemented content-sized with a
   `min-height` on `.wp-editor`, so a short tab cannot collapse the card, but Style
   and Preview end ~190px above their export.
8. **Settings panel height.** All four settings frames hold the panel at exactly
   963px, so that one *is* implemented as a `min-height`.
9. **Model (8) — WooCommerce Selectors.** The frame shows "Shortcode Generator" as
   the active tab while displaying selector content; implemented with the correct
   tab active, which is the single largest remaining diff on that screen (0.88 %).
   Its rows are also spaced at a 100px pitch against 74px on every other settings
   tab. Matched, via `.wp-rows--loose` — delete that one class to make the tab
   consistent with the rest of the page.
10. **Setting row pitch.** The Add New panel exports its rows at a 72px pitch and the
    Settings page at 74px, so `.wp-editor .wp-row` carries a slightly tighter padding
    than `.wp-row`. Both now match their own export.
11. **Action-bar button height.** Model (5) exports the Save/Reset buttons at 44px
    tall, Model (6) and (7) at 40px. Implemented at 40px (the majority), so the
    General tab's action bar sits 4px shorter than its own export.
12. **Row description line-height.** Model (2) exports a 2-line setting row at 92px
    and Model (3) at 94px — the same component, 1px apart per description line.
    Implemented at 20px line-height, so the Style tab's four rows drift ~2px each.
13. **Card padding.** The Model tab's cards inset their content by 19px; the
    Settings/Style cards inset by 29px on the left and 13px on the right. Carried as
    a `.wp-card--rows` modifier rather than normalised, since both are visible.
14. **Decorative blob.** `onboarding-bg.png` is placed at a slightly different size
    and offset in each onboarding frame. Anchored bottom-right using screen 3's.

## Assets

`public/assets/` holds the three images the UI loads:

- `onboarding-image.png`, `onboarding-bg.png` — copied from `assets/images/`
- `model-preview.jpg` — the headphones photo, extracted from the original
  `.fig` archive rather than cropped from a screenshot, so it is full resolution

`assets/images/figma/` holds the reference exports; they are not bundled.
