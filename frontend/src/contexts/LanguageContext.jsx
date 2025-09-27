import React, { createContext, useContext, useState } from 'react'

const translations = {
  en: {
    // Landing Page
    title: 'Digital Farm & Biosecurity Management Platform',
    subtitle: 'Empowering Farmers with Smart Tools',
    selectRole: 'Select your role to continue',
    welcome: 'Welcome back!',
    
    // Roles
    admin: 'Administrator',
    farmer: 'Farmer',
    visitor: 'Visitor',
    adminDesc: 'Manage farms, approvals & reports',
    farmerDesc: 'Tasks, alerts & training modules',
    visitorDesc: 'Learn about farm management',
    
    // Login
    login: 'Login',
    username: 'Username/Phone/Email',
    password: 'Password',
    enterUsername: 'Enter username, phone, or email',
    enterPassword: 'Enter your password',
    forgotPassword: 'Forgot Password?',
    help: 'Help',
    verifyOtp: 'Verify OTP',
    loginWithOtp: 'Login with OTP',
    enterOtp: 'Enter OTP sent to your phone',
    backToPassword: 'Back to password login',
    
    // Role-specific login titles
    adminLogin: 'Administrator Login',
    farmerLogin: 'Farmer Login',
    visitorLogin: 'Visitor Login',
    
    // Dashboard
    dashboardOverview: 'Dashboard Overview',
    adminDashboard: 'Administrator Dashboard',
    farmerDashboard: 'Farmer Dashboard',
    visitorDashboard: 'Visitor Dashboard',
    
    // Dashboard descriptions
    adminDescFull: 'Manage your farming ecosystem and monitor system performance',
    farmerDescFull: 'Monitor your farm health, tasks, and performance metrics',
    visitorDescFull: 'Explore nearby farms and learn about biosecurity practices',
    
    // Feature cards
    farmManagement: 'Farm Management',
    reportsAnalytics: 'Reports & Analytics',
    approvals: 'Approvals',
    trainingModules: 'Training Modules',
    myFarm: 'My Farm',
    diseaseAlerts: 'Disease Alerts',
    training: 'Training',
    farmPerformance: 'Farm Performance',
    nearbyFarms: 'Nearby Farms',
    riskAssessment: 'Risk Assessment',
    learningResources: 'Learning Resources',
    farmDirectory: 'Farm Directory',
    recentlyVisitedFarms: 'Recently Visited Farms',
    scanFarmQR: 'Scan Farm QR',
    
    // Support & Helpline
    emergencySupport: 'Emergency Support',
    diseaseAlert: 'Disease Alert',
    veterinaryEmergency: 'Veterinary Emergency',
    available247: 'Available 24/7 for farm emergencies',
    technicalSupport: 'Technical Support',
    whatsapp: 'WhatsApp',
    monSat: 'Mon-Sat: 9 AM - 6 PM',
    farmerHelpline: 'Farmer Helpline',
    helpline: 'Helpline',
    trainingSupport: 'Training Support',
    freeServices: 'Free training & consultation services',
    needHelp: 'Need Help?',
    
    // Footer
    copyright: ' 2024 Digital Farm & Biosecurity Management Platform',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    
    // Common
    logout: 'Logout',
    welcomeBack: 'Welcome!',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    back: 'Back',
    yes: 'Yes',
    no: 'No',
    search: 'Search',
    searching: 'Searching...',
    views: 'views',
    watchNow: 'Watch Now',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    add: 'Add',
    remove: 'Remove'
  },
  hi: {
    // Landing Page
    title: 'डिजिटल फार्म और बायो सुरक्षा प्रबंधन प्लेटफॉर्म',
    subtitle: 'स्मार्ट टूल्स के साथ किसानों को सशक्त बनाना',
    selectRole: 'जारी रखने के लिए अपनी भूमिका चुनें',
    welcome: 'वापसी पर स्वागत है!',
    
    // Roles
    admin: 'प्रशासक',
    farmer: 'किसान',
    visitor: 'आगंतुक',
    adminDesc: 'फार्म, अप्रूवल और रिपोर्ट्स का प्रबंधन',
    farmerDesc: 'कार्य, अलर्ट और प्रशिक्षण मॉड्यूल',
    visitorDesc: 'फार्म प्रबंधन के बारे में जानें',
    
    // Common
    logout: 'लॉग आउट',
    welcomeBack: 'स्वागत!',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
    back: 'वापस',
    yes: 'हाँ',
    no: 'नहीं',
    search: 'खोजें',
    searching: 'खोज रहे हैं...',
    views: 'दृश्य',
    watchNow: 'अभी देखें',
    save: 'सेव करें',
    cancel: 'रद्द करें',
    submit: 'जमा करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    view: 'देखें',
    add: 'जोड़ें',
    remove: 'हटाएं'
  },
  mr: {
    // Landing Page
    title: 'डिजिटल फार्म आणि बायो सुरक्षा व्यवस्थापन प्लॅटफॉर्म',
    subtitle: 'स्मार्ट टूल्ससह शेतकऱ्यांना सक्षम करणे',
    selectRole: 'सुरू ठेवण्यासाठी तुमची भूमिका निवडा',
    welcome: 'परत स्वागत आहे!',
    
    // Roles
    admin: 'प्रशासक',
    farmer: 'शेतकरी',
    visitor: 'अभ्यागत',
    adminDesc: 'शेत, मंजुरी आणि अहवालांचे व्यवस्थापन',
    farmerDesc: 'कार्ये, अलर्ट आणि प्रशिक्षण मॉड्यूल',
    visitorDesc: 'शेत व्यवस्थापनाबद्दल जाणून घ्या',
    
    // Common
    logout: 'लॉग आउट',
    welcomeBack: 'स्वागत!',
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कमी',
    back: 'परत',
    yes: 'होय',
    no: 'नाही',
    search: 'शोध',
    searching: 'शोधत आहे...',
    views: 'दृश्ये',
    watchNow: 'आता पहा',
    save: 'सेव्ह करा',
    cancel: 'रद्द करा',
    submit: 'सबमिट करा',
    edit: 'संपादित करा',
    delete: 'हटवा',
    view: 'पहा',
    add: 'जोडा',
    remove: 'काढा'
  },
  gu: {
    // Landing Page
    title: 'ડિજિટલ ફાર્મ અને બાયો સુરક્ષા મેનેજમેન્ટ પ્લેટફોર્મ',
    subtitle: 'સ્માર્ટ ટૂલ્સ સાથે ખેડૂતોને સશક્ત બનાવવું',
    selectRole: 'આગળ વધવા માટે તમારી ભૂમિકા પસંદ કરો',
    welcome: 'પાછા આવવા બદલ સ્વાગત છે!',
    
    // Roles
    admin: 'વ્યવસ્થાપક',
    farmer: 'ખેડૂત',
    visitor: 'મુલાકાતી',
    adminDesc: 'ફાર્મ, મંજૂરી અને રિપોર્ટ્સનું સંચાલન',
    farmerDesc: 'કાર્યો, અલર્ટ અને તાલીમ મોડ્યુલ',
    visitorDesc: 'ફાર્મ મેનેજમેન્ટ વિશે જાણો',
    
    // Common
    logout: 'લૉગ આઉટ',
    welcomeBack: 'સ્વાગત છે!',
    high: 'ઉચ્ચ',
    medium: 'મધ્યમ',
    low: 'નીચું',
    back: 'પાછું',
    yes: 'હા',
    no: 'ના',
    search: 'શોધો',
    searching: 'શોધી રહ્યા છીએ...',
    views: 'દૃશ્યો',
    watchNow: 'હવે જુઓ',
    save: 'સેવ કરો',
    cancel: 'રદ કરો',
    submit: 'સબમિટ કરો',
    edit: 'સંપાદિત કરો',
    delete: 'કાઢી નાખો',
    view: 'જુઓ',
    add: 'ઉમેરો',
    remove: 'દૂર કરો'
  },
  ta: {
    // Landing Page
    title: 'டிஜிட்டல் பண்ணை மற்றும் உயிர் பாதுகாப்பு மேலாண்மை தளம்',
    subtitle: 'ஸ்மார்ட் கருவிகளுடன் விவசாயிகளை வலுப்படுத்துதல்',
    selectRole: 'தொடர உங்கள் பாத்திரத்தைத் தேர்ந்தெடுக்கவும்',
    welcome: 'மீண்டும் வருக!',
    
    // Roles
    admin: 'நிர்வாகி',
    farmer: 'விவசாயி',
    visitor: 'பார்வையாளர்',
    adminDesc: 'பண்ணைகள், ஒப்புதல்கள் மற்றும் அறிக்கைகளை நிர்வகிக்கவும்',
    farmerDesc: 'பணிகள், எச்சரிக்கைகள் மற்றும் பயிற்சி தொகுதிகள்',
    visitorDesc: 'பண்ணை மேலாண்மையைப் பற்றி அறியுங்கள்',
    
    // Common
    logout: 'வெளியேறு',
    welcomeBack: 'வரவேற்கிறோம்!',
    high: 'உயர்',
    medium: 'நடுத்தர',
    low: 'குறைவு',
    back: 'பின்',
    yes: 'ஆம்',
    no: 'இல்லை',
    search: 'தேடு',
    searching: 'தேடுகிறது...',
    views: 'காட்சிகள்',
    watchNow: 'இப்போது பார்க்கவும்',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    submit: 'சமர்ப்பிக்கவும்',
    edit: 'திருத்து',
    delete: 'நீக்கு',
    view: 'பார்',
    add: 'சேர்',
    remove: 'நீக்கு'
  }
}

// Create the context
const LanguageContext = createContext()

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en')

  const t = (key) => {
    return translations[language]?.[key] || key
  }

  const value = {
    language,
    setLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext