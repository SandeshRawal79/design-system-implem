import React from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PageLayoutProps {
  title: string
  subtitle?: string
  badge?: {
    count: number
    label: string
    variant?: 'default' | 'outline' | 'destructive' | 'secondary'
  }
  showBackButton?: boolean // Deprecated - kept for compatibility but no longer used
  showTopBackButton?: boolean
  backButtonLabel?: string
  backButtonPath?: string
  rightContent?: React.ReactNode // Additional content to render in the top right
  children: React.ReactNode
}

/**
 * Shared page layout component optimized for 1920x1080 resolution with maximum space efficiency.
 * Features compact header design with back button aligned inline with title to save vertical space.
 * Consistent styling across all pages following the design system specifications.
 */
export function PageLayout({
  title,
  subtitle,
  badge,
  showBackButton = false, // Deprecated - kept for compatibility
  showTopBackButton = true,
  backButtonLabel = "Back to Dashboard",
  backButtonPath = "/",
  rightContent,
  children
}: PageLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-5">
      {/* Ultra-compact Header - Inline Layout for Space Efficiency */}
      <header className="space-y-3">
        {/* Single Row: Back Button + Title + Badge + Subtitle - All inline for maximum space efficiency */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
            {/* Back Button - Compact Design */}
            {showTopBackButton && (
              <Button 
                variant="outline" 
                size="sm"
                className="btn-gradient-secondary back-to-dashboard flex items-center gap-2 cursor-pointer interactive-element self-start sm:self-center shrink-0"
                onClick={() => navigate(backButtonPath)}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-xs font-medium">{backButtonLabel}</span>
                <span className="sm:hidden text-xs font-medium">Dashboard</span>
              </Button>
            )}
            
            {/* Page Title, Badge, and Subtitle - Inline Layout */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 page-header-with-subtitle">
                <h1 className="text-h3-responsive font-bold text-foreground leading-tight truncate">
                  {title}
                </h1>
                
                {badge && (
                  <div className="flex items-center gap-2 mt-1 sm:mt-0 shrink-0">
                    <Badge 
                      variant={badge.variant || "outline"} 
                      className="text-success border-success bg-success/10 font-medium px-2.5 py-0.5 text-xs"
                    >
                      {badge.count}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{badge.label}</span>
                  </div>
                )}
                
                {/* Subtitle with separator - inline on larger screens */}
                {subtitle && (
                  <div className="flex items-center gap-3 mt-1 sm:mt-0 shrink-0 min-w-0">
                    <span className="hidden sm:block subtitle-separator text-sm">|</span>
                    <p className="text-sm text-muted-foreground leading-relaxed subtitle-inline">
                      {subtitle}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Right Content - Service Group dropdown or other controls */}
          {rightContent && (
            <div className="shrink-0 sm:ml-4">
              {rightContent}
            </div>
          )}
        </div>
      </header>

      {/* Main Content - Reduced spacing for better density */}
      <main className="space-y-5">
        {children}
      </main>
    </div>
  )
}