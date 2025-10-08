import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Shield, UserCheck, Eye, ChevronLeft } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'
import AdminTypeSelector from '../components/AdminTypeSelector'

const LandingPage = () => {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: 'admin',
      icon: Shield,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      titleKey: 'Administrator',
      descKey: 'Manage farms, approvals & reports'
    },
    {
      id: 'farmer',
      icon: UserCheck,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      titleKey: 'Farmer',
      descKey: 'Tasks, alerts & training modules'
    },
    {
      id: 'visitor',
      icon: Eye,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      titleKey: 'Visitor',
      descKey: 'Learn about farm management'
    }
  ]

  const handleRoleSelect = (roleId) => {
    if (roleId === 'farmer' || roleId === 'admin') {
      setSelectedRole(roleId)
    } else {
      navigate(`/login/${roleId}`)
    }
  }

  const handleAdminTypeSelect = (adminType) => {
    navigate(`/login/admin/${adminType}`)
  }

  const handleLogin = () => {
    navigate('/login/farmer')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50'>
      {/* Language Selector in Top Right */}
      <LanguageSelector 
        variant="compact" 
        position="top-right"
        className="bg-white/90 border-gray-200 text-gray-700 hover:bg-white"
      />
      <div className='relative overflow-hidden'>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center'
          >
            <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
              Digital Farm & Biosecurity Management Platform
            </h1>
            <p className='text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto'>
              Empowering Farmers with Smart Tools
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-center mb-8'
          >
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              Select your role to continue
            </h2>
            <p className='text-gray-600'>
              Welcome back!
            </p>
          </motion.div>

          <AnimatePresence mode='wait'>
            {!selectedRole ? (
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'>
                {roles.map((role, index) => {
                  const IconComponent = role.icon
                  return (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => handleRoleSelect(role.id)}
                        className={`${role.color} ${role.hoverColor} w-full p-8 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                      >
                        <div className='flex flex-col items-center space-y-4'>
                          <IconComponent className='h-16 w-16' />
                          <div className='text-center'>
                            <h3 className='text-xl font-semibold mb-2'>
                              {role.titleKey}
                            </h3>
                            <p className='text-sm opacity-90'>
                              {role.descKey}
                            </p>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  )
                })}
              </div>
            ) : selectedRole === 'admin' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AdminTypeSelector 
                  // onSelect={handleAdminTypeSelect} 
                  // onBack={() => setSelectedRole(null)} 
                />
              </motion.div>
            ) : selectedRole === 'farmer' ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 text-center"
              >
                <div className="space-y-4">
                  <button
                    onClick={() => navigate('/farmer/register')}
                    className="w-full max-w-xs px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Register as Farmer
                  </button>
                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogin}
                    className="w-full max-w-xs px-6 py-3 bg-white border-2 border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors duration-200 shadow-md hover:shadow-lg"
                  >
                    Login as Farmer
                  </button>
                  <button 
                    onClick={() => setSelectedRole(null)}
                    className="mt-4 flex items-center justify-center mx-auto text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to all roles
                  </button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      {/* Support & Helpline Section */}
      <footer className='bg-gray-900 text-white py-8 px-4'>
        <div className='max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left'>
            {/* Emergency Support */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold text-green-400'>🚨 Emergency Support</h3>
              <div className='space-y-2 text-sm'>
                <p className='flex items-center justify-center md:justify-start gap-2'>
                  <span className='text-green-400'>📞</span>
                  <span>Disease Alert: <strong className='text-green-400'>1800-123-4567</strong></span>
                </p>
                <p className='flex items-center justify-center md:justify-start gap-2'>
                  <span className='text-red-400'>🚑</span>
                  <span>Veterinary Emergency: <strong className='text-red-400'>108</strong></span>
                </p>
                <p className='text-sm opacity-80'>Available 24/7 for farm emergencies</p>
              </div>
            </div>

            {/* Technical Support */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold text-blue-400'>🛠️ Technical Support</h3>
              <div className='space-y-2 text-sm'>
                <p className='flex items-center justify-center md:justify-start gap-2'>
                  <span className='text-blue-400'>📧</span>
                  <span>support@digitalfarm.gov.in</span>
                </p>
                <p className='flex items-center justify-center md:justify-start gap-2'>
                  <span className='text-blue-400'>💬</span>
                  <span>WhatsApp: <strong className='text-blue-400'>+91-9876543210</strong></span>
                </p>
                <p className='text-sm opacity-80'>Mon-Sat: 9 AM - 6 PM</p>
              </div>
            </div>

            {/* Farmer Helpline */}
            <div className='space-y-3'>
              <h3 className='text-lg font-semibold text-yellow-400'>👨‍🌾 Farmer Helpline</h3>
              <div className='space-y-2 text-sm'>
                <p className='flex items-center justify-center md:justify-start gap-2'>
                  <span className='text-yellow-400'>📞</span>
                  <span>Helpline: <strong className='text-yellow-400'>1551</strong></span>
                </p>
                <p className='flex items-center justify-center md:justify-start gap-2'>
                  <span className='text-yellow-400'>🌐</span>
                  <span>Training Support: <strong className='text-yellow-400'>1800-HELP-FARM</strong></span>
                </p>
                <p className='text-sm opacity-80'>Free training & consultation services</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className='text-center text-sm opacity-70'>
            <p>© 2024 Digital Farm & Biosecurity Management Platform</p>
            <p className='mt-1'>Ministry of Agriculture & Farmers Welfare</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
