import { useMemo, useState } from 'react'
import { BillingToggle, FEATURES } from './Pricing'
import { SearchField, Tag } from './shared'
import { CircleX, Check, List } from './icons'

const DETAILS = [
  'Add the 3D viewer using Gutenberg block.',
  'Works with all major 3D model formats.',
  'Load models from any external source.',
  'Display 3D models on product pages.',
  'Interactive 3D viewing controls.',
  'Load models only when needed.',
  'Show a preview image before the 3D model loads.',
  'Keep users informed during loading.',
  'Show exact loading percentage.',
  'Turn on or off model movement.',
  'Use with Elementor and more add-ons.',
  'Toggle fullscreen button visibility.',
  'Save and reuse your settings.',
  'Enable automatic rotation.',
  'Advanced viewer settings in Elementor.',
  'Create galleries with multiple models.',
  'Show different models for each variant.',
  'Control lighting and visual effects.',
  'More control over viewer behavior.',
  'Create the best initial view for your audience.',
]

/* The first 11 rows ship in Free; the rest are Pro only. */
const FREE_COUNT = 11
const ROWS = FEATURES.map((name, i) => ({ name, desc: DETAILS[i], free: i < FREE_COUNT }))

function Mark({ yes }) {
  return yes ? (
    <span className="bp3d-dash-yes" aria-label="Included"><Check size={9.88} weight={2.47} /></span>
  ) : (
    <span className="bp3d-dash-no" aria-label="Not included"><CircleX size={8.23} weight={2.47} /></span>
  )
}

function Tiers() {
  return (
    <div className="bp3d-dash-tiers">
      <article className="bp3d-dash-tier">
        <div className="bp3d-dash-tier__top">
          <Tag className="bp3d-dash-tag--tight" bg="#e6fbf3" color="#10b981">Free</Tag>
          <div>
            <h2>Free</h2>
            <p className="bp3d-dash-text">Essential features to get you started.</p>
          </div>
        </div>
        <div className="bp3d-dash-tier__price">
          <span className="bp3d-dash-tier__amt">$0</span>
          <span className="bp3d-dash-text">/ forever</span>
        </div>
        <div className="bp3d-dash-tier__note">
          <CircleX size={19.75} weight={1.65} />
          <span className="bp3d-dash-text">Includes core 3D viewer mechanics</span>
        </div>
        <div className="bp3d-dash-btn bp3d-dash-tier__cta">
          <Check size={13.17} weight={2.47} /> You Already Have It
        </div>
      </article>

      <article className="bp3d-dash-tier bp3d-dash-tier--pro">
        <div className="bp3d-dash-tier__top">
          <Tag bg="rgba(255,255,255,.2)" color="#fff" className="bp3d-dash-tag--tight">Pro</Tag>
          <div>
            <h2>Pro</h2>
            <p className="bp3d-dash-tier__desc">Advanced features and priority support for professionals.</p>
          </div>
        </div>
        <div className="bp3d-dash-tier__price">
          <span className="bp3d-dash-tier__amt">$59.99</span>
          <span className="bp3d-dash-tier__per">/ yr</span>
          <s className="bp3d-dash-tier__per">$69.99</s>
          <span className="bp3d-dash-tier__save">Save 15%</span>
        </div>
        <div className="bp3d-dash-tier__note">
          <CircleX size={19.75} weight={1.65} />
          <span className="bp3d-dash-text">Unlocks all Pro features instantly</span>
        </div>
        <a href="#/dashboard/pricing" className="bp3d-dash-btn bp3d-dash-tier__cta">Get Pro now →</a>
      </article>
    </div>
  )
}

export default function Compare() {
  const [billing, setBilling] = useState('yearly')
  const [query, setQuery] = useState('')

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? ROWS.filter((r) => `${r.name} ${r.desc}`.toLowerCase().includes(q)) : ROWS
  }, [query])

  const proOnly = ROWS.length - FREE_COUNT

  return (
    <>
      <header className="bp3d-dash-intro bp3d-dash-intro--compare">
        <span className="bp3d-dash-intro__badge">Pricing</span>
        <h1>Free vs Pro at a glance</h1>
        <p className="bp3d-dash-text">
          See exactly what unlocks when you upgrade. {proOnly} features are exclusive to Pro.
        </p>
        <BillingToggle
          value={billing}
          onChange={setBilling}
          options={[
            { id: 'monthly', label: 'Monthly' },
            { id: 'yearly', label: 'Yearly', save: 'Save 17%' },
            { id: 'lifetime', label: 'Lifetime' },
          ]}
        />
      </header>

      <div>
        <Tiers />

        <section className="bp3d-dash-matrix">
          <div className="bp3d-dash-matrix__meta">
            <div>
              <div className="bp3d-dash-matrix__title">
                <span className="bp3d-dash-matrix__glyph"><List size={11.52} weight={1.65} /></span>
                <h2>Feature Breakdown</h2>
              </div>
              <p className="bp3d-dash-text">Compare what's included in Free and Pro plans.</p>
            </div>
            <SearchField placeholder="Search features..." iconSize={13.17} weight={1.65} value={query} onChange={setQuery} />
          </div>

          <div className="bp3d-dash-table" role="table" aria-label="Free vs Pro features">
            <div className="bp3d-dash-table__row bp3d-dash-table__head" role="row">
              <span className="bp3d-dash-table__feat bp3d-dash-text" role="columnheader">FEATURE</span>
              <span className="bp3d-dash-table__col bp3d-dash-text" role="columnheader">FREE</span>
              <span className="bp3d-dash-table__pro bp3d-dash-text" role="columnheader">PRO</span>
            </div>
            {rows.map((r) => (
              <div key={r.name} className="bp3d-dash-table__row" role="row">
                <div className="bp3d-dash-table__feat" role="cell">
                  <div className="bp3d-dash-table__name">
                    <span className="bp3d-dash-title">{r.name}</span>
                    {!r.free && (
                      <Tag className="bp3d-dash-tag--tight" bg="#f3f6ff" color="#1b5cf0">Pro only</Tag>
                    )}
                  </div>
                  <p className="bp3d-dash-text">{r.desc}</p>
                </div>
                <span className="bp3d-dash-table__col" role="cell"><Mark yes={r.free} /></span>
                <span className="bp3d-dash-table__col" role="cell"><Mark yes /></span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
