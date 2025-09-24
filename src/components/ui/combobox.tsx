'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { Command as CommandPrimitive } from 'cmdk'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Selecione uma opção...',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'Nenhum item encontrado.',
  disabled = false,
  className
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedOption = options.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  const newValue = currentValue === value ? '' : currentValue
                  onValueChange?.(newValue)
                  setOpen(false)
                }}
                disabled={option.disabled}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export interface MultiSelectProps {
  options: ComboboxOption[]
  values?: string[]
  onValuesChange?: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  maxSelected?: number
}

export function MultiSelect({
  options,
  values = [],
  onValuesChange,
  placeholder = 'Selecione opções...',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'Nenhum item encontrado.',
  disabled = false,
  className,
  maxSelected
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedOptions = options.filter((option) => values.includes(option.value))

  const handleSelect = (optionValue: string) => {
    const newValues = values.includes(optionValue)
      ? values.filter((v) => v !== optionValue)
      : [...values, optionValue]
    
    onValuesChange?.(newValues)
  }

  const removeValue = (optionValue: string) => {
    const newValues = values.filter((v) => v !== optionValue)
    onValuesChange?.(newValues)
  }

  const canAddMore = !maxSelected || values.length < maxSelected

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            'w-full justify-between min-h-10',
            values.length === 0 && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1">
            {values.length === 0 && placeholder}
            {selectedOptions.slice(0, 3).map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="mr-1 mb-1"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  removeValue(option.value)
                }}
              >
                {option.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      removeValue(option.value)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => removeValue(option.value)}
                >
                  ×
                </button>
              </Badge>
            ))}
            {values.length > 3 && (
              <Badge variant="secondary" className="mr-1 mb-1">
                +{values.length - 3} mais
              </Badge>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyMessage}</CommandEmpty>
          <CommandGroup>
            {options.map((option) => {
              const isSelected = values.includes(option.value)
              const isDisabled = option.disabled || (!isSelected && !canAddMore)
              
              return (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    if (!isDisabled) {
                      handleSelect(option.value)
                    }
                  }}
                  disabled={isDisabled}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      isSelected ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                  {isDisabled && !option.disabled && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      Máximo atingido
                    </span>
                  )}
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}