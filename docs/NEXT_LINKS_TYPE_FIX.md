# Next.js 15 Link Type Compatibility Helper

## Overview

This utility helps solve TypeScript errors related to Next.js 15's stricter type checking for `Link` components. In Next.js 15, the `href` prop expects a specific type `UrlObject | RouteImpl<RouteType>` rather than just a string.

## The Problem

In Next.js 15.x, using string literals directly as `href` values like this:

```tsx
<Link href="/contact">Contact</Link>
```

Results in TypeScript errors like:

```
Type '"/contact"' is not assignable to type 'UrlObject | RouteImpl<"/contact">'.
```

## The Solution

We've created a utility function `createHref()` that properly types the href values:

```tsx
import { createHref } from '../../utils/navigation';

// Use it with Link components
<Link href={createHref('/contact')}>Contact</Link>;
```

## When To Use

Use the `createHref()` function whenever you're providing a string value to the `href` prop of a Next.js `Link` component.

## Implementation Details

The utility function is located at `src/utils/navigation.ts` and uses TypeScript's type assertion to convert string values to the correct type expected by Next.js 15.

## Examples

```tsx
// Before
<Link href="/about">About</Link>; // ❌ TypeScript error

// After
import { createHref } from '../../utils/navigation';
<Link href={createHref('/about')}>About</Link>; // ✅ Works correctly
```

For dynamic routes:

```tsx
<Link href={createHref(`/products/${productId}`)}>View Product</Link>
```

## Notes

This is a workaround for the strict typing in Next.js 15. It may become unnecessary in future versions if the typing constraints are relaxed.
