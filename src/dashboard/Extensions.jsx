import { useState } from 'react'
import { asset } from '../lib/paths'
import { HeroArt, SearchField, Tag } from './shared'
import {
  Cuboid, Zap, CircleCheck, Box, Power, Puzzle, ExternalLink, Maximize, ShoppingCart, ArrowRight, Lightbulb,
} from './icons'

/* Chip widths are fixed in the file rather than content-sized. */
const FILTERS = [
  { id: 'all', label: 'All', count: 1, width: 73 },
  { id: 'active', label: 'Active', count: 0, width: 90 },
  { id: 'inactive', label: 'Inactive', count: 0, width: 97 },
  { id: 'available', label: 'Available', count: 1, width: 104 },
]

function Hero() {
  return (
    <section className="bp3d-dash-hero bp3d-dash-hero--wide">
      <div className="bp3d-dash-hero__copy">
        <span className="bp3d-dash-hero__eyebrow bp3d-dash-title">Pricing</span>
        <div className="bp3d-dash-hero__lede">
          <h1>Supercharge Your 3D Viewer</h1>
          <div>
            <p className="bp3d-dash-text">
              Extend 3D Viewer with powerful add-ons. Each extension manages its own license independently.
            </p>
            <div className="bp3d-dash-chips">
              <span className="bp3d-dash-chip" style={{ width: 128 }}><Cuboid size={14} weight={1.5} /> More Features</span>
              <span className="bp3d-dash-chip" style={{ width: 122.5 }}><Zap size={14} weight={1.5} /> Better Control</span>
              <span className="bp3d-dash-chip" style={{ width: 138.67 }}><CircleCheck size={14} weight={1.5} /> Lifetime Support</span>
            </div>
          </div>
        </div>
      </div>

      <HeroArt
        large
        blobs={[{ left: 742, top: -198.6 }, { left: 923.04, top: -66.11 }]}
        model={{ left: 541, top: 59.4 }}
        degree={{ left: 727.44, top: 72.04 }}
      />

      <div className="bp3d-dash-stats">
        <div className="bp3d-dash-stat">
          <span className="bp3d-dash-stat__icon"><Box size={20} weight={2} /></span>
          <strong>0</strong>
          <span>Installed</span>
        </div>
        <span className="bp3d-dash-stats__rule" aria-hidden="true" />
        <div className="bp3d-dash-stat">
          <span className="bp3d-dash-stat__icon bp3d-dash-stat__icon--on"><Power size={20} weight={2} /></span>
          <strong>0</strong>
          <span>Active</span>
        </div>
      </div>
    </section>
  )
}

function ExtensionCard() {
  return (
    <article className="bp3d-dash-extcard">
      <div className="bp3d-dash-extcard__top">
        <div className="bp3d-dash-extcard__detail">
          <span className="bp3d-dash-extcard__icon"><Box size={23.04} weight={1.65} /></span>
          <div className="bp3d-dash-extcard__meta">
            <Tag>Pro</Tag>
            <h3 className="bp3d-dash-title">WC 3D Model Viewer</h3>
            <p className="bp3d-dash-text">Customize a 3D model per WooCommerce product variation.</p>
            <div className="bp3d-dash-extcard__by">
              <span className="bp3d-dash-extcard__ver">v1.0.0</span>
              <span className="bp3d-dash-extcard__author">
                by
                <a href="https://bplugins.com" target="_blank" rel="noreferrer">
                  bPlugins <ExternalLink size={15.33} weight={1.5} />
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="bp3d-dash-extcard__shot">
          <img src={asset('assets/dashboard/demo-sneaker.png')} alt="" />
          <span className="bp3d-dash-extcard__zoom"><Maximize size={9.88} weight={1.65} /></span>
        </div>
      </div>

      <div className="bp3d-dash-extcard__actions">
        <a href="https://bplugins.com" target="_blank" rel="noreferrer" className="bp3d-dash-btn bp3d-dash-btn--ghost">
          <ExternalLink size={11.52} weight={1.65} /> Learn more
        </a>
        <a href="https://bplugins.com" target="_blank" rel="noreferrer" className="bp3d-dash-btn bp3d-dash-btn--primary">
          <ShoppingCart size={11.52} weight={1.65} /> Buy Now <ArrowRight size={9.88} weight={1.65} />
        </a>
      </div>
    </article>
  )
}

export default function Extensions() {
  const [tab, setTab] = useState('extensions')
  const [filter, setFilter] = useState('all')

  return (
    <>
      <Hero />

      <div className="bp3d-dash-ext">
        <div className="bp3d-dash-subnav">
          <div className="bp3d-dash-subnav__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'extensions'}
              className={tab === 'extensions' ? 'bp3d-dash-subnav__tab bp3d-dash-subnav__tab--on' : 'bp3d-dash-subnav__tab'}
              onClick={() => setTab('extensions')}
            >
              <Puzzle size={13.17} weight={1.5} /> Extensions
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={tab === 'modules'}
              className={tab === 'modules' ? 'bp3d-dash-subnav__tab bp3d-dash-subnav__tab--on' : 'bp3d-dash-subnav__tab'}
              onClick={() => setTab('modules')}
            >
              <span className="bp3d-dash-subnav__slot" aria-hidden="true" /> Modules
            </button>
          </div>
          <SearchField placeholder="Search extensions..." iconSize={13.17} weight={1.65} />
        </div>

        <section className="bp3d-dash-shelf">
          <div className="bp3d-dash-shelf__chips" role="tablist" aria-label="Filter extensions">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={f.id === filter}
                className={f.id === filter ? 'bp3d-dash-count bp3d-dash-count--on' : 'bp3d-dash-count'}
                style={{ width: f.width }}
                onClick={() => setFilter(f.id)}
              >
                {f.label} <span>{f.count}</span>
              </button>
            ))}
          </div>

          <div className="bp3d-dash-shelf__grid">
            {(filter === 'all' || filter === 'available') && <ExtensionCard />}
          </div>
        </section>

        <aside className="bp3d-dash-exthelp">
          <div className="bp3d-dash-exthelp__info">
            <span className="bp3d-dash-exthelp__lamp"><Lightbulb size={14.81} weight={1.65} /></span>
            <div>
              <h3 className="bp3d-dash-title">Need help with extensions?</h3>
              <p className="bp3d-dash-text">
                Check out our{' '}
                <a href="https://bplugins.com/docs/3d-viewer/" target="_blank" rel="noreferrer">documentation</a> or
                contact our support team for assistance.
              </p>
            </div>
          </div>
          <a href="https://bplugins.com/docs/3d-viewer/" target="_blank" rel="noreferrer" className="bp3d-dash-btn bp3d-dash-btn--ghost">
            <span className="bp3d-dash-title">View Docs</span> <ExternalLink size={21.13} weight={1.5} />
          </a>
        </aside>
      </div>
    </>
  )
}
