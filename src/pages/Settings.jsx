import { useState } from 'react'
import AdminLayout from '../admin/AdminLayout'
import { TabStrip, SettingRow, Toggle, RadioGroup, MimeTile } from '../admin/controls'
import { BoxIcon } from '../components/icons'
import {
  Gear, Pencil, Eye, Search, Trash, Save, RotateCcw, Info,
  Move, ZoomIn, Maximize, ZoomOut, Loader, Copy,
} from '../admin/icons'

const TABS = [
  { id: 'general', label: 'General Settings', Icon: BoxIcon },
  { id: 'woo', label: 'Woocommerce Settings', Icon: Gear },
  { id: 'shortcode', label: 'Shortcode Generator', Icon: Pencil },
  { id: 'selectors', label: 'Woocommerce Selectors', Icon: Eye },
]

const MIME_TYPES = [
  ['GLB', '.glb'], ['GLTF', '.gltf'], ['OBJ', '.obj'], ['FBX', '.fbx'], ['3DS', '.3ds'],
  ['STEP', '.step'], ['3DML', '.3dml'], ['STL', '.stl'], ['DAE', '.dae'], ['WRL', '.wrl'],
  ['3MF', '.3mf'], ['AMF', '.amf'],
]

function DeleteDataCard({ value, onChange }) {
  return (
    <div className="wp-danger-card">
      <span className="wp-danger-card__icon"><Trash size={20} /></span>
      <div className="wp-row__main">
        <h4 className="wp-row__title">Delete data on uninstall</h4>
        <p className="wp-row__desc">Delete all plugin data when uninstalling.</p>
      </div>
      <Toggle checked={value} onChange={onChange} tone="danger" onLabel="Yes" offLabel="No" />
    </div>
  )
}

function ActionBar() {
  return (
    <div className="wp-actions">
      <button type="button" className="wp-btn wp-btn--save"><Save size={17} /> Save Changes</button>
      <button type="button" className="wp-btn wp-btn--reset"><RotateCcw size={17} /> Reset Section</button>
      <button type="button" className="wp-btn wp-btn--danger"><Trash size={17} /> Reset All</button>
    </div>
  )
}

/* ---------------- Tab 1: General ---------------- */
function GeneralTab() {
  const [enabled, setEnabled] = useState({ GLB: true, GLTF: true })
  const [del, setDel] = useState(false)

  const setAll = (on) =>
    setEnabled(on ? Object.fromEntries(MIME_TYPES.map(([l]) => [l, true])) : {})

  return (
    <>
      <div className="wp-subcard">
        <div className="wp-subcard__head">
          <div>
            <h3 className="wp-subcard__title">Allowed MIME Types</h3>
            <p className="wp-subcard__desc">
              Select which 3D model file types can be uploaded to the media library.
            </p>
          </div>
          <div className="wp-linkbtns">
            <button type="button" className="wp-linkbtn" onClick={() => setAll(true)}>Select All</button>
            <button type="button" className="wp-linkbtn wp-linkbtn--muted" onClick={() => setAll(false)}>
              Deselect All
            </button>
          </div>
        </div>

        <div className="wp-mime-grid">
          {MIME_TYPES.map(([label, ext]) => (
            <MimeTile
              key={label}
              label={label}
              ext={ext}
              checked={!!enabled[label]}
              onChange={(v) => setEnabled({ ...enabled, [label]: v })}
            />
          ))}
        </div>

        <div className="wp-infobar">
          <Info size={18} />
          GLB and GLTF are enabled by default; enable any other format you need here.
        </div>
      </div>

      <DeleteDataCard value={del} onChange={setDel} />
      <ActionBar />
    </>
  )
}

/* ---------------- Tab 2: WooCommerce ---------------- */
const WOO_ROWS = [
  { id: 'woo', Icon: Move, title: 'Woocommerce', desc: 'Enable / Disable Woocommerce Feature for 3D Viewer.' },
  { id: 'theme', Icon: ZoomIn, title: '3D Viewer is not Compatible with this Theme', desc: 'Enable or Disable Zooming Behaviour' },
  { id: 'moving', Icon: Maximize, title: 'Moving Controls', desc: 'Show/Hide Full Screen Button' },
  { id: 'zoom', Icon: ZoomOut, title: 'Zoom In/Out Button', desc: 'Enable or Disable Zoom Behaviour' },
]

