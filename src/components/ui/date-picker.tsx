'use client'

import * as React from 'react'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = 'Selecione uma data',
  disabled = false,
  className
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP', { locale: ptBR }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}

export interface DateRangePickerProps {
  dateRange?: {
    from?: Date
    to?: Date
  }
  onDateRangeChange?: (range: { from?: Date; to?: Date } | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = 'Selecione um período',
  disabled = false,
  className
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !dateRange?.from && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'dd/MM/yyyy')} -{' '}
                {format(dateRange.to, 'dd/MM/yyyy')}
              </>
            ) : (
              format(dateRange.from, 'dd/MM/yyyy')
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="range"
          selected={dateRange as any}
          onSelect={onDateRangeChange as any}
          numberOfMonths={2}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}