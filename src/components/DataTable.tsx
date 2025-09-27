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

      {/* Data Table - Refactored with exact markup structure */}
      <Card className="overflow-hidden w-full">
        <div className="responsive-table-wrapper w-full">
          <table data-slot="table" className="w-full caption-bottom text-sm">
            <thead data-slot="table-header" className="[&_tr]:border-b">
              <tr data-slot="table-row" className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                {columns.map((column, index) => (
                  <th 
                    key={index}
                    data-slot="table-head"
                    className={`text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${getColumnClass(column.key as string)} ${column.className || ''}`}
                  >
                    {column.sortable !== false ? (
                      <button 
                        data-slot="button"
                        onClick={() => handleSort(String(column.key))}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 has-[>svg]:px-3 h-auto p-0 font-medium text-muted-foreground hover:text-foreground hover:bg-transparent justify-start"
                      >
                        <div className="flex items-center">
                          {column.label}
                          <i className={`fas ${getSortIcon(String(column.key)) === faSort ? 'fa-sort' : getSortIcon(String(column.key)) === faSortUp ? 'fa-sort-up' : 'fa-sort-down'} text-muted-foreground ml-2`}></i>
                        </div>
                      </button>
                    ) : (
                      <span className="font-medium text-muted-foreground">
                        {column.label}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody data-slot="table-body" className="[&_tr:last-child]:border-0">
              {sortedData.length === 0 ? (
                <tr data-slot="table-row" className="data-[state=selected]:bg-muted border-b hover:bg-muted/30 transition-colors">
                  <td data-slot="table-cell" colSpan={columns.length} className="p-2 align-middle whitespace-nowrap py-4 text-center text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                sortedData.map((record, index) => (
                  <tr 
                    key={index}
                    data-slot="table-row"
                    className="data-[state=selected]:bg-muted border-b hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((column, colIndex) => (
                      <td 
                        key={colIndex} 
                        data-slot="table-cell"
                        className={`p-2 align-middle whitespace-nowrap py-4 ${getColumnClass(column.key as string)} ${column.className || ''}`}
                      >
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