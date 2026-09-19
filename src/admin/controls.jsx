import { CheckIcon } from '../components/icons'

export function TabStrip({ tabs, value, onChange, fixed }) {
  return (
    <div className={`bp3d-tabs${fixed ? ' bp3d-tabs--fixed' : ''}`} role="tablist">
      {tabs.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          onClick={() => onChange(id)}
          className={`bp3d-tab${value === id ? ' bp3d-tab--active' : ''}`}
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
    <div className={`bp3d-row${spaced ? ' bp3d-row--spaced' : ''}`}>
      {Icon && (
        <span className="bp3d-row__icon">
          <Icon size={18} />
        </span>
      )}
      <div className="bp3d-row__main">
        <h4 className="bp3d-row__title">{title}</h4>
        {desc && <p className="bp3d-row__desc">{desc}</p>}
      </div>
      <div className="bp3d-row__control">{children}</div>
    </div>
  )
}

export function Toggle({ checked, onChange, onLabel = 'Enabled', offLabel = 'Disabled', tone }) {
  const cls = [
    'bp3d-toggle',
    checked ? 'bp3d-toggle--on' : '',
    tone === 'danger' && !checked ? 'bp3d-toggle--danger' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={cls} role="switch" aria-checked={checked} onClick={() => onChange?.(!checked)}>
      <span className="bp3d-toggle__track" />
      <span className="bp3d-toggle__label">{checked ? onLabel : offLabel}</span>
    </button>
  )
}

export function RadioGroup({ name, value, onChange, options }) {
  return (
    <div className="bp3d-radios" role="radiogroup" aria-label={name}>
      {options.map((opt) => (
        <button
          type="button"
          key={opt}
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange?.(opt)}
          className={`bp3d-radio${value === opt ? ' bp3d-radio--on' : ''}`}
        >
          <span className="bp3d-radio__dot" />
          {opt}
        </button>
      ))}
    </div>
  )
}

export function Segmented({ value, onChange, options }) {
  return (
    <div className="bp3d-segmented">
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
    <div className="bp3d-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        style={{ '--bp3d-range-pct': `${pct}%` }}
      />
      <span className="bp3d-slider__value">{value}</span>
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
      className={`bp3d-mime${checked ? ' bp3d-mime--on' : ''}`}
    >
      <span className="bp3d-mime__box">{checked && <CheckIcon size={12} />}</span>
      <span>
        <strong style={{ fontWeight: 600 }}>{label}</strong>{' '}
        <span className="bp3d-mime__ext">({ext})</span>
      </span>
    </button>
  )
}
