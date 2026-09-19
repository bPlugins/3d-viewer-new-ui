import { CircleXIcon } from './icons'

const STEPS = ['Model', 'Customize', 'Publish']

export default function Stepper({ current = 1, onExit }) {
  return (
    <nav className="ob-stepper" aria-label="Setup progress">
      {STEPS.map((label, i) => {
        const n = i + 1
        const active = n === current
        return (
          <div className="ob-stepper__step-wrap" key={label} style={{ display: 'contents' }}>
            {i > 0 && <span className="ob-stepper__line" />}
            <div
              className={`ob-stepper__step${active ? ' ob-stepper__step--active' : ''}`}
              aria-current={active ? 'step' : undefined}
            >
              <span className="ob-stepper__dot">{n}</span>
              <span className="ob-stepper__label">{label}</span>
            </div>
          </div>
        )
      })}

      {onExit && (
        <>
          <span className="ob-stepper__spacer" />
          <button type="button" className="ob-exit" onClick={onExit}>
            Exit Setup
            <CircleXIcon />
          </button>
        </>
      )}
    </nav>
  )
}
