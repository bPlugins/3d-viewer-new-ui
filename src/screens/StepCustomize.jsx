import Stepper from '../components/Stepper'
import {
  BoxIcon,
  LayoutTemplateIcon,
  CartIcon,
  PhoneIcon,
  GlassesIcon,
  CameraIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from '../components/icons'

const FEATURES = [
  {
    Icon: BoxIcon,
    tone: 'blue',
    title: 'Wide Format Support',
    body: 'GLB, GLTF, OBJ, STL, FBX, DAE, 3DS, and more — upload the file you already have.',
    tier: 'included',
  },
  {
    Icon: LayoutTemplateIcon,
    tone: 'violet',
    title: 'Gutenberg & Elementor',
    body: 'Place a model with a block, the Elementor widget, or a shortcode anywhere.',
    tier: 'included',
  },
  {
    Icon: CartIcon,
    tone: 'mint',
    title: 'WooCommerce Viewers',
    body: 'Show a rotatable 3D model above, below, or instead of the product gallery.',
    tier: 'included',
  },
  {
    Icon: PhoneIcon,
    tone: 'rose',
    title: 'Responsive & Mobile Ready',
    body: 'Adapts to any screen, with touch controls and a poster image while loading.',
    tier: 'included',
  },
  {
    Icon: GlassesIcon,
    tone: 'lavender',
    title: 'Augmented Reality',
    body: 'View models in the room with WebXR, Scene Viewer, and iOS Quick Look.',
    tier: 'pro',
  },
  {
    Icon: CameraIcon,
    tone: 'sky',
    title: 'Hotspots & Initial View',
    body: 'Annotate parts of the model and choose the exact camera angle it opens on.',
    tier: 'pro',
  },
  {
    Icon: SparklesIcon,
    tone: 'mint',
    title: 'And much more',
    body: 'Lighting, shadow and exposure control, axis locking, auto-rotate and fullscreen options.',
    tier: 'pro',
  },
]

export default function StepCustomize({ onBack, onNext, onExit, onUpgrade }) {
  return (
    <>
      <Stepper current={2} onExit={onExit} />

      <p className="bp3d-ob-eyebrow bp3d-ob-eyebrow--muted">2nd step</p>
      <h2 className="bp3d-ob-title">What's included with 3D Viewer?</h2>
      <p className="bp3d-ob-lede">
        Everything you need to create interactive 3D experiences on your WordPress
        site. Choose the features you want to enable. Pro unlocks the rest whenever
        you need it.
      </p>

      <div className="bp3d-ob-features">
        {FEATURES.map(({ Icon, tone, title, body, tier }) => (
          <article className="bp3d-ob-feature" key={title}>
            <span className={`bp3d-ob-feature__icon bp3d-ob-feature__icon--${tone}`}>
              <Icon size={20} />
            </span>
            <div>
              <div className="bp3d-ob-feature__head">
                <h4 className="bp3d-ob-feature__title">{title}</h4>
                {tier === 'included' && (
                  <span className="bp3d-ob-check" aria-label="Included">
                    <CheckIcon />
                  </span>
                )}
              </div>
              <p className="bp3d-ob-feature__body">{body}</p>
              <span className={`bp3d-ob-badge bp3d-ob-badge--${tier}`}>
                {tier === 'included' ? 'Included' : 'Pro'}
              </span>
            </div>
          </article>
        ))}
      </div>

      <hr className="bp3d-ob-divider" style={{ marginTop: 37 }} />

      <div className="bp3d-ob-footer">
        <button type="button" className="bp3d-ob-btn bp3d-ob-btn--ghost" onClick={onBack}>
          <ChevronLeftIcon />
          Back
        </button>

        <div className="bp3d-ob-footer__end">
          <button type="button" className="bp3d-ob-btn bp3d-ob-btn--link" onClick={onUpgrade}>
            Upgrade to Pro
          </button>
          <button type="button" className="bp3d-ob-btn bp3d-ob-btn--primary" onClick={onNext}>
            Add Your First 3D Model
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </>
  )
}
