import { asset } from '../lib/paths'

export default function OnboardingLayout({ children }) {
  return (
    <div className="bp3d-ob-page">
      <img className="bp3d-ob-blob" src={asset('assets/onboarding-bg.png')} alt="" aria-hidden="true" />
      <div className="bp3d-ob-shell">
        <div className="bp3d-ob-brand">
          {/*
           * The actual plugin mark, extracted straight from the .fig
           * archive's asset store (images/9740700a...), not a hand-traced
           * SVG recreation — the gradient background is baked into the
           * PNG, so .bp3d-ob-brand__mark no longer draws one of its own.
           */}
          <img className="bp3d-ob-brand__mark" src={asset('assets/logo-mark.png')} alt="3D Viewer" />
          <span className="bp3d-ob-brand__name">3D Viewer</span>
        </div>
        <section className="bp3d-ob-card">{children}</section>
      </div>
    </div>
  )
}
