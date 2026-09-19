import { useEffect, useState } from 'react'
import OnboardingLayout from './components/OnboardingLayout'
import StepModel from './screens/StepModel'
import StepCustomize from './screens/StepCustomize'
import StepPublish from './screens/StepPublish'
import AddNew from './pages/AddNew'
import SettingsPage from './pages/Settings'
import './styles/base.css'
import './styles/onboarding.css'
import './styles/admin.css'

/*
 * Hash routing, kept deliberately tiny — the plugin will own real routing.
 *   #/onboarding/1 · #/onboarding/2 · #/onboarding/3
 *   #/add-new      · #/settings
 */
function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '')
  if (raw.startsWith('add-new')) return { view: 'add-new', tab: raw.split('/')[1] }
  if (raw.startsWith('settings')) return { view: 'settings', tab: raw.split('/')[1] }
  const n = Number(raw.split('/').pop())
  return { view: 'onboarding', step: n >= 1 && n <= 3 ? n : 1 }
}

function Onboarding({ step: initial }) {
  const [step, setStep] = useState(initial)
  useEffect(() => setStep(initial), [initial])
  const [method, setMethod] = useState('gutenberg')

  return (
    <OnboardingLayout>
      {step === 1 && <StepModel onNext={() => setStep(2)} />}
      {step === 2 && (
        <StepCustomize onBack={() => setStep(1)} onNext={() => setStep(3)} onExit={() => setStep(1)} />
      )}
      {step === 3 && <StepPublish value={method} onChange={setMethod} onBack={() => setStep(2)} />}
    </OnboardingLayout>
  )
}

function Screen({ route }) {
  if (route.view === 'add-new') return <AddNew key={route.tab} initialTab={route.tab} />
  if (route.view === 'settings') return <SettingsPage key={route.tab} initialTab={route.tab} />
  return <Onboarding step={route.step} />
}

export default function App() {
  const [route, setRoute] = useState(parseHash)

  useEffect(() => {
    const sync = () => setRoute(parseHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  /*
   * .bp3d-app is the single scope every rule in this UI hangs off — it carries
   * the design tokens and the element resets, so nothing leaks into wp-admin
   * and wp-admin's own styles cannot reach in. Keep it as the outermost node.
   */
  return (
    <div className="bp3d-app">
      <Screen route={route} />
    </div>
  )
}
