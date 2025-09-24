/**
 * Advanced Search System
 * Sistema de busca avançado com filtros e sugestões
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  ShoppingBag,
  Truck,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface SearchFilters {
  query: string;
  category: string[];
  brand: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  featured: boolean;
  hasDiscount: boolean;
  sortBy: 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'brand';
  count?: number;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  inStock: boolean;
  featured: boolean;
  image?: string;
}

// Sample data
const sampleSuggestions: SearchSuggestion[] = [
  { id: '1', text: 'iPhone 15', type: 'product', count: 12 },
  { id: '2', text: 'MacBook Pro', type: 'product', count: 8 },
  { id: '3', text: 'Apple', type: 'brand', count: 45 },
  { id: '4', text: 'Samsung', type: 'brand', count: 32 },
  { id: '5', text: 'Smartphones', type: 'category', count: 156 },
  { id: '6', text: 'Laptops', type: 'category', count: 89 },
];

const categories = [
  'Smartphones', 'Laptops', 'Tablets', 'Áudio', 'Câmeras',
  'Gaming', 'Casa & Jardim', 'Moda', 'Esportes', 'Livros'
];

const brands = [
  'Apple', 'Samsung', 'Sony', 'LG', 'Motorola',
  'Dell', 'HP', 'Lenovo', 'Asus', 'Xiaomi'
];

// Custom hook for debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Search Input with Suggestions
const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}> = ({ value, onChange, onSubmit, placeholder = "Buscar produtos..." }) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(value, 300);

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      // Filtrar sugestões baseado na query
      const filtered = sampleSuggestions.filter(suggestion =>
        suggestion.text.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery]);

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onChange(suggestion.text);
    setShowSuggestions(false);
    onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
      setShowSuggestions(false);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length >= 2 && setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-10 pr-4 py-2 w-full"
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    suggestion.type === 'product' ? 'bg-blue-500' :
                    suggestion.type === 'category' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`} />
                  <span className="group-hover:text-blue-600">{suggestion.text}</span>
                </div>
                {suggestion.count && (
                  <Badge variant="secondary" className="text-xs">
                    {suggestion.count}
                  </Badge>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Filter Section Component
const FilterSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between p-3 h-auto font-semibold"
        >
          <div className="flex items-center gap-2">
            {icon}
            {title}
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-4">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

// Advanced Filters Component
const AdvancedFilters: React.FC<{
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}> = ({ filters, onFiltersChange, onClearFilters }) => {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'category' | 'brand', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const activeFiltersCount =
    filters.category.length +
    filters.brand.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.featured ? 1 : 0) +
    (filters.hasDiscount ? 1 : 0);

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filtros</span>
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            Limpar
          </Button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection
        title="Preço"
        icon={<Tag className="w-4 h-4" />}
      >
        <div className="space-y-4">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
              max={5000}
              min={0}
              step={50}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>R$ {filters.priceRange[0]}</span>
            <span>R$ {filters.priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      <Separator />

      {/* Categories */}
      <FilterSection
        title="Categorias"
        icon={<ShoppingBag className="w-4 h-4" />}
      >
        <div className="space-y-2">
          {categories.slice(0, 8).map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={filters.category.includes(category)}
                onCheckedChange={() => toggleArrayFilter('category', category)}
              />
              <label
                htmlFor={`cat-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Brands */}
      <FilterSection
        title="Marcas"
        icon={<Star className="w-4 h-4" />}
      >
        <div className="space-y-2">
          {brands.slice(0, 8).map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brand.includes(brand)}
                onCheckedChange={() => toggleArrayFilter('brand', brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Rating */}
      <FilterSection
        title="Avaliação"
        icon={<Star className="w-4 h-4" />}
      >
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
              className={`w-full flex items-center gap-2 p-2 rounded hover:bg-gray-50 ${
                filters.rating === rating ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <div className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-gray-300" />
                ))}
              </div>
              <span className="text-sm">e acima</span>
            </button>
          ))}
        </div>
      </FilterSection>

      <Separator />

      {/* Other Filters */}
      <FilterSection
        title="Outros"
        icon={<Truck className="w-4 h-4" />}
      >
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={filters.inStock}
              onCheckedChange={(checked) => updateFilter('inStock', checked)}
            />
            <label htmlFor="inStock" className="text-sm font-medium cursor-pointer">
              Apenas em estoque
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.featured}
              onCheckedChange={(checked) => updateFilter('featured', checked)}
            />
            <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
              Produtos em destaque
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasDiscount"
              checked={filters.hasDiscount}
              onCheckedChange={(checked) => updateFilter('hasDiscount', checked)}
            />
            <label htmlFor="hasDiscount" className="text-sm font-medium cursor-pointer">
              Com desconto
            </label>
          </div>
        </div>
      </FilterSection>
    </div>
  );
};

