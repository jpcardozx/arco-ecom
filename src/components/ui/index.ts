// ARCO Design System - Unified Component Exports
// Centralized imports for shadcn/ui components with ARCO theming

export { Button, type ButtonProps } from '@/components/design-system/primitives/button';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/design-system/primitives/card';
export { Badge, type BadgeProps } from '@/components/design-system/primitives/badge';
export { Input } from '@/components/design-system/primitives/input';
export { Label } from '@/components/design-system/primitives/label';
export { Textarea } from '@/components/design-system/primitives/textarea';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/design-system/primitives/select';
export { Checkbox } from '@/components/design-system/primitives/checkbox';
export { RadioGroup, RadioGroupItem } from '@/components/design-system/primitives/radio-group';
export { Switch } from '@/components/design-system/primitives/switch';
export { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/design-system/primitives/tabs';
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/design-system/primitives/dialog';
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/design-system/primitives/sheet';
export { Popover, PopoverContent, PopoverTrigger } from '@/components/design-system/primitives/popover';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/design-system/primitives/tooltip';
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/design-system/primitives/dropdown-menu';
export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/design-system/primitives/navigation-menu';
export { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/design-system/primitives/table';
export { Progress } from '@/components/design-system/primitives/progress';
export { Avatar, AvatarFallback, AvatarImage } from '@/components/design-system/primitives/avatar';
export { Separator } from '@/components/design-system/primitives/separator';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/design-system/primitives/accordion';
export { Alert, AlertDescription, AlertTitle } from '@/components/design-system/primitives/alert';
export { Skeleton } from '@/components/design-system/primitives/skeleton';
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/design-system/primitives/command';
export { Toast, ToastProvider, ToastViewport, ToastTitle, ToastDescription, ToastClose, ToastAction } from '@/components/design-system/primitives/toast';
export { useToast } from '@/hooks/use-toast';
export { Toaster } from '@/components/design-system/primitives/toaster';
export { Slider } from '@/components/design-system/primitives/slider';
export { ScrollArea, ScrollBar } from '@/components/design-system/primitives/scroll-area';
export { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/design-system/primitives/drawer';
export { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/design-system/primitives/menubar';
export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/design-system/primitives/pagination';

// ARCO Premium Utilities
export const ArcoGlassClasses = {
  light: 'glass-light',
  medium: 'glass-medium',
  strong: 'glass-strong',
  dark: 'glass-dark',
} as const;

export const ArcoGlowClasses = {
  arco: 'glow-arco',
  arcoStrong: 'glow-arco-strong',
  accent: 'glow-accent',
} as const;

export const ArcoShadowClasses = {
  float: 'shadow-arco-float',
  inner: 'shadow-arco-inner',
} as const;

// ARCO Color Utilities
export const ArcoColors = {
  midnight: 'arco-midnight',
  obsidian: 'arco-obsidian',
  steel: 'arco-steel',
  gray: 'arco-gray',
  blue: 'arco-blue',
  darkBlue: 'arco-dark-blue',
  sanMarino: 'arco-san-marino',
  accent: 'arco-accent',
  light: 'arco-light',
  pearl: 'arco-pearl',
  mist: 'arco-mist',
} as const;