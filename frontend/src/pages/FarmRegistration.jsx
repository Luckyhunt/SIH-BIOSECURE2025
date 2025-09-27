import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

const poultryOptions = [
  { value: 'broiler', label: 'Broiler' },
  { value: 'layer', label: 'Layer' },
  { value: 'breeder', label: 'Breeder' },
  { value: 'hatchery', label: 'Hatchery' },
  { value: 'backyard', label: 'Backyard' }
]

const FarmRegistration = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    farmName: '',
    state: '',
    district: '',
    pin: '',
    gps: '',
    poultryType: '',
    currentFlockSize: '',
    farmCapacity: '',
    vaccinated: 'no',
    lastVaccinatedDate: '',
    upcomingVaccinationDate: '',
    workersCount: '',
    photo: undefined,
    workers: []
  })

  const [photoPreview, setPhotoPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [gpsLoading, setGpsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Resize workers array when workersCount changes
  useEffect(() => {
    const count = parseInt(form.workersCount || '0', 10)
    if (isNaN(count) || count < 0) return
    setForm(prev => {
      const current = prev.workers || []
      let next = current
      if (current.length < count) {
        next = [
          ...current,
          ...Array.from({ length: count - current.length }, () => ({ name: '', age: '', role: '', contact: '' }))
        ]
      } else if (current.length > count) {
        next = current.slice(0, count)
      }
      if (next === current) return prev
      return { ...prev, workers: next }
    })
  }, [form.workersCount])

  const handleWorkersCountChange = (e) => {
    const value = e.target.value
    // allow empty, else only digits
    if (value === '' || /^\d+$/.test(value)) {
      setForm(prev => ({ ...prev, workersCount: value }))
    }
  }

  const handleWorkerChange = (
    index,
    field,
    value
  ) => {
    setForm(prev => {
      const workers = [...(prev.workers || [])]
      if (!workers[index]) workers[index] = { name: '', age: '', role: '', contact: '' }
      workers[index] = { ...workers[index], [field]: value }
      return { ...prev, workers }
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm(prev => ({ ...prev, photo: file }))
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const getPoultryLabel = (value) => {
    switch (value) {
      case 'broiler':
        return 'Broiler'
      case 'layer':
        return 'Layer'
      case 'breeder':
        return 'Breeder'
      case 'hatchery':
        return 'Hatchery'
      case 'backyard':
        return 'Backyard'
      default:
        return value
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.farmName.trim()) newErrors.farmName = 'Farm name is required'
    if (!form.state.trim()) newErrors.state = 'State is required'
    if (!form.district.trim()) newErrors.district = 'District is required'
    if (!form.pin.trim()) newErrors.pin = 'PIN is required'
    if (form.pin && !/^\d{6}$/.test(form.pin)) newErrors.pin = 'PIN must be 6 digits'
    if (!form.poultryType) newErrors.poultryType = 'Please select a type'
    if (form.currentFlockSize && Number(form.currentFlockSize) < 0) newErrors.currentFlockSize = 'Must be 0 or more'
    if (form.farmCapacity && Number(form.farmCapacity) < 0) newErrors.farmCapacity = 'Must be 0 or more'
    if (form.workersCount && Number(form.workersCount) < 0) newErrors.workersCount = 'Must be 0 or more'
    if (form.vaccinated === 'yes') {
      if (!form.lastVaccinatedDate) newErrors.lastVaccinatedDate = 'Last vaccinated date is required'
      if (form.upcomingVaccinationDate && form.lastVaccinatedDate && form.upcomingVaccinationDate < form.lastVaccinatedDate) {
        newErrors.upcomingVaccinationDate = 'Upcoming date must be after last vaccinated date'
      }
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    // In a real app, submit to backend here (multipart/form-data if photo is present)
    console.log('Submitting farm registration', form)
    alert('Farm registered (demo). You can now return to the dashboard.')
    navigate(-1)
  }

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setErrors(prev => ({ ...prev, gps: 'Geolocation is not supported on this device' }))
      return
    }
    setGpsLoading(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords
        setForm(prev => ({ ...prev, gps: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }))
        setGpsLoading(false)
      },
      err => {
        setErrors(prev => ({ ...prev, gps: err.message || 'Unable to get location' }))
        setGpsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-lg font-semibold">Farm Registration</h1>
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

      <main className="max-w-2xl md:max-w-5xl mx-auto px-4 py-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-7 grid grid-cols-1 md:grid-cols-2 gap-7"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Farm Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="farmName"
              value={form.farmName}
              onChange={handleChange}
              placeholder="Enter farm name"
              autoComplete="organization"
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.farmName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white`}
              required
            />
            {errors.farmName && <p className="mt-1 text-xs text-red-600">{errors.farmName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">State <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              autoComplete="address-level1"
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.state ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white`}
              required
            />
            {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">District <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="District"
              autoComplete="address-level2"
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.district ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white`}
              required
            />
            {errors.district && <p className="mt-1 text-xs text-red-600">{errors.district}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">PIN <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="pin"
              value={form.pin}
              onChange={handleChange}
              placeholder="PIN code"
              maxLength={6}
              inputMode="numeric"
              pattern="\d{6}"
              autoComplete="postal-code"
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.pin ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white`}
              required
            />
            {errors.pin && <p className="mt-1 text-xs text-red-600">{errors.pin}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">GPS Coordinates</label>
            <input
              type="text"
              name="gps"
              value={form.gps}
              onChange={handleChange}
              placeholder="lat, lng"
              inputMode="text"
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.gps ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white`}
            />
            <div className="flex items-center gap-3 mt-2">
              <button type="button" onClick={handleUseMyLocation} className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm">
                {gpsLoading ? 'Getting location…' : 'Use my location'}
              </button>
              <p className="text-xs text-gray-500">Format: latitude, longitude</p>
            </div>
            {errors.gps && <p className="mt-1 text-xs text-red-600">{errors.gps}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Type of Poultry <span className="text-red-500">*</span></label>
            <select
              name="poultryType"
              value={form.poultryType}
              onChange={handleChange}
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.poultryType ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white`}
              required
            >
              <option value="" disabled>
                Select type
              </option>
              {poultryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.poultryType && <p className="mt-1 text-xs text-red-600">{errors.poultryType}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Current Flock Size</label>
            <input
              type="number"
              name="currentFlockSize"
              value={form.currentFlockSize}
              onChange={handleChange}
              min={0}
              placeholder="e.g., 1200"
              inputMode="numeric"
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.currentFlockSize ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white`}
            />
            {errors.currentFlockSize && <p className="mt-1 text-xs text-red-600">{errors.currentFlockSize}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Farm Capacity</label>
            <input
              type="number"
              name="farmCapacity"
              value={form.farmCapacity}
              onChange={handleChange}
              min={0}
              placeholder="e.g., 2000"
              inputMode="numeric"
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.farmCapacity ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white`}
            />
            {errors.farmCapacity && <p className="mt-1 text-xs text-red-600">{errors.farmCapacity}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Are animals vaccinated?</label>
            <select
              name="vaccinated"
              value={form.vaccinated}
              onChange={handleChange}
              className="w-full px-5 py-4 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {form.vaccinated === 'yes' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Last Vaccinated Date <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  name="lastVaccinatedDate"
                  value={form.lastVaccinatedDate}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 text-base rounded-lg border ${errors.lastVaccinatedDate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white`}
                />
                {errors.lastVaccinatedDate && <p className="mt-1 text-xs text-red-600">{errors.lastVaccinatedDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Upcoming Vaccination Date</label>
                <input
                  type="date"
                  name="upcomingVaccinationDate"
                  value={form.upcomingVaccinationDate}
                  onChange={handleChange}
                  className={`w-full px-5 py-4 text-base rounded-lg border ${errors.upcomingVaccinationDate ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white`}
                />
                {errors.upcomingVaccinationDate && <p className="mt-1 text-xs text-red-600">{errors.upcomingVaccinationDate}</p>}
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">Total number of Workers</label>
            <input
              type="number"
              name="workersCount"
              value={form.workersCount}
              onChange={handleWorkersCountChange}
              min={0}
              placeholder="e.g., 5"
              inputMode="numeric"
              className={`w-full px-5 py-4 text-base rounded-lg border ${errors.workersCount ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white`}
            />
            {errors.workersCount && <p className="mt-1 text-xs text-red-600">{errors.workersCount}</p>}
          </div>

          {/* Dynamic Workers Section */}
          {Array.from({ length: parseInt(form.workersCount || '0', 10) || 0 }).map((_, i) => (
            <div key={i} className="md:col-span-2 border rounded-xl p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">Worker {i + 1}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Name</label>
                  <input
                    type="text"
                    value={form.workers?.[i]?.name || ''}
                    onChange={(e) => handleWorkerChange(i, 'name', e.target.value)}
                    placeholder="Name"
                    className="w-full px-5 py-4 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Age</label>
                  <input
                    type="number"
                    value={form.workers?.[i]?.age || ''}
                    onChange={(e) => handleWorkerChange(i, 'age', e.target.value)}
                    min={0}
                    placeholder="e.g., 32"
                    inputMode="numeric"
                    className="w-full px-5 py-4 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Role</label>
                  <input
                    type="text"
                    value={form.workers?.[i]?.role || ''}
                    onChange={(e) => handleWorkerChange(i, 'role', e.target.value)}
                    placeholder="e.g., Caretaker"
                    className="w-full px-5 py-4 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Contact Info</label>
                  <input
                    type="tel"
                    value={form.workers?.[i]?.contact || ''}
                    onChange={(e) => handleWorkerChange(i, 'contact', e.target.value)}
                    placeholder="Contact Info"
                    inputMode="tel"
                    className="w-full px-5 py-4 text-base rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder:text-gray-400 bg-white"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-800 mb-2">Upload Photo</label>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-gray-700">
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              {photoPreview && (
                <img src={photoPreview} alt="Preview" className="h-16 w-16 rounded object-cover border" />
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 w-full sm:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default FarmRegistration
