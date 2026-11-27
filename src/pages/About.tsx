import { addressLines, hours, phoneDisplay, phoneHref } from '../data/services'
import { usePageTitle } from './usePageTitle'

const steps = [
  {
    title: 'Drop-off',
    text: 'Bring the car during open hours, or call and agree a time so a bay is free.',
  },
  {
    title: 'Diagnosis',
    text: 'We check the fault or the service items and write down what we found.',
  },
  {
    title: 'Approval',
    text: 'Paid work beyond the job you asked for waits until you agree the price.',
  },
  {
    title: 'Handover',
    text: 'We call when the car is ready and walk you through what was done.',
  },
]

export function About() {
  usePageTitle('About — SpeedyFix')

  return (
    <div className="page">
      <p className="eyebrow">The workshop</p>
      <h1 className="page-title">About SpeedyFix</h1>
      <div className="about-grid section">
        <div>
          <p className="lead">
            SpeedyFix is a general garage for cars and light vans. We do
            scheduled servicing, brakes, electrical faults, tyres, suspension,
            air conditioning, and inspections before you buy.
          </p>
          <ol className="steps">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="step-no">0{index + 1}</span>
                <div>
                  <strong>{step.title}</strong>
                  <span className="muted">{step.text}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside className="panel">
          <h2>Find the bay</h2>
          <ul className="address-list">
            {addressLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p>
            <a className="phone-link" href={phoneHref}>
              {phoneDisplay}
            </a>
          </p>
          <h2>Open hours</h2>
          <ul className="hours-list">
            {hours.map((row) => (
              <li key={row.days}>
                <span>{row.days}</span>
                <span>{row.time}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}
