import Stepper from '../components/Stepper'
import Highlights from '../components/Highlights'
import { ArrowRightIcon, PlayIcon } from '../components/icons'

export default function StepModel({ userName = 'Rubyat', onNext, onHelp }) {
  return (
    <>
      <Stepper current={1} />

      <p className="ob-eyebrow">Hello {userName} 👋</p>
      <h2 className="ob-title">Welcome to 3D Viewer</h2>
      <p className="ob-lede ob-lede--narrow">
        Bring your products to life with interactive 3D models. Let's set up your
        first model and get started in just a few steps.
      </p>

      <figure className="ob-hero">
        <img
          src="/assets/onboarding-image.png"
          alt="A 3D model of a lounge chair with rotate, zoom, pan and AR view controls"
        />
      </figure>

      <Highlights />

      <hr className="ob-divider" style={{ marginTop: 29 }} />

      <div className="ob-footer">
        <button type="button" className="ob-help" onClick={onHelp}>
          <span className="ob-help__play">
            <PlayIcon />
          </span>
          <span>
            <span className="ob-help__title">Need help?</span>
            <span className="ob-help__sub">Watch the 2-minute tutorial</span>
          </span>
        </button>

        <button type="button" className="ob-btn ob-btn--primary" onClick={onNext}>
          Let's Get Started
          <ArrowRightIcon />
        </button>
      </div>
    </>
  )
}
