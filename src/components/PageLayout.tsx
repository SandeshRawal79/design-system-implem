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
  showBackButton?: boolean
  showTopBackButton?: boolean
  backButtonLabel?: string
  backButtonPath?: string
  children: React.ReactNode
}

/**
 * Shared page layout component providing consistent structure, typography, and navigation
 * across all pages in the application. Implements the design system specifications.
 */
export function PageLayout({
  title,
  subtitle,
  badge,
  showBackButton = true,
  showTopBackButton = true,
  backButtonLabel = "Back to Dashboard",
  backButtonPath = "/",
  children
}: PageLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* Top Back Button */}
      {showTopBackButton && (
        <div className="flex items-start mb-4 -mt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="btn-gradient-secondary back-to-dashboard flex items-center gap-2 cursor-pointer interactive-element"
            onClick={() => navigate(backButtonPath)}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{backButtonLabel}</span>
            <span className="sm:hidden">Dashboard</span>
          </Button>
        </div>
      )}

      {/* Page Header */}
      <header className="text-center space-y-4">
        <div className="space-y-2">
          <h1 className="text-h3-responsive md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-bold text-foreground leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        
        {badge && (
          <div className="flex items-center justify-center gap-2">
            <Badge 
              variant={badge.variant || "outline"} 
              className="text-success border-success bg-success/10 font-medium px-3 py-1"
            >
              {badge.count}
            </Badge>
            <span className="text-sm text-muted-foreground">{badge.label}</span>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="space-y-6">
        {children}
      </main>

      {/* Back Navigation */}
      {showBackButton && (
        <footer className="flex justify-center pt-6">
          <Button 
            variant="outline" 
            className="btn-gradient-secondary flex items-center gap-2 cursor-pointer"
            onClick={() => navigate(backButtonPath)}
          >
            <ArrowLeft className="w-4 h-4" />
            {backButtonLabel}
          </Button>
        </footer>
      )}
    </div>
  )
}