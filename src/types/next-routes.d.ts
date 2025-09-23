// types/next-routes.d.ts
type AppRoutes =
  | '/'
  | '/page'
  | '/page-enhanced'
  | '/page-refined'
  | '/page-integrated'
  | '/case-studies'
  | '/contact'
  | '/diagnose'
  | '/solutions'
  | '/partners'
  | '/partners/jpcardozx'
  | '/methodology'
  | '/privacy'
  | '/terms'
  | '/cookies'
  | '/process';

declare module 'next/link' {
  interface LinkProps {
    href: AppRoutes | URL;
  }
}

declare module 'next/navigation' {
  interface Router {
    push(href: AppRoutes | URL): void;
    replace(href: AppRoutes | URL): void;
  }
}
