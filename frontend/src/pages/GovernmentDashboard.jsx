import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, CheckCircle, MapPin, AlertTriangle, QrCode } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const GovernmentDashboard = () => {
  const navigate = useNavigate();
  const [hoveredFarm, setHoveredFarm] = useState(null);

  // Mock farm data
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

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-7xl mx-auto">
          <div className="flex justify-between items-center w-full md:w-auto mb-3 md:mb-0">
            <h1 className="text-xl font-bold flex items-center space-x-2">
              <span className="text-2xl">🚜</span>
              <span className="text-lg sm:text-xl">Government Farm Dashboard</span> 
            </h1>
            <div className="relative md:hidden">
              <LanguageSelector 
                variant="compact" 
                position="inline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-white/50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6 justify-between w-full md:w-auto">
            <div className="relative hidden md:block">
              <LanguageSelector 
                variant="compact" 
                position="inline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-white/50"
              />
            </div>
            <span className="text-sm hidden md:block">Welcome, Admin!</span>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center space-x-1 md:space-x-2 transition-all text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600 mb-8">Manage farm approvals and stay updated on local farm activities.</p>

          {/* Heat Map Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
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

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate('/government/approvals')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Farm Approvals</h3>
                <p className="text-gray-500 text-sm">Review and manage farm applications</p>
              </div>
            </div>

            <div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate('/government/nearby-farms')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Nearby Farms</h3>
                <p className="text-gray-500 text-sm">Explore local farms in your area</p>
              </div>
            </div>

            <div 
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => navigate('/government/scan-farm')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                  <QrCode className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">Scan Farm QR</h3>
                <p className="text-gray-500 text-sm">Scan a farm's QR code to view details</p>
              </div>
            </div>

            <Link to="/government/alerts" className="block">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-red-100 p-4 rounded-full mb-4 group-hover:bg-red-200 transition-colors">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Disease Alerts</h3>
                  <p className="text-gray-500 text-sm">View and manage farm alerts and inspections</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {farms.filter(f => f.status === 'healthy').length}
                </div>
                <div className="text-xs text-gray-500 font-medium">Healthy Farms</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {farms.filter(f => f.status === 'warning').length}
                </div>
                <div className="text-xs text-gray-500 font-medium">Warning Alerts</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {farms.filter(f => f.status === 'critical').length}
                </div>
                <div className="text-xs text-gray-500 font-medium">Critical Alerts</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-sm text-gray-300 px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="flex items-center font-semibold text-red-400 mb-4">
              <span className="mr-2">🚨</span>
              Emergency Support
            </h3>
            <div className="space-y-2">
              <p>Disease Alert: <span className="text-red-300 font-medium">1800-123-4567</span></p>
              <p>Veterinary Emergency: <span className="text-red-300 font-medium">108</span></p>
            </div>
          </div>

          <div>
            <h3 className="flex items-center font-semibold text-blue-400 mb-4">
              <span className="mr-2">🛠</span>
              Technical Support
            </h3>
            <div className="space-y-2">
              <p>Email: <span className="text-blue-300">support@digitalfarm.gov.in</span></p>
              <p>WhatsApp: <span className="text-blue-300">+91-9876543210</span></p>
            </div>
          </div>

          <div>
            <h3 className="flex items-center font-semibold text-yellow-400 mb-4">
              <span className="mr-2">👨‍🌾</span>
              Farmer Helpline
            </h3>
            <div className="space-y-2">
              <p>Helpline: <span className="text-yellow-300 font-medium">1551</span></p>
              <p>Training Support: <span className="text-yellow-300 font-medium">1800-HELP-FARM</span></p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2025 Digital Farm Initiative. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default GovernmentDashboard;