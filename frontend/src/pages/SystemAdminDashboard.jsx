import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, ClipboardCheck, BookOpen, AlertTriangle, Phone, ArrowLeft, X, MapPin } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showTrainingPopup, setShowTrainingPopup] = useState(false);
  const [hoveredFarm, setHoveredFarm] = useState(null);
  
  // Mock farm data with coordinates (relative to India map)
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
      case 'critical': return '#ef4444'; // red
      case 'warning': return '#f97316'; // orange
      case 'healthy': return '#22c55e'; // green
      default: return '#6b7280'; // gray
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
  
  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login/admin/system');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex justify-between items-center w-full md:w-auto mb-3 md:mb-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleBack}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <h1 className="text-lg sm:text-xl font-semibold">Administrator Dashboard</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
              <LanguageSelector 
                variant="compact" 
                position="inline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">👤</span>
                </div>
                <span className="text-sm">Welcome!</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-sm bg-white/20 px-3 py-1 rounded hover:bg-white/30 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Training Module Popup */}
      {showTrainingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Training Module</h3>
              <button 
                onClick={() => setShowTrainingPopup(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-gray-600 mb-6">
              <p>The system administrator will add training modules here in the future. This section will contain educational content and resources for users.</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowTrainingPopup(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
          <p className="text-gray-600">Manage your farming ecosystem and monitor system performance</p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all cursor-pointer hover:border-l-4 hover:border-blue-500"
            onClick={() => navigate('/admin/farms')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Farm Management</h3>
                <p className="text-sm text-gray-600">Manage all registered farms</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Reports & Analytics</h3>
                <p className="text-sm text-gray-600">View system-wide reports</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all cursor-pointer hover:border-l-4 hover:border-blue-500"
            onClick={() => navigate('/admin/approvals')}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Approvals</h3>
                <p className="text-sm text-gray-600">Review and approve requests</p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all cursor-pointer hover:border-l-4 hover:border-blue-500"
            onClick={() => setShowTrainingPopup(true)}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Training Modules</h3>
                <p className="text-sm text-gray-600">Manage learning content</p>
              </div>
            </div>
          </div>
        </div>

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
                {/* Simplified India Map SVG */}
                <svg viewBox="0 0 100 130" className="w-full h-full">
                  {/* India outline - simplified */}
                  <path
                    d="M 35 5 L 45 5 L 50 10 L 55 8 L 60 12 L 70 15 L 75 25 L 78 35 L 75 45 L 70 50 L 65 55 L 60 60 L 55 70 L 50 80 L 45 90 L 40 95 L 35 98 L 30 95 L 25 90 L 22 85 L 20 75 L 18 65 L 15 55 L 12 45 L 10 35 L 12 25 L 15 20 L 20 15 L 25 10 L 30 7 Z"
                    fill="#e0f2fe"
                    stroke="#0ea5e9"
                    strokeWidth="0.5"
                  />
                  
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
                        className="cursor-pointer transition-all hover:r-4"
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

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-sm p-4">
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

      {/* Footer */}
      <div className="bg-gray-900 text-white py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h4 className="font-semibold text-red-400">Emergency Support</h4>
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-400">Disease Alert:</span>
                  <span className="text-white ml-2">1800-123-4567</span>
                </div>
                <div>
                  <span className="text-gray-400">Veterinary Emergency:</span>
                  <span className="text-white ml-2">108</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <h4 className="font-semibold text-blue-400">Technical Support</h4>
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white ml-2">support@digitalfarms.gov.in</span>
                </div>
                <div>
                  <span className="text-gray-400">WhatsApp:</span>
                  <span className="text-white ml-2">+91-9876543210</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <h4 className="font-semibold text-yellow-400">Farmer Helpline</h4>
              </div>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-gray-400">Helpline:</span>
                  <span className="text-white ml-2">1551</span>
                </div>
                <div>
                  <span className="text-gray-400">Training Support:</span>
                  <span className="text-white ml-2">1800-HELP-FARM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;