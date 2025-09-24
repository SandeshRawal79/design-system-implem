import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faBars, 
  faPlus, 
  faMinus, 
  faLanguage, 
  faMoon, 
  faSun,
  faComments 
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
      <header className="bg-white border-b border-border shadow-sm px-8 py-3 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" 
              style={{ background: 'linear-gradient(135deg, #474A9E 0%, #36A798 100%)' }}
            >
              BNi
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Provision Intelligence Hub</h1>
              <p className="text-xs text-muted-foreground">Powered by SHC.AI</p>
            </div>
          </div>
        </div>

        {/* Accessibility Controls */}
        <div className="flex items-center gap-2">
          {/* Font Size Controls */}
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

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="icon-hover p-2 cursor-pointer"
            aria-label="Switch language"
          >
            <FontAwesomeIcon icon={faLanguage} className="w-4 h-4 text-icon" />
          </Button>

          {/* Theme Toggle */}
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

          {/* Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="icon-hover p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faBars} className="w-4 h-4 text-icon" />
          </Button>
        </div>
      </header>

      {/* Floating ChatBot */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl z-50 btn-gradient-primary cursor-pointer"
        aria-label="Open chat"
      >
        <FontAwesomeIcon icon={faComments} className="w-6 h-6 text-white" />
      </Button>
    </>
  )
}