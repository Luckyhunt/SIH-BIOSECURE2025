import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Filter, RefreshCw, ArrowLeft, Settings } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

const MOCK_FARMS = [
  { id: '1', name: 'Green Valley Poultry Farm', owner: 'John Farmer', type: 'Layer', capacity: 1500, state: 'MH', status: 'Active' },
  { id: '2', name: 'Sunrise Egg Farm', owner: 'A. Kumar', type: 'Mixed', capacity: 2000, state: 'KA', status: 'Caution' },
  { id: '3', name: 'Heritage Broiler Farm', owner: 'R. Patel', type: 'Broiler', capacity: 800, state: 'GJ', status: 'Active' },
]

const Badge = ({ status }) => {
  const cls = status === 'Active'
    ? 'bg-green-100 text-green-700 border-green-200'
    : status === 'Caution' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-gray-100 text-gray-700 border-gray-200'
  return <span className={`inline-block text-xs px-2 py-1 rounded-full border ${cls}`}>{status}</span>
}

const AdminFarmManagement = () => {
  const navigate = useNavigate()

  const [query, setQuery] = useState('')
  const [state, setState] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')

  const filtered = useMemo(() => {
    return MOCK_FARMS.filter(f => {
      const matchesQuery = query ? f.name.toLowerCase().includes(query.toLowerCase()) || f.owner.toLowerCase().includes(query.toLowerCase()) : true
      const matchesState = state ? f.state === state : true
      const matchesType = type ? f.type.toLowerCase().includes(type.toLowerCase()) : true
      const matchesStatus = status ? f.status.toLowerCase() === status.toLowerCase() : true
      return matchesQuery && matchesState && matchesType && matchesStatus
    })
  }, [query, state, type, status])

  const reset = () => {
    setQuery(''); setState(''); setType(''); setStatus('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (Admin theme) */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20" aria-label="Back">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold">Farm Management</h1>
              <p className="text-xs text-white/80">Search, view, and manage all registered farms</p>
            </div>
          </div>
          <div className="relative">
            <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Filters */}
        <section className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="flex items-center gap-2 text-gray-800 font-semibold mb-3">
            <Filter className="h-5 w-5" />
            <span>Farm Management</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Farm Name / Owner" className="md:col-span-2 w-full px-4 py-3 rounded-lg border border-gray-300" />
            <select value={state} onChange={(e)=>setState(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300">
              <option value="">State</option>
              <option value="MH">Maharashtra</option>
              <option value="KA">Karnataka</option>
              <option value="GJ">Gujarat</option>
            </select>
            <select value={type} onChange={(e)=>setType(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300">
              <option value="">Type</option>
              <option value="Layer">Layer</option>
              <option value="Broiler">Broiler</option>
              <option value="Mixed">Mixed</option>
            </select>
            <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300">
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Caution">Caution</option>
            </select>
            <div className="md:col-span-5 flex gap-2 justify-between">
              <button onClick={reset} className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 inline-flex items-center gap-2">
                <RefreshCw className="h-4 w-4" /> Reset Filters
              </button>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Search Farms
              </button>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Farm</th>
                  <th className="text-left px-4 py-3 font-medium">Owner</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                  <th className="text-left px-4 py-3 font-medium">Capacity</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((f)=> (
                  <tr key={f.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{f.name}</div>
                      <div className="text-xs text-gray-500">{f.state}</div>
                    </td>
                    <td className="px-4 py-3">{f.owner}</td>
                    <td className="px-4 py-3">{f.type}</td>
                    <td className="px-4 py-3">{f.capacity}</td>
                    <td className="px-4 py-3"><Badge status={f.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="flex items-center gap-2">
                          {f.status === 'Active' ? (
                            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                              Pending
                            </span>
                          )}
                          <button 
                            onClick={() => navigate(`/farm-details/${f.id}?admin=true`)}
                            className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center gap-1"
                          >
                            <Settings className="h-4 w-4" /> Manage
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={6}>No farms match your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminFarmManagement
