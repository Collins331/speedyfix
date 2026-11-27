import { Link } from 'react-router-dom'
import { usePageTitle } from './usePageTitle'

export function NotFound() {
  usePageTitle('Page not found — SpeedyFix')

  return (
    <div className="page">
      <p className="eyebrow">404</p>
      <h1 className="page-title">That page is not on the ramp</h1>
      <p className="intro">The link does not match a page on this site.</p>
      <div className="actions">
        <Link className="button" to="/">
          Back to home
        </Link>
      </div>
    </div>
  )
}
