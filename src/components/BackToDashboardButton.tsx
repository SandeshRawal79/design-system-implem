import React from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface BackToDashboardButtonProps {
  label?: string
  path?: string
  className?: string
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'default' | 'lg'
}

/**
 * Reusable "Back to Dashboard" button component that follows the design system
 * and provides consistent navigation across all pages.
 */
export function BackToDashboardButton({
  label = "Back to Dashboard",
  path = "/",
  className = "",
  variant = "outline",
  size = "sm"
}: BackToDashboardButtonProps) {
  const navigate = useNavigate()

  return (
    <Button 
      variant={variant}
      size={size}
      className={`btn-gradient-secondary back-to-dashboard flex items-center gap-2 cursor-pointer ${className}`}
      onClick={() => navigate(path)}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">Dashboard</span>
    </Button>
  )
}