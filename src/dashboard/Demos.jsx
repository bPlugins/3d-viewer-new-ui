import { useMemo, useState } from 'react'
import { asset } from '../lib/paths'
import { HeroArt, ViewerControls, Tag, SearchField } from './shared'
import {
  Cuboid, Zap, CircleCheck, ChevronDown, EllipsisVertical, ArrowRight, CircleHelp, ExternalLink, Mail,
} from './icons'

const BLUE = ['#ebf3ff', '#2f54eb']
const GREEN = ['#e6fffa', '#047857']
const VIOLET = ['#f3e8ff', '#7c3aed']
const ORANGE = ['#fffaf0', '#dd6b20']
const RED = ['#fff5f5', '#e53e3e']

/*
 * `descWidth` is the width of each description box in the file. They are
 * hand-sized, and the two-line clamp breaks (and ellipsises) differently at
 * each width, so they are carried per card.
 */
const DEMOS = [
  { tag: 'WooCommerce', tone: BLUE, img: 'sneaker', group: 'woo',
    title: 'WooCommerce Product 3D view', desc: 'Interactive 3D product viewer for WooCommerce products.', descWidth: 187 },
  { tag: 'Default', tone: GREEN, img: 'armchair', group: 'default',
    title: 'Default', desc: 'Basic 3D viewer with default settings and features.', descWidth: 195 },
  { tag: 'Custom Width', tone: VIOLET, img: 'camera', group: 'width',
    title: 'Custom Width', desc: 'Set your own width and height for the 3D viewer.', descWidth: 169 },
  { tag: 'Disable Zoom', tone: ORANGE, img: 'watch', group: 'zoom',
    title: 'Disable Zoom', desc: 'Disable zoom functionality for a fixed scale view.', descWidth: 157 },
  { tag: 'Disable Auto Rotate', tone: RED, img: 'turntable', group: 'rotate',
    title: 'Disable Auto Rotate', desc: 'Stop auto-rotation and keep manual rotation control only.', descWidth: 179 },
  { tag: 'Lazy Loading', tone: BLUE, img: 'office-chair', group: 'more',
    title: 'Lazy Loading', desc: 'Load 3D models only when they become visible on screen.' },
  { tag: 'Eager Loading', tone: RED, img: 'drone', group: 'more',
    title: 'Eager Loading', desc: 'Load all 3D models at once for instant switching.' },
  { tag: 'Multiple', tone: BLUE, img: 'headphones', group: 'more',
    title: 'Multiple', desc: 'Show multiple 3D models in one viewer interface.' },
  { tag: 'WooCommerce - Top of image', tone: BLUE, img: 'running-shoe', group: 'woo',
    title: 'WooCommerce- Top of the image', desc: 'Display 3D viewer at the top of product images.' },
  { tag: 'WooCommerce - Bottom of image', tone: GREEN, img: 'cube', group: 'woo',
    title: 'WooCommerce- Bottom of the Image', desc: 'Display 3D viewer at the bottom of product images.', descWidth: 175 },
  { tag: 'WooCommerce - Replace', tone: VIOLET, img: 'vr-headset', group: 'woo',
    title: 'WooCommerce- Replace product image', desc: 'Replace product image with 3D viewer on hover.', descWidth: 178 },
  { tag: 'WooCommerce - Variants', tone: ORANGE, img: 'canvas-shoe', group: 'woo',
    title: 'WooCommerce- Variants', desc: 'Show different variants in 3D (color, size, etc.).', descWidth: 160 },
]

/* `w`: the pill boxes in the file (Figma rounds each label up to a whole pixel) */
const FILTERS = [
  { id: 'all', label: 'All', w: 49 },
  { id: 'woo', label: 'WooCommerce', w: 137 },
  { id: 'default', label: 'Default', w: 81 },
  { id: 'width', label: 'Custom Width', w: 130 },
  { id: 'zoom', label: 'Disable Zoom', w: 125 },
  { id: 'rotate', label: 'Disable Auto Rotate', w: 167 },
]

