export type Service = {
  id: string
  name: string
  category: string
  summary: string
  fromKes: number
  featured?: boolean
}

export const categories = [
  'Servicing',
  'Brakes and wheels',
  'Electrical',
  'Chassis and comfort',
  'Inspections',
] as const

export const services: Service[] = [
  {
    id: 'routine-service',
    name: 'Routine service',
    category: 'Servicing',
    summary:
      'Engine oil, a new oil filter, and a check of lights, leaks, and fluid levels. Minor or major, depending on the mileage.',
    fromKes: 4500,
    featured: true,
  },
  {
    id: 'brakes',
    name: 'Brake service',
    category: 'Brakes and wheels',
    summary:
      'Pads, discs, and fluid checked. We quote pads or discs before anything is replaced.',
    fromKes: 6500,
    featured: true,
  },
  {
    id: 'tyres',
    name: 'Tyres and wheel alignment',
    category: 'Brakes and wheels',
    summary:
      'Puncture repair, balancing, and a four-wheel alignment when the car pulls or the tyres wear on one edge.',
    fromKes: 3500,
  },
  {
    id: 'diagnostics',
    name: 'Computer diagnostics',
    category: 'Electrical',
    summary:
      'A scan of stored fault codes, then a look at the parts those codes point to.',
    fromKes: 2500,
    featured: true,
  },
  {
    id: 'battery',
    name: 'Battery and charging',
    category: 'Electrical',
    summary:
      'A test of the battery and alternator. We fit a new battery only when the test says the old one is finished.',
    fromKes: 3500,
  },
  {
    id: 'suspension',
    name: 'Suspension and steering',
    category: 'Chassis and comfort',
    summary:
      'Bushes, shocks, ball joints, and steering play. We show you the worn part before we replace it.',
    fromKes: 7500,
  },
  {
    id: 'air-conditioning',
    name: 'Air conditioning',
    category: 'Chassis and comfort',
    summary:
      'A cooling check, a look for leaks, and a regas when the system holds pressure.',
    fromKes: 4500,
  },
  {
    id: 'pre-purchase',
    name: 'Pre-purchase inspection',
    category: 'Inspections',
    summary:
      'A paid look over a car you are about to buy, with a written list of what we found.',
    fromKes: 3500,
    featured: true,
  },
]

const kes = new Intl.NumberFormat('en-KE')

export function formatKes(amount: number): string {
  return `KES ${kes.format(amount)}`
}

export function findService(id: string | null | undefined): Service | undefined {
  if (!id) return undefined
  return services.find((service) => service.id === id)
}

export const featuredServices = services.filter((service) => service.featured)

export const phoneDisplay = '+254 700 000 000'
export const phoneHref = 'tel:+254700000000'
export const addressLines = ['Enterprise Road', 'Industrial Area', 'Nairobi']
export const hours = [
  { days: 'Monday – Saturday', time: '7:30 – 18:00' },
  { days: 'Sunday', time: 'Closed' },
]
export const tagline = 'Fix it fast & fix it right'
