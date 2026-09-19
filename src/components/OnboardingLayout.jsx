export default function OnboardingLayout({ children }) {
  return (
    <div className="ob-page">
      <img className="ob-blob" src="/assets/onboarding-bg.png" alt="" aria-hidden="true" />
      <div className="ob-shell">
        <div className="ob-brand">
          {/*
           * The actual plugin mark, extracted straight from the .fig
           * archive's asset store (images/9740700a...), not a hand-traced
           * SVG recreation — the gradient background is baked into the
           * PNG, so .ob-brand__mark no longer draws one of its own.
           */}
          <img className="ob-brand__mark" src="/assets/logo-mark.png" alt="3D Viewer" />
          <span className="ob-brand__name">3D Viewer</span>
        </div>
        <section className="ob-card">{children}</section>
      </div>
    </div>
  )
}
