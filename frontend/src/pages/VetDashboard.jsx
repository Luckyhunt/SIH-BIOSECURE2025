import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, MapPin, QrCode, ArrowRight, Calendar, Shield, ArrowLeft, LogOut } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const VetDashboard = () => {
  const navigate = useNavigate();
  const [hoveredFarm, setHoveredFarm] = useState(null);

  // Mock farm data with coordinates
  const farms = [
    { id: 1, name: 'Green Valley Poultry', state: 'Punjab', status: 'critical', x: 22, y: 18, cases: 12 },
    { id: 2, name: 'Heritage Broiler Farm', state: 'Haryana', status: 'critical', x: 25, y: 22, cases: 8 },
    { id: 3, name: 'Sunrise Egg Farm', state: 'Uttar Pradesh', status: 'warning', x: 35, y: 30, cases: 3 },
    { id: 4, name: 'Mountain View Poultry', state: 'Rajasthan', status: 'warning', x: 18, y: 35, cases: 5 },
    { id: 5, name: 'Coastal Farms', state: 'Gujarat', status: 'healthy', x: 15, y: 45, cases: 0 },
    { id: 6, name: 'Delta Poultry', state: 'Maharashtra', status: 'healthy', x: 25, y: 50, cases: 0 },
    { id: 7, name: 'Southern Pride Farm', state: 'Karnataka', status: 'warning', x: 22, y: 65, cases: 2 },
    { id: 8, name: 'Tamil Poultry', state: 'Tamil Nadu', status: 'healthy', x: 28, y: 75, cases: 0 },
    { id: 9, name: 'Bengal Farms', state: 'West Bengal', status: 'warning', x: 55, y: 40, cases: 4 },
    { id: 10, name: 'Assam Broilers', state: 'Assam', status: 'healthy', x: 70, y: 30, cases: 0 },
    { id: 11, name: 'Andhra Farms', state: 'Andhra Pradesh', status: 'healthy', x: 32, y: 68, cases: 0 },
    { id: 12, name: 'Bihar Poultry', state: 'Bihar', status: 'warning', x: 48, y: 32, cases: 3 },
  ];

  const stats = [
    { id: 1, name: 'Total Farms', value: farms.length.toString(), icon: MapPin, change: '+12%', changeType: 'increase' },
    { id: 2, name: 'Alerts', value: farms.filter(f => f.status !== 'healthy').length.toString(), icon: AlertCircle, change: '+2', changeType: 'increase' },
    { id: 3, name: 'Upcoming Visits', value: '5', icon: Calendar, change: 'Today', changeType: 'info' },
    { id: 4, name: 'Vaccinations Due', value: '14', icon: Shield, change: 'Tomorrow', changeType: 'warning' },
  ];

  const recentAlerts = [
    { id: 1, farm: 'Green Valley Farm', type: 'Disease Alert', status: 'High', time: '2h ago' },
    { id: 2, farm: 'Sunrise Poultry', type: 'Vaccination Due', status: 'Medium', time: '5h ago' },
    { id: 3, farm: 'Golden Harvest', type: 'Checkup Scheduled', status: 'Low', time: '1d ago' },
  ];

  const upcomingVisits = [
    { id: 1, farm: 'Green Valley Farm', date: 'Today, 10:00 AM', purpose: 'Routine Checkup' },
    { id: 2, farm: 'Sunrise Poultry', date: 'Tomorrow, 2:00 PM', purpose: 'Vaccination' },
    { id: 3, farm: 'Golden Harvest', date: 'Sep 28, 11:00 AM', purpose: 'Disease Inspection' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f97316';
      case 'healthy': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'critical': return 'Critical Alert';
      case 'warning': return 'Warning';
      case 'healthy': return 'Healthy';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex justify-between items-center w-full md:w-auto mb-3 md:mb-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-lg sm:text-xl font-semibold">Veterinarian Dashboard</h1>
              </div>
              <div className="relative md:hidden">
                <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
              </div>
            </div>

            <div className="flex items-center flex-wrap gap-3 md:gap-4 justify-between w-full md:w-auto">
              <div className="relative hidden md:block">
                <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
              </div>
              <button
                onClick={() => navigate('/vet/scan')}
                className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
              >
                <QrCode className="h-5 w-5" />
                <span className="hidden sm:inline">Scan Farm</span>
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 space-y-6 w-full">
        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white rounded-xl shadow-sm border p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' :
                    'text-orange-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Heat Map Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Farm Alert Heat Map - India</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-gray-600">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Healthy</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* India Map */}
            <div className="lg:col-span-2 relative">
              <div className="relative w-full bg-blue-50 rounded-lg p-8" style={{ aspectRatio: '3/4' }}>
                <svg viewBox="0 0 100 140" className="w-full h-full">
                  {/* India outline */}
                  <path
                    d="M 30,15 L 35,12 L 38,10 L 42,9 L 46,10 L 50,11 L 54,13 L 58,16 L 62,18 L 66,22 L 68,26 L 70,30 L 71,34 L 72,38 L 72,42 L 71,46 L 69,50 L 67,54 L 64,58 L 60,62 L 58,66 L 56,70 L 54,75 L 52,80 L 50,85 L 48,90 L 46,95 L 44,100 L 42,105 L 40,108 L 38,110 L 36,112 L 34,113 L 32,114 L 30,114 L 28,113 L 26,111 L 24,108 L 22,105 L 20,102 L 18,98 L 16,94 L 15,90 L 14,86 L 13,82 L 12,78 L 11,74 L 10,70 L 10,66 L 10,62 L 11,58 L 12,54 L 14,50 L 16,46 L 18,42 L 20,38 L 22,35 L 24,32 L 26,29 L 28,26 L 30,23 L 32,20 L 30,17 Z"
                    fill="#e0f2fe"
                    stroke="#0ea5e9"
                    strokeWidth="0.8"
                  />
                  
                  {/* Kashmir region */}
                  <path
                    d="M 30,15 L 28,12 L 26,10 L 28,8 L 30,7 L 32,8 L 34,10 L 35,12 L 33,14 L 30,15 Z"
                    fill="#e0f2fe"
                    stroke="#0ea5e9"
                    strokeWidth="0.8"
                  />
                  
                  {/* Northeast region */}
                  <path
                    d="M 70,30 L 72,28 L 74,28 L 76,30 L 78,32 L 80,35 L 78,38 L 76,40 L 74,38 L 72,35 L 71,32 L 70,30 Z"
                    fill="#e0f2fe"
                    stroke="#0ea5e9"
                    strokeWidth="0.8"
                  />
                  
                  {/* Andaman & Nicobar Islands */}
                  <ellipse cx="85" cy="75" rx="2" ry="8" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="0.5" />
                  
                  {/* Lakshadweep Islands */}
                  <circle cx="8" cy="85" r="1.5" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="0.5" />
                  
                  {/* Farm markers */}
                  {farms.map((farm) => (
                    <g key={farm.id}>
                      <circle
                        cx={farm.x}
                        cy={farm.y}
                        r={farm.status === 'critical' ? 3 : 2.5}
                        fill={getStatusColor(farm.status)}
                        stroke="white"
                        strokeWidth="0.5"
                        className="cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredFarm(farm)}
                        onMouseLeave={() => setHoveredFarm(null)}
                        style={{
                          filter: hoveredFarm?.id === farm.id ? 'brightness(1.2)' : 'none',
                          transform: hoveredFarm?.id === farm.id ? 'scale(1.3)' : 'scale(1)',
                          transformOrigin: `${farm.x}px ${farm.y}px`
                        }}
                      />
                      {farm.status === 'critical' && (
                        <circle
                          cx={farm.x}
                          cy={farm.y}
                          r={5}
                          fill="none"
                          stroke={getStatusColor(farm.status)}
                          strokeWidth="0.5"
                          opacity="0.4"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  ))}
                </svg>

                {/* Hover tooltip */}
                {hoveredFarm && (
                  <div 
                    className="absolute bg-white rounded-lg shadow-lg p-3 pointer-events-none z-10 border border-gray-200"
                    style={{
                      left: `${hoveredFarm.x}%`,
                      top: `${hoveredFarm.y}%`,
                      transform: 'translate(-50%, -120%)'
                    }}
                  >
                    <div className="text-sm font-semibold text-gray-900">{hoveredFarm.name}</div>
                    <div className="text-xs text-gray-600">{hoveredFarm.state}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getStatusColor(hoveredFarm.status) }}
                      ></div>
                      <span className="text-xs font-medium">{getStatusLabel(hoveredFarm.status)}</span>
                    </div>
                    {hoveredFarm.cases > 0 && (
                      <div className="text-xs text-red-600 mt-1">{hoveredFarm.cases} active cases</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Alert Summary List */}
            <div className="space-y-3 overflow-y-auto max-h-96">
              <h4 className="font-semibold text-gray-900 sticky top-0 bg-white pb-2">Alert Summary</h4>
              {farms
                .filter(f => f.status !== 'healthy')
                .sort((a, b) => {
                  if (a.status === 'critical' && b.status !== 'critical') return -1;
                  if (a.status !== 'critical' && b.status === 'critical') return 1;
                  return b.cases - a.cases;
                })
                .map((farm) => (
                  <div 
                    key={farm.id}
                    className="p-3 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                    style={{ borderLeftWidth: '4px', borderLeftColor: getStatusColor(farm.status) }}
                    onMouseEnter={() => setHoveredFarm(farm)}
                    onMouseLeave={() => setHoveredFarm(null)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm">{farm.name}</div>
                        <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3" />
                          {farm.state}
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                        farm.status === 'critical' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {farm.cases} cases
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold">Farms</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">View and manage all farms under your supervision.</p>
              <button 
                onClick={() => navigate('/vet/farms')}
                className="w-full py-2 px-4 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center gap-2"
              >
                View All Farms <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold">Alerts</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">View and respond to disease alerts and notifications.</p>
              <button 
                onClick={() => navigate('/vet/alerts')}
                className="w-full py-2 px-4 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center gap-2"
              >
                View Alerts <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                  <QrCode className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold">Scan Farm QR</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4">Scan a farm's QR code to quickly access its details.</p>
              <button 
                onClick={() => navigate('/vet/scan')}
                className="w-full py-2 px-4 rounded-lg bg-orange-600 text-white hover:bg-orange-700 flex items-center justify-center gap-2"
              >
                Scan QR Code <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Recent Alerts and Upcoming Visits */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-lg font-semibold">Recent Alerts</h2>
            </div>
            <div className="divide-y">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{alert.farm}</h3>
                      <p className="text-sm text-gray-500">{alert.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        alert.status === 'High' ? 'bg-red-100 text-red-800' :
                        alert.status === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.status}
                      </span>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-lg font-semibold">Upcoming Visits</h2>
            </div>
            <div className="divide-y">
              {upcomingVisits.map((visit) => (
                <div key={visit.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{visit.farm}</h3>
                      <p className="text-sm text-gray-500">{visit.purpose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{visit.date}</p>
                      <button className="text-xs text-orange-600 hover:underline">View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-6 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center sm:text-left'>
            <div className='space-y-2'>
              <h4 className='font-semibold text-green-400 text-sm'>Emergency Support</h4>
              <p className='text-xs'>Disease Alert: <strong className='text-green-400'>1800-123-4567</strong></p>
              <p className='text-xs'>Veterinary Emergency: <strong className='text-red-400'>108</strong></p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-blue-400 text-sm'>Technical Support</h4>
              <p className='text-xs'>Email: <strong className='text-blue-400'>support@digitalfarm.gov.in</strong></p>
              <p className='text-xs'>WhatsApp: <strong className='text-blue-400'>+91-9876543210</strong></p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-orange-400 text-sm'>Veterinary Support</h4>
              <p className='text-xs'>Helpline: <strong className='text-orange-400'>1800-VET-HELP</strong></p>
              <p className='text-xs'>Email: <strong className='text-orange-400'>vet@digitalfarm.gov.in</strong></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VetDashboard;