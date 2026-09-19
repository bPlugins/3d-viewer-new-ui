import { ChevronDown, AlertTriangle } from './icons'

export function AdminNotice({ onEnable, onDismiss }) {
  return (
    <div className="bp3d-notice">
      <span className="bp3d-notice__icon">
        <AlertTriangle size={16} />
      </span>
      <p className="bp3d-notice__text">
        Membership is disabled, so students &amp; instructors can't sign up
        <strong>. Enable</strong> it via <strong>Settings</strong> &gt;{' '}
        <strong>General</strong> &gt; <strong>Membership</strong> by turning on
        “Anyone can register.”
      </p>
      <div className="bp3d-notice__actions">
        <button type="button" className="bp3d-btn bp3d-btn--primary" onClick={onEnable}>
          Enable
        </button>
        <button type="button" className="bp3d-btn bp3d-btn--link" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }) {
  return (
    <div className="bp3d-admin">
      <div className="bp3d-admin__inner">
        <div className="bp3d-admin__screen-options">
          <button type="button">
            Screen Options <ChevronDown size={14} />
          </button>
        </div>

        <AdminNotice />

        {children}

        <footer className="bp3d-foot">
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
