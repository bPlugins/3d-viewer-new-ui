import Welcome from '../dashboard/Welcome'
import Demos from '../dashboard/Demos'
import Pricing from '../dashboard/Pricing'
import Compare from '../dashboard/Compare'
import Extensions from '../dashboard/Extensions'
import { Box, CrownLine } from '../dashboard/icons'

/*
 * `w` is each label's box in the file. Figma rounds auto-width text up to the
 * next whole pixel and lays the row out from those boxes, so the labels carry
 * them to land every tab where the design has it.
 */
const TABS = [
  { id: 'welcome', label: 'Welcome', w: 63, Page: Welcome },
  { id: 'demos', label: 'Demos', w: 48, Page: Demos },
  { id: 'pricing', label: 'Pricing', w: 48, Page: Pricing },
  { id: 'compare', label: 'Feature Comparison', w: 138, Page: Compare },
  { id: 'extensions', label: 'Extensions', w: 75, Page: Extensions, isNew: true },
]

function DashNav({ current }) {
  return (
    <nav className="bp3d-dash-nav" aria-label="3D Viewer">
      <div className="bp3d-dash-brand">
        <span className="bp3d-dash-brand__mark">
          <Box size={14.81} weight={1.65} />
        </span>
        <span className="bp3d-dash-brand__name">3D Viewer</span>
        <span className="bp3d-dash-brand__ver">v1.9.2</span>
      </div>

      <div className="bp3d-dash-tabs">
        {TABS.map((t) => (
          <a
            key={t.id}
            href={`#/dashboard/${t.id}`}
            className={t.id === current ? 'bp3d-dash-tab bp3d-dash-tab--current' : 'bp3d-dash-tab'}
            aria-current={t.id === current ? 'page' : undefined}
          >
            <span className="bp3d-dash-tab__label" style={{ width: t.w }}>{t.label}</span>
            {t.isNew && <span className="bp3d-dash-new">NEW</span>}
          </a>
        ))}
        <a href="#/onboarding/1" className="bp3d-dash-tab">
          <span className="bp3d-dash-tab__label" style={{ width: 93 }}>Guided Setup</span>
        </a>
      </div>

      <a href="#/dashboard/pricing" className="bp3d-dash-upgrade">
        Upgrade <CrownLine size={16} weight={1.5} />
      </a>
    </nav>
  )
}

/*
 * The plugin's own dashboard. Like AdminLayout, but the dashboard frames carry
 * no Screen Options row and no admin notice — the navbar sits 24px under the
 * admin bar — and the footer is the smaller 12px one from these frames.
 */
export default function Dashboard({ tab }) {
  const current = TABS.find((t) => t.id === tab) || TABS[0]
  const { Page } = current

  return (
    <div className="bp3d-dash-page">
      <div className="bp3d-dash-page__inner">
        <div className="bp3d-dash">
          <DashNav current={current.id} />
          <Page />
        </div>

        <footer className="bp3d-dash-foot">
          <span>
            Thank you for creating with{' '}
            <a href="https://wordpress.org" target="_blank" rel="noreferrer">
              WordPress
            </a>
            .
          </span>
          <span>Version 7.1</span>
        </footer>
      </div>
    </div>
  )
}
