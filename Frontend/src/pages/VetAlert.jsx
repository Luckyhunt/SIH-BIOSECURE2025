import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, MapPin, Clock, Thermometer, Activity, ShieldAlert, X, CheckCircle } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const VetAlert = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [actionType, setActionType] = useState('');
  const [notes, setNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setTimeout(() => {
        const userRole = localStorage.getItem('userRole');
        if (userRole !== 'veterinarian') {
          console.log('User role is not veterinarian, redirecting to login');
          navigate('/login/veterinarian');
        } else {
          console.log('User is authenticated as veterinarian');
          setIsLoading(false);
        }
      }, 500);
    };

    checkAuth();
  }, [navigate]);

  const handleActionClick = (alertId, farmName) => {
    setSelectedAlert({ id: alertId, name: farmName });
    setShowModal(true);
    setActionType('');
    setNotes('');
    setShowSuccess(false);
  };

  const handleSubmitAction = (e) => {
    e.preventDefault();
    
    if (!actionType) {
      alert('Please select an action type');
      return;
    }

    setShowSuccess(true);
    
    setTimeout(() => {
      setShowModal(false);
      setSelectedAlert(null);
      setActionType('');
      setNotes('');
      setShowSuccess(false);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-orange-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
              aria-label="Go back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold ml-4">Veterinary Alerts Dashboard</h1>
            <div className="ml-auto relative">
              <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Important Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r">
            <div className="flex">
              <div className="flex-shrink-0">
                <ShieldAlert className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Veterinary Advisory
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>You are viewing active disease alerts in your region. Please prioritize visits based on alert levels and implement strict biosecurity measures.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Red Alerts Column */}
            <div>
              <div className="flex items-center mb-4">
                <Thermometer className="h-5 w-5 text-red-600 mr-2" />
                <h2 className="text-lg font-semibold text-red-600">Critical Alerts</h2>
                <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">2 Active</span>
              </div>
              
              <div className="space-y-4">
                {/* Red Alert 1 */}
                <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                        <span className="font-medium text-red-600">Critical Alert</span>
                        <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">IMMEDIATE ACTION REQUIRED</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Green Valley Poultry Farm
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Avian Influenza (H5N1) outbreak confirmed</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>2.5 km from your location</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Reported: Today, 10:30 AM</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="text-sm mb-2 sm:mb-0">
                        <span className="font-medium">12 cases</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-amber-600">Mortality: 45%</span>
                      </div>
                      <button 
                        className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm flex items-center self-start sm:self-auto"
                        onClick={() => handleActionClick('1', 'Green Valley Poultry Farm')}
                      >
                        <Activity className="h-3 w-3 mr-1" />
                        Action Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Red Alert 2 */}
                <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <Thermometer className="h-4 w-4 text-red-500 mr-2" />
                        <span className="font-medium text-red-600">Critical Alert</span>
                        <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded">IMMEDIATE ACTION REQUIRED</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Heritage Broiler Farm
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Newcastle Disease outbreak - Velogenic strain</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>5.1 km from your location</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Reported: Yesterday, 3:45 PM</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="text-sm mb-2 sm:mb-0">
                        <span className="font-medium">8 cases</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-amber-600">Mortality: 30%</span>
                      </div>
                      <button 
                        className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm flex items-center self-start sm:self-auto"
                        onClick={() => handleActionClick('2', 'Heritage Broiler Farm')}
                      >
                        <Activity className="h-3 w-3 mr-1" />
                        Action Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orange Alerts Column */}
            <div>
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-500 mr-2" />
                <h2 className="text-lg font-semibold text-orange-600">Warning Alerts</h2>
                <span className="ml-2 bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">2 Active</span>
              </div>
              
              <div className="space-y-4">
                {/* Orange Alert 1 */}
                <div className="bg-white border-l-4 border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                        <span className="font-medium text-orange-600">Warning Alert</span>
                        <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded">MONITOR CLOSELY</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Sunrise Egg Farm
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Suspected Infectious Bronchitis</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>3.7 km from your location</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Reported: 2 hours ago</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="text-sm mb-2 sm:mb-0">
                        <span className="font-medium">3 cases</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-amber-600">Mortality: 5%</span>
                      </div>
                      <button 
                        className="text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-sm flex items-center self-start sm:self-auto"
                        onClick={() => handleActionClick('3', 'Sunrise Egg Farm')}
                      >
                        <Activity className="h-3 w-3 mr-1" />
                        Action Plan
                      </button>
                    </div>
                  </div>
                </div>

                {/* Orange Alert 2 */}
                <div className="bg-white border-l-4 border-orange-400 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                        <span className="font-medium text-orange-600">Warning Alert</span>
                        <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded">MONITOR CLOSELY</span>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Mountain View Poultry
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">Increased respiratory symptoms - investigation needed</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>7.2 km from your location</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Reported: 5 hours ago</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="text-sm mb-2 sm:mb-0">
                        <span className="font-medium">5 cases</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-amber-600">Mortality: 2%</span>
                      </div>
                      <button 
                        className="text-white bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-sm flex items-center self-start sm:self-auto"
                        onClick={() => handleActionClick('4', 'Mountain View Poultry')}
                      >
                        <Activity className="h-3 w-3 mr-1" />
                        Action Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-6 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-center sm:text-left'>
            <div className='space-y-2'>
              <h4 className='font-semibold text-green-400 text-sm'>🚨 Emergency Support</h4>
              <p className='text-xs'>Disease Alert: <strong className='text-green-400'>1800-123-4567</strong></p>
              <p className='text-xs'>Veterinary Emergency: <strong className='text-red-400'>108</strong></p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-blue-400 text-sm'>🛠️ Technical Support</h4>
              <p className='text-xs'>Email: <strong className='text-blue-400'>support@digitalfarm.gov.in</strong></p>
              <p className='text-xs'>WhatsApp: <strong className='text-blue-400'>+91-9876543210</strong></p>
            </div>
            <div className='space-y-2'>
              <h4 className='font-semibold text-orange-400 text-sm'>🐾 Veterinary Support</h4>
              <p className='text-xs'>Helpline: <strong className='text-orange-400'>1800-VET-HELP</strong></p>
              <p className='text-xs'>Email: <strong className='text-orange-400'>vet@digitalfarm.gov.in</strong></p>
            </div>
          </div>
        </div>
      </footer>

      {/* Action Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Alert Action Plan</h3>
                  <p className="text-sm text-gray-600 mt-1">{selectedAlert?.name}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {showSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Action Recorded</h4>
                  <p className="text-gray-600">Your response has been saved successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitAction}>
                  {/* Action Type Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Action Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="actionType"
                          value="confirm"
                          checked={actionType === 'confirm'}
                          onChange={(e) => setActionType(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Confirm Alert</div>
                          <div className="text-xs text-gray-500">Alert is verified and accurate</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="actionType"
                          value="override"
                          checked={actionType === 'override'}
                          onChange={(e) => setActionType(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Override Alert</div>
                          <div className="text-xs text-gray-500">False alarm - dismiss this alert</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="actionType"
                          value="schedule"
                          checked={actionType === 'schedule'}
                          onChange={(e) => setActionType(e.target.value)}
                          className="mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">Schedule Visit</div>
                          <div className="text-xs text-gray-500">Plan inspection for later</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="mb-6">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      rows="3"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Add any additional notes or observations..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium"
                    >
                      Submit Action
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VetAlert;