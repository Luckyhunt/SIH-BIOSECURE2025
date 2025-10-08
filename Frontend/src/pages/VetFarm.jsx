import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Calendar, FileText, Activity, FileText as ReportIcon, ArrowLeft, MapPin, QrCode, AlertCircle } from 'lucide-react';
import { Tab } from '@headlessui/react';
import { format } from 'date-fns';
import LanguageSelector from '../components/LanguageSelector';
// import VetFooter from '../components/VetFooter';

// Mock data for demonstration
const MOCK_FARMS = [
  { id: '1', name: 'Green Valley Poultry Farm', location: 'Agriculture City, State' },
  { id: '2', name: 'Sunrise Egg Farm', location: 'Farm District, State' },
  { id: '3', name: 'Heritage Broiler Farm', location: 'Rural County, State' }
];

const MOCK_LOGS = {
  '2023-10-01': {
    healthStatus: 'Good',
    temperature: '40.2°C',
    feedConsumption: '120kg',
    waterConsumption: '250L',
    notes: 'All birds appear healthy. No signs of illness.'
  }
};

const MOCK_VISITS = [
  { id: 'v1', date: '2023-10-01', purpose: 'Routine Checkup', findings: 'All birds healthy' },
  { id: 'v2', date: '2023-09-15', purpose: 'Vaccination', findings: 'Administered Newcastle vaccine' },
];

const MOCK_REPORTS = [
  { id: 'r1', date: '2023-09-30', title: 'Monthly Health Report', type: 'pdf' },
  { id: 'r2', date: '2023-08-30', title: 'Biosecurity Audit', type: 'pdf' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const VetFarm = () => {
  const { farmId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [selectedTab, setSelectedTab] = useState('logs');

  // Filter farms based on search query
  const filteredFarms = MOCK_FARMS.filter(farm => 
    farm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Set selected farm if farmId is in URL
  useEffect(() => {
    if (farmId) {
      const farm = MOCK_FARMS.find(f => f.id === farmId);
      if (farm) {
        setSelectedFarm(farm);
      } else {
        navigate('/vet/farms');
      }
    } else {
      setSelectedFarm(null);
    }
  }, [farmId, navigate]);

  const handleFarmSelect = (farm) => {
    navigate(`/vet/farm/${farm.id}`);
  };

  const handleBackToSearch = () => {
    navigate('/vet/farms');
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const renderFarmSearch = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Available Farms</h2>
        <p className="text-gray-600">Select a farm to view details</p>
      </div>
      
      {(searchQuery ? filteredFarms : MOCK_FARMS).length > 0 ? (
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {(searchQuery ? filteredFarms : MOCK_FARMS).map((farm) => (
            <div 
              key={farm.id}
              className="p-4 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors flex items-center justify-between"
              onClick={() => handleFarmSelect(farm)}
            >
              <div>
                <div className="font-medium text-gray-900">{farm.name}</div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {farm.location}
                </div>
              </div>
              <div className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      
      {filteredFarms.length === 0 && searchQuery && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No farms found matching <span className="font-medium">"{searchQuery}"</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFarmDetails = () => {
    if (!selectedFarm) return null;

    const tabs = [
      { id: 'logs', name: 'Daily Logs', icon: <Activity className="h-5 w-5 mr-2" /> },
      { id: 'visits', name: 'My Visits', icon: <Calendar className="h-5 w-5 mr-2" /> },
      { id: 'reports', name: 'Medical Reports', icon: <ReportIcon className="h-5 w-5 mr-2" /> },
    ];

    const dailyLog = MOCK_LOGS[format(selectedDate, 'yyyy-MM-dd')] || {
      healthStatus: 'Good',
      temperature: '40.2°C',
      feedConsumption: '120kg',
      waterConsumption: '250L',
      notes: 'No log entry for this date.'
    };

    return (
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 p-4 bg-white rounded-lg shadow-sm">
          <div className="mb-2 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">{selectedFarm.name}</h2>
            <p className="text-gray-600 flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {selectedFarm.location}
            </p>
          </div>
          <button 
            onClick={handleBackToSearch}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 flex items-center self-start md:self-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Search
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Tab.Group>
            <Tab.List className="flex space-x-1 bg-blue-50 p-1 rounded-t-lg">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    classNames(
                      'flex items-center justify-center w-full py-2.5 px-3 text-sm font-medium rounded-md transition-colors duration-200',
                      selected
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                    )
                  }
                >
                  {tab.icon}
                  <span className="ml-2">{tab.name}</span>
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="p-4 md:p-6">
              <Tab.Panel className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Daily Log - {format(selectedDate, 'MMMM d, yyyy')}</h3>
                  <div className="mt-2 md:mt-0">
                    <label htmlFor="log-date" className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <input
                      id="log-date"
                      type="date"
                      value={format(selectedDate, 'yyyy-MM-dd')}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                      className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Health Status</h4>
                    <div className="text-2xl font-semibold text-gray-900">{dailyLog.healthStatus}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Temperature</h4>
                    <div className="text-2xl font-semibold text-gray-900">{dailyLog.temperature}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Feed Consumption</h4>
                    <div className="text-2xl font-semibold text-gray-900">{dailyLog.feedConsumption}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Water Consumption</h4>
                    <div className="text-2xl font-semibold text-gray-900">{dailyLog.waterConsumption}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 text-gray-700 whitespace-pre-line">
                    {dailyLog.notes}
                  </div>
                </div>
              </Tab.Panel>

              <Tab.Panel className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Visit History</h3>
                <div className="space-y-4">
                  {MOCK_VISITS.map((visit) => (
                    <div key={visit.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{visit.purpose}</h4>
                          <div className="text-sm text-gray-500 mt-1">{format(new Date(visit.date), 'MMMM d, yyyy')}</div>
                          <div className="mt-2 text-sm text-gray-600">{visit.findings}</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>

              <Tab.Panel className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Medical Reports</h3>
                <div className="space-y-3">
                  {MOCK_REPORTS.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900">{report.title}</div>
                          <div className="text-sm text-gray-500">{format(new Date(report.date), 'MMMM d, yyyy')}</div>
                        </div>
                      </div>
                      <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle download
                        }}
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
                <h1 className="text-lg sm:text-xl font-semibold">Farm Details</h1>
              </div>
              <div className="md:hidden">
                <LanguageSelector />
              </div>
            </div>
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Farms</h2>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by farm name or location..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {selectedFarm ? renderFarmDetails() : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              {renderFarmSearch()}
            </div>
          )}
        </div>
      </main>

      {/* <VetFooter /> */}
      <footer className='bg-gray-900 text-white py-6 px-4 mt-8'>
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
    </div>
  );
};

export default VetFarm;