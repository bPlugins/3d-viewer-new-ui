import { CheckIcon } from '../components/icons'

export function TabStrip({ tabs, value, onChange, fixed }) {
  return (
    <div className={`wp-tabs${fixed ? ' wp-tabs--fixed' : ''}`} role="tablist">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
          className={`wp-tab${value === id ? ' wp-tab--active' : ''}`}
        >
          <Icon size={17} />
          {label}
        </button>
      ))}
    </div>
  )
}

export function SettingRow({ Icon, title, desc, spaced, children }) {
  return (
    <div className={`wp-row${spaced ? ' wp-row--spaced' : ''}`}>
      {Icon && (
        <span className="wp-row__icon">
          <Icon size={18} />
        </span>
      )}
      <div className="wp-row__main">
        <h4 className="wp-row__title">{title}</h4>
        {desc && <p className="wp-row__desc">{desc}</p>}
      </div>
      <div className="wp-row__control">{children}</div>
    </div>
  )
}

export function Toggle({ checked, onChange, onLabel = 'Enabled', offLabel = 'Disabled', tone }) {
  const cls = [
    'wp-toggle',
    checked ? 'wp-toggle--on' : '',
    tone === 'danger' && !checked ? 'wp-toggle--danger' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={cls} role="switch" aria-checked={checked} onClick={() => onChange?.(!checked)}>
      <span className="wp-toggle__track" />
      <span className="wp-toggle__label">{checked ? onLabel : offLabel}</span>
    </button>
  )
}

export function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="wp-radios" role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange?.(opt)}
          className={`wp-radio${value === opt ? ' wp-radio--on' : ''}`}
        >
          <span className="wp-radio__dot" />
          {opt}
        </button>
      ))}
    </div>
  )
}

export function Segmented({ value, onChange, options }) {
  return (
    <div className="wp-segmented">
      {options.map((opt) => (
        <button key={opt} type="button" aria-pressed={value === opt} onClick={() => onChange?.(opt)}>
          {opt}
        </button>
      ))}
    </div>
  )
}

export function Slider({ value, onChange, min = 0, max = 10 }) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="wp-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        style={{ '--range-pct': `${pct}%` }}
      />
      <span className="wp-slider__value">{value}</span>
    </div>
  )
}

export function MimeTile({ label, ext, checked, onChange }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      className={`wp-mime${checked ? ' wp-mime--on' : ''}`}
    >
      <span className="wp-mime__box">{checked && <CheckIcon size={12} />}</span>
      <span>
        <strong style={{ fontWeight: 600 }}>{label}</strong>{' '}
        <span className="wp-mime__ext">({ext})</span>
      </span>
    </button>
  )
}
