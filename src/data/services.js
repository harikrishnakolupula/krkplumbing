import {
  Building2,
  Cable,
  ClipboardCheck,
  Cog,
  Container,
  Droplets,
  ShowerHead,
  Siren,
  Toilet,
  Utensils,
  Waves,
  Bath,
} from 'lucide-react'

export const services = [
  {
    id: 'pipe-leakage',
    title: 'Pipe Leakage Repair',
    description: 'Quick detection and lasting repair of leaking pipes, joints and fittings to stop water waste and wall damage.',
    image: '/images/services/pipe-leakage.webp',
    icon: Droplets,
  },
  {
    id: 'bathroom',
    title: 'Bathroom Plumbing',
    description: 'Fitting, repair and replacement of bathroom pipelines, fixtures, basins, geysers and concealed plumbing.',
    image: '/images/services/bathroom.webp',
    icon: Bath,
  },
  {
    id: 'kitchen-sink',
    title: 'Kitchen Sink Plumbing',
    description: 'Sink installation, tap fitting, blockage clearing and leak repair for a smooth-running kitchen.',
    image: '/images/services/kitchen-sink.webp',
    icon: Utensils,
  },
  {
    id: 'tap-shower',
    title: 'Tap & Shower Installation',
    description: 'Neat installation and replacement of taps, mixers, showers and wall-mounted fittings.',
    image: '/images/services/tap-shower.webp',
    icon: ShowerHead,
  },
  {
    id: 'drainage',
    title: 'Drainage Blockage Removal',
    description: 'Clearing of blocked drains, sinks and sewer lines so water flows freely again.',
    image: '/images/services/drainage.webp',
    icon: Waves,
  },
  {
    id: 'water-tank',
    title: 'Water Tank Cleaning',
    description: 'Thorough cleaning of overhead and underground tanks for safe, clean water at home.',
    image: '/images/services/water-tank.webp',
    icon: Container,
  },
  {
    id: 'water-motor',
    title: 'Water Motor Installation',
    description: 'Installation, repair and servicing of water motors and pumps with proper pipeline connection.',
    image: '/images/services/water-motor.webp',
    icon: Cog,
  },
  {
    id: 'new-pipe',
    title: 'New Pipeline Installation',
    description: 'Planned laying of new water supply and drainage pipelines for homes, flats and new construction.',
    image: '/images/services/new-pipe.webp',
    icon: Cable,
  },
  {
    id: 'toilet-flush',
    title: 'Toilet & Flush Tank Repair',
    description: 'Repair or replacement of toilet seats, flush tanks, cisterns and flush mechanisms.',
    image: '/images/services/toilet-flush.webp',
    icon: Toilet,
  },
  {
    id: 'emergency',
    title: 'Emergency Plumbing',
    description: 'Urgent help for burst pipes, major leaks and overflows when you cannot wait.',
    image: '/images/services/emergency.webp',
    icon: Siren,
  },
  {
    id: 'commercial',
    title: 'Commercial Plumbing',
    description: 'Plumbing installation and maintenance for shops, offices, apartments and other commercial spaces.',
    image: '/images/services/commercial.webp',
    icon: Building2,
  },
  {
    id: 'maintenance',
    title: 'Plumbing Maintenance',
    description: 'Regular inspection and preventive care that catches small problems before they become costly repairs.',
    image: '/images/services/maintenance.webp',
    icon: ClipboardCheck,
  },
]

export const timeSlots = [
  'Morning (8 AM – 12 PM)',
  'Afternoon (12 PM – 4 PM)',
  'Evening (4 PM – 8 PM)',
  'Anytime / Flexible',
]

export const callbackTimes = ['As soon as possible', 'Morning (8 AM – 12 PM)', 'Afternoon (12 PM – 4 PM)', 'Evening (4 PM – 8 PM)']

export function getServiceLabel(id) {
  return services.find((service) => service.id === id)?.title ?? ''
}