// Sort Options Component
const SortOptions: React.FC<{
  sortBy: SearchFilters['sortBy'];
  onSortChange: (sort: SearchFilters['sortBy']) => void;
}> = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'relevance' as const, label: 'Relevância' },
    { value: 'price-low' as const, label: 'Menor preço' },
    { value: 'price-high' as const, label: 'Maior preço' },
    { value: 'rating' as const, label: 'Melhor avaliação' },
    { value: 'newest' as const, label: 'Mais recentes' },
  ];

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-500" />
      <span className="text-sm text-gray-600">Ordenar por:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SearchFilters['sortBy'])}
        className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Active Filters Display
const ActiveFilters: React.FC<{
  filters: SearchFilters;
  onRemoveFilter: (key: keyof SearchFilters, value?: string) => void;
  onClearAll: () => void;
}> = ({ filters, onRemoveFilter, onClearAll }) => {
  const activeFilters: Array<{ key: keyof SearchFilters; label: string; value?: string }> = [];

  // Add category filters
  filters.category.forEach(cat => {
    activeFilters.push({ key: 'category', label: cat, value: cat });
  });

  // Add brand filters
  filters.brand.forEach(brand => {
    activeFilters.push({ key: 'brand', label: brand, value: brand });
  });

  // Add other filters
  if (filters.rating > 0) {
    activeFilters.push({ key: 'rating', label: `${filters.rating}+ estrelas` });
  }
  if (filters.inStock) {
    activeFilters.push({ key: 'inStock', label: 'Em estoque' });
  }
  if (filters.featured) {
    activeFilters.push({ key: 'featured', label: 'Destaque' });
  }
  if (filters.hasDiscount) {
    activeFilters.push({ key: 'hasDiscount', label: 'Com desconto' });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-600">Filtros ativos:</span>
      {activeFilters.map((filter, index) => (
        <Badge
          key={`${filter.key}-${filter.value || filter.label}-${index}`}
          variant="secondary"
          className="flex items-center gap-1 pr-1"
        >
          {filter.label}
          <button
            onClick={() => onRemoveFilter(filter.key, filter.value)}
            className="ml-1 text-gray-500 hover:text-gray-700"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}
      <Button variant="ghost" size="sm" onClick={onClearAll} className="text-xs">
        Limpar todos
      </Button>
    </div>
  );
};

// Main Search System Component
export const SearchSystem: React.FC<{
  onSearch: (query: string, filters: SearchFilters) => void;
  resultsCount?: number;
}> = ({ onSearch, resultsCount = 0 }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: [],
    brand: [],
    priceRange: [0, 5000],
    rating: 0,
    inStock: false,
    featured: false,
    hasDiscount: false,
    sortBy: 'relevance',
  });

  const handleSearch = useCallback(() => {
    onSearch(filters.query, filters);
  }, [filters, onSearch]);

  const handleQueryChange = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      query: filters.query, // Keep search query
      category: [],
      brand: [],
      priceRange: [0, 5000],
      rating: 0,
      inStock: false,
      featured: false,
      hasDiscount: false,
      sortBy: 'relevance',
    });
  };

  const removeFilter = (key: keyof SearchFilters, value?: string) => {
    if (key === 'category' || key === 'brand') {
      const newArray = filters[key].filter(item => item !== value);
      setFilters(prev => ({ ...prev, [key]: newArray }));
    } else if (key === 'rating') {
      setFilters(prev => ({ ...prev, rating: 0 }));
    } else {
      setFilters(prev => ({ ...prev, [key]: false }));
    }
  };

  // Auto-search when filters change (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [handleSearch]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1">
          <SearchInput
            value={filters.query}
            onChange={handleQueryChange}
            onSubmit={handleSearch}
          />
        </div>

        {/* Filters Trigger (Mobile) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <Filter className="w-4 h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <AdvancedFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={clearFilters}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {resultsCount > 0 && (
            <span>{resultsCount.toLocaleString()} produtos encontrados</span>
          )}
        </div>
        <SortOptions
          sortBy={filters.sortBy}
          onSortChange={(sort) => setFilters(prev => ({ ...prev, sortBy: sort }))}
        />
      </div>

      {/* Active Filters */}
      <ActiveFilters
        filters={filters}
        onRemoveFilter={removeFilter}
        onClearAll={clearFilters}
      />

      {/* Desktop Filters Sidebar */}
      <div className="hidden lg:block">
        <Card>
          <CardContent className="p-0">
            <AdvancedFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={clearFilters}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};