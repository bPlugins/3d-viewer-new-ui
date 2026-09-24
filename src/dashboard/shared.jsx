/* Pieces the five dashboard screens share. */
import { asset } from '../lib/paths'
import { RefreshCw, ZoomIn, ZoomOut, Search } from './icons'

/*
 * The decorative right half of every hero: two blurred ellipses behind the
 * headphones render, plus the 360° pill. Positions are per screen — Welcome's
 * hero is the 815px left column, the others span the full 1185px.
 */
export function HeroArt({ blobs, model, degree, large = false }) {
  return (
    <>
      <span className="bp3d-dash-hero__blob bp3d-dash-hero__blob--a" style={blobs[0]} aria-hidden="true" />
      <span className="bp3d-dash-hero__blob bp3d-dash-hero__blob--b" style={blobs[1]} aria-hidden="true" />
      <div className="bp3d-dash-hero__model" style={model}>
        <img src={asset('assets/dashboard/headphones.png')} alt="" />
      </div>
      <span className={large ? 'bp3d-dash-degree bp3d-dash-degree--lg' : 'bp3d-dash-degree'} style={degree}>
        360°
      </span>
    </>
  )
}

/*
 * Rotate / zoom-in / zoom-out chips. Each glyph is drawn at its own size and
 * weight in the file (they are three different icon sets' boxes), so the
 * sizes are passed per icon rather than derived from the chip.
 */
export function ViewerControls({ style, icons, large = false }) {
  const [r, zi, zo] = icons
  return (
    <div className={large ? 'bp3d-dash-ctrls bp3d-dash-ctrls--lg' : 'bp3d-dash-ctrls'} style={style}>
      <button type="button" className="bp3d-dash-ctrl" aria-label="Rotate"><RefreshCw {...r} /></button>
      <button type="button" className="bp3d-dash-ctrl" aria-label="Zoom in"><ZoomIn {...zi} /></button>
      <button type="button" className="bp3d-dash-ctrl" aria-label="Zoom out"><ZoomOut {...zo} /></button>
    </div>
  )
}

export function Tag({ children, bg, color, className = '' }) {
  return (
    <span className={`bp3d-dash-tag ${className}`} style={{ background: bg, color }}>
      {children}
    </span>
  )
}

export function SearchField({ placeholder, iconSize, weight, value, onChange }) {
  return (
    <label className="bp3d-dash-search">
      <Search size={iconSize} weight={weight} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        aria-label={placeholder.replace(/\.+$/, '')}
      />
    </label>
  )
}
