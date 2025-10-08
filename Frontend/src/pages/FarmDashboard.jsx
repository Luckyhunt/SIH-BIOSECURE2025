import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import { ArrowLeft, Users, Egg, QrCode, Activity, FileText } from 'lucide-react';

const StatCard = ({ label, value, helper, Icon }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 border">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
        {helper && <div className="text-xs text-gray-500 mt-1">{helper}</div>}
      </div>
      {Icon && (
        <div className="p-2 rounded-md bg-gray-100 text-gray-600">
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  </div>
);

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md border transition-colors flex items-center ${
      active 
        ? 'bg-green-50 border-green-500 text-green-700' 
        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

const FarmDashboard = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('logs');

  // Demo stats
  const stats = {
    livestock: 1250,
    capacityPercent: 83,
    workers: 8,
    productionToday: 890,
    visitorsToday: 3
  };

  // State for form sections
  const [showVaccinationDetails, setShowVaccinationDetails] = useState(false);
  const [showBehaviorDetails, setShowBehaviorDetails] = useState(false);
  const [livestockData, setLivestockData] = useState({
    presentCount: 0,
    addedCount: 0,
    source: ''
  });
  const [vaccinationData, setVaccinationData] = useState({
    name: '',
    batch: '',
    date: ''
  });
  const [behaviorData, setBehaviorData] = useState({
    count: 0,
    symptoms: ''
  });
  
  const [notes, setNotes] = useState('');
  
  // Handle form input changes
  const handleVaccinationChange = (e) => {
    const { name, value } = e.target;
    setVaccinationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBehaviorChange = (e) => {
    const { name, value } = e.target;
    setBehaviorData(prev => ({
      ...prev,
      [name]: name === 'count' ? parseInt(value) || 0 : value
    }));
  };

  const handleLivestockChange = (e) => {
    const { name, value } = e.target;
    setLivestockData(prev => ({
      ...prev,
      [name]: name === 'presentCount' || name === 'addedCount' ? parseInt(value) || 0 : value
    }));
  };

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case 'logs':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900">Daily Farm Logs</h3>
              <p className="text-sm text-gray-600">Record today's farm activities and observations</p>
            </div>
            
            <div className="space-y-6">
              {/* Livestock Count and Additions */}
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Livestock Count</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Livestock Present (Start of Day)</label>
                      <input 
                        type="number" 
                        name="presentCount"
                        value={livestockData.presentCount}
                        onChange={handleLivestockChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                        placeholder="Enter count" 
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Livestock Added</label>
                      <input 
                        type="number" 
                        name="addedCount"
                        value={livestockData.addedCount}
                        onChange={handleLivestockChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                        placeholder="Enter number of livestock added" 
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                      <select 
                        name="source"
                        value={livestockData.source}
                        onChange={handleLivestockChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                      >
                        <option value="">Select source</option>
                        <option value="hatchery">Hatchery</option>
                        <option value="purchase">Purchase</option>
                        <option value="transfer">Transfer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Summary</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Opening Count:</span>
                        <span className="font-medium">{livestockData.presentCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Added Today:</span>
                        <span className="font-medium">+{livestockData.addedCount}</span>
                      </div>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>{livestockData.presentCount + livestockData.addedCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Death Records */}
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Livestock Health</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Deaths</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                      placeholder="0" 
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Death Reason</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300">
                      <option value="">Select reason</option>
                      <option value="disease">Disease</option>
                      <option value="predator">Predator</option>
                      <option value="injury">Injury</option>
                      <option value="natural">Natural Causes</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Production Metrics */}
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Production Metrics</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eggs Collected</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                      placeholder="0" 
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meat Supplied (kg)</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                      placeholder="0.0" 
                      step="0.1"
                      min="0"
                    />
                  </div>
                </div>
              </div>
              
              {/* Vaccination Records */}
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Vaccination Records</h4>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Did vaccination happen today?</label>
                  <select 
                    className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300"
                    onChange={(e) => setShowVaccinationDetails(e.target.value === 'yes')}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                
                {showVaccinationDetails && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine/Medication Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={vaccinationData.name}
                          onChange={handleVaccinationChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                          placeholder="e.g., Newcastle Vaccine"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                        <input 
                          type="text" 
                          name="batch"
                          value={vaccinationData.batch}
                          onChange={handleVaccinationChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                          placeholder="e.g., BX2025-001"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date Administered</label>
                        <input 
                          type="date" 
                          name="date"
                          value={vaccinationData.date}
                          onChange={handleVaccinationChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Behavior Observation */}
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Animal Behavior</h4>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Any unusual behavior observed?</label>
                  <select 
                    className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300"
                    onChange={(e) => setShowBehaviorDetails(e.target.value === 'yes')}
                  >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                
                {showBehaviorDetails && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Animals Affected</label>
                        <input 
                          type="number" 
                          name="count"
                          value={behaviorData.count}
                          onChange={handleBehaviorChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                          placeholder="0" 
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms Observed</label>
                        <textarea 
                          name="symptoms"
                          value={behaviorData.symptoms}
                          onChange={handleBehaviorChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300" 
                          rows={3}
                          placeholder="Describe the symptoms observed..."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Notes Section */}
              <div className="bg-white p-5 rounded-xl border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Additional Notes</h4>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 min-h-[120px]"
                  placeholder="Add any additional notes or observations here..."
                />
              </div>
              
              {/* Submit Button */}
              <div className="flex justify-end">
                <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                  Save Daily Log
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'visitors':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Recent Visitors</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((v) => (
                <div key={v} className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-3">
                  <div>
                    <div className="font-medium">Visitor {v}</div>
                    <div className="text-xs text-gray-500">
                      Individual · Checked in at 10:{30 + v} AM
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Today</span>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Analytics Dashboard</h3>
            
            {/* Calendar Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">September 2025</h4>
                <div className="flex gap-2">
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1 rounded-md hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {[
                  {date: 30, inactive: true}, 28, 29, 30, 31, 1, 2,
                  3, 4, 5, 6, 7, 8, 9,
                  10, 11, 12, 13, 14, 15, 16,
                  17, 18, 19, 20, 21, 22, 23,
                  24, 25, 26, 27, 28, 29, 30,
                  1, 2, 3, 4, 5, 6, 7
                ].map((day, index) => {
                  const isToday = day === 19; // Current day
                  const isSelected = day === 19; // Selected day
                  const isInactive = typeof day === 'object' && day.inactive;
                  
                  return (
                    <div 
                      key={index} 
                      className={`
                        text-center text-sm p-2 rounded-md h-10 flex items-center justify-center
                        ${isSelected ? 'bg-green-100 text-green-800 font-medium' : ''}
                        ${isToday ? 'border border-green-500' : ''}
                        ${isInactive ? 'text-gray-300' : 'hover:bg-gray-50 cursor-pointer'}
                      `}
                    >
                      {typeof day === 'number' ? day : day.date}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Production Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-gray-900">Weekly Production</h4>
                <select className="text-sm border rounded-md px-2 py-1">
                  <option>This Week</option>
                  <option>Last Week</option>
                  <option>This Month</option>
                </select>
              </div>
              
              <div className="h-48 flex items-end gap-3 mt-6">
                {[
                  {day: 'Mon', value: 60, current: false},
                  {day: 'Tue', value: 70, current: false},
                  {day: 'Wed', value: 80, current: false},
                  {day: 'Thu', value: 65, current: false},
                  {day: 'Fri', value: 85, current: false},
                  {day: 'Sat', value: 90, current: false},
                  {day: 'Sun', value: 75, current: true}
                ].map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full rounded-t-sm ${item.current ? 'bg-green-500' : 'bg-green-200'}`}
                      style={{ height: `${item.value}%` }}
                    />
                    <div className="text-xs text-gray-500 mt-2">{item.day}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <div className="text-gray-500">Total Production</div>
                  <div className="font-medium text-gray-900">1,250 kg</div>
                </div>
                <div className="text-sm text-right">
                  <div className="text-gray-500">Avg. Daily</div>
                  <div className="font-medium text-gray-900">178.5 kg</div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'medical':
        return (
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Medical Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(report => (
                <div key={report} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-gray-50 p-4 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Health Check Report #{report}</h4>
                        <p className="text-xs text-gray-500 mt-1">Dr. Smith • Sep {15 + report}, 2025</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Veterinary
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded flex items-center justify-center mb-3">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">PDF Report</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'qr':
        return (
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Farm QR Code</h3>
            <p className="text-sm text-gray-600">Visitors can scan this QR code to check into your farm</p>
            <div className="bg-gray-50 border rounded-lg p-8 flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-lg bg-white border flex items-center justify-center text-gray-400">
                <QrCode className="h-16 w-16" />
              </div>
              <div className="mt-4 text-center text-sm text-gray-700">
                <div className="font-medium">Green Valley Poultry Farm</div>
                <div className="text-gray-500">123 Farm Road, Agriculture City</div>
              </div>
              <button className="mt-4 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">
                Download QR Code
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6FAF6]">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            
            {/* Title and Status Group */}
            <div className="flex justify-between items-center w-full md:w-auto mb-3 md:mb-0">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate(-1)} 
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20" 
                  aria-label="Back"
                >
                  <ArrowLeft className="h-5 w-5 text-white" />
                </button>
                <div>
                  <h1 className="text-lg sm:text-xl font-semibold text-white">Farm Dashboard</h1>
                  <p className="text-xs text-white/80 hidden sm:block">Welcome back, John Farmer</p>
                </div>
              </div>
              {/* Mobile Language Selector */}
              <div className="relative md:hidden">
                <LanguageSelector variant="compact" position="inline" />
              </div>
            </div>

            {/* Status and Language Group */}
            <div className="flex items-center flex-wrap gap-3 justify-between w-full md:w-auto">
              {/* Desktop Language Selector */}
              <div className="relative hidden md:block">
                <LanguageSelector variant="compact" position="inline" />
              </div>
              
              <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white border border-white/30">
                All Systems Healthy
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            label="Total Livestock" 
            value={stats.livestock} 
            helper={`${stats.capacityPercent}% Capacity`} 
            Icon={Activity} 
          />
          <StatCard 
            label="Workers" 
            value={stats.workers} 
            helper="Active workers" 
            Icon={Users} 
          />
          <StatCard 
            label="Today's Production" 
            value={stats.productionToday} 
            helper="Eggs Collected" 
            Icon={Egg} 
          />
          <StatCard 
            label="Today's Visitors" 
            value={stats.visitorsToday} 
            helper="QR check-ins" 
            Icon={Users} 
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-4 border">
          <div className="flex flex-wrap gap-2 mb-4">
            <TabButton 
              active={activeTab === 'logs'} 
              onClick={() => setActiveTab('logs')}
            >
              Daily Logs
            </TabButton>
            <TabButton 
              active={activeTab === 'visitors'} 
              onClick={() => setActiveTab('visitors')}
            >
              Visitors
            </TabButton>
            <TabButton 
              active={activeTab === 'analytics'} 
              onClick={() => setActiveTab('analytics')}
            >
              <Activity className="w-4 h-4 mr-2" />
              Analytics
            </TabButton>
            <TabButton 
              active={activeTab === 'medical'} 
              onClick={() => setActiveTab('medical')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Medical Reports
            </TabButton>
            <TabButton 
              active={activeTab === 'qr'} 
              onClick={() => setActiveTab('qr')}
            >
              <QrCode className="w-4 h-4 mr-2" />
              Farm QR
            </TabButton>
          </div>

          {/* Tab Content */}
          <div className="p-2">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FarmDashboard;
