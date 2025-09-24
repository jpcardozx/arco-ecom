'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'

export interface ComboboxOption {
  label: string
  value: string
  description?: string
}

export interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Selecione uma opção...',
  searchPlaceholder = 'Buscar...',
  emptyText = 'Nenhuma opção encontrada.',
  disabled = false,
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
          disabled={disabled}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
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
  emptyText?: string
  maxSelected?: number
  disabled?: boolean
  className?: string
}

export function MultiSelect({
  options,
  values = [],
  onValuesChange,
  placeholder = 'Selecione opções...',
  searchPlaceholder = 'Buscar...',
  emptyText = 'Nenhuma opção encontrada.',
  maxSelected,
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const selectedOptions = options.filter((option) =>
    values.includes(option.value)
  )

  const handleSelect = (optionValue: string) => {
    if (values.includes(optionValue)) {
      onValuesChange?.(values.filter((value) => value !== optionValue))
    } else {
      if (maxSelected && values.length >= maxSelected) return
      onValuesChange?.([...values, optionValue])
    }
  }

  const handleRemove = (optionValue: string) => {
    onValuesChange?.(values.filter((value) => value !== optionValue))
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-10"
            disabled={disabled}
          >
            <span className="truncate">
              {selectedOptions.length > 0
                ? `${selectedOptions.length} selecionado(s)`
                : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        values.includes(option.value) ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      {option.description && (
                        <span className="text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedOptions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-1"
        >
          <AnimatePresence>
            {selectedOptions.map((option) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Badge
                  variant="secondary"
                  className="pr-1 gap-1"
                >
                  {option.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleRemove(option.value)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {maxSelected && (
        <p className="text-xs text-muted-foreground">
          {values.length}/{maxSelected} selecionados
        </p>
      )}
    </div>
  )
}