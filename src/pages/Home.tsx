import { Link } from 'react-router-dom'
import { featuredServices, formatKes } from '../data/services'
import { usePageTitle } from './usePageTitle'

const reasons = [
  {
    title: 'Priced before we start',
    text: 'You get a starting figure for the job you asked for. Extra work waits until you say yes.',
  },
  {
    title: 'Bay time, not a guessing game',
    text: 'Oil service, brakes, and diagnostics are booked as a slot. We tell you if the car needs to stay.',
  },
  {
    title: 'One workshop, clear steps',
    text: 'Drop the car, we diagnose, you approve, we finish and call you when it is ready.',
  },
]

export function Home() {
  usePageTitle('SpeedyFix — Nairobi auto garage')

  return (
    <div className="page">
      <section className="hero">
        <img
          className="hero-logo"
          src="/logo.png"
          alt="SpeedyFix. Fix it fast and fix it right."
        />
        <div>
          <p className="eyebrow">Industrial Area, Nairobi</p>
          <h1 className="page-title">The bay that tells you the price first</h1>
          <p className="lead">
            SpeedyFix services cars and light vans on Enterprise Road. Bring the
            job. We name the work and a starting price before a spanner turns.
          </p>
          <div className="actions">
            <Link className="button" to="/quote">
              Get a quote
            </Link>
            <Link className="button ghost" to="/services">
              See services
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="reasons-title">
        <div className="section-head">
          <h2 id="reasons-title">Why the bay</h2>
        </div>
        <div className="reason-grid">
          {reasons.map((reason, index) => (
            <article className="reason" key={reason.title}>
              <p className="reason-index">0{index + 1}</p>
              <h3>{reason.title}</h3>
              <p className="muted">{reason.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="featured-title">
        <div className="section-head">
          <h2 id="featured-title">Work we do most</h2>
          <Link className="text-link" to="/services">
            All services
          </Link>
        </div>
        <div className="card-grid four">
          {featuredServices.map((service) => (
            <article className="card" key={service.id}>
              <h3>{service.name}</h3>
              <p>{service.summary}</p>
              <p className="price">
                <span>FROM</span>
                {formatKes(service.fromKes)}
              </p>
              <Link className="text-link" to={`/quote?service=${service.id}`}>
                Ask for this
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
