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

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case 'logs':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Daily Log Entry</h3>
            <p className="text-sm text-gray-600">Record today's farm activities and livestock status</p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Deaths</label>
                  <input type="number" className="w-full px-4 py-2 rounded-lg border border-gray-300" placeholder="0" />
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Eggs Collected</label>
                  <input type="number" className="w-full px-4 py-2 rounded-lg border border-gray-300" placeholder="0" />
                </div>
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
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h4 className="font-medium text-gray-900 mb-4">Daily Logs Calendar</h4>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 p-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="text-center py-4">
                <p className="text-gray-500">Analytics content will be displayed here</p>
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
      <header className="bg-[#F6FAF6] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 rounded-lg bg-white hover:bg-gray-50 border border-gray-200" 
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Farm Dashboard</h1>
              <p className="text-xs text-gray-500">Welcome back, John Farmer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 border border-green-200">
              All Systems Healthy
            </span>
            <LanguageSelector variant="compact" position="inline" />
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
