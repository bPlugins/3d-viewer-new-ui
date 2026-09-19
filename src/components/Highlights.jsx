import { BoxIcon, ZapIcon, GlobeIcon } from './icons'

const ITEMS = [
  {
    tone: 'green',
    Icon: BoxIcon,
    title: 'Easy Setup',
    body: 'Upload your 3D model and configure in minutes.',
  },
  {
    tone: 'blue',
    Icon: ZapIcon,
    title: 'Interactive Experience',
    body: 'Let your visitors rotate, zoom and explore.',
  },
  {
    tone: 'purple',
    Icon: GlobeIcon,
    title: 'Works Everywhere',
    body: 'Built for WordPress, works on all devices.',
  },
]

export default function Highlights() {
  return (
    <div className="ob-highlights">
      {ITEMS.map(({ tone, Icon, title, body }) => (
        <div className="ob-highlight" key={title}>
          <span className={`ob-highlight__icon ob-highlight__icon--${tone}`}>
            <Icon size={16} />
          </span>
          <h4 className="ob-highlight__title">{title}</h4>
          <p className="ob-highlight__body">{body}</p>
        </div>
      ))}
    </div>
  )
}
