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

interface ClusterInfo {
  clusterId: string
  totalClusters: number
  xrayProjection: string
  recordsInCluster: number
  created: string
  serviceId?: string
}

interface HeaderProps {
  clusterInfo?: ClusterInfo
}

export function Header({ clusterInfo }: HeaderProps) {
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
      <header className="bg-white border-b border-border shadow-sm px-4 sm:px-6 lg:px-8 py-2.5 relative min-h-[3.5rem]">
        <div className="flex items-center justify-between w-full h-full">
          {/* Logo and Title - Left Aligned */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-sm" 
                style={{ background: 'linear-gradient(135deg, #474A9E 0%, #36A798 100%)' }}
              >
                PIH
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <h1 className="text-lg lg:text-xl xl:text-2xl font-semibold text-foreground truncate leading-tight">
                      Provision Intelligence Hub
                    </h1>
                    <p className="text-xs text-muted-foreground hidden sm:block leading-none">
                      Powered by SHC.AI
                    </p>
                  </div>
                  {clusterInfo && (
                    <div className="hidden lg:flex items-center gap-3 ml-6 pl-6 border-l border-border">
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-foreground leading-tight truncate">
                          Cluster #{clusterInfo.clusterId} of {clusterInfo.totalClusters} Details - {clusterInfo.xrayProjection}
                        </h2>
                        <p className="text-xs text-muted-foreground leading-none">
                          {clusterInfo.recordsInCluster} records • Created {clusterInfo.created}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Mobile cluster info display */}
                {clusterInfo && (
                  <div className="lg:hidden mt-1">
                    <h2 className="text-xs font-medium text-foreground leading-tight truncate">
                      Cluster #{clusterInfo.clusterId} Details - {clusterInfo.xrayProjection}
                    </h2>
                    <p className="text-xs text-muted-foreground leading-none">
                      {clusterInfo.recordsInCluster} records
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Accessibility Controls - Right Aligned */}
          <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={decreaseFontSize}
              className="icon-hover p-1.5 cursor-pointer h-8 w-8"
              aria-label="Decrease font size"
            >
              <FontAwesomeIcon icon={faMinus} className="w-3.5 h-3.5 text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={increaseFontSize}
              className="icon-hover p-1.5 cursor-pointer h-8 w-8"
              aria-label="Increase font size"
            >
              <FontAwesomeIcon icon={faPlus} className="w-3.5 h-3.5 text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="icon-hover p-1.5 cursor-pointer h-8 w-8"
              aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
            >
              <FontAwesomeIcon icon={faLanguage} className="w-3.5 h-3.5 text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="icon-hover p-1.5 cursor-pointer h-8 w-8"
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon 
                icon={isDarkMode === 'true' ? faSun : faMoon} 
                className="w-3.5 h-3.5 text-icon" 
              />
            </Button>
          </div>

          {/* Mobile Menu Button - Right Aligned */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden icon-hover p-1.5 cursor-pointer h-8 w-8 flex-shrink-0"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon 
              icon={isMenuOpen ? faTimes : faBars} 
              className="w-3.5 h-3.5 text-icon" 
            />
          </Button>
        </div>

        {/* Mobile Menu Dropdown - Compact */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-50 md:hidden">
            <div className="px-4 py-3 space-y-2">
              <div className="text-xs font-medium text-foreground mb-2">
                Accessibility Options
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decreaseFontSize}
                  className="flex items-center gap-2 cursor-pointer text-xs h-8"
                >
                  <FontAwesomeIcon icon={faMinus} className="w-3 h-3 text-icon" />
                  <span>Decrease Font</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={increaseFontSize}
                  className="flex items-center gap-2 cursor-pointer text-xs h-8"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-3 h-3 text-icon" />
                  <span>Increase Font</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 cursor-pointer text-xs h-8"
                >
                  <FontAwesomeIcon icon={faLanguage} className="w-3 h-3 text-icon" />
                  <span>{language === 'en' ? 'Español' : 'English'}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 cursor-pointer text-xs h-8"
                >
                  <FontAwesomeIcon 
                    icon={isDarkMode === 'true' ? faSun : faMoon} 
                    className="w-3 h-3 text-icon" 
                  />
                  <span>{isDarkMode === 'true' ? 'Light Mode' : 'Dark Mode'}</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Floating ChatBot - Optimized positioning for 1920x1080 */}
      <Button
        className="fixed bottom-5 right-5 w-12 h-12 sm:w-13 sm:h-13 rounded-full shadow-lg hover:shadow-xl z-50 btn-gradient-primary cursor-pointer transition-all duration-300"
        aria-label="Open chat support"
      >
        <FontAwesomeIcon icon={faComments} className="w-5 h-5 text-white" />
      </Button>
    </>
  )
}