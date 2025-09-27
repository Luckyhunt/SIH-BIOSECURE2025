import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Eye } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const FarmApprovalsPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    // Mock data
    const mockData = [
      {
        id: '1',
        farmName: 'Shivam Layer Farm',
        ownerName: 'Raghav Sharma',
        location: 'Maharashtra',
        status: 'pending',
        submittedDate: '2024-03-14',
        details: 'Layer poultry farm'
      },
      {
        id: '2',
        farmName: 'Prachi Poultry',
        ownerName: 'Prachi Desai',
        location: 'Gujarat',
        status: 'pending',
        submittedDate: '2024-03-13',
        details: 'Broiler poultry farm'
      }
    ];
    
    setApplications(mockData);
  }, []);

  const handleApprove = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'approved' } : app
    ));
  };

  const handleReject = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: 'rejected' } : app
    ));
  };

  const filteredApplications = applications.filter(app => app.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Back Button */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate(-1)}
                className="w-10 h-10 flex items-center justify-center bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <div>
                <h1 className="text-xl font-medium">Farm Approvals</h1>
                <p className="text-blue-100 text-sm">Review and manage farm registration approvals</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <LanguageSelector variant="compact" position="inline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'pending'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'approved'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'rejected'
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{app.farmName}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Owner: {app.ownerName} • Submitted on: {new Date(app.submittedDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>
                
                <div className="flex items-center flex-wrap sm:flex-nowrap gap-2">
                  {activeTab === 'pending' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      statusPending
                    </span>
                  )}
                  
                  <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300">
                    <Eye className="w-4 h-4 mr-1" />
                    viewApplication
                  </button>
                  
                  {activeTab === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleApprove(app.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(app.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">No {activeTab} applications found</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmApprovalsPage;