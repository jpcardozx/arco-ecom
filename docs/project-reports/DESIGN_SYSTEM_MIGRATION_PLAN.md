# ARCO Design System Migration Plan

## 🎯 OBJECTIVE
Consolidate the fragmented UI system into a unified shadcn/ui-based design system

## 🚨 CURRENT PROBLEMS
- 15+ @radix-ui/* packages (redundant with shadcn/ui)
- @headlessui/react (conflicts with Radix)
- Multiple icon libraries (heroicons + lucide)
- Custom design systems competing with each other
- Bundle size bloat and inconsistent UX

## ✅ MIGRATION STRATEGY

### Phase 1: Remove Redundant Dependencies
```bash
# Remove these packages:
pnpm remove @headlessui/react @heroicons/react
pnpm remove @radix-ui/react-accordion @radix-ui/react-alert-dialog
pnpm remove @radix-ui/react-avatar @radix-ui/react-checkbox
pnpm remove @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm remove @radix-ui/react-popover @radix-ui/react-progress
pnpm remove @radix-ui/react-radio-group @radix-ui/react-select
pnpm remove @radix-ui/react-separator @radix-ui/react-slot
pnpm remove @radix-ui/react-switch @radix-ui/react-tabs
pnpm remove @radix-ui/react-toast @radix-ui/react-tooltip
```

### Phase 2: Standardize on shadcn/ui + lucide-react
- Keep: `lucide-react` (preferred icon library)
- Keep: `@radix-ui/react-*` dependencies via shadcn/ui
- Remove: Direct Radix imports
- Remove: Heroicons

### Phase 3: Refactor Components
1. Update imports from custom design systems to shadcn/ui
2. Consolidate styling approaches
3. Standardize component patterns

### Phase 4: Design Tokens
- Use CSS variables from shadcn/ui
- Extend with ARCO brand colors
- Maintain premium aesthetics

## 🎨 NEW ARCHITECTURE
```
src/
├── components/
│   ├── ui/              # shadcn/ui components (generated)
│   ├── layout/          # Layout components using shadcn/ui
│   └── features/        # Feature-specific components
├── lib/
│   ├── utils.ts         # cn() utility and others
│   └── design-tokens.ts # Extended design system
└── styles/
    └── globals.css      # Global styles with CSS variables
```

## 📊 EXPECTED BENEFITS
- 60%+ reduction in bundle size
- Consistent component behavior
- Better accessibility out of the box
- Easier maintenance
- Improved performance