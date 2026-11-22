import { Link } from 'react-router-dom'
import { categories, formatKes, services } from '../data/services'
import { usePageTitle } from './usePageTitle'

export function Services() {
  usePageTitle('Services — SpeedyFix')

  return (
    <div className="page">
      <p className="eyebrow">The work</p>
      <h1 className="page-title">Services</h1>
      <p className="intro">
        Prices are starting points in Kenyan shillings, not a fixed quote. The
        final figure depends on the car and what we find. Parts are priced
        before they are fitted.
      </p>

      {categories.map((category) => {
        const items = services.filter((service) => service.category === category)
        const headingId = category.toLowerCase().replace(/[^a-z0-9]+/g, '-')
        return (
          <section className="category-block" key={category} aria-labelledby={headingId}>
            <h2 id={headingId}>{category}</h2>
            <div className="card-grid">
              {items.map((service) => (
                <article className="card" key={service.id}>
                  <h3>{service.name}</h3>
                  <p>{service.summary}</p>
                  <p className="price">
                    <span>FROM</span>
                    {formatKes(service.fromKes)}
                  </p>
                  <Link className="text-link" to={`/quote?service=${service.id}`}>
                    Get a quote
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