function Hero() {
  return (
    <section className="bp3d-dash-hero bp3d-dash-hero--wide">
      <div className="bp3d-dash-hero__copy">
        <div className="bp3d-dash-tags">
          <Tag className="bp3d-dash-tag--pill" color="#10b981">Plugin Active</Tag>
          <Tag className="bp3d-dash-tag--pill" color="#475569">Free Plan</Tag>
        </div>
        <div className="bp3d-dash-hero__lede">
          <h1>Welcome to 3D Viewer 👋</h1>
          <div>
            <p className="bp3d-dash-text">
              Display interactive 3D models on your website with beautiful controls and smooth performance.
            </p>
            <div className="bp3d-dash-chips">
              <span className="bp3d-dash-chip" style={{ width: 162 }}><Cuboid size={14} weight={1.5} /> 14+ Demo Examples</span>
              <span className="bp3d-dash-chip" style={{ width: 133.5 }}><Zap size={14} weight={1.5} /> Fully Interactive</span>
              <span className="bp3d-dash-chip" style={{ width: 176.67 }}><CircleCheck size={14} weight={1.5} /> Works with Any Theme</span>
            </div>
          </div>
        </div>
      </div>

      <HeroArt
        large
        blobs={[{ left: 742, top: -198.6 }, { left: 923.04, top: -66.11 }]}
        model={{ left: 806, top: 59.4 }}
        degree={{ left: 992.44, top: 72.04 }}
      />
      <div className="bp3d-dash-thumbs" aria-hidden="true"><span /><span /><span /></div>
      <ViewerControls
        large
        style={{ left: 984, top: 182 }}
        icons={[{ size: 20.27, weight: 2 }, { size: 22.84, weight: 1.74 }, { size: 25.16, weight: 1.74 }]}
      />
    </section>
  )
}

function DemoCard({ tag, tone, img, title, desc, descWidth }) {
  return (
    <article className="bp3d-dash-demo">
      <div>
        <div className="bp3d-dash-demo__stage">
          <span className="bp3d-dash-demo__tag" style={{ background: tone[0], color: tone[1] }}>{tag.toUpperCase()}</span>
          <button type="button" className="bp3d-dash-demo__menu" aria-label={`${title} options`}>
            <EllipsisVertical size={14.81} weight={1.85} />
          </button>
          <img src={asset(`assets/dashboard/demo-${img}.png`)} alt="" />
        </div>
        <div className="bp3d-dash-demo__copy">
          <h3 className="bp3d-dash-title" title={title}>{title}</h3>
          <p className="bp3d-dash-text" style={descWidth && { width: descWidth }}>{desc}</p>
        </div>
      </div>
      <footer className="bp3d-dash-demo__foot">
        <a href="#/dashboard/demos" className="bp3d-dash-demo__preview">
          Preview <ArrowRight size={11.11} weight={1.85} />
        </a>
        <a href="#/dashboard/demos" className="bp3d-dash-demo__go" aria-label={`Open ${title}`}>
          <ArrowRight size={11.11} weight={1.85} />
        </a>
      </footer>
    </article>
  )
}

function NeedHelp() {
  return (
    <aside className="bp3d-dash-help">
      <div className="bp3d-dash-help__main">
        <div className="bp3d-dash-help__intro">
          <span className="bp3d-dash-help__icon"><CircleHelp size={22.22} weight={1.85} /></span>
          <div>
            <h3>Need Help?</h3>
            <p>Check our documentation or get support from our team.</p>
          </div>
        </div>
        <div className="bp3d-dash-help__actions">
          <a href="https://bplugins.com/docs/3d-viewer/" target="_blank" rel="noreferrer" className="bp3d-dash-btn bp3d-dash-btn--primary">
            View Docs <ExternalLink size={12.96} weight={1.85} />
          </a>
          <a href="https://bplugins.com/support/" target="_blank" rel="noreferrer" className="bp3d-dash-btn bp3d-dash-btn--ghost">
            <Mail size={12.96} weight={1.85} /> Contact Support
          </a>
        </div>
      </div>
      <div className="bp3d-dash-help__art">
        <img src={asset('assets/dashboard/need-help.png')} alt="" />
      </div>
    </aside>
  )
}

export default function Demos() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return DEMOS.filter(
      (d) =>
        (filter === 'all' || d.group === filter) &&
        (!q || `${d.title} ${d.desc} ${d.tag}`.toLowerCase().includes(q))
    )
  }, [filter, query])

  return (
    <div className="bp3d-dash-wide">
      <Hero />

      <div className="bp3d-dash-filters">
        <SearchField placeholder="Search demos..." iconSize={16} weight={2} value={query} onChange={setQuery} />
        <div className="bp3d-dash-pills" role="tablist" aria-label="Filter demos">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={f.id === filter}
              className={[
                'bp3d-dash-pill',
                f.id === 'all' && 'bp3d-dash-pill--all',
                f.id === filter && 'bp3d-dash-pill--on',
              ].filter(Boolean).join(' ')}
              style={{ width: f.w }}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
          <button
            type="button"
            className={filter === 'more' ? 'bp3d-dash-pill bp3d-dash-pill--on' : 'bp3d-dash-pill'}
            style={{ width: 131 }}
            onClick={() => setFilter(filter === 'more' ? 'all' : 'more')}
          >
            More Filters <ChevronDown size={12} weight={2} />
          </button>
        </div>
      </div>

      <div className="bp3d-dash-demos">
        {shown.map((d) => <DemoCard key={d.title} {...d} />)}
        <NeedHelp />
      </div>
    </div>
  )
}
