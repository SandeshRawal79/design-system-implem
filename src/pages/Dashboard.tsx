import React from 'react'
import { DashboardMetrics } from '../components/DashboardMetrics'
import { IntelligenceCatalog } from '../components/IntelligenceCatalog'

export function Dashboard() {
  return (
    <>
      <DashboardMetrics />
      <IntelligenceCatalog />
    </>
  )
}