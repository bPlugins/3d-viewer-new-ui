import { useState } from 'react'
import AdminLayout from '../admin/AdminLayout'
import { TabStrip, SettingRow, Toggle, RadioGroup, Segmented, Slider } from '../admin/controls'
import {
  BoxIcon, CameraIcon, PhoneIcon, CheckIcon, ZapIcon,
} from '../components/icons'
import { LayoutGridIcon } from '../components/icons'
import {
  Palette,
  Gear, Pencil, Eye, Layers, Link2, Terminal, ImageIcon, ExternalLink,
  RefreshCw, ZoomIn, ZoomOut, Expand, Send, UploadCloud, Move, Maximize,
  Download, Loader, SlidersVertical, Sun, CloudDrizzle, Copy, Monitor, Tablet,
} from '../admin/icons'

const TABS = [
  { id: 'model', label: 'Model', Icon: BoxIcon },
  { id: 'settings', label: 'Settings', Icon: Gear },
  { id: 'style', label: 'Style', Icon: Pencil },
  { id: 'preview', label: 'Preview', Icon: Eye },
]

const PREVIEW_SRC = '/assets/model-preview.jpg'

function LivePreviewCard() {
  return (
    <div className="wp-preview">
      <div className="wp-preview__head">
        <span className="wp-preview__title">
          <Eye size={18} /> Live Preview
        </span>
        <button type="button" className="wp-icon-btn" aria-label="Open preview in new tab">
          <ExternalLink size={17} />
        </button>
      </div>
      <div className="wp-preview__stage">
        <img src={PREVIEW_SRC} alt="Preview of the 3D model" />
      </div>
      <div className="wp-preview__controls">
        <div>
          <button type="button" className="wp-icon-btn" aria-label="Reset view"><RefreshCw size={17} /></button>
          <button type="button" className="wp-icon-btn" aria-label="Zoom in"><ZoomIn size={17} /></button>
          <button type="button" className="wp-icon-btn" aria-label="Zoom out"><ZoomOut size={17} /></button>
        </div>
        <button type="button" className="wp-icon-btn" aria-label="Fullscreen"><Expand size={17} /></button>
      </div>
    </div>
  )
}

function PublishBox() {
  return (
    <div className="wp-publish">
      <button type="button" className="wp-btn wp-btn--primary">
        <Send size={17} /> Publish
      </button>
      <button type="button" className="wp-btn wp-btn--ghost">Save Draft</button>
    </div>
  )
}

