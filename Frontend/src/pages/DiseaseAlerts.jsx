import { motion } from 'framer-motion'
import { AlertTriangle, MapPin, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import LanguageSelector from '../components/LanguageSelector'

// Static Thane map image (open source/OSM-based screenshot URL). In a real app, host this locally.
const THANE_MAP_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Maharashtra_Thane_locator_map.svg/800px-Maharashtra_Thane_locator_map.svg.png'

// Helper to render a static map with overlay markers using absolute positioning
function StaticThaneMap({
  title,
  markers
}) {
  const colorMap = {
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    green: 'bg-green-500'
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2'>
          <h3 className='text-lg font-semibold text-gray-900 flex items-center gap-2'>
            <AlertTriangle className='h-5 w-5 text-amber-600' /> {title}
          </h3>
          <div className='flex items-center gap-4 text-xs text-gray-600'>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-3 h-3 rounded-full bg-red-500' /> High
          </span>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-3 h-3 rounded-full bg-amber-500' /> Medium
          </span>
          <span className='inline-flex items-center gap-1'>
            <span className='inline-block w-3 h-3 rounded-full bg-green-500' /> Low
          </span>
        </div>
      </div>

      <div className='relative w-full overflow-hidden rounded-md border border-gray-200'>
        {/* Keep a consistent aspect ratio for the map container */}
        <div className='w-full' style={{ aspectRatio: '4 / 3' }}>
          <img
            src={THANE_MAP_URL}
            alt='Thane District Map'
            className='w-full h-full object-contain pointer-events-none select-none'
          />
          {/* Markers */}
          {markers.map((m) => (
            <div
              key={m.id}
              className='absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'
              style={{ top: `${m.topPct}%`, left: `${m.leftPct}%` }}
            >
              <span
                className={`w-3 h-3 rounded-full ring-2 ring-white shadow ${colorMap[m.severity]}`}
                title={m.label}
              />
              <span className='mt-1 text-[10px] bg-white/80 px-1 rounded text-gray-700 shadow'>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-3 text-xs text-gray-600 flex items-center gap-1'>
        <MapPin className='h-3 w-3' /> Thane Static Note
      </div>
    </div>
  )
}

export default function DiseaseAlerts() {
  const navigate = useNavigate()
  // Demo data: Adjusted rough positions on the static map (percentages)
  const yourFarmMarkers = [
    { id: 'your-1', label: 'Your Farm', topPct: 58, leftPct: 38, severity: 'red' }
  ]

  const nearbyFarmMarkers = [
    { id: 'near-1', label: 'Farm A', topPct: 44, leftPct: 52, severity: 'green' },
    { id: 'near-2', label: 'Farm B', topPct: 62, leftPct: 47, severity: 'amber' },
    { id: 'near-3', label: 'Farm C', topPct: 36, leftPct: 35, severity: 'red' }
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-green-600 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center py-4'>
            <div className='flex items-center gap-3'>
              <button 
                onClick={() => navigate(-1)}
                className='p-2 rounded-lg bg-white/10 hover:bg-white/20' 
                aria-label='Back'
              >
                <ArrowLeft className='h-5 w-5 text-white' />
              </button>
              <div>
                <h1 className='text-xl font-semibold'>Disease Alerts</h1>
              </div>
            </div>
            <div className='relative'>
              <LanguageSelector 
                variant='compact' 
                position='inline' 
                className='bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-white/50' 
              />
            </div>
        </div>
        </div>
      </header>

      {/* Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <StaticThaneMap title="Your Farm Alert" markers={yourFarmMarkers} />
            <StaticThaneMap title="Nearby Farm Alerts" markers={nearbyFarmMarkers} />
          </div>

          {/* Info cards */}
          <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='bg-white rounded-lg shadow p-4'>
              <h4 className='font-semibold text-gray-900 mb-1'>Your Farm</h4>
              <p className='text-sm text-gray-600'>Current status: High risk (Red). Suggested action: Contact vet and isolate affected animals.</p>
            </div>
            <div className='bg-white rounded-lg shadow p-4'>
              <h4 className='font-semibold text-gray-900 mb-1'>Nearby Farm B</h4>
              <p className='text-sm text-gray-600'>Medium risk (Amber). Increase biosecurity checks and monitor twice daily.</p>
            </div>
            <div className='bg-white rounded-lg shadow p-4'>
              <h4 className='font-semibold text-gray-900 mb-1'>Regional Note</h4>
              <p className='text-sm text-gray-600'>This page is a static prototype focused on Thane district for demonstration purposes.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
