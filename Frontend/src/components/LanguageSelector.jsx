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

  // Initialize Google Translate with better control over initial state
  useEffect(() => {
    // First, check what language we should be in
    const savedLang = localStorage.getItem('selectedLanguage') || 'en'
    
    if (savedLang === 'en') {
      // If English is selected, ensure clean state immediately
      console.log('🆙 Initial state: English selected, ensuring clean state')
      ensureDefaultEnglishState()
      return // Don't initialize Google Translate for English
    }
    
    // Only initialize Google Translate if we need non-English languages
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
          includedLanguages: 'hi,mr,gu,ta', // Excluded 'en' since we handle it separately
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: false,
          multilanguagePage: true
        }, 'google_translate_element')
        
        console.log('✅ Google Translate initialized successfully')
        
        // Apply saved language after initialization (only if not English)
        setTimeout(() => {
          if (savedLang && savedLang !== 'en') {
            console.log('🔄 Applying saved language:', savedLang)
            waitForGoogleTranslateReady(() => {
              applyTranslation(savedLang)
            })
          }
        }, 1500)
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

  // Function to ensure we're in default English state (no Google Translate)
  const ensureDefaultEnglishState = () => {
    console.log('🆙 Ensuring default English state - no Google Translate')
    
    // Remove any Google Translate artifacts immediately
    document.body.classList.remove('goog-te-hl')
    document.body.removeAttribute('data-goog-te-hl')
    document.body.removeAttribute('style') // Remove any inline styles GT adds
    
    // Remove translation attributes from all elements
    const translatedElements = document.querySelectorAll('[data-goog-te-hl]')
    translatedElements.forEach(el => {
      el.removeAttribute('data-goog-te-hl')
      el.classList.remove('goog-te-hl')
    })
    
    // Remove any Google Translate injected elements
    const gtElements = document.querySelectorAll('.goog-te-spinner, .goog-te-balloon, .goog-te-ftab, .goog-te-banner, .goog-te-gadget')
    gtElements.forEach(el => el.remove())
    
    // Clear any hash and query parameters
    if (window.location.hash.includes('googtrans') || window.location.search.includes('hl=')) {
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
    }
    
    // Reset any Google Translate cookies and localStorage
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname
    
    // Clear Google Translate from localStorage
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('googtrans') || key.startsWith('google_translate_')) {
        localStorage.removeItem(key)
      }
    })
    
    // Remove Google Translate iframe if it exists
    const iframes = document.querySelectorAll('iframe[src*="translate.goog"]')
    iframes.forEach(iframe => iframe.remove())
    
    // Force a DOM cleanup
    setTimeout(() => {
      // Second pass cleanup
      document.body.classList.remove('goog-te-hl')
      const remainingElements = document.querySelectorAll('[data-goog-te-hl]')
      remainingElements.forEach(el => {
        el.removeAttribute('data-goog-te-hl')
        el.classList.remove('goog-te-hl')
      })
      
      // Remove any Google Translate script
      const gtScript = document.getElementById('google-translate-script')
      if (gtScript) {
        gtScript.remove()
      }
    }, 100)
    
    console.log('✅ Default English state ensured')
  }

  // Function to wait for Google Translate to be fully ready
  const waitForGoogleTranslateReady = (callback, maxAttempts = 10) => {
    let attempts = 0
    
    const checkReady = () => {
      const translateDiv = document.getElementById('google_translate_element')
      const combo = translateDiv?.querySelector('.goog-te-combo')
      
      if (combo && combo.options && combo.options.length > 1) {
        console.log('✅ Google Translate combo ready with', combo.options.length, 'options')
        callback()
        return
      }
      
      attempts++
      if (attempts < maxAttempts) {
        console.log('⏳ Waiting for Google Translate combo... attempt', attempts)
        setTimeout(checkReady, 500)
      } else {
        console.warn('⚠️ Google Translate combo not ready after', maxAttempts, 'attempts')
        callback() // Try anyway
      }
    }
    
    checkReady()
  }

  // Apply translation function - completely bypass Google Translate for English
  const applyTranslation = (languageCode) => {
    console.log('🌍 Applying translation to:', languageCode)
    
    if (languageCode === 'en') {
      // For English, don't use Google Translate at all - just ensure clean state
      console.log('🆙 Switching to default English (no Google Translate)')
      ensureDefaultEnglishState()
      return true
    }

    // Only use Google Translate for non-English languages
    const translateDiv = document.getElementById('google_translate_element')
    const combo = translateDiv?.querySelector('.goog-te-combo')
    
    if (combo && combo.options && combo.options.length > 1) {
      console.log('🔍 Available options:', [...combo.options].map(opt => opt.value))
      
      const targetOption = [...combo.options].find(option => {
        const value = option.value.toLowerCase()
        return value === languageCode || 
               value.endsWith(`|${languageCode}`) || 
               value.endsWith(`/${languageCode}`) ||
               value === `en|${languageCode}`
      })
      
      if (targetOption) {
        console.log('✅ Found target option:', targetOption.value)
        combo.value = targetOption.value
        
        // Trigger the change event multiple ways to ensure it works
        const changeEvent = new Event('change', { bubbles: true, cancelable: true })
        combo.dispatchEvent(changeEvent)
        
        // Also try click event
        const clickEvent = new Event('click', { bubbles: true })
        combo.dispatchEvent(clickEvent)
        
        // Force re-trigger after a small delay
        setTimeout(() => {
          combo.dispatchEvent(new Event('change', { bubbles: true }))
        }, 100)
        
        return true
      } else {
        console.warn('⚠️ Target option not found for language:', languageCode)
      }
    } else {
      console.warn('⚠️ Google Translate combo not ready or has no options')
    }
    return false
  }

  const translatePage = async (languageCode) => {
    console.log('🌍 User initiated translation to:', languageCode)
    
    // Mark this as a user-initiated change
    userInitiatedChange.current = true
    setIsOpen(false)
    setIsTranslating(true)

    if (languageCode === 'en') {
      // For English, completely bypass Google Translate and show default page
      console.log('🆙 Switching to default English (bypassing Google Translate)')
      
      // Clear any Google Translate state immediately
      ensureDefaultEnglishState()
      
      // Update state and storage after cleanup
      setLanguage('en')
      localStorage.setItem('selectedLanguage', 'en')
      
      // Force a complete reset by reloading the page
      const cleanUrl = window.location.pathname
      window.history.replaceState({}, document.title, cleanUrl)
      
      // Check if we need to reload to ensure clean state
      const needsReload = 
        document.body.classList.contains('goog-te-hl') || 
        document.querySelector('[data-goog-te-hl]') ||
        window.location.hash.includes('googtrans') ||
        window.location.search.includes('hl=') ||
        document.title.match(/[\u0900-\u097F\u0A80-\u0AFF\u0B00-\u0B7F\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F\u0D80-\u0DFF\u0F00-\u0FFF]/)
      
      if (needsReload) {
        console.log('🔄 Forcing page reload to ensure clean English state')
        window.location.reload()
      } else {
        console.log('✅ Successfully switched to default English')
        setIsTranslating(false)
      }
      return
    }
    
    // For non-English languages, update state and storage first
    setLanguage(languageCode)
    localStorage.setItem('selectedLanguage', languageCode)

    // For non-English languages, use Google Translate
    console.log('🌍 Using Google Translate for:', languageCode)
    waitForGoogleTranslateReady(() => {
      const success = applyTranslation(languageCode)
      
      if (!success) {
        // Fallback: use hash method
        console.log('⚠️ Using hash-based translation fallback')
        const currentUrl = window.location.href.split('#')[0]
        const newHash = `#googtrans(en|${languageCode})`
        window.history.replaceState(null, '', `${currentUrl}${newHash}`)
        
        // Force page reload as last resort
        setTimeout(() => {
          if (!document.body.classList.contains('goog-te-hl')) {
            console.log('🔄 Translation not applied, forcing reload')
            window.location.reload()
          }
        }, 2000)
      }
      
      setTimeout(() => {
        setIsTranslating(false)
      }, success ? 1000 : 2500)
    })
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