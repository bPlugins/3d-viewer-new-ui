import { CircleXIcon } from './icons'

const STEPS = ['Model', 'Customize', 'Publish']

export default function Stepper({ current = 1, onExit }) {
  return (
    <nav className="bp3d-ob-stepper" aria-label="Setup progress">
      {STEPS.map((label, i) => {
        const n = i + 1
        const active = n === current
        return (
          <div className="bp3d-ob-stepper__step-wrap" key={label} style={{ display: 'contents' }}>
            {i > 0 && <span className="bp3d-ob-stepper__line" />}
            <div
              className={`bp3d-ob-stepper__step${active ? ' bp3d-ob-stepper__step--active' : ''}`}
              aria-current={active ? 'step' : undefined}
            >
              <span className="bp3d-ob-stepper__dot">{n}</span>
              <span className="bp3d-ob-stepper__label">{label}</span>
            </div>
          </div>
        )
      })}

      {onExit && (
        <>
          <span className="bp3d-ob-stepper__spacer" />
          <button type="button" className="bp3d-ob-exit" onClick={onExit}>
            Exit Setup
            <CircleXIcon />
          </button>
        </>
      )}
    </nav>
  )
}
