import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, ArrowLeft, Home } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

const MyFarms = () => {
  const navigate = useNavigate()

  // Demo placeholder farms array (client-side). In real app, fetch from API.
  const farms = [
    { id: '1', name: 'Green Valley Poultry Farm', location: '123 Farm Road, Agriculture City' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">My Farms</h1>
          </div>
          <div className="relative">
            <LanguageSelector 
              variant="compact" 
              position="inline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-white/50"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="mb-6">
          <p className="text-gray-700 flex items-center gap-2">
            <Home className="h-4 w-4 text-green-600" />
            <span>My Farms</span>
          </p>
        </div>

        {farms.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-dashed border-gray-300">
            <p className="text-gray-800 font-medium mb-1">No farms yet</p>
            <p className="text-gray-500 mb-4">Register a new farm to get started</p>
            <button
              onClick={() => navigate('/farm-registration')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              <span>Add Farm</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Add Farm Card */}
            <button
              onClick={() => navigate('/farm-registration')}
              className="bg-white rounded-lg shadow-sm p-5 border border-dashed flex items-center justify-center hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 text-green-700 font-medium">
                <Plus className="h-4 w-4" />
                <span>Add Farm</span>
              </div>
            </button>
            {farms.map(farm => (
              <div key={farm.id} className="bg-white rounded-lg shadow-sm p-5 border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{farm.name}</h3>
                    <p className="text-sm text-gray-600">{farm.location}</p>
                  </div>
                  <button
                    className="px-3 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
                    onClick={() => navigate(`/farms/${farm.id}`)}
                  >
                    Manage Farm
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default MyFarms