/* ---------------- Tab 1: Model ---------------- */
function ModelTab() {
  const [mode, setMode] = useState('lite')

  return (
    <>
      <div className="wp-card">
        <div className="wp-card__head">
          <span className="wp-card__head-icon"><Layers size={20} /></span>
          <div>
            <h4 className="wp-card__title">Viewer Mode</h4>
            <p className="wp-card__desc">Choose between Lite and Advanced viewer modes.</p>
          </div>
        </div>

        <div className="wp-mode-grid">
          <button
            type="button"
            className={`wp-mode${mode === 'lite' ? ' wp-mode--on' : ''}`}
            onClick={() => setMode('lite')}
          >
            <span className="wp-mode__icon"><ZapIcon size={18} /></span>
            <span className="wp-mode__body">
              <span className="wp-mode__name">
                Lite <span className="wp-mode__tag">Recommended</span>
              </span>
              <span className="wp-mode__perks">
                <span>✓ Faster loading</span>
                <span>✓ Smaller size</span>
              </span>
            </span>
            <span className="wp-mode__radio" />
          </button>

          <button
            type="button"
            className={`wp-mode wp-mode--plain${mode === 'advanced' ? ' wp-mode--on' : ''}`}
            onClick={() => setMode('advanced')}
          >
            <span className="wp-mode__icon"><SlidersVertical size={18} /></span>
            <span className="wp-mode__body">
              <span className="wp-mode__name">Advanced</span>
              <span className="wp-mode__perks">
                <span>✓ More features</span>
                <span>✓ Customization</span>
              </span>
            </span>
            <span className="wp-mode__radio" />
          </button>
        </div>
      </div>

      <div className="wp-card">
        <div className="wp-card__head">
          <span className="wp-card__head-icon"><Link2 size={20} /></span>
          <div>
            <h4 className="wp-card__title">3D Source</h4>
            <p className="wp-card__desc">Select the source URL or upload a 3D model file.</p>
          </div>
        </div>
        <div className="wp-field-row">
          <input className="wp-input" placeholder="https://example.com/model.glb" />
          <button type="button" className="wp-btn wp-btn--soft">
            <UploadCloud size={17} /> Upload Source
          </button>
        </div>
        <p className="wp-hint">
          Or upload a file from your media library. You can also use a direct URL to your 3D model.
        </p>
      </div>

      <div className="wp-card">
        <div className="wp-card__head">
          <span className="wp-card__head-icon"><Terminal size={20} /></span>
          <div>
            <h4 className="wp-card__title">Decoder</h4>
            <p className="wp-card__desc">Choose a decoder to decode the 3D model.</p>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <select className="wp-select" defaultValue="none">
            <option value="none">None</option>
            <option value="draco">Draco</option>
            <option value="ktx">KTX</option>
          </select>
        </div>
        <p className="wp-hint" style={{ color: 'var(--wp-muted)' }}>
          Select a decoder if your 3D model requires one (e.g., Draco, KTX).
        </p>
      </div>

      <div className="wp-card">
        <div className="wp-card__head">
          <span className="wp-card__head-icon"><ImageIcon size={20} /></span>
          <div>
            <h4 className="wp-card__title">Poster Image</h4>
            <p className="wp-card__desc">Display a poster image until the model is loaded.</p>
          </div>
        </div>
        <div className="wp-poster">
          <span className="wp-poster__thumb"><ImageIcon size={20} /></span>
          <div className="wp-poster__main">
            <p className="wp-poster__name">No image selected</p>
            <p className="wp-poster__meta">Recommended size: 800 × 600px (JPG, PNG)</p>
          </div>
          <button type="button" className="wp-btn wp-btn--primary" style={{ height: 44 }}>
            <UploadCloud size={17} /> Upload Poster
          </button>
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <button type="button" className="wp-btn wp-btn--ghost">Reset to Default</button>
      </div>
    </>
  )
}

/* ---------------- Tab 2: Settings ---------------- */
const VIEWER_SETTINGS = [
  { id: 'moving', Icon: Move, title: 'Moving Controls', desc: 'Allows users to rotate, pan, and interact with the model using a mouse or touch input.', on: true },
  { id: 'zoom', Icon: ZoomIn, title: 'Enable Zoom', desc: 'Enable or Disable Zooming Behaviour', on: true },
  { id: 'fullscreen', Icon: Maximize, title: 'Full Screen Button', desc: 'Show/Hide Full Screen Button', on: true },
  { id: 'zoombtn', Icon: ZoomOut, title: 'Zoom In/Out Button', desc: 'Show/Hide Zoom In/Out Button', on: true },
  { id: 'camera', Icon: CameraIcon, title: 'Camera Button', desc: 'Show/Hide Camera Button', on: false },
  { id: 'download', Icon: Download, title: '3D File Download Button', desc: 'Show/Hide 3D File Download Button', on: false },
]

