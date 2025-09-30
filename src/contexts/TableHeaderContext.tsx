import React, { createContext, useContext, useState, ReactNode } from 'react'

interface TableHeaderContextType {
  tableHeader: ReactNode | null
  setTableHeader: (header: ReactNode | null) => void
}

const TableHeaderContext = createContext<TableHeaderContextType | undefined>(undefined)

export function TableHeaderProvider({ children }: { children: ReactNode }) {
  const [tableHeader, setTableHeader] = useState<ReactNode | null>(null)

  return (
    <TableHeaderContext.Provider value={{ tableHeader, setTableHeader }}>
      {children}
    </TableHeaderContext.Provider>
  )
}

export function useTableHeader() {
  const context = useContext(TableHeaderContext)
  if (context === undefined) {
    throw new Error('useTableHeader must be used within a TableHeaderProvider')
  }
  return context
}