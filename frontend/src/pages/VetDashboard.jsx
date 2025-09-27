import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, MapPin, QrCode, ArrowRight, Calendar, Shield, ArrowLeft } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import VetFooter from '../components/VetFooter';

const VetDashboard = () => {
  const navigate = useNavigate();
  // Language context is available if needed for future translations

  // Mock data for quick stats
  const stats = [
    { id: 1, name: 'Total Farms', value: '24', icon: MapPin, change: '+12%', changeType: 'increase' },
    { id: 2, name: 'Alerts', value: '8', icon: AlertCircle, change: '+2', changeType: 'increase' },
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Veterinarian Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/vet/scan')}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <QrCode className="h-5 w-5" />
              <span>Scan Farm</span>
            </button>
            <div className="relative">
              <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
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

        {/* Main Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* My Farms Card */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-semibold">My Farms</h2>
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

          {/* Alerts Card */}
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

          {/* Scan Farm QR Card */}
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
          {/* Recent Alerts */}
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

          {/* Upcoming Visits */}
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
      <VetFooter />
    </div>
  );
};

export default VetDashboard;