function SettingsTab() {
  const [flags, setFlags] = useState(
    Object.fromEntries(VIEWER_SETTINGS.map((s) => [s.id, s.on]))
  )
  const [loading, setLoading] = useState('Auto')
  const [progress, setProgress] = useState(true)
  const [exposure, setExposure] = useState(1)
  const [shadow, setShadow] = useState(7)
  const [ar, setAr] = useState(false)

  return (
    <>
      <div className="wp-card wp-card--rows">
        <h3 className="wp-section-title" style={{ margin: '8px 0 23px' }}>3D Viewer Settings</h3>

        {VIEWER_SETTINGS.map(({ id, Icon, title, desc }) => (
          <SettingRow key={id} Icon={Icon} title={title} desc={desc}>
            <Toggle checked={flags[id]} onChange={(v) => setFlags({ ...flags, [id]: v })} />
          </SettingRow>
        ))}

        <SettingRow spaced Icon={Loader} title="Loading Type" desc='Choose Loading type, default: "Auto"'>
          <RadioGroup name="Loading type" value={loading} onChange={setLoading} options={['Auto', 'Lazy', 'Eager']} />
        </SettingRow>

        <SettingRow Icon={SlidersVertical} title="Progressbar" desc="Show/Hide Progressbar">
          <Toggle checked={progress} onChange={setProgress} />
        </SettingRow>

        <SettingRow Icon={Sun} title="Exposure" desc="Brightness for Model">
          <Slider value={exposure} onChange={setExposure} min={0} max={10} />
        </SettingRow>

        <SettingRow Icon={CloudDrizzle} title="Shadow Intensity" desc="Shadow Intensity for Model">
          <Slider value={shadow} onChange={setShadow} min={0} max={10} />
        </SettingRow>

        <SettingRow
          Icon={PhoneIcon}
          title="Enable AR"
          desc="Enables AR (Augmented Reality) so visitors can view the 3D model in their real environment."
        >
          <Toggle checked={ar} onChange={setAr} />
        </SettingRow>
      </div>

      <div style={{ marginTop: 24 }}>
        <button type="button" className="wp-btn wp-btn--ghost">Reset to Default</button>
      </div>
    </>
  )
}

/* ---------------- Tab 3: Style ---------------- */
function StyleTab() {
  const [align, setAlign] = useState('Center')

  return (
    <>
      <div className="wp-card wp-card--rows">
        <h3 className="wp-section-title" style={{ margin: '8px 0 23px' }}>3D Viewer Settings</h3>

        <SettingRow
          Icon={Move}
          title="Width"
          desc="Set the width of the 3D viewer. You can use values like %, px, or vw for responsive layouts."
        >
          <div className="wp-dim">
            <input className="wp-input" defaultValue="100" />
            <select className="wp-select" defaultValue="%">
              <option>%</option><option>px</option><option>vw</option>
            </select>
            <button type="button" className="wp-dim__link" aria-label="Link width and height">
              <Link2 size={16} />
            </button>
          </div>
        </SettingRow>

        <SettingRow
          Icon={ZoomIn}
          title="Height"
          desc="Set the height of the 3D viewer. Adjust this to control how much vertical space the model occupies."
        >
          <div className="wp-dim">
            <input className="wp-input" defaultValue="320" />
            <select className="wp-select" defaultValue="px">
              <option>px</option><option>%</option><option>vh</option>
            </select>
            <button type="button" className="wp-dim__link" aria-label="Link width and height">
              <Link2 size={16} />
            </button>
          </div>
        </SettingRow>

        <SettingRow
          Icon={Maximize}
          title="Align"
          desc="Controls the alignment of the 3D viewer within its container, such as left, center, or right."
        >
          <Segmented value={align} onChange={setAlign} options={['Left', 'Center', 'Right']} />
        </SettingRow>

        <SettingRow
          Icon={ZoomOut}
          title="Background Color"
          desc="Set background color for 3d model. If you don't need just leave blank. Default: 'transparent color'"
        >
          <button type="button" className="wp-colorpick">
            <span className="wp-colorpick__swatch" /> Select Color
          </button>
        </SettingRow>
      </div>

      <div style={{ display: 'flex', gap: 14, marginTop: 34 }}>
        <button type="button" className="wp-btn wp-btn--ghost">Reset to Default</button>
        <button type="button" className="wp-btn wp-btn--save">Save Change</button>
      </div>
    </>
  )
}

/* ---------------- Tab 4: Preview ---------------- */
const variants = [
  { id: 'headphones', label: 'Headphones', glyph: '\u{1F3A7}' },
  { id: 'audio', label: 'Audio', glyph: '\u266A' },
  { id: 'colour', label: 'Colour' },
]

