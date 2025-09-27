import { motion } from 'framer-motion';
import { Shield, Building2, Stethoscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminTypeSelector = () => {
  const navigate = useNavigate();

  const adminTypes = [
    {
      id: 'system',
      icon: Shield,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      titleKey: 'systemAdmin',
      descKey: 'systemAdminDesc',
      path: '/login/admin/system'  // ✅ Fixed path
    },
    {
      id: 'government',
      icon: Building2,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      titleKey: 'governmentOfficial',
      descKey: 'governmentOfficialDesc',
      path: '/login/admin/government'  // ✅ Fixed path
    },
    {
      id: 'veterinarian',
      icon: Stethoscope,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      titleKey: 'veterinarian',
      descKey: 'veterinarianDesc',
      path: '/login/veterinarian'  // ✅ Fixed path
    }
  ];
  

  const handleSelect = (type, path) => {
    if (path) {
      navigate(path);
    } else {
      // onSelect(type);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Select Admin Type
        </h2>
        <p className="text-gray-600">
          Select the type of administrator to log in.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adminTypes.map((adminType, index) => {
          const IconComponent = adminType.icon;
          return (
            <motion.div
              key={adminType.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.03 }}
              className={`${adminType.color} ${adminType.hoverColor} rounded-xl p-6 text-white cursor-pointer transition-all duration-300 hover:shadow-lg`}
              onClick={() => handleSelect(adminType.id, adminType.path)}
            >
              <div className="flex flex-col items-center text-center h-full">
                <div className="p-3 bg-white/20 rounded-full mb-4">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {adminType.titleKey}
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {adminType.descKey}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-800 font-medium flex items-center justify-center mx-auto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Roles
        </button>
      </div>
    </div>
  );
};

export default AdminTypeSelector;
