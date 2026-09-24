import { useState } from 'react'
import { HeroArt, ViewerControls, Tag } from './shared'
import {
  Plus, Eye, SquareCheckFilled, ArrowRight, Rotate3d, CursorSelect, CodeBrackets, Settings02, File01,
  Plug01, StarRound, SettingsRound, Grid, Rocket, Book, Check, Crown, MessageCircle, Users, Lightbulb, Heart,
} from './icons'

const QUICK = [
  { title: 'Create 3D Viewer', desc: 'Build a new 3D viewer for your product or model.', href: '#/add-new/model',
    Icon: Rotate3d, bg: '#ece4ff', color: '#8b5cf6' },
  { title: 'View Demos', desc: 'Explore ready-made demos and templates.', href: '#/dashboard/demos',
    Icon: CursorSelect, bg: '#f2f6ff', color: '#1e60f2', descWidth: 194 },
  { title: 'Shortcode Generator', desc: 'Generate and copy shortcodes to display your viewer.', href: '#/settings/shortcode',
    Icon: CodeBrackets, bg: '#b5ffe7', color: '#046143', descWidth: 208 },
  { title: 'Settings', desc: 'Configure general settings and preferences.', href: '#/settings/general',
    Icon: Settings02, bg: '#f2f6ff', color: '#1e60f2', descWidth: 197 },
  { title: 'Help & Documentation', desc: 'Get support and find helpful guides.', href: '#/dashboard/welcome',
    Icon: File01, bg: '#ece4ff', color: '#8b5cf6', descWidth: 184 },
  { title: 'Extensions', desc: 'Explore more features with premium extensions.', href: '#/dashboard/extensions',
    Icon: Plug01, bg: '#ffefe4', color: '#fd6700', isNew: true },
]

const PREVIEW = { label: 'Preview', bg: '#d1fae5', color: '#10b981' }
const CHANGELOG = [
  { text: 'Added Augmented Reality (AR) support', date: 'Jul 18, 2026', tag: { label: 'AR', bg: '#ecfeff', color: '#06b6d4' },
    icon: <StarRound size={21.25} weight={1.5} color="#8b5cf6" />, large: true },
  { text: 'Improved 3D model preview panel', date: 'Jul 12, 2026', tag: PREVIEW,
    icon: <SettingsRound size={20.75} weight={1.5} color="#1e60f2" /> },
  { text: 'Added Extensions catalog', date: 'Jul 05, 2026', tag: { label: 'Plugin', bg: '#ffedd5', color: '#f97316' },
    icon: <Grid size={20.75} weight={1.5} color="#f97316" /> },
  { text: 'Improved 3D model preview panel', date: 'Jul 12, 2026', tag: PREVIEW,
    icon: <SettingsRound size={20.75} weight={1.5} color="#1e60f2" /> },
]

const BUILDERS = ['Gutenberg', 'Elementor', 'Shortcode']

const STEPS = {
  Gutenberg: [
    ['Add the Block', 'In the Gutenberg block editor, click + or type /3D Viewer to insert the block.'],
    ['Upload & Configure', 'Add your 3D file (glb, gltf, obj) and adjust camera, lights, and layout options.'],
    ['Publish', 'Preview the 3D model, then publish your post or page to showcase it live.'],
  ],
  Elementor: [
    ['Add the Widget', 'In the Elementor editor, search for 3D Viewer and drag the widget onto the page.'],
    ['Upload & Configure', 'Add your 3D file (glb, gltf, obj) and adjust camera, lights, and layout options.'],
    ['Publish', 'Preview the 3D model, then publish your page to showcase it live.'],
  ],
  Shortcode: [
    ['Create a Viewer', 'Go to 3D Viewer → Add New, upload your model and save it.'],
    ['Copy the Shortcode', 'Copy the generated [3d_viewer] shortcode from the viewer list.'],
    ['Paste & Publish', 'Paste the shortcode into any post, page or widget area and publish.'],
  ],
}

const PRO_FEATURES = [
  'Advanced lighting and shadow controls',
  'Interactive hot-spots & annotations',
  'WooCommerce integration ready',
]