function PreviewTab() {
  const [device, setDevice] = useState('Desktop')
  const [variant, setVariant] = useState('headphones')
  const devices = [
    { id: 'Desktop', Icon: Monitor },
    { id: 'Tablet', Icon: Tablet },
    { id: 'Mobile', Icon: PhoneIcon },
  ]

  return (
    <div className="wp-stagecard">
      <div className="wp-stagecard__head">
        <span className="wp-stagecard__left">
          <span className="wp-dot" />
          Live Preview
          <span className="wp-badge-ready">Ready</span>
        </span>
        <div className="wp-devices">
          {devices.map(({ id, Icon }) => (
            <button
              key={id}
              type="button"
              className="wp-device"
              aria-pressed={device === id}
              onClick={() => setDevice(id)}
            >
              <Icon size={14} /> {id}
            </button>
          ))}
        </div>
      </div>

      <div className="wp-stagecard__body">
        <div className="wp-stagecard__stage">
          <img src={PREVIEW_SRC} alt="Live preview of the 3D model" />

          <button type="button" className="wp-stage-corner" aria-label="Toggle grid">
            <LayoutGridIcon size={15} />
          </button>

          <div className="wp-stage-tools">
            <button type="button" aria-label="Materials"><Palette size={15} /></button>
            <button type="button" aria-label="Auto-rotate"><RefreshCw size={15} /></button>
            <button type="button" aria-label="Grid"><LayoutGridIcon size={15} /></button>
          </div>

          <div className="wp-variants">
            <button type="button" className="wp-variants__nav" aria-label="Previous variant">‹</button>
            <span className="wp-variants__deg">360°</span>
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                className="wp-variant"
                aria-pressed={variant === v.id}
                aria-label={v.label}
                onClick={() => setVariant(v.id)}
              >
                {v.id === 'colour' ? <span className="wp-variant__dot" /> : v.glyph}
              </button>
            ))}
            <button type="button" className="wp-variants__nav" aria-label="Next variant">›</button>
          </div>
        </div>
        <p className="wp-stagecard__note">
          Your 3D model is ready to preview. Make sure all settings are configured correctly
          for the best experience.
        </p>
      </div>

      <div className="wp-stagecard__actions">
        <button type="button" className="wp-btn wp-btn--ghost">Reset to Default</button>
        <button type="button" className="wp-btn wp-btn--save">Save Change</button>
      </div>
    </div>
  )
}

/* ---------------- Page ---------------- */
export default function AddNew({ initialTab }) {
  const [tab, setTab] = useState(
    TABS.some((t) => t.id === initialTab) ? initialTab : 'model'
  )

  return (
    <AdminLayout>
      <h1 className="wp-title">Add New</h1>

      <input className="wp-title-input" placeholder="Add title" />

      <div className="wp-shortcode">
        <span className="wp-shortcode__hint">
          Copy and paste this shortcode into your posts, pages and widget
        </span>
        <button type="button" className="wp-shortcode__chip">
          [3d_viewer id='38'] <Copy size={16} />
        </button>
      </div>

      <div className="wp-panel" style={{ marginTop: 21 }}>
        <TabStrip fixed tabs={TABS} value={tab} onChange={setTab} />

        <div className="wp-editor">
          <div>
            {tab === 'model' && <ModelTab />}
            {tab === 'settings' && <SettingsTab />}
            {tab === 'style' && <StyleTab />}
            {tab === 'preview' && <PreviewTab />}
          </div>

          <aside className="wp-side">
            {tab === 'preview' ? (
              <>
                <PublishBox />
                <LivePreviewCard />
                <h3 className="wp-side__heading">Active Insights &amp; Promotion</h3>
              </>
            ) : (
              <>
                <LivePreviewCard />
                <h3 className="wp-side__heading">Active Insights &amp; Promotion</h3>
                <PublishBox />
              </>
            )}
          </aside>
        </div>
      </div>
    </AdminLayout>
  )
}
