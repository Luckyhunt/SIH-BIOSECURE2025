import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Search } from 'lucide-react';

const FarmApproval = () => {
  // Mock data for pending farm approvals
  const [pendingFarms, setPendingFarms] = useState([
    {
      id: 1,
      farmName: 'Green Valley Farm',
      owner: 'John Doe',
      location: 'Springfield',
      size: '50 acres',
      submittedDate: '2023-05-15',
      status: 'pending'
    },
    {
      id: 2,
      farmName: 'Sunny Acres',
      owner: 'Jane Smith',
      location: 'Shelbyville',
      size: '120 acres',
      submittedDate: '2023-05-10',
      status: 'pending'
    },
    {
      id: 3,
      farmName: 'Blue Hills Ranch',
      owner: 'Robert Johnson',
      location: 'Ogdenville',
      size: '200 acres',
      submittedDate: '2023-05-05',
      status: 'pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleApprove = (id: number) => {
    setPendingFarms(pendingFarms.map(farm => 
      farm.id === id ? { ...farm, status: 'approved' } : farm
    ));
    // In a real app, you would make an API call here
  };

  const handleReject = (id: number) => {
    setPendingFarms(pendingFarms.map(farm => 
      farm.id === id ? { ...farm, status: 'rejected' } : farm
    ));
    // In a real app, you would make an API call here
  };

  const filteredFarms = pendingFarms.filter(farm => 
    farm.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Farm Registration Approvals</h2>
          <p className="text-gray-600">Review and approve new farm registration requests</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search farms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Farm Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFarms.length > 0 ? (
                filteredFarms.map((farm) => (
                  <tr key={farm.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{farm.farmName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{farm.owner}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{farm.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{farm.size}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{farm.submittedDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {farm.status === 'pending' ? (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleApprove(farm.id)}
                            className="text-green-600 hover:text-green-900 mr-3 inline-flex items-center"
                          >
                            <CheckCircle className="h-5 w-5 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(farm.id)}
                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                          >
                            <XCircle className="h-5 w-5 mr-1" />
                            Reject
                          </button>
                        </div>
                      ) : farm.status === 'approved' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejected
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No pending farm approvals found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r">
        <div className="flex">
          <div className="flex-shrink-0">
            <Clock className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              You have <span className="font-bold">{pendingFarms.filter(f => f.status === 'pending').length} pending</span> farm registration requests to review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmApproval;