const SUPPORT = [
  { title: 'Need any Assistance?', desc: 'Our Expert Support Team is always ready to help you out promptly.',
    cta: 'Contact Support', icon: <MessageCircle size={20} weight={1.5} />, descWidth: 255 },
  { title: 'Join Our Community', desc: 'Get tutorials, plugin updates, and share thoughts with other creators.',
    cta: 'Join Community', icon: <Users size={20} weight={1.5} />, descWidth: 245 },
  { title: 'Request a Feature', desc: 'Have an idea that would make this plugin better? Let us know!',
    cta: 'Submit Idea', icon: <Lightbulb size={20} weight={1.5} />, descWidth: 221 },
  { title: 'Loving This Plugin?', desc: "We're a small team pouring our heart and soul into this plugin.",
    cta: 'Leave a Review', icon: <Heart size={20.98} weight={1.5} color="#f97316" />, descWidth: 226 },
]

function Hero() {
  return (
    <section className="bp3d-dash-hero">
      <div className="bp3d-dash-hero__copy">
        <div className="bp3d-dash-tags">
          <Tag className="bp3d-dash-tag--pill" color="#10b981">Plugin Active</Tag>
          <Tag className="bp3d-dash-tag--pill" color="#475569">Free Plan</Tag>
        </div>

        <div className="bp3d-dash-hero__lede">
          <h1>Welcome to 3D Viewer 👋</h1>
          <p className="bp3d-dash-text">
            Display interactive 3D models on your website with beautiful controls and smooth performance.
          </p>
        </div>

        <div className="bp3d-dash-hero__actions">
          <a href="#/add-new/model" className="bp3d-dash-btn bp3d-dash-btn--primary">
            <Plus size={13.17} weight={1.65} /> Create 3D Viewer
          </a>
          <a href="#/dashboard/demos" className="bp3d-dash-btn bp3d-dash-btn--ghost">
            <Eye size={13.17} weight={1.65} /> View Demos
          </a>
        </div>

        <ul className="bp3d-dash-perks">
          {['Easy to use', 'No coding required', 'Works with any theme'].map((p) => (
            <li key={p} className="bp3d-dash-perk">
              <SquareCheckFilled size={16.46} /> {p}
            </li>
          ))}
        </ul>
      </div>

      <HeroArt
        blobs={[{ left: 422.9, top: -166.55 }, { left: 603.94, top: -34.06 }]}
        model={{ left: 503, top: 48.4 }}
        degree={{ left: 429, top: 119.4 }}
      />
      <ViewerControls
        style={{ left: 677, top: 114.4 }}
        icons={[{ size: 14.37, weight: 1.42 }, { size: 16.2, weight: 1.23 }, { size: 17.85, weight: 1.23 }]}
      />
    </section>
  )
}

function QuickAccess() {
  return (
    <section className="bp3d-dash-quick">
      <header className="bp3d-dash-sechead">
        <h2>Quick Access</h2>
        <p className="bp3d-dash-text">Jump into the most used features and start creating your 3D viewer.</p>
      </header>

      <div className="bp3d-dash-quick__grid">
        {QUICK.map(({ title, desc, href, Icon, bg, color, descWidth, isNew }) => (
          <a key={title} href={href} className="bp3d-dash-qcard">
            <div className="bp3d-dash-qcard__head">
              <span className="bp3d-dash-qcard__icon" style={{ background: bg, color }}>
                <Icon size={19.75} weight={1.23} />
              </span>
              {isNew && <span className="bp3d-dash-new">NEW</span>}
            </div>
            <div className="bp3d-dash-qcard__body">
              <h3 className="bp3d-dash-title">{title}</h3>
              <p className="bp3d-dash-text" style={descWidth && { width: descWidth }}>{desc}</p>
            </div>
            <ArrowRight className="bp3d-dash-qcard__arrow" size={11.52} weight={1.65} />
          </a>
        ))}
      </div>
    </section>
  )
}

function Changelog() {
  return (
    <section className="bp3d-dash-updates">
      <header className="bp3d-dash-updates__head">
        <div className="bp3d-dash-updates__title">
          <h2 className="bp3d-dash-title">Latest Updates &amp; Changelog</h2>
          <Tag bg="#d1fae5" color="#10b981">New</Tag>
        </div>
        <a href="#/dashboard/welcome" className="bp3d-dash-updates__all">View All Updates →</a>
      </header>

      <ul className="bp3d-dash-log">
        {CHANGELOG.map((c, i) => (
          <li key={i} style={{ display: 'contents' }}>
            {i > 0 && <span className="bp3d-dash-log__rule" aria-hidden="true" />}
            <div className="bp3d-dash-log__item">
              <div className="bp3d-dash-log__what">
                <span className={c.large ? 'bp3d-dash-log__icon bp3d-dash-log__icon--lg' : 'bp3d-dash-log__icon'}>
                  {c.icon}
                </span>
                <span className="bp3d-dash-text">{c.text}</span>
                <Tag bg={c.tag.bg} color={c.tag.color}>{c.tag.label}</Tag>
              </div>
              <time className="bp3d-dash-log__when">{c.date}</time>
            </div>
          </li>
        ))}
        <li className="bp3d-dash-log__rule" aria-hidden="true" />
      </ul>
    </section>
  )
}

function GettingStarted() {
  const [builder, setBuilder] = useState('Gutenberg')

  return (
    <section className="bp3d-dash-steps-card">
      <header className="bp3d-dash-steps-card__head">
        <span className="bp3d-dash-steps-card__icon"><Rocket size={16.37} weight={1.5} /></span>
        <div>
          <h2 className="bp3d-dash-title">Getting Started</h2>
          <p className="bp3d-dash-text">Follow these simple setup steps.</p>
        </div>
      </header>

      <div className="bp3d-dash-builders" role="tablist" aria-label="Editor">
        {BUILDERS.map((b) => (
          <button
            key={b}
            type="button"
            role="tab"
            aria-selected={b === builder}
            className={b === builder ? 'bp3d-dash-builder bp3d-dash-builder--on' : 'bp3d-dash-builder'}
            onClick={() => setBuilder(b)}
          >
            {b}
          </button>
        ))}
      </div>

      <ol className="bp3d-dash-steps">
        {STEPS[builder].map(([title, desc], i) => (
          <li key={title} className="bp3d-dash-step">
            <span className="bp3d-dash-step__num">{i + 1}</span>
            <div>
              <h3 className="bp3d-dash-title">{title}</h3>
              <p className="bp3d-dash-text">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function DocsCard() {
  return (
    <section className="bp3d-dash-docs">
      <h2 className="bp3d-dash-docs__title">
        <Book size={16.37} weight={1.82} />
        <span className="bp3d-dash-title">Read the Full Documentation</span>
      </h2>
      <p className="bp3d-dash-text">
        Browse through our guides, settings reference, and examples for every single feature.
      </p>
      <a href="https://bplugins.com/docs/3d-viewer/" target="_blank" rel="noreferrer" className="bp3d-dash-btn bp3d-dash-btn--primary">
        Open Documentation →
      </a>
    </section>
  )
}

function ProCard() {
  return (
    <section className="bp3d-dash-pro">
      <header className="bp3d-dash-pro__head">
        <h2 className="bp3d-dash-title">Go 3D Viewer Pro!</h2>
        <Crown />
      </header>
      <p className="bp3d-dash-pro__sub">Unlock advanced rendering &amp; custom features.</p>
      <ul className="bp3d-dash-pro__list">
        {PRO_FEATURES.map((f) => (
          <li key={f} className="bp3d-dash-text">
            <Check size={10.91} weight={1.82} /> {f}
          </li>
        ))}
      </ul>
      <a href="#/dashboard/pricing" className="bp3d-dash-btn bp3d-dash-btn--primary">View Pricing Plan →</a>
    </section>
  )
}

function Support() {
  return (
    <section className="bp3d-dash-support">
      {SUPPORT.map((s) => (
        <div key={s.title} className="bp3d-dash-support__col">
          <h3 className="bp3d-dash-support__head">
            {s.icon}
            <span className="bp3d-dash-title">{s.title}</span>
          </h3>
          <p className="bp3d-dash-text" style={{ width: s.descWidth }}>{s.desc}</p>
          <button type="button" className="bp3d-dash-btn bp3d-dash-btn--ghost">{s.cta}</button>
        </div>
      ))}
    </section>
  )
}

export default function Welcome() {
  return (
    <>
      <div className="bp3d-dash-home">
        <div className="bp3d-dash-home__main">
          <Hero />
          <QuickAccess />
          <Changelog />
        </div>
        <aside className="bp3d-dash-home__side">
          <GettingStarted />
          <DocsCard />
          <ProCard />
        </aside>
      </div>
      <Support />
    </>
  )
}
