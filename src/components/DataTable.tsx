import React, { useState, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass } from '@phosphor-icons/react'

interface Column<T> {
  key: keyof T | string
  label: string
  sortable?: boolean
  searchable?: boolean
  render?: (value: any, record: T, index: number) => React.ReactNode
  className?: string
  minWidth?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
}

type SortDirection = 'asc' | 'desc' | null

/**
 * Reusable data table component with sorting, searching, and consistent styling
 * following the design system specifications.
 */
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No data found",
  className = ""
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data

    return data.filter(record => {
      return columns.some(column => {
        if (column.searchable === false) return false
        
        const value = record[column.key as keyof T]
        return String(value).toLowerCase().includes(searchTerm.toLowerCase())
      })
    })
  }, [data, searchTerm, searchable, columns])

  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!sortField || !sortDirection) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
      
      let result = 0
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        result = aValue.localeCompare(bValue)
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        result = aValue - bValue
      } else {
        result = String(aValue).localeCompare(String(bValue))
      }
      
      return sortDirection === 'desc' ? -result : result
    })
  }, [filteredData, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Cycle through: asc -> desc -> null
      setSortDirection(current => {
        if (current === 'asc') return 'desc'
        if (current === 'desc') return null
        return 'asc'
      })
      if (sortDirection === 'desc') {
        setSortField(null)
      }
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) return faSort
    if (sortDirection === 'asc') return faSortUp
    if (sortDirection === 'desc') return faSortDown
    return faSort
  }

  const getColumnClass = (columnKey: string) => {
    // Apply responsive column classes based on common column patterns
    const keyStr = String(columnKey).toLowerCase()
    
    // Service-specific columns (Phase1Services)
    if (keyStr.includes('id') && keyStr.includes('service')) {
      return 'service-id-col'
    }
    if (keyStr.includes('name') && keyStr.includes('service')) {
      return 'service-name-col'
    }
    if (keyStr.includes('record') || keyStr.includes('total')) {
      return 'records-col'
    }
    
    // General columns
    if (keyStr === 'id') {
      return 'id-col'
    }
    if (keyStr === 'name') {
      return 'name-col'
    }
    if (keyStr === 'description') {
      return 'description-col'
    }
    if (keyStr === 'assignee') {
      return 'assignee-col'
    }
    if (keyStr === 'members') {
      return 'members-col'
    }
    if (keyStr === 'created') {
      return 'created-col'
    }
    if (keyStr === 'modify') {
      return 'modify-col'
    }
    if (keyStr === 'creator') {
      return 'creator-col'
    }
    if (keyStr === 'setcount') {
      return 'set-count-col'
    }
    if (keyStr === 'abcdtup') {
      return 'abcd-tup-col'
    }
    if (keyStr === 'provisiontype') {
      return 'provision-type-col'
    }
    if (keyStr === 'options') {
      return 'options-col'
    }
    if (keyStr === 'approvalsneeded') {
      return 'approvals-needed-col'
    }
    if (keyStr === 'timestamp') {
      return 'timestamp-col'
    }
    if (keyStr === 'actions') {
      return 'actions-col'
    }
    if (keyStr.includes('action') || keyStr.includes('button') || keyStr.includes('view') || keyStr.includes('dendrogram')) {
      return 'action-col'
    }
    
    return ''
  }

  return (
    <div className={`space-y-4 w-full max-w-none ${className}`}>
      {/* Search Bar */}
      {searchable && (
        <div className="flex items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <MagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}

      {/* Data Table - Full Width */}
      <Card className="overflow-hidden w-full">
        <div className="responsive-table-wrapper w-full">
          <table className="responsive-table sticky-header w-full min-w-full">
            <thead className="bg-muted/30">
              <tr className="border-b border-border">
                {columns.map((column, index) => (
                  <th 
                    key={index}
                    className={`text-left px-2 py-1.5 md:px-3 md:py-2 lg:px-3 lg:py-2 ${getColumnClass(column.key as string)} ${column.className || ''}`}
                  >
                    {column.sortable !== false ? (
                      <button 
                        onClick={() => handleSort(String(column.key))}
                        className="flex items-center gap-1.5 font-semibold text-xs md:text-sm text-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {column.label}
                        <FontAwesomeIcon 
                          icon={getSortIcon(String(column.key))} 
                          className="w-2.5 h-2.5 text-muted-foreground"
                        />
                      </button>
                    ) : (
                      <span className="font-semibold text-xs md:text-sm text-foreground">
                        {column.label}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center p-8 text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                sortedData.map((record, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-border hover:bg-muted/20 transition-colors ${
                      index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                    }`}
                  >
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className={`px-2 py-2 md:px-3 md:py-2.5 lg:px-3 lg:py-2.5 ${getColumnClass(column.key as string)} ${column.className || ''}`}>
                        {column.render 
                          ? column.render(record[column.key as keyof T], record, index)
                          : String(record[column.key as keyof T] || '')
                        }
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}