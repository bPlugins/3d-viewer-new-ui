import Stepper from '../components/Stepper'
import Highlights from '../components/Highlights'
import {
  LayoutGridIcon,
  MenuIcon,
  CodeIcon,
  ArrowRightIcon,
} from '../components/icons'

const METHODS = [
  {
    id: 'gutenberg',
    tone: 'neutral',
    Icon: LayoutGridIcon,
    title: 'Gutenberg',
    sub: 'Insert the 3D Model Viewer block in the editor',
  },
  {
    id: 'elementor',
    tone: 'pink',
    Icon: MenuIcon,
    title: 'Elementor',
    sub: 'Drag the Model Viewer widget into a section',
  },
  {
    id: 'shortcode',
    tone: 'green',
    Icon: CodeIcon,
    title: 'Shortcode',
    sub: 'Paste [3d_viewer id="…"] into any post or widget',
  },
]

export default function StepPublish({ value, onChange, onBack, onNext, onDashboard }) {
  return (
    <>
      <Stepper current={3} />

      <p className="bp3d-ob-eyebrow">Last step</p>
      <h2 className="bp3d-ob-title">How will you add models?</h2>
      <p className="bp3d-ob-lede bp3d-ob-lede--mid">
        Pick how you usually build pages and the steps below will match. You can
        still use any of the other methods later.
      </p>

      <p className="bp3d-ob-section-label" style={{ marginTop: 37 }}>
        Preferred method
      </p>

      <div className="bp3d-ob-methods" role="radiogroup" aria-label="Preferred method">
        {METHODS.map(({ id, tone, Icon, title, sub }) => (
          <button
            type="button"
            key={id}
            role="radio"
            aria-checked={value === id}
            onClick={() => onChange?.(id)}
            className={`bp3d-ob-method${tone === 'neutral' ? '' : ` bp3d-ob-method--${tone}`}`}
          >
            <span className="bp3d-ob-method__icon">
              <Icon size={20} />
            </span>
            <span>
              <span className="bp3d-ob-method__title">{title}</span>
              <span className="bp3d-ob-method__sub">{sub}</span>
            </span>
          </button>
        ))}
      </div>

      <p className="bp3d-ob-note">
        Three ways to add a model — pick one above for step-by-step instructions:
      </p>

      <Highlights />

      <hr className="bp3d-ob-divider" style={{ marginTop: 36 }} />

      <div className="bp3d-ob-footer">
        <button type="button" className="bp3d-ob-btn bp3d-ob-btn--ghost" onClick={onBack}>
          &lt; Back
        </button>

        <button type="button" className="bp3d-ob-btn bp3d-ob-btn--link" onClick={onDashboard}>
          Go to Dashboard
        </button>

        <button type="button" className="bp3d-ob-btn bp3d-ob-btn--primary" onClick={onNext}>
          Add Your First 3D Model
          <ArrowRightIcon />
        </button>
      </div>
    </>
  )
}
