
import React from 'react';
import { AlertTriangle, AlertCircle, MapPin, Clock, Thermometer, ShieldAlert } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const ALERTS = {
  red: [
    {
      id: 1,
      farmName: 'Green Valley Poultry Farm',
      location: '2.5 km away',
      alert: 'Avian Influenza (H5N1) outbreak confirmed',
      date: 'Reported: Today, 10:30 AM',
      cases: '12 cases reported',
      risk: 'HIGH RISK',
      coordinates: '18.9894° N, 72.9784° E'
    },
    {
      id: 2,
      farmName: 'Heritage Broiler Farm',
      location: '5.1 km away',
      alert: 'Newcastle Disease outbreak',
      date: 'Reported: Yesterday, 3:45 PM',
      cases: '8 cases reported',
      risk: 'HIGH RISK',
      coordinates: '18.9912° N, 72.9801° E'
    }
  ],
  orange: [
    {
      id: 1,
      farmName: 'Sunrise Egg Farm',
      location: '3.7 km away',
      alert: 'Suspected Infectious Bronchitis',
      date: 'Reported: 2 hours ago',
      cases: '3 cases reported',
      risk: 'MEDIUM RISK',
      coordinates: '18.9876° N, 72.9753° E'
    },
    {
      id: 2,
      farmName: 'Mountain View Poultry',
      location: '7.2 km away',
      alert: 'Potential Fowl Pox cases',
      date: 'Reported: 5 hours ago',
      cases: '2 cases reported',
      risk: 'MEDIUM RISK',
      coordinates: '18.9932° N, 72.9821° E'
    }
  ]
};

const AlertCard = ({ alert, type }) => {
  const isRed = type === 'red';
  const bgColor = isRed ? 'bg-red-50' : 'bg-orange-50';
  const borderColor = isRed ? 'border-red-500' : 'border-orange-500';
  const titleColor = isRed ? 'text-red-700' : 'text-orange-700';
  const icon = isRed ? 
    <AlertCircle className="w-6 h-6 text-red-600" /> : 
    <AlertTriangle className="w-6 h-6 text-orange-500" />;

  return (
    <div className={`border-l-4 ${borderColor} ${bgColor} p-6 rounded-r-lg shadow-lg mb-6`}>
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-full ${isRed ? 'bg-red-100' : 'bg-orange-100'} mr-3`}>
          {icon}
        </div>
        <h3 className={`text-2xl font-bold ${titleColor}`}>
          {isRed ? 'Red Alert' : 'Orange Alert'}
          <span className="ml-2 text-sm px-2 py-1 rounded-full bg-white text-red-600 font-normal">
            {alert.risk}
          </span>
        </h3>
      </div>
      
      <div className="pl-2">
        <h4 className="text-lg font-semibold text-gray-900 mb-1">{alert.farmName}</h4>
        <p className="text-gray-700 mb-3">{alert.alert}</p>
        
        <div className="grid grid-cols-1 gap-4 text-sm mt-4">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-gray-500" />
            <div>
              <p className="text-gray-500">Location</p>
              <p className="font-medium">{alert.location}</p>
              <p className="text-xs text-gray-500 mt-1">{alert.coordinates}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-gray-500" />
            <div>
              <p className="text-gray-500">Reported</p>
              <p className="font-medium">{alert.date}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center">
              <Thermometer className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm font-medium">{alert.cases}</span>
            </div>
            <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 self-start sm:self-auto">
              <ShieldAlert className="w-4 h-4 mr-1" />
              View Biosecurity Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisitorAlerts = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start">
            {/* Back Button with Box */}
            <div className="mr-4 flex-shrink-0">
              <button 
                onClick={() => window.history.back()} 
                className="flex items-center justify-center h-10 w-10 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/20 shadow-sm"
                aria-label="Go back"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2.5} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-white/20 mr-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Disease Alerts</h1>
                  <p className="text-purple-100 mt-1">Stay informed about disease outbreaks in your area</p>
                </div>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="flex-shrink-0">
              <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Precautionary Message Section */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-red-800">Important Precautionary Notice</h3>
              <div className="mt-2 text-sm text-red-700">
                <p className="font-medium">You have recently visited a farm that now has a red alert status. Please follow these precautions to prevent disease spread:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Do not visit any other farms for the next <span className="font-semibold">72 hours</span></li>
                  <li>Thoroughly clean and disinfect all clothing, footwear, and equipment</li>
                  <li>Shower and change clothes before visiting any other farms</li>
                  <li>Monitor for any symptoms and report immediately if you feel unwell</li>
                  <li>Follow all biosecurity protocols strictly</li>
                </ul>
                <div className="mt-4 p-3 bg-white rounded-lg border border-red-200">
                  <p className="font-medium text-red-800">Affected Farm:</p>
                  <p className="font-semibold">Green Valley Poultry Farm</p>
                  <p className="text-sm text-red-700">Visited on: September 18, 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Red Alerts Section */}
          <div className="lg:pr-4">
            <div className="sticky top-4">
              <div className="flex items-center mb-4">
                <div className="p-1.5 rounded-full bg-red-100 mr-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-700">Red Alerts</h2>
                <span className="ml-3 px-3 py-0.5 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                  {ALERTS.red.length} Active
                </span>
              </div>
              
              {ALERTS.red.length > 0 ? (
                <div className="space-y-4">
                  {ALERTS.red.map(alert => (
                    <AlertCard key={`red-${alert.id}`} alert={alert} type="red" />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg border-2 border-dashed border-red-200 text-center h-full flex items-center justify-center min-h-[200px]">
                  <div>
                    <AlertCircle className="w-10 h-10 text-red-200 mx-auto mb-2" />
                    <p className="text-gray-500">No red alerts at this time</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Orange Alerts Section */}
          <div className="lg:pl-4">
            <div className="sticky top-4">
              <div className="flex items-center mb-4">
                <div className="p-1.5 rounded-full bg-orange-100 mr-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-2xl font-bold text-orange-700">Orange Alerts</h2>
                <span className="ml-3 px-3 py-0.5 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                  {ALERTS.orange.length} Active
                </span>
              </div>
              
              {ALERTS.orange.length > 0 ? (
                <div className="space-y-4">
                  {ALERTS.orange.map(alert => (
                    <AlertCard key={`orange-${alert.id}`} alert={alert} type="orange" />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg border-2 border-dashed border-orange-200 text-center h-full flex items-center justify-center min-h-[200px]">
                  <div>
                    <AlertTriangle className="w-10 h-10 text-orange-200 mx-auto mb-2" />
                    <p className="text-gray-500">No orange alerts at this time</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Safety Tips</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Avoid visiting multiple farms on the same day</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Use provided disinfectants when entering and exiting farms</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              <span>Wear clean clothing and footwear for each farm visit</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default VisitorAlerts;
