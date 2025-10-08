import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, Eye, EyeOff, Lock } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

const LoginPage = () => {
  const navigate = useNavigate()
  const { role, subtype } = useParams()
  // Support both 'subtype' for new nested routes and 'adminType' for backward compatibility
  const adminType = subtype;

  // Track login method (password or OTP)
  const [loginMethod, setLoginMethod] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    otp: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleLogin = (e) => {
    // Prevent default form submission if called from a form
    e?.preventDefault();
    
    console.log('Login attempt with role:', role, 'adminType:', adminType);
    
    // Simple validation
    if (!formData.username || (loginMethod === 'password' && !formData.password) || (loginMethod === 'otp' && !formData.otp)) {
      alert('Please fill in all required fields');
      return;
    }

    // Mock authentication for government official
if (role === 'admin' && adminType === 'system') {
  const isAuthenticated = formData.username && formData.password;
  
  if (isAuthenticated) {
    localStorage.setItem('authToken', 'mock-auth-token');
    localStorage.setItem('userRole', 'system');
    localStorage.setItem('userName', formData.username);

    console.log('System admin login successful');
    navigate('/system/dashboard', { replace: true });
  } else {
    alert('Invalid credentials');
  }
  return;
}

if (role === 'admin' && adminType === 'government') {
  localStorage.setItem('authToken', 'mock-auth-token');
  localStorage.setItem('userRole', 'government');
  localStorage.setItem('userName', formData.username || 'GovUser');
  console.log('Government login successful');
  navigate('/government/dashboard', { replace: true });
  return;
}

    
    // Handle other role logins (farmer, visitor, etc.)
    if (role === 'farmer') {
      localStorage.setItem('authToken', 'mock-farmer-token');
      localStorage.setItem('userRole', 'farmer');
      localStorage.setItem('userName', formData.username || 'Farmer');
      // Navigate to the main farmer dashboard
      navigate('/farmer/dashboard', { replace: true });
      return;
    } else if (role === 'visitor') {
      localStorage.setItem('authToken', 'mock-visitor-token');
      localStorage.setItem('userRole', 'visitor');
      localStorage.setItem('userName', formData.username || 'Visitor');
      // Force a full page reload to ensure all context is reset
      window.location.href = '/visitor/dashboard';
      return;
    } else if (role === 'veterinarian') {
      localStorage.setItem('authToken', 'mock-vet-token');
      localStorage.setItem('userRole', 'veterinarian');
      localStorage.setItem('userName', formData.username || 'Veterinarian');
      // Redirect to vet dashboard
      window.location.href = '/vet/dashboard';
    } else {
      console.error('No valid role specified for login');
      alert('Invalid login credentials or role');
    }
  }

  // OTP request handler (not used in this simplified version but kept for future use)
  const handleOtpRequest = () => {
    // Mock OTP request
    alert('OTP sent to your phone!')
    setLoginMethod('otp')
  }

  // If it's a government official login, show a simplified login form
  if (role === 'admin' && adminType === 'government') {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col'>
        {/* Language Selector in Top Right */}
        <LanguageSelector 
          variant="compact" 
          position="top-right"
          className="bg-white/90 border-gray-200 text-gray-700 hover:bg-white"
        />
        <div className='flex-1 flex items-center justify-center p-4'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-md'
          >
          {/* Header */}
          <div className='bg-green-500 text-white p-6 rounded-t-2xl text-center relative'>
            <button
              onClick={() => navigate('/')}
              className='absolute left-4 top-4 text-white/80 hover:text-white transition-colors'
            >
              <ArrowLeft className='h-6 w-6' />
            </button>

            <div className='text-4xl mb-2'>🏛️</div>
            <h1 className='text-2xl font-bold mb-1'>Government Official Login</h1>
            <p className='text-white/90 text-sm mb-1'>Access your government dashboard</p>
          </div>

          {/* Login Form */}
          <div className='bg-white p-6 rounded-b-2xl shadow-xl'>
            <form onSubmit={handleLogin} className='space-y-6'>
              <div>
                <label htmlFor='username' className='block text-sm font-medium text-gray-700 mb-2'>
                  Username
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Mail className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='username'
                    name='username'
                    type='text'
                    required
                    className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    placeholder='Enter your username'
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <Lock className='h-5 w-5 text-gray-400' />
                  </div>
                  <input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    required
                    className='block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-5 w-5 text-gray-400 hover:text-gray-500' />
                    ) : (
                      <Eye className='h-5 w-5 text-gray-400 hover:text-gray-500' />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <input
                    id='remember-me'
                    name='remember-me'
                    type='checkbox'
                    className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
                  />
                  <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                    Remember me
                  </label>
                </div>

                <div className='text-sm'>
                  <a href='#' className='font-medium text-green-600 hover:text-green-500'>
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200'
                >
                  Sign in as Government Official
                </button>
              </div>
            </form>
            
            {/* Demo Credentials */}
            <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
              <h4 className='text-sm font-medium text-blue-800 mb-2'>Demo Credentials:</h4>
              <div className='text-xs text-blue-700 space-y-1'>
                <p><strong>Username:</strong> user123</p>
                <p><strong>Password:</strong> 123</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    );
  }

  // Role configuration for the login page
  const roleConfig = {
    admin: {
      title: 'System Admin Login',
      bgColor: 'bg-blue-500',
      icon: '🛠️',
      subtitle: 'Access the system admin dashboard'
    },
    farmer: {
      title: 'Farmer Login',
      bgColor: 'bg-green-500',
      icon: '👨\u200D🌾',
      subtitle: 'Access your farm management'
    },
    visitor: {
      title: 'Visitor Login',
      bgColor: 'bg-purple-500',
      icon: '👥',
      subtitle: 'Explore our platform'
    },
    veterinarian: {
      title: 'Veterinarian Login',
      bgColor: 'bg-orange-600',
      icon: '🐾',
      subtitle: 'Access veterinary services'
    },
    government: {
      title: 'Government Official',
      bgColor: 'bg-amber-500',
      icon: '🏛️',
      subtitle: 'Government portal access'
    }
  }

  // Get the current role configuration or default to farmer
  const currentRole = roleConfig[role] || roleConfig.farmer;
  
  // If it's a government official, use the government role config
  if (adminType === 'government') {
    currentRole.title = 'Government Official Login';
    currentRole.bgColor = 'bg-amber-500';
    currentRole.icon = '🏛️';
    currentRole.subtitle = 'Access government portal';
  }

  if (adminType === 'system') {
  currentRole.title = 'System Admin Login';
  currentRole.bgColor = 'bg-blue-500';
  currentRole.icon = '🛠️';
  currentRole.subtitle = 'Access system admin dashboard';
}

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col'>
      {/* Language Selector in Top Right */}
      <LanguageSelector 
        variant="compact" 
        position="top-right"
        className="bg-white/90 border-gray-200 text-gray-700 hover:bg-white"
      />
      <div className='flex-1 flex items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='w-full max-w-md'
        >
        {/* Header */}
        <div className={`${currentRole.bgColor} text-white p-6 rounded-t-2xl text-center relative`}>
          <button
            onClick={() => navigate('/')}
            className='absolute left-4 top-4 text-white/80 hover:text-white transition-colors'
          >
            <ArrowLeft className='h-6 w-6' />
          </button>

          <div className='text-4xl mb-2'>{currentRole.icon}</div>
          <h1 className='text-2xl font-bold mb-1'>{currentRole.title}</h1>
          {currentRole.subtitle && <p className='text-white/90 text-sm mb-1'>{currentRole.subtitle}</p>}
          <p className='text-white/80 text-sm'>Welcome</p>
        </div>

        {/* Login Form */}
        <div className='bg-white p-6 rounded-b-2xl shadow-xl'>
          <div className='space-y-6'>
            {/* Username/Email Input */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                {role === 'admin' && adminType === 'government' ? 'Government ID' : 'Username'}
              </label>
              <div className='relative'>
                <input
                  type='text'
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12'
                  placeholder={
                    role === 'admin' && adminType === 'government' 
                      ? 'Enter your government ID' 
                      : 'Enter your username'
                  }
                  autoComplete='username'
                />
                <Mail className='absolute right-3 top-3.5 h-5 w-5 text-gray-400' />
              </div>
            </div>

            {/* Password Input */}
            {loginMethod === 'password' && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  {role === 'admin' && adminType === 'government' ? 'Secure Login' : 'Login with Password'}
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent pr-12'
                    placeholder={
                      role === 'admin' && adminType === 'government'
                        ? 'Enter your secure passphrase'
                        : 'Enter your password'
                    }
                    autoComplete='current-password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-3.5 text-gray-400 hover:text-gray-600'
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                  </button>
                </div>
              </div>
            )}

            {/* OTP Input */}
            {loginMethod === 'otp' && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Enter OTP sent to your phone
                </label>
                <input
                  type='text'
                  value={formData.otp}
                  onChange={(e) => handleInputChange('otp', e.target.value)}
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-2xl font-mono tracking-widest'
                  placeholder='000000'
                  maxLength={6}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className='space-y-3'>
              <button
                onClick={handleLogin}
                disabled={!formData.username || (loginMethod === 'password' && !formData.password) || (loginMethod === 'otp' && !formData.otp)}
                className={`w-full ${
                  role === 'admin' && adminType === 'government' 
                    ? 'bg-amber-500 hover:bg-amber-600' 
                    : role === 'admin' 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-primary-600 hover:bg-primary-700'
                } disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200`}
              >
                {loginMethod === 'otp' 
                  ? 'Verify OTP' 
                  : role === 'admin' && adminType === 'government'
                    ? 'Sign in as Government Official'
                    : role === 'admin'
                      ? 'Sign in as System Admin'
                      : role 
                        ? `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`
                        : 'Sign in'}
              </button>

              {loginMethod === 'password' && (role === 'farmer' || role === 'veterinarian') && (
                <button
                  type="button"
                  onClick={handleOtpRequest}
                  className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200 border border-gray-200'
                >
                  Login with OTP
                </button>
              )}
            </div>

            {/* Footer Links */}
            {loginMethod === 'password' && (
              <div className='flex justify-between text-sm text-gray-600'>
                <button className='hover:text-primary-600 transition-colors'>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Switch back to password login - hidden for now */}
            {loginMethod === 'otp' && (
              <button
                type="button"
                onClick={() => setLoginMethod('password')}
                className='w-full text-center text-sm text-gray-600 hover:text-blue-600 transition-colors'
              >
                Back to password login
              </button>
            )}
            
            {/* Demo Credentials */}
            <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
              <h4 className='text-sm font-medium text-blue-800 mb-2'>Demo Credentials:</h4>
              <div className='text-xs text-blue-700 space-y-1'>
                <p><strong>Username:</strong> user123</p>
                <p><strong>Password:</strong> 123</p>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </div>

      {/* Support & Helpline - Mobile First */}
      <div className='px-4 py-6 bg-gray-50 border-t'>
        <div className='max-w-md mx-auto'>
          <h3 className='text-sm font-semibold text-gray-700 mb-3 text-center'>Need help?</h3>
          <div className='grid grid-cols-1 gap-2 text-xs text-gray-600'>
            <div className='flex items-center justify-center gap-2 p-2 bg-white rounded-lg'>
              <span>📞</span> <strong className='text-green-600'>1800-123-4567</strong> <span>- Disease Alert</span>
            </div>
            <div className='flex items-center justify-center gap-2 p-2 bg-white rounded-lg'>
              <span>🛠️</span> <strong className='text-blue-600'>support@digitalfarm.gov.in</strong>
            </div>
            <div className='flex items-center justify-center gap-2 p-2 bg-white rounded-lg'>
              <span>👨‍🌾</span> <strong className='text-yellow-600'>1551</strong> <span>- Helpline</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage