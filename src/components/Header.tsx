import { useState } from 'react'
import { useLocation } from 'react-router-dom'
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
import bniLogo from '@/assets/images/BNi.png'

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
  pageTitle?: string
  pageSubtitle?: string
}

export function Header({ clusterInfo, pageTitle, pageSubtitle }: HeaderProps) {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useKV('theme-dark-mode', 'false')
  const [fontSize, setFontSize] = useKV('accessibility-font-size', '1')
  const [language, setLanguage] = useKV('language', 'en')

  // Check if we're on a cluster details page for dynamic logo alignment
  const isClusterDetailsPage = location.pathname.includes('/clusters/') && location.pathname.includes('/cluster/')

  // Dynamic container class based on current route
  const containerClass = isClusterDetailsPage 
    ? "px-8 flex items-center justify-between w-full h-full" // Full width with standard padding for ClusterDetails
    : "max-w-screen-2xl mx-auto px-8 flex items-center justify-between w-full h-full" // Constrained for other pages

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

  const toggleTheme = () => {
    setIsDarkMode((currentMode) => {
      const newMode = currentMode === 'true' ? 'false' : 'true'
      document.documentElement.classList.toggle('dark', newMode === 'true')
      return newMode
    })
  }

  const toggleLanguage = () => {
    setLanguage((currentLang) => currentLang === 'en' ? 'es' : 'en')
  }

  return (
    <>
      <header className="bg-white border-b border-border shadow-sm py-1.5 relative" style={{ height: '42px' }}>
        <div className={containerClass}>
          {/* Logo and Title - Left Aligned */}
          <div className="flex items-center gap-3 min-w-0 flex-1 header-logo-section">
            <div className="flex items-center gap-3">
              <img 
                src={bniLogo} 
                alt="BNI Logo" 
                className="cursor-pointer"
                style={{ 
                  height: '28px',
                  width: 'auto',
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col justify-center">
                    <h1 className="text-lg font-semibold text-foreground" style={{ fontSize: 'var(--font-body)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                      Provision Intelligence Hub
                    </h1>
                    <p className="text-muted-foreground hidden sm:block leading-none mt-0.5" style={{ fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                      Powered by SHC.AI
                    </p>
                  </div>
                  {pageTitle && (
                    <div className="hidden lg:flex items-center gap-3 ml-6 pl-6 border-l border-border">
                      <div className="min-w-0 flex flex-col justify-center">
                        <h2 className="font-semibold text-foreground truncate leading-none" style={{ fontSize: 'var(--font-body)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                          {pageTitle}
                        </h2>
                        {pageSubtitle && (
                          <p className="text-muted-foreground leading-none mt-0.5" style={{ fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                            {pageSubtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {clusterInfo && (
                    <div className="hidden lg:flex items-center gap-3 ml-6 pl-6 border-l border-border">
                      <div className="min-w-0 flex flex-col justify-center">
                        <h2 className="font-semibold text-foreground truncate leading-none" style={{ fontSize: 'var(--font-body)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                          Cluster #{clusterInfo.clusterId} of {clusterInfo.totalClusters} Details - {clusterInfo.xrayProjection}
                        </h2>
                        <p className="text-muted-foreground leading-none mt-0.5" style={{ fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                          {clusterInfo.recordsInCluster} records • Created {clusterInfo.created}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* Mobile cluster info display */}
                {clusterInfo && (
                  <div className="lg:hidden mt-0.5">
                    <h2 className="font-medium text-foreground truncate leading-none" style={{ fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                      Cluster #{clusterInfo.clusterId} Details - {clusterInfo.xrayProjection}
                    </h2>
                    <p className="text-muted-foreground leading-none mt-0.5" style={{ fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                      {clusterInfo.recordsInCluster} records
                    </p>
                  </div>
                )}
                {/* Mobile page title display */}
                {pageTitle && !clusterInfo && (
                  <div className="lg:hidden mt-0.5">
                    <h2 className="font-medium text-foreground truncate leading-none" style={{ fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                      {pageTitle}
                    </h2>
                    {pageSubtitle && (
                      <p className="text-muted-foreground leading-none mt-0.5" style={{ fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}>
                        {pageSubtitle}
                      </p>
                    )}
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
              className="icon-hover p-1.5 cursor-pointer"
              style={{ height: '24px', width: '24px' }}
              aria-label="Decrease font size"
            >
              <FontAwesomeIcon icon={faMinus} style={{ width: '16px', height: '16px' }} className="text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={increaseFontSize}
              className="icon-hover p-1.5 cursor-pointer"
              style={{ height: '24px', width: '24px' }}
              aria-label="Increase font size"
            >
              <FontAwesomeIcon icon={faPlus} style={{ width: '16px', height: '16px' }} className="text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="icon-hover p-1.5 cursor-pointer"
              style={{ height: '24px', width: '24px' }}
              aria-label="Toggle language"
            >
              <FontAwesomeIcon icon={faLanguage} style={{ width: '16px', height: '16px' }} className="text-icon" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="icon-hover p-1.5 cursor-pointer"
              style={{ height: '24px', width: '24px' }}
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon 
                icon={isDarkMode === 'true' ? faSun : faMoon} 
                style={{ width: '16px', height: '16px' }}
                className="text-icon" 
              />
            </Button>
          </div>

          {/* Mobile Menu Button - Right Aligned */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden icon-hover p-1.5 cursor-pointer flex-shrink-0"
            style={{ height: '24px', width: '24px' }}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon 
              icon={isMenuOpen ? faTimes : faBars} 
              style={{ width: '16px', height: '16px' }}
              className="text-icon" 
            />
          </Button>
        </div>

        {/* Mobile Menu Dropdown - Compact with layout constraint */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-50 md:hidden">
            <div className={isClusterDetailsPage ? "px-8" : "max-w-screen-2xl mx-auto px-8"}>
              <div className="py-3 space-y-2">
                <div className="font-medium text-foreground mb-2" style={{ fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif', lineHeight: 'auto', letterSpacing: 'auto' }}>
                  Accessibility Options
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={decreaseFontSize}
                    className="flex items-center gap-2 cursor-pointer"
                    style={{ height: 'var(--button-sm)', fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
                  >
                    <FontAwesomeIcon icon={faMinus} style={{ width: '16px', height: '16px' }} className="text-icon" />
                    <span>Decrease Font</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={increaseFontSize}
                    className="flex items-center gap-2 cursor-pointer"
                    style={{ height: 'var(--button-sm)', fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
                  >
                    <FontAwesomeIcon icon={faPlus} style={{ width: '16px', height: '16px' }} className="text-icon" />
                    <span>Increase Font</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 cursor-pointer"
                    style={{ height: 'var(--button-sm)', fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
                  >
                    <FontAwesomeIcon icon={faLanguage} style={{ width: '16px', height: '16px' }} className="text-icon" />
                    <span>{language === 'en' ? 'Español' : 'English'}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="flex items-center gap-2 cursor-pointer"
                    style={{ height: 'var(--button-sm)', fontSize: 'var(--font-caption)', fontFamily: 'Proxima Nova, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif' }}
                  >
                    <FontAwesomeIcon 
                      icon={isDarkMode === 'true' ? faSun : faMoon} 
                      style={{ width: '16px', height: '16px' }}
                      className="text-icon" 
                    />
                    <span>{isDarkMode === 'true' ? 'Light Mode' : 'Dark Mode'}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>



      {/* Floating ChatBot - Following exact specifications */}
      <Button
        className="fixed bottom-5 right-5 rounded-full shadow-lg hover:shadow-xl z-50 btn-gradient-primary cursor-pointer transition-all duration-300"
        style={{ width: 'var(--button-lg)', height: 'var(--button-lg)' }}
        aria-label="Open chat support"
      >
        <FontAwesomeIcon icon={faComments} style={{ width: '16px', height: '16px' }} className="text-white" />
      </Button>
    </>
  )
}