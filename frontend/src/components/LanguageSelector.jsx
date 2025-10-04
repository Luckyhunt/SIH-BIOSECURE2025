import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageSelector = ({ variant = 'default', position = 'fixed', className = '' }) => {
  const { language: currentLanguage, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
  ]

  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage)
    return lang ? lang.nativeName : 'English'
  }

  // Helper to get language from URL hash or localStorage
  // Helper to get language from localStorage only (ignore hash for user-initiated selections)
  const getInitialLanguage = useCallback(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage')
    if (savedLanguage && ['en', 'hi', 'mr', 'gu', 'ta'].includes(savedLanguage)) {
      return savedLanguage
    }
    return 'en' // Default to English
  }, [])

  // Track if language change was user-initiated
  const userInitiatedChange = useRef(false)

  // Handle hash changes more carefully - only respond to Google Translate, not browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      // Only respond to hash changes if they were not user-initiated
      if (userInitiatedChange.current) {
        userInitiatedChange.current = false
        return
      }
      
      // Check if this is a Google Translate hash
      const hashMatch = window.location.hash.match(/googtrans\(.{2}\|(\w{2})\)/) || 
                       window.location.hash.match(/googtrans\(\/\w{2}\/(\w{2})\)/)
      
      if (hashMatch) {
        const lang = hashMatch[1]
        if (lang && lang !== 'und' && lang !== currentLanguage) {
          setLanguage(lang)
          localStorage.setItem('selectedLanguage', lang)
        }
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [currentLanguage, setLanguage])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Initialize Google Translate with improved hash management
  useEffect(() => {
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,mr,gu,ta',
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element')
        
        console.log('✅ Google Translate initialized successfully')
        
        // Apply saved language after initialization
        const savedLang = localStorage.getItem('selectedLanguage')
        if (savedLang && savedLang !== 'en') {
          setTimeout(() => {
            applyTranslation(savedLang)
          }, 1000)
        }
      }
    }

    // Add styles to hide Google Translate UI
    if (!document.getElementById('google-translate-styles')) {
      const style = document.createElement('style')
      style.id = 'google-translate-styles'
      style.textContent = `
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        .goog-te-gadget { display: none !important; }
        body { top: 0 !important; position: static !important; }
        #google_translate_element {
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          visibility: hidden !important;
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
        .goog-te-combo { display: none !important; }
        body.goog-te-hl { top: 0 !important; }
        .skiptranslate { display: none !important; }
      `
      document.head.appendChild(style)
    }
  }, [])

  // Separate function for applying translation without affecting browser history
  const applyTranslation = (languageCode) => {
    if (languageCode === 'en') {
      // For English, clear any existing translation
      const translateDiv = document.getElementById('google_translate_element')
      const combo = translateDiv?.querySelector('.goog-te-combo')
      if (combo) {
        combo.value = ''
        combo.dispatchEvent(new Event('change', { bubbles: true }))
      }
      return
    }

    // Apply translation using Google Translate combo
    const translateDiv = document.getElementById('google_translate_element')
    const combo = translateDiv?.querySelector('.goog-te-combo')
    
    if (combo && combo.options && combo.options.length > 1) {
      const targetOption = [...combo.options].find(option => {
        const value = option.value.toLowerCase()
        return value === languageCode || value.endsWith(`|${languageCode}`) || value.endsWith(`/${languageCode}`)
      })
      
      if (targetOption) {
        combo.value = targetOption.value
        combo.dispatchEvent(new Event('change', { bubbles: true }))
        return true
      }
    }
    return false
  }

  const translatePage = (languageCode) => {
    console.log('🌍 Translating to:', languageCode)
    
    // Mark this as a user-initiated change
    userInitiatedChange.current = true
    
    // Update React state and localStorage immediately
    setLanguage(languageCode)
    localStorage.setItem('selectedLanguage', languageCode)
    setIsOpen(false)
    setIsTranslating(true)

    if (languageCode === 'en') {
      // For English, clear translation without reloading
      applyTranslation('en')
      // Clear any hash without affecting history
      if (window.location.hash.includes('googtrans')) {
        const url = window.location.href.split('#')[0]
        window.history.replaceState(null, '', url)
      }
      setTimeout(() => {
        setIsTranslating(false)
      }, 500)
      return
    }

    // Try to apply translation using combo element
    const success = applyTranslation(languageCode)
    
    if (!success) {
      // Fallback: use hash but don't let it interfere with navigation
      console.log('⚠️ Using hash-based translation fallback')
      const currentUrl = window.location.href.split('#')[0]
      const newHash = `#googtrans(en|${languageCode})`
      // Use replaceState to avoid affecting browser history
      window.history.replaceState(null, '', `${currentUrl}${newHash}`)
    }
    
    setTimeout(() => {
      setIsTranslating(false)
    }, 1500)
  }

  const getContainerClasses = () => {
    if (position === 'inline') return 'relative z-50'
    if (position === 'top-right') return 'fixed top-4 right-4 z-[9999]' 
    return 'fixed top-4 right-4 z-[9999]'
  }
  
  const getButtonClasses = () => {
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors duration-200'
    const defaultCompactClasses = 'bg-white/90 border border-gray-200 text-gray-700 hover:bg-white'
    
    if (variant === 'compact') {
      return `${baseClasses} px-3 py-1.5 text-sm ${className || defaultCompactClasses}`
    }
    return `${baseClasses} bg-white border border-gray-300 ${className || 'hover:bg-gray-50'}`
  }

  return (
    <>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        visibility: 'hidden',
        width: '0',
        height: '0',
        overflow: 'hidden'
      }}></div>

      <div className={getContainerClasses()}>
        {/* Reset button for non-English languages */}
        {currentLanguage !== 'en' && position !== 'inline' && (
          <button
            onClick={() => translatePage('en')}
            className="mb-2 px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition-colors shadow-md"
            title="Reset to English"
          >
            Reset to English
          </button>
        )}
        
        <div ref={dropdownRef} className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className={`language-selector-button ${getButtonClasses()}`}
            disabled={isTranslating}
          >
            <Globe className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-800">
              {isTranslating ? 'Translating...' : getCurrentLanguageName()}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-[10000] max-h-60 overflow-y-auto">
              {languages.map((language) => (
                <li key={language.code}>
                  <button
                    onClick={() => translatePage(language.code)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                      currentLanguage === language.code
                        ? 'bg-green-50 text-green-700 font-semibold'
                        : 'text-gray-700'
                    } first:rounded-t-lg last:rounded-b-lg`}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{language.nativeName}</span>
                      <span className="text-xs text-gray-500">{language.name}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {isOpen && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default LanguageSelector