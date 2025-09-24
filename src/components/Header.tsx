import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBars, 
  faPlus, 
  faMinus, 
  faLanguage, 
  faMoon, 
  faSun,
  faComments,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { Button } from '@/components/ui/button'
import { useKV } from '@github/spark/hooks'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useKV('theme-dark-mode', 'false')
  const [fontSize, setFontSize] = useKV('accessibility-font-size', '1')
  const [language, setLanguage] = useKV('language', 'en')

  const increaseFontSize = () => {
    setFontSize((currentSize) => {
      const current = parseFloat(currentSize || '1')
      const newSize = Math.min(current + 0.1, 1.5)
      document.documentElement.style.fontSize = `${newSize}rem`
      return newSize.toString()
    })
  }

  const decreaseFontSize = () => {
    setFontSize((currentSize) => {
      const current = parseFloat(currentSize || '1')
      const newSize = Math.max(current - 0.1, 0.8)
      document.documentElement.style.fontSize = `${newSize}rem`
      return newSize.toString()
    })
  }

  const toggleLanguage = () => {
    setLanguage((current) => current === 'en' ? 'es' : 'en')
  }

  const toggleTheme = () => {
    setIsDarkMode((current) => {
      const newMode = current !== 'true'
      document.documentElement.classList.toggle('dark', newMode)
      return newMode.toString()
    })
  }

  return (
    <>
      <header className="bg-white border-b border-border shadow-sm px-4 sm:px-6 lg:px-8 py-3 relative">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo and Title */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm cursor-pointer" 
                style={{ background: 'linear-gradient(135deg, #474A9E 0%, #36A798 100%)' }}
              >
                PIH
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-foreground truncate">
                  Provision Intelligence Hub
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Powered by SHC.AI
                </p>
              </div>
            </div>
          </div>

          {/* Desktop Accessibility Controls */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={decreaseFontSize}
              className="icon-hover p-2 cursor-pointer"
              aria-label="Decrease font size"
            >
              <FontAwesomeIcon icon={faMinus} className="w-4 h-4 text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={increaseFontSize}
              className="icon-hover p-2 cursor-pointer"
              aria-label="Increase font size"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="icon-hover p-2 cursor-pointer"
              aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
            >
              <FontAwesomeIcon icon={faLanguage} className="w-4 h-4 text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="icon-hover p-2 cursor-pointer"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon 
                icon={isDarkMode === 'true' ? faSun : faMoon} 
                className="w-4 h-4 text-icon" 
              />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden icon-hover p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon 
              icon={isMenuOpen ? faTimes : faBars} 
              className="w-4 h-4 text-icon" 
            />
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-50 md:hidden">
            <div className="px-4 py-4 space-y-3">
              <div className="text-sm font-medium text-foreground mb-3">
                Accessibility Options
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decreaseFontSize}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faMinus} className="w-4 h-4 text-icon" />
                  <span className="text-sm">Decrease Font</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={increaseFontSize}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4 text-icon" />
                  <span className="text-sm">Increase Font</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faLanguage} className="w-4 h-4 text-icon" />
                  <span className="text-sm">{language === 'en' ? 'Español' : 'English'}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <FontAwesomeIcon 
                    icon={isDarkMode === 'true' ? faSun : faMoon} 
                    className="w-4 h-4 text-icon" 
                  />
                  <span className="text-sm">{isDarkMode === 'true' ? 'Light Mode' : 'Dark Mode'}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating ChatBot */}
      <Button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl z-50 btn-gradient-primary cursor-pointer transition-all duration-300"
        aria-label="Open chat support"
      >
        <FontAwesomeIcon icon={faComments} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </Button>
    </>
  )
}