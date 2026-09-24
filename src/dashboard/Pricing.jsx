import { useState } from 'react'
import { Star, Check, ArrowRight, ShieldCheck, RefreshCw, Headset, Lock, ChevronUp, ChevronDown } from './icons'

export const FEATURES = [
  'Gutenberg Block',
  'Supports Popular 3D Formats (GLB, GLTF, OBJ, STL, and more)',
  'Support for external model URLs',
  'Show 3D product on your WooCommerce product pages',
  'Touch, Pan, Zoom & Rotate controls',
  'Lazy Loading for Performance',
  'Add a poster image to show while the model is loading (Lite View)',
  'Display a progress bar until the 3D file is fully loaded',
  'Display loading progress as a percentage',
  'Enable/Disable moving control',
  'Elementor Widget/Addons',
  'Show/Hide Fullscreen Button on the Viewer',
  'Preset to save your preferred viewer configurations',
  'Auto-Rotation to view in 360° without interaction',
  'Full viewer settings on Elementor widget/addons',
  'Add multiple 3D models into a single viewer gallery',
  'Add 3D models for each variant for the WooCommerce product',
  'Adjust lighting, shadow intensity, and exposure',
  'Enable or disable auto-rotate, and autoplay',
  'Set a custom camera angle for the perfect first impression',
]

const PLANS = [
  { id: 'pro', name: 'Pro', flag: 'Most Popular', blurb: 'Included Some Awesome Premium Features.',
    price: '59.99', was: '$69.99 per site', save: 'Save $30', billed: 'Billed yearly • $5.00/mo', features: FEATURES },
  { id: 'max', name: 'Max', blurb: 'Included All the Premium Extensions.',
    price: '83.88', was: '$99.99 per site', save: 'Save $16', billed: 'Billed yearly • $6.99/mo',
    features: [...FEATURES, 'Included All the Premium Extensions'] },
]

const SITES = ['Single Site', '3 Sites', 'Unlimited Sites']

const ASSURANCES = [
  { title: '14 days money back', sub: 'Risk-free purchase', Icon: ShieldCheck },
  { title: 'Plugins updates', sub: 'On every plan', Icon: RefreshCw, color: '#8b5cf6' },
  { title: 'Priority support', sub: 'Get help when you need it', Icon: Headset },
  { title: 'Secure checkout', sub: 'Powered by Freemius', Icon: Lock },
]

/* Only the first answer is in the file; the other two are placeholder copy. */
const FAQ = [
  ['Can I upgrade my plan later?',
    'Yes — you can upgrade any time from your account. We prorate the difference automatically.'],
  ['What happens after my license expires?',
    'The plugin keeps working with everything you have set up — you just stop receiving updates and priority support until you renew.'],
  ['Do you offer refunds?',
    'Yes — every plan comes with a 14-day money-back guarantee, no questions asked.'],
]

export function BillingToggle({ options, value, onChange, className = '' }) {
  return (
    <div className={`bp3d-dash-billing ${className}`} role="radiogroup" aria-label="Billing period">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={o.id === value}
          className={`bp3d-dash-billing__opt bp3d-dash-billing__opt--${o.id}${o.id === value ? ' bp3d-dash-billing__opt--on' : ''}`}
          onClick={() => onChange(o.id)}
        >
          {o.label}
          {o.save && <span className="bp3d-dash-billing__save">{o.save}</span>}
        </button>
      ))}
    </div>
  )
}

function Plan({ plan }) {
  const [site, setSite] = useState(SITES[0])
  const isPro = plan.id === 'pro'

  return (
    <article className={isPro ? 'bp3d-dash-plan' : 'bp3d-dash-plan bp3d-dash-plan--max'}>
      <header className="bp3d-dash-plan__head">
        {plan.flag ? (
          <span className="bp3d-dash-plan__flag"><Star size={11.1} weight={1.5} /> {plan.flag}</span>
        ) : (
          <span className="bp3d-dash-plan__flag bp3d-dash-plan__flag--blank" aria-hidden="true" />
        )}
        <h2>{plan.name}</h2>
        <p className="bp3d-dash-text">{plan.blurb}</p>
      </header>

      <div className="bp3d-dash-sites" role="radiogroup" aria-label={`${plan.name} sites`}>
        {SITES.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={s === site}
            className={s === site ? 'bp3d-dash-sites__on' : undefined}
            onClick={() => setSite(s)}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bp3d-dash-price">
        <div className="bp3d-dash-price__main">
          <span className="bp3d-dash-price__cur">$</span>
          <span className="bp3d-dash-price__amt">{plan.price}</span>
          <span className="bp3d-dash-price__per">/ yr</span>
        </div>
        <div className="bp3d-dash-price__was">
          <s>{plan.was}</s>
          <span className="bp3d-dash-price__save">{plan.save}</span>
        </div>
        <p className="bp3d-dash-text">{plan.billed}</p>
      </div>

      <div className="bp3d-dash-plan__rule" aria-hidden="true" />

      <ul className="bp3d-dash-plan__feats">
        {plan.features.map((f) => (
          <li key={f} className="bp3d-dash-text">
            <span className="bp3d-dash-tick"><Check size={9.25} weight={1.85} /></span>
            {f}
          </li>
        ))}
      </ul>

      <a href="https://bplugins.com/products/3d-viewer/#pricing" target="_blank" rel="noreferrer" className="bp3d-dash-btn bp3d-dash-plan__buy">
        Buy Now <ArrowRight size={12.95} weight={1.85} />
      </a>
    </article>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section className="bp3d-dash-faq">
      <header className="bp3d-dash-faq__head">
        <h2>Frequently asked questions</h2>
        <p className="bp3d-dash-text">Find quick answers to common questions about our pricing and plans.</p>
      </header>
      <div className="bp3d-dash-faq__list">
        {FAQ.map(([q, a], i) => (
          <div key={q} className="bp3d-dash-faq__item">
            <button
              type="button"
              className="bp3d-dash-faq__q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <span className="bp3d-dash-title">{q}</span>
              {open === i ? <ChevronUp size={16} weight={2} /> : <ChevronDown size={16} weight={2} />}
            </button>
            {open === i && <p className="bp3d-dash-text">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Pricing() {
  const [billing, setBilling] = useState('yearly')

  return (
    <>
      <header className="bp3d-dash-intro">
        <span className="bp3d-dash-intro__badge">Pricing</span>
        <h1>Pick the plan that fits your project</h1>
        <p className="bp3d-dash-text">
          Unlock more features, get better control and take your 3D viewer experience to the next level. Choose a
          plan that works for you.
        </p>
        <BillingToggle
          value={billing}
          onChange={setBilling}
          options={[
            { id: 'yearly', label: 'Yearly', save: 'Save 17%' },
            { id: 'lifetime', label: 'Lifetime' },
          ]}
        />
      </header>

      <div className="bp3d-dash-plans">
        {PLANS.map((p) => <Plan key={p.id} plan={p} />)}
      </div>

      <div className="bp3d-dash-after">
        <div className="bp3d-dash-assure">
          {ASSURANCES.map(({ title, sub, Icon, color }) => (
            <div key={title} className="bp3d-dash-assure__card">
              <span className="bp3d-dash-assure__icon" style={color && { color }}>
                <Icon size={20.7} weight={2.07} />
              </span>
              <div>
                <h3 className="bp3d-dash-title">{title}</h3>
                <p className="bp3d-dash-text">{sub}</p>
              </div>
            </div>
          ))}
        </div>
        <Faq />
      </div>
    </>
  )
}
