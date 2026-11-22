import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { findService, phoneDisplay, phoneHref, services } from '../data/services'
import { usePageTitle } from './usePageTitle'

type Fields = {
  name: string
  phone: string
  make: string
  model: string
  year: string
  service: string
  day: string
  notes: string
}

type Errors = Partial<Record<keyof Fields, string>>

const emptyFields: Fields = {
  name: '',
  phone: '',
  make: '',
  model: '',
  year: '',
  service: '',
  day: '',
  notes: '',
}

const minYear = 1980
const maxYear = new Date().getFullYear() + 1

function digits(value: string) {
  return value.replace(/\D/g, '')
}

function validPhone(value: string) {
  const count = digits(value).length
  return count >= 9 && count <= 15
}

function todayIso() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (fields.name.trim().length < 2) errors.name = 'Enter your name.'
  if (!validPhone(fields.phone)) {
    errors.phone = 'Enter a phone number we can call, such as 0712 000 000.'
  }
  if (fields.make.trim().length < 2) errors.make = 'Enter the make.'
  if (fields.model.trim().length < 2) errors.model = 'Enter the model.'
  const year = Number(fields.year)
  if (!fields.year || !Number.isInteger(year) || year < minYear || year > maxYear) {
    errors.year = `Enter a year from ${minYear} to ${maxYear}.`
  }
  if (fields.day && fields.day < todayIso()) {
    errors.day = 'That day has already passed.'
  }
  if (fields.notes.trim().length > 1000) {
    errors.notes = 'Keep the note under 1000 characters.'
  }
  return errors
}

export function Quote() {
  usePageTitle('Get a quote — SpeedyFix')
  const [params] = useSearchParams()
  const [fields, setFields] = useState<Fields>(() => ({
    ...emptyFields,
    service: findService(params.get('service'))?.id ?? '',
  }))
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState<Fields | null>(null)

  useEffect(() => {
    const id = findService(params.get('service'))?.id
    if (!id) return
    setFields((current) => ({ ...current, service: id }))
  }, [params])

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return
    setSubmitted({
      ...fields,
      name: fields.name.trim(),
      phone: fields.phone.trim(),
      make: fields.make.trim(),
      model: fields.model.trim(),
      notes: fields.notes.trim(),
    })
  }

  function reset() {
    setSubmitted(null)
    setErrors({})
    setFields({
      ...emptyFields,
      service: findService(params.get('service'))?.id ?? '',
    })
  }

  const chosen = findService(submitted?.service)?.name ?? 'Not chosen'

  return (
    <div className="page">
      <p className="eyebrow">Book the bay</p>
      <h1 className="page-title">Get a quote</h1>
      <div className="quote-layout section">
        <div>
          <p className="lead">
            Tell us the car and the job. This page keeps the request here so you
            can read it back, then you call the workshop to book.
          </p>
          <p className="intro">
            Nothing is emailed or stored. Call{' '}
            <a className="phone-link" href={phoneHref}>
              {phoneDisplay}
            </a>{' '}
            and read the summary to the desk.
          </p>
        </div>

        {submitted ? (
          <section className="confirm" aria-live="polite">
            <p className="eyebrow">On this page only</p>
            <h2>Call the workshop to book</h2>
            <p>
              Nothing was sent. Call{' '}
              <a className="phone-link" href={phoneHref}>
                {phoneDisplay}
              </a>{' '}
              and give them these details.
            </p>
            <dl className="summary">
              <dt>Name</dt>
              <dd>{submitted.name}</dd>
              <dt>Phone</dt>
              <dd>{submitted.phone}</dd>
              <dt>Vehicle</dt>
              <dd>
                {submitted.year} {submitted.make} {submitted.model}
              </dd>
              <dt>Service</dt>
              <dd>{chosen}</dd>
              <dt>Day</dt>
              <dd>{submitted.day || 'No preference'}</dd>
              <dt>Notes</dt>
              <dd>{submitted.notes || 'None'}</dd>
            </dl>
            <button className="button" type="button" onClick={reset}>
              Start another request
            </button>
          </section>
        ) : (
          <form className="form panel" onSubmit={onSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={fields.name}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? 'name-error' : undefined}
                onChange={(event) => update('name', event.target.value)}
              />
              {errors.name ? (
                <p className="field-error" id="name-error">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="0712 000 000"
                value={fields.phone}
                aria-invalid={errors.phone ? true : undefined}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                onChange={(event) => update('phone', event.target.value)}
              />
              {errors.phone ? (
                <p className="field-error" id="phone-error">
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <fieldset>
              <legend className="field-legend">Vehicle</legend>
              <div className="vehicle-grid">
                <div className="field">
                  <label htmlFor="make">Make</label>
                  <input
                    id="make"
                    name="make"
                    value={fields.make}
                    aria-invalid={errors.make ? true : undefined}
                    aria-describedby={errors.make ? 'make-error' : undefined}
                    onChange={(event) => update('make', event.target.value)}
                  />
                  {errors.make ? (
                    <p className="field-error" id="make-error">
                      {errors.make}
                    </p>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor="model">Model</label>
                  <input
                    id="model"
                    name="model"
                    value={fields.model}
                    aria-invalid={errors.model ? true : undefined}
                    aria-describedby={errors.model ? 'model-error' : undefined}
                    onChange={(event) => update('model', event.target.value)}
                  />
                  {errors.model ? (
                    <p className="field-error" id="model-error">
                      {errors.model}
                    </p>
                  ) : null}
                </div>
                <div className="field">
                  <label htmlFor="year">Year</label>
                  <input
                    id="year"
                    name="year"
                    inputMode="numeric"
                    value={fields.year}
                    aria-invalid={errors.year ? true : undefined}
                    aria-describedby={errors.year ? 'year-error' : undefined}
                    onChange={(event) => update('year', event.target.value)}
                  />
                  {errors.year ? (
                    <p className="field-error" id="year-error">
                      {errors.year}
                    </p>
                  ) : null}
                </div>
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={fields.service}
                onChange={(event) => update('service', event.target.value)}
              >
                <option value="">Not sure yet</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="day">Preferred day</label>
              <input
                id="day"
                name="day"
                type="date"
                min={todayIso()}
                value={fields.day}
                aria-invalid={errors.day ? true : undefined}
                aria-describedby={errors.day ? 'day-error' : undefined}
                onChange={(event) => update('day', event.target.value)}
              />
              {errors.day ? (
                <p className="field-error" id="day-error">
                  {errors.day}
                </p>
              ) : null}
            </div>

            <div className="field">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={fields.notes}
                aria-invalid={errors.notes ? true : undefined}
                aria-describedby={errors.notes ? 'notes-error' : undefined}
                onChange={(event) => update('notes', event.target.value)}
              />
              {errors.notes ? (
                <p className="field-error" id="notes-error">
                  {errors.notes}
                </p>
              ) : null}
            </div>

            <button className="button" type="submit">
              Show my request
            </button>
            <p className="form-note">Required: name, phone, and vehicle.</p>
          </form>
        )}
      </div>
    </div>
  )
}
