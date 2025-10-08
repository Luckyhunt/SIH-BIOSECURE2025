import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  AlertTriangle,
  BookOpen,
  BarChart3,
  Users,
  MapPin,
  TrendingUp,
  LogOut,
  User,
  QrCode,
  Clock,
  Shield,
  FileText
} from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

const Dashboard = () => {
  const params = useParams()
  const navigate = useNavigate()
  
  // Get role from localStorage first, then from URL params
  let role = localStorage.getItem('userRole') || params.role;
  
  // Standardize role names for consistency
  if (role === 'veterinarian' || role === 'vet') {
    role = 'veterinarian';
    localStorage.setItem('userRole', 'veterinarian'); // Ensure consistent role in localStorage
  } else if (role === 'admin' || role === 'administrator') {
    role = 'admin';
    localStorage.setItem('userRole', 'admin'); // Ensure consistent role in localStorage
  }
  
  // Redirect to appropriate dashboard based on role
  React.useEffect(() => {
    if (!role) {
      navigate('/');
      return;
    }
    
    // Redirect system admin to system dashboard
    if (role === 'system') {
      navigate('/system/dashboard');
      return;
    }
    
    // Ensure admin is redirected to admin dashboard
    if (role === 'admin') {
      navigate('/admin/dashboard');
      return;
    }
    
    // For other roles, redirect to their specific dashboard if not already there
    const currentPath = window.location.pathname;
    
    // Map internal role to URL path segment
    const roleToPath = {
      'veterinarian': 'vet',
      'admin': 'admin',
      'farmer': 'farmer',
      'government': 'government',
      'visitor': 'visitor'
    };
    
    const urlRole = roleToPath[role] || role;
    const rolePath = `/${urlRole}/dashboard`;
    
    if (!currentPath.includes(rolePath)) {
      navigate(rolePath);
    }
  }, [role, navigate]);
  
  // If we don't have a role yet, show loading
  if (!role) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    // Navigate to landing page
    navigate('/');
  }

  const handleFeatureClick = (e, featureTitle) => {
    e.preventDefault();
    const userRole = localStorage.getItem('userRole') || role;
    
    // Admin routes
    if (userRole === 'admin' || userRole === 'system') {
      if (featureTitle === 'Approvals') return navigate('/admin/approvals');
      if (featureTitle === 'Farm Management') return navigate('/admin/farms');
    } 
    // Government official routes
    else if (userRole === 'government') {
      if (featureTitle === 'Reports & Analytics') return navigate('/government/dashboard');
    }
    // Farmer routes
    else if (userRole === 'farmer') {
      if (featureTitle === 'My Farm') return navigate('/farms');
      if (featureTitle === 'Disease Alerts') return navigate('/farmer/alerts');
      if (featureTitle === 'Find Solution') return navigate('/farmer/solutions');
      if (featureTitle === 'Training') return alert('Training module coming soon!');
    } 
    // Visitor routes
    else if (userRole === 'visitor') {
      if (featureTitle === 'Nearby Farms') return navigate('/visitor/nearby');
      if (featureTitle === 'Recently Visited Farms' || featureTitle === 'Recent Visits') return navigate('/visitor/recent');
      if (featureTitle === 'Scan Farm QR') return navigate('/visitor/scan');
      if (featureTitle === 'Alerts') return navigate('/visitor/alerts');
    }
    // Veterinarian routes (handle both 'veterinarian' and 'vet' roles)
    else if (userRole === 'veterinarian' || userRole === 'vet') {
      if (featureTitle === 'My Farm') return navigate('/vet/my-farm');
      if (featureTitle === 'Scan Farm') return navigate('/vet/scan');
      if (featureTitle === 'Alerts') return navigate('/vet/alerts');
      if (featureTitle === 'Nearby Farms') return navigate('/vet/farms');
    }
  };

  const dashboardConfig = {
    admin: {
      title: 'Administrator Dashboard',
      bgColor: 'bg-blue-500',
      icon: '🛠️',
      features: [
        { icon: Users, title: 'Farm Management', desc: 'Manage all registered farms' },
        { icon: BarChart3, title: 'Reports & Analytics', desc: 'View system-wide reports' },
        { icon: AlertTriangle, title: 'Approvals', desc: 'Review and approve requests' },
        { icon: BookOpen, title: 'Training Modules', desc: 'Manage learning content' }
      ]
    },
    system: {
      title: 'System Administrator Dashboard',
      bgColor: 'bg-indigo-600',
      icon: '🛡️',
      features: [
        { icon: Users, title: 'User Management', desc: 'Manage all system users and permissions' },
        { icon: Shield, title: 'System Settings', desc: 'Configure system-wide settings' },
        { icon: BarChart3, title: 'Analytics Dashboard', desc: 'View system analytics' },
        { icon: FileText, title: 'Audit Logs', desc: 'View system activity logs' }
      ]
    },
    farmer: {
      title: 'Farmer Dashboard',
      bgColor: 'bg-green-500',
      icon: '👨‍🌾',
      features: [
        { icon: Home, title: 'My Farm', desc: 'Manage your farm details' },
        { icon: AlertTriangle, title: 'Disease Alerts', desc: 'Latest health notifications' },
        { icon: BookOpen, title: 'Training', desc: 'Access learning modules' },
        { icon: TrendingUp, title: 'Find Solution', desc: 'Get solutions for farming problems' }
      ]
    },
    visitor: {
      title: 'Visitor Dashboard',
      bgColor: 'bg-purple-500',
      icon: '👥',
      features: [
        { icon: MapPin, title: 'Nearby Farms', desc: 'Explore local farms' },
        { icon: Clock, title: 'Recently Visited Farms', desc: 'See farms you recently checked into' },
        { icon: QrCode, title: 'Scan Farm QR', desc: 'Open scanner to check into a farm' },
        { icon: AlertTriangle, title: 'Alerts', desc: 'View farm alerts' }
      ]
    },
    veterinarian: {
      title: 'Veterinarian Dashboard',
      bgColor: 'bg-orange-600',
      icon: '👨‍⚕️',
      features: [
        { icon: Home, title: 'Farm Details', desc: 'Access farm details and logs' },
        { icon: QrCode, title: 'Scan Farm', desc: 'Scan a farm QR code' },
        { icon: AlertTriangle, title: 'Alerts', desc: 'View health alerts' },
        { icon: MapPin, title: 'Nearby Farms', desc: 'Find farms in your area' }
      ]
    }
  }

  // Handle both 'veterinarian' and 'vet' role names for dashboard config
  const getDashboardConfig = (role) => {
    if (role === 'veterinarian' || role === 'vet') {
      return dashboardConfig.veterinarian;
    }
    return dashboardConfig[role] || dashboardConfig.farmer;
  };

  const currentConfig = getDashboardConfig(role);

  return (
    // <div className='min-h-screen bg-gray-50'>
    <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Header */}
    <header className={`${currentConfig.bgColor} text-white shadow-lg`}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center py-4'>
          
          {/* Title and Language Selector Group */}
          <div className='flex justify-between items-center w-full md:w-auto mb-3 md:mb-0'>
            <div className='flex items-center space-x-3'>
              <span className='text-2xl'>{currentConfig.icon}</span>
              <h1 className='text-lg sm:text-xl font-semibold'>{currentConfig.title}</h1>
            </div>
            {/* Mobile Language Selector */}
            <div className="relative md:hidden">
              <LanguageSelector 
                variant="compact" 
                position="inline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-white/50"
              />
            </div>
          </div>

          {/* User Info and Logout Group */}
          <div className='flex items-center space-x-3 md:space-x-4 justify-between w-full md:w-auto'>
            {/* Desktop Language Selector */}
            <div className="relative hidden md:block">
              <LanguageSelector 
                variant="compact" 
                position="inline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 focus:ring-white/50"
              />
            </div>
            
            {/* Welcome Message */}
            <div className='flex items-center space-x-2 text-white hidden md:flex'>
              <User className='h-5 w-5' />
              <span className='text-sm'>Welcome!</span>
            </div>
            
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className='flex items-center space-x-1 md:space-x-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 md:px-3 md:py-2 rounded-lg transition-colors text-white border border-white/20 text-sm'
            >
              <LogOut className='h-4 w-4' />
              <span className='hidden sm:inline font-medium'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Main Content */}
      {/* <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'> */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-6 space-y-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Dashboard Overview</h2>
            <p className='text-gray-600'>
              {role === 'admin' && 'Manage your farming ecosystem and monitor system performance'}
              {role === 'farmer' && 'Monitor your farm health, tasks, and performance metrics'}
              {role === 'visitor' && 'Explore nearby farms and learn about biosecurity practices'}
              {role === 'veterinarian' && 'Manage farm health records and provide veterinary services'}
            </p>
          </div>

          {/* Feature Cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {currentConfig.features.map((feature, index) => {
              const IconComponent = feature.icon
              if (role === 'visitor' && feature.title === 'Alerts') {
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => navigate('/visitor/alerts')}
                    className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer'
                  >
                    <div className='flex items-center space-x-3 mb-3'>
                      <div className={`${currentConfig.bgColor} text-white p-2 rounded-lg`}>
                        <IconComponent className='h-6 w-6' />
                      </div>
                      <h3 className='font-semibold text-purple-600'>{feature.title}</h3>
                    </div>
                    <p className='text-gray-600 text-sm'>{feature.desc}</p>
                  </motion.div>
                )
              }
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={(e) => handleFeatureClick(e, feature.title)}
                  className='bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer'
                >
                  <div className='flex items-center space-x-3 mb-3'>
                    <div className={`${currentConfig.bgColor} text-white p-2 rounded-lg`}>
                      <IconComponent className='h-6 w-6' />
                    </div>
                    <h3 className='font-semibold text-gray-900'>{feature.title}</h3>
                  </div>
                  <p className='text-gray-600 text-sm'>{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Alerts Section for Visitor removed, now on separate page */}

          {/* Quick Stats */}
          <div className='bg-white rounded-lg shadow-md p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Quick Stats</h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-primary-600'>
                  {role === 'admin' && '24'}
                  {role === 'farmer' && '8'}
                  {role === 'visitor' && '12'}
                </div>
                <div className='text-sm text-gray-600'>
                  {role === 'admin' && 'Active Farms'}
                  {role === 'farmer' && 'Pending Tasks'}
                  {role === 'visitor' && 'Recently Visited farm'}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-yellow-600'>
                  {role === 'admin' && '3'}
                  {role === 'farmer' && '2'}
                  {role === 'visitor' && '5'}
                </div>
                <div className='text-sm text-gray-600'>
                  {role === 'admin' && 'Pending Approvals'}
                  {role === 'farmer' && 'Active Alerts'}
                  {role === 'visitor' && 'High Risk Farms'}
                </div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {role === 'admin' && '98%'}
                  {role === 'farmer' && '85%'}
                  {role === 'visitor' && '92%'}
                </div>
                <div className='text-sm text-gray-600'>
                  {role === 'admin' && 'System Health'}
                  {role === 'farmer' && 'Farm Health Score'}
                  {role === 'visitor' && 'Average Safety Score'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Support & Helpline Footer */}
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
              <h4 className='font-semibold text-yellow-400 text-sm'>👨‍🌾 Farmer Helpline</h4>
              <p className='text-xs'>Helpline: <strong className='text-yellow-400'>1551</strong></p>
              <p className='text-xs'>Training Support: <strong className='text-yellow-400'>1800-HELP-FARM</strong></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Dashboard