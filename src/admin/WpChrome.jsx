/*
 * Mock wp-admin chrome — admin bar across the top, admin menu down the left.
 *
 * Purely so the standalone preview reads like it is sitting inside WordPress.
 * The real plugin renders none of this: WordPress draws the bar and the menu,
 * and the plugin only registers its menu entry. Drop this component and the
 * `.bp3d-wpshell` wrapper when porting, same as the mock notice and footer
 * already in AdminLayout.
 *
 * Structure and class names mirror WordPress's own (#wpadminbar, #adminmenu,
 * #wpcontent) so the mapping is obvious when the real chrome takes over.
 */
import {
  WpLogo, Home, Bubble, Plus, Search, Gauge, Pin, Camera, Page,
  Brush, Plug, Users, Wrench, Cog, Cube, ChevronLeft,
} from './wpIcons'

function AdminBar() {
  return (
    <div className="bp3d-adminbar">
      <ul className="bp3d-adminbar__group">
        <li>
          <button type="button" className="bp3d-adminbar__item bp3d-adminbar__item--icon" aria-label="About WordPress">
            <WpLogo size={20} />
          </button>
        </li>
        <li>
          <button type="button" className="bp3d-adminbar__item">
            <Home size={18} /> Dev Site
          </button>
        </li>
        <li>
          <button type="button" className="bp3d-adminbar__item">
            <Bubble size={18} /> <span className="bp3d-adminbar__count">2</span>
          </button>
        </li>
        <li>
          <button type="button" className="bp3d-adminbar__item">
            <Plus size={18} /> New
          </button>
        </li>
      </ul>

      <ul className="bp3d-adminbar__group bp3d-adminbar__group--end">
        <li>
          <button type="button" className="bp3d-adminbar__item bp3d-adminbar__item--icon" aria-label="Search">
            <Search size={18} />
          </button>
        </li>
        <li>
          <button type="button" className="bp3d-adminbar__item">
            Howdy, dev
            <span className="bp3d-adminbar__avatar" aria-hidden="true">D</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

const MENU = [
  { id: 'dashboard', label: 'Dashboard', Icon: Gauge },
  { sep: true },
  { id: 'posts', label: 'Posts', Icon: Pin },
  { id: 'media', label: 'Media', Icon: Camera },
  { id: 'pages', label: 'Pages', Icon: Page },
  { id: 'comments', label: 'Comments', Icon: Bubble },
  { sep: true },
  {
    id: '3d-viewer',
    label: '3D Viewer',
    Icon: Cube,
    current: true,
    submenu: [
      { id: 'all', label: 'All 3D Viewers' },
      { id: 'add-new', label: 'Add New', href: '#/add-new/model' },
      { id: 'settings', label: 'Settings', href: '#/settings/general' },
      { id: 'onboarding', label: 'Onboarding', href: '#/onboarding/1' },
      // the last three are how the dashboard frames draw the menu
      { id: 'dashboard', label: 'Help & Demos', href: '#/dashboard/welcome', tone: 'help' },
      { id: 'extensions', label: 'Extensions', href: '#/dashboard/extensions', badge: 'NEW' },
      { id: 'upgrade', label: 'Upgrade', href: '#/dashboard/pricing', tone: 'upgrade', arrow: true },
    ],
  },
  { sep: true },
  { id: 'appearance', label: 'Appearance', Icon: Brush },
  { id: 'plugins', label: 'Plugins', Icon: Plug },
  { id: 'users', label: 'Users', Icon: Users },
  { id: 'tools', label: 'Tools', Icon: Wrench },
  { id: 'settings', label: 'Settings', Icon: Cog },
]

function AdminMenu({ current }) {
  return (
    <nav className="bp3d-adminmenu" aria-label="Main menu">
      <ul>
        {MENU.map((item, i) =>
          item.sep ? (
            <li key={`sep-${i}`} className="bp3d-adminmenu__sep" aria-hidden="true" />
          ) : (
            <li
              key={item.id}
              className={item.current ? 'bp3d-adminmenu__item bp3d-adminmenu__item--current' : 'bp3d-adminmenu__item'}
            >
              <button type="button" className="bp3d-adminmenu__link" aria-current={item.current ? 'page' : undefined}>
                <span className="bp3d-adminmenu__icon">
                  <item.Icon size={18} />
                </span>
                <span className="bp3d-adminmenu__name">{item.label}</span>
              </button>

              {item.submenu && (
                <ul className="bp3d-adminsubmenu">
                  {item.submenu.map((sub) => (
                    <li key={sub.id}>
                      <button
                        type="button"
                        className={[
                          'bp3d-adminsubmenu__link',
                          sub.tone && `bp3d-adminsubmenu__link--${sub.tone}`,
                          sub.id === current && 'bp3d-adminsubmenu__link--current',
                        ].filter(Boolean).join(' ')}
                        onClick={() => {
                          if (sub.href) window.location.hash = sub.href
                        }}
                      >
                        {sub.label}
                        {sub.badge && <span className="bp3d-adminsubmenu__badge">{sub.badge}</span>}
                        {sub.arrow && <span className="bp3d-adminsubmenu__arrow" aria-hidden="true" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        )}
      </ul>

      <button type="button" className="bp3d-adminmenu__collapse">
        <span className="bp3d-adminmenu__icon">
          <ChevronLeft size={16} />
        </span>
        <span className="bp3d-adminmenu__name">Collapse menu</span>
      </button>
    </nav>
  )
}

export default function WpChrome({ current, children }) {
  return (
    <div className="bp3d-wpshell">
      <AdminBar />
      <AdminMenu current={current} />
      <div className="bp3d-wpcontent">{children}</div>
    </div>
  )
}
