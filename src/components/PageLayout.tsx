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
  children: React.ReactNode
}

/**
 * Shared page layout component providing consistent structure, typography, and navigation
 * across all pages in the application. Features space-efficient design with back button
 * aligned with page title and no bottom navigation to maximize content area.
 * Implements the design system specifications.
 */
export function PageLayout({
  title,
  subtitle,
  badge,
  showBackButton = false, // Changed default to false since we're removing bottom button
  showTopBackButton = true,
  backButtonLabel = "Back to Dashboard",
  backButtonPath = "/",
  children
}: PageLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Compact Header with Inline Back Button */}
      <header className="space-y-4">
        {/* Back Button and Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {showTopBackButton && (
            <Button 
              variant="outline" 
              size="sm"
              className="btn-gradient-secondary back-to-dashboard flex items-center gap-2 cursor-pointer interactive-element self-start"
              onClick={() => navigate(backButtonPath)}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{backButtonLabel}</span>
              <span className="sm:hidden">Dashboard</span>
            </Button>
          )}
          
          {/* Page Title and Badge */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-h3-responsive md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-bold text-foreground leading-tight">
              {title}
            </h1>
            
            {badge && (
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge 
                  variant={badge.variant || "outline"} 
                  className="text-success border-success bg-success/10 font-medium px-3 py-1"
                >
                  {badge.count}
                </Badge>
                <span className="text-sm text-muted-foreground">{badge.label}</span>
              </div>
            )}
          </div>
        </div>

        {/* Subtitle - separate row */}
        {subtitle && (
          <div className="text-center sm:text-left">
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl">
              {subtitle}
            </p>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="space-y-6">
        {children}
      </main>
    </div>
  )
}