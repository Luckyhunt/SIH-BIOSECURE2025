import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, Eye, ArrowLeft } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const GovAlert = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Government Disease Alerts</h1>
          </div>
          <div className="relative">
            <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto p-4">
        
        {/* Important Precautionary Notice */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Important Precautionary Notice
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p className="mb-2">You have recently visited a farm that now has a red alert status. Please follow these precautions to prevent disease spread:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Do not visit any other farms for the next 72 hours</li>
                  <li>Thoroughly clean and disinfect all clothing, footwear, and equipment</li>
                  <li>Shower and change clothes before visiting any other farms</li>
                  <li>Monitor for any symptoms and report immediately if you feel unwell</li>
                  <li>Follow all biosecurity protocols strictly</li>
                </ul>
                
                <div className="mt-4 bg-white p-3 rounded border">
                  <div className="text-sm">
                    <span className="font-medium">Affected Farm:</span>
                    <div>Green Valley Poultry Farm</div>
                    <div className="text-gray-600">Visited on September 18, 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Red Alerts Column */}
          <div>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <h2 className="text-lg font-semibold text-red-600">Red Alerts</h2>
              <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">2 Active</span>
            </div>
            
            <div className="space-y-4">
              {/* Red Alert 1 */}
              <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="font-medium text-red-600">Red Alert</span>
                      <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">HIGH RISK</span>
                    </div>
                  </div>
                  
                  <h3 
  className="font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer"
  onClick={() => window.location.href = '/government/farm-details/1'}
>
  Green Valley Poultry Farm
</h3>
                  <p className="text-sm text-gray-600 mb-3">Avian Influenza (H5N1) outbreak confirmed</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>2.5 km away</span>
                    </div>
                    <div>
                      <span className="font-medium">Reported:</span> Today, 10:30 AM
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">12 cases reported</span>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    View Biosecurity Recommendations
                  </button>
                </div>
              </div>

              {/* Red Alert 2 */}
              <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                      <span className="font-medium text-red-600">Red Alert</span>
                      <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">HIGH RISK</span>
                    </div>
                  </div>
                  
                  <h3 
  className="font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer"
  onClick={() => window.location.href = '/government/farm-details/2'}
>
  Heritage Broiler Farm
</h3>
                  <p className="text-sm text-gray-600 mb-3">Newcastle Disease outbreak</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>5.1 km away</span>
                    </div>
                    <div>
                      <span className="font-medium">Reported:</span> Yesterday, 3:45 PM
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">8 cases reported</span>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    View Biosecurity Recommendations
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orange Alerts Column */}
          <div>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
              <h2 className="text-lg font-semibold text-orange-600">Orange Alerts</h2>
              <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">2 Active</span>
            </div>
            
            <div className="space-y-4">
              {/* Orange Alert 1 */}
              <div className="bg-white border-l-4 border-orange-500 rounded-lg shadow-sm">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                      <span className="font-medium text-orange-600">Orange Alert</span>
                      <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded">MEDIUM RISK</span>
                    </div>
                  </div>
                  
                  <h3 
  className="font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer"
  onClick={() => window.location.href = '/government/farm-details/3'}
>
  Sunrise Egg Farm
</h3>
                  <p className="text-sm text-gray-600 mb-3">Suspected Infectious Bronchitis</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>3.7 km away</span>
                    </div>
                    <div>
                      <span className="font-medium">Reported:</span> 2 hours ago
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">3 cases reported</span>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    View Biosecurity Recommendations
                  </button>
                </div>
              </div>

              {/* Orange Alert 2 */}
              <div className="bg-white border-l-4 border-orange-500 rounded-lg shadow-sm">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                      <span className="font-medium text-orange-600">Orange Alert</span>
                      <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded">MEDIUM RISK</span>
                    </div>
                  </div>
                  
                  <h3 
  className="font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer"
  onClick={() => window.location.href = '/government/farm-details/4'}
>
  Mountain View Poultry
</h3>
                  <p className="text-sm text-gray-600 mb-3">Potential Fowl Pox cases</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>7.2 km away</span>
                    </div>
                    <div>
                      <span className="font-medium">Reported:</span> 5 hours ago
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-medium">2 cases reported</span>
                  </div>
                  
                  <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    View Biosecurity Recommendations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Safety Tips</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Avoid visiting multiple farms on the same day
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Use provided disinfectants when entering and exiting farms
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Wear clean clothing and footwear for each farm visit
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GovAlert;