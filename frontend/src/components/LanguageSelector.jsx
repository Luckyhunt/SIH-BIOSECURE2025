import React, { useEffect, useState, useRef, useCallback } from 'react'
import { ChevronDown, Globe } from 'lucide-react'

const LanguageSelector = ({ variant = 'default', position = 'fixed', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  // Helper to get initial language from URL hash (improved logic for clarity)
  const getInitialLanguage = useCallback(() => {
    // Check for the translation hash (e.g., #googtrans(en|hi) or #googtrans(/en/hi))
    const hashMatch = window.location.hash.match(/googtrans\(.{2}\|(\w{2})\)/) || 
                     window.location.hash.match(/googtrans\(\/\w{2}\/(\w{2})\)/)
    const lang = hashMatch ? hashMatch[1] : 'en'
    return lang === 'und' || lang === 'en|en' ? 'en' : lang
  }, [])

  const [currentLanguage, setCurrentLanguage] = useState(getInitialLanguage)
  const [isTranslateReady, setIsTranslateReady] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [googleTranslateCombo, setGoogleTranslateCombo] = useState(null)
  const buttonRef = useRef(null)
  const dropdownRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' }
  ]

  // Helper to find the language object
  const getLanguageByCode = useCallback((code) => languages.find((l) => l.code === code), [languages])
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Detect Google Translate combo element
  useEffect(() => {
    // Stop checking if translation isn't ready or if we've already found the combo
    if (!isTranslateReady || googleTranslateCombo) return

    let interval
    const checkCombo = () => {
      // Find the SELECT element created by the HORIZONTAL layout
      const translateElementDiv = document.getElementById('google_translate_element')
      const combo = translateElementDiv ? translateElementDiv.querySelector(".goog-te-combo") : null

      if (combo && combo.options && combo.options.length > 1) {
        console.log("✅ Found and ready Google Translate dropdown with", combo.options.length, "options")
        setGoogleTranslateCombo(combo)
        clearInterval(interval)
        
        // Synchronize the component's state with the actual translated state
        const initialLang = getInitialLanguage()
        if (combo.value !== initialLang) {
          console.log(`🔄 Syncing Google Translate combo to initial language: ${initialLang}`)
          combo.value = initialLang
          combo.dispatchEvent(new Event('change', { bubbles: true }))
        }
        setCurrentLanguage(initialLang)
      } 
    }

    // Check every 500ms for up to 10 seconds
    interval = setInterval(checkCombo, 500)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      if (!googleTranslateCombo) {
        console.log('⚠️ Google Translate combo not ready after 10 seconds. Check Layout setting (should be HORIZONTAL).')
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isTranslateReady, getInitialLanguage, googleTranslateCombo])

  // Load Google Translate script and manage styles
  useEffect(() => {
    const cleanGoogleTranslateState = () => {
      // Clear cookies and local storage to prevent auto-translation
      document.cookie.split(';').filter(cookie => cookie.trim().toLowerCase().includes('googtrans')).forEach(cookie => {
        const cookieName = cookie.split('=')[0].trim()
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
      })
      try { localStorage.removeItem('googtrans') } catch (e) {}
    }

    cleanGoogleTranslateState()
    
    // Initial page load hash check (removed forced reload to improve UX)
    if (window.location.hash.includes('googtrans')) {
      console.log('⚠️ Detected automatic Google Translate hash, allowing it to proceed for initial display.')
    }
    
    const initializeGoogleTranslate = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script')
        script.id = 'google-translate-script'
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        script.async = true
        script.onload = () => console.log('Google Translate script loaded')
        script.onerror = () => console.error('Failed to load Google Translate script')
        document.body.appendChild(script)
      }

      window.googleTranslateElementInit = () => {
        try {
          if (!window.google?.translate?.TranslateElement) {
            console.error('❌ Google Translate API not properly loaded!')
            return
          }
          
          // ✨ CRITICAL FIX: Use InlineLayout.HORIZONTAL to force the <select> element (.goog-te-combo)
          const translateElement = new window.google.translate.TranslateElement(
            {
              pageLanguage: 'en',
              includedLanguages: languages.map(l => l.code).filter(c => c !== 'en').join(','),
              layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL, // <-- THE FIX IS HERE
              autoDisplay: false, 
              multilanguagePage: true,
              gaTrack: false,
              gaId: null
            },
            'google_translate_element'
          )
          
          console.log('✅ Google Translate initialized with HORIZONTAL layout (select element is now created).')
          setIsTranslateReady(true)
          
        } catch (error) {
          console.error('❌ Error initializing Google Translate:', error)
        }
      }

      // Hidden UI styles (ensure they remain effective)
      const styleId = 'google-translate-styles'
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = `
          .goog-te-banner-frame.skiptranslate, 
          .goog-te-gadget { display: none !important; visibility: hidden !important; }
          body { top: 0 !important; }
          .skiptranslate, #goog-gt-tt, .goog-tooltip, .goog-tooltip:hover { display: none !important; visibility: hidden !important; }
          #google_translate_element {
            position: absolute !important;
            top: -9999px !important;
            left: -9999px !important;
            height: 1px !important;
            width: 1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
          }
          /* Fix nested font tags and text rendering issues in language selector */
          .language-selector-button span {
            font-family: inherit !important;
          }
          .language-selector-button span font,
          .language-selector-button span font font {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            color: inherit !important;
            all: unset;
            display: inline;
          }
          /* Prevent Google Translate from modifying our custom elements */
          .language-selector-button * {
            font-family: inherit !important;
          }
        `
        document.head.appendChild(style)
      }
    }

    initializeGoogleTranslate()
    
    return () => {
      delete window.googleTranslateElementInit
    }
  }, [languages])

  const translatePage = (languageCode) => {
    console.log('🌍 User initiated translation to:', languageCode)

    setCurrentLanguage(languageCode)
    setIsOpen(false)
    setIsTranslating(true)
    buttonRef.current?.focus()

    const isReset = languageCode === 'en'

    // --- Method 1: Preferred (Use Combo Element) ---
    if (googleTranslateCombo) {
      console.log(`✅ Using detected Google Translate combo element to set: ${languageCode}`)

      // Find the option value (e.g., 'hi' or 'en|hi')
      const targetOption = [...googleTranslateCombo.options].find(option => 
        option.value === languageCode || 
        option.value.endsWith(`|${languageCode}`)
      )

      if (targetOption) {
        googleTranslateCombo.value = targetOption.value
        
        // Trigger necessary events
        googleTranslateCombo.dispatchEvent(new Event('change', { bubbles: true }))
        googleTranslateCombo.dispatchEvent(new Event('input', { bubbles: true }))
        if (typeof googleTranslateCombo.onchange === 'function') {
            googleTranslateCombo.onchange.call(googleTranslateCombo)
        }
        
        // For reset, ensure hash is cleared after translation logic runs
        if (isReset && window.location.hash.includes('googtrans')) {
             setTimeout(() => window.location.hash = '', 50)
        }

        setTimeout(() => setIsTranslating(false), 1000)
        return
      } else {
        console.warn('⚠️ Target language option not found in combo. Falling back to hash.')
      }
    }

    // --- Method 2: Fallback (Hash-based with reload) ---
    console.log('⚠️ Falling back to hash reload for:', languageCode)
    
    if (isReset) {
      window.location.hash = ''
      setTimeout(() => window.location.reload(), 300)
      return
    }

    const currentUrl = window.location.href.split('#')[0]
    const newHash = `#googtrans(/en/${languageCode})` 
    const newUrl = `${currentUrl}${newHash}`
    
    if (window.location.hash !== newHash) {
        window.location.href = newUrl
    } else {
        setIsTranslating(false)
    }
  }

  const getCurrentLanguageName = () => {
    const lang = getLanguageByCode(currentLanguage)
    return lang ? lang.nativeName : 'English'
  }

  // Get container classes based on variant and position
  const getContainerClasses = () => {
    if (position === 'inline') return 'relative'
    if (position === 'top-right') return 'fixed top-2 right-2 z-50'
    return 'fixed top-4 right-4 z-50' 
  }
  
  // Get button classes based on variant
  const getButtonClasses = () => {
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-200'
    if (variant === 'compact') return `${baseClasses} px-3 py-1.5 text-sm ${className || 'bg-white/10 border border-white/20 text-white hover:bg-white/20'}`
    return `${baseClasses} bg-white border border-gray-300 ${className || 'hover:bg-gray-50'}`
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
      buttonRef.current?.focus()
    }
  }

  return (
    <>
      {/* Hidden Google Translate container - positioned off-screen but functional */}
      <div id="google_translate_element" style={{
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)'
      }}></div>

      <div className={getContainerClasses()} role="navigation" aria-label="Language selector">
        {/* Emergency Reset Button (only show if not English) */}
        {currentLanguage !== 'en' && position !== 'inline' && (
          <button
            onClick={() => {
              window.location.hash = ''
              window.location.reload()
            }}
            className="mb-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
            title="Reset to English"
          >
            Reset to English
          </button>
        )}
        
        <div ref={dropdownRef} className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-label={`Change language, current: ${getCurrentLanguageName()}`}
            className={`language-selector-button ${getButtonClasses()}`}
            disabled={!isTranslateReady && currentLanguage === 'en'} 
          >
            <Globe className={`${variant === 'compact' ? 'w-4 h-4' : 'w-4 h-4'} ${variant === 'compact' && className?.includes('text-white') ? 'text-white' : 'text-gray-600'}`} aria-hidden="true" />
            <span className={`${variant === 'compact' ? 'text-sm' : 'text-sm'} font-medium ${variant === 'compact' && className?.includes('text-white') ? 'text-white' : 'text-gray-700'}`}>
              {isTranslating ? 'Translating...' : getCurrentLanguageName()}
            </span>
            <ChevronDown
              className={`w-4 h-4 ${variant === 'compact' && className?.includes('text-white') ? 'text-white' : 'text-gray-600'} transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <ul
              role="listbox"
              tabIndex={-1}
              onKeyDown={handleKeyDown}
              className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto focus:outline-none"
            >
              {languages.map((language) => (
                <li key={language.code} role="option" aria-selected={currentLanguage === language.code}>
                  <button
                    onClick={() => translatePage(language.code)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 ${
                      currentLanguage === language.code
                        ? 'bg-green-50 text-green-700 font-medium'
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
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </>
  )
}

export default LanguageSelector