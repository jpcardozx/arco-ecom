/**
 * ARCO Components - Hierarchical System
 *
 * Architecture:
 * - design-system/    → Primitive UI + Composed layouts
 * - business/         → Domain-specific components
 * - common/           → Shared application components
 */

// Design System (Primitives + Composed)
export * from './design-system';

// Business Components (Domain-specific)
export * from './business';

// Common Components (Shared)
export * from './common';

/**
 * Usage: import { Button, CompleteLandingPage, Navigation } from '@/components';
 */