function WooTab() {
  const [flags, setFlags] = useState({ woo: true, theme: true, moving: true, zoom: true })
  const [loading, setLoading] = useState('Auto')
  const [del, setDel] = useState(false)

  return (
    <>
      {WOO_ROWS.map(({ id, Icon, title, desc }) => (
        <SettingRow key={id} Icon={Icon} title={title} desc={desc}>
          <Toggle checked={flags[id]} onChange={(v) => setFlags({ ...flags, [id]: v })} />
        </SettingRow>
      ))}

      <SettingRow spaced Icon={Loader} title="Loading Type" desc='Choose Loading type, default: "Auto"'>
        <RadioGroup name="Loading type" value={loading} onChange={setLoading} options={['Auto', 'Lazy', 'Eager']} />
      </SettingRow>

      <DeleteDataCard value={del} onChange={setDel} />
      <ActionBar />
    </>
  )
}

/* ---------------- Tab 3: Shortcode Generator ---------------- */
function ShortcodeTab() {
  const [gutenberg, setGutenberg] = useState(true)
  const [del, setDel] = useState(false)

  return (
    <>
      <h3 className="wp-section-title">3D Viewer Settings</h3>

      <SettingRow
        Icon={Move}
        title="Enable Gutenberg"
        desc="Enable / Disable Gutenberg Shortcode Generator."
      >
        <Toggle checked={gutenberg} onChange={setGutenberg} />
      </SettingRow>

      <DeleteDataCard value={del} onChange={setDel} />
      <ActionBar />
    </>
  )
}

/* ---------------- Tab 4: WooCommerce Selectors ---------------- */
const SELECTOR_ROWS = [
  { id: 'gallery', kind: 'selector', value: '.woocommerce-product-gallery' },
  { id: 'a', kind: 'toggle' },
  { id: 'b', kind: 'toggle' },
  { id: 'c', kind: 'toggle' },
  { id: 'd', kind: 'toggle' },
]

function SelectorsTab() {
  const [flags, setFlags] = useState({ a: true, b: true, c: true, d: true })
  const [del, setDel] = useState(false)

  return (
    <>
      <h3 className="wp-section-title">3D Viewer Settings</h3>

      <div className="wp-rows--loose">
      {SELECTOR_ROWS.map((row) => (
        <SettingRow
          key={row.id}
          Icon={Move}
          title="Enable Gutenberg"
          desc="Enable / Disable Gutenberg Shortcode Generator."
        >
          {row.kind === 'selector' ? (
            <span className="wp-selector-field">
              {row.value}
              <Copy size={16} />
            </span>
          ) : (
            <Toggle checked={flags[row.id]} onChange={(v) => setFlags({ ...flags, [row.id]: v })} />
          )}
        </SettingRow>
      ))}
      </div>

      <DeleteDataCard value={del} onChange={setDel} />
      <ActionBar />
    </>
  )
}

/* ---------------- Page ---------------- */
export default function Settings({ initialTab }) {
  const [tab, setTab] = useState(
    TABS.some((t) => t.id === initialTab) ? initialTab : 'general'
  )

  return (
    <AdminLayout>
      <div className="wp-settings-head">
        <h1 className="wp-settings-head__title">3D Viewer Settings</h1>
        <div className="wp-search">
          <Search size={20} />
          <input placeholder="Search settings..." />
        </div>
      </div>

      <div className="wp-panel">
        <TabStrip tabs={TABS} value={tab} onChange={setTab} />

        <div className={`wp-settings-body${tab === 'general' ? '' : ' wp-settings-body--flush'}`}>
          {tab === 'general' && <GeneralTab />}
          {tab === 'woo' && <WooTab />}
          {tab === 'shortcode' && <ShortcodeTab />}
          {tab === 'selectors' && <SelectorsTab />}
        </div>
      </div>
    </AdminLayout>
  )
}
