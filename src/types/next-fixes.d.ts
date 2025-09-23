// Temporary fix for Next.js 15.3.1 Link component types
declare module 'next/link' {
  import { ComponentType } from 'react'
  import { UrlObject } from 'url'
  
  export interface LinkProps {
    href: string | UrlObject
    as?: string | UrlObject
    replace?: boolean
    scroll?: boolean
    shallow?: boolean
    passHref?: boolean
    prefetch?: boolean
    locale?: string | false
    legacyBehavior?: boolean
    onMouseEnter?: (e: any) => void
    onTouchStart?: (e: any) => void
    onClick?: (e: any) => void
    children?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    target?: string
    rel?: string
    [key: string]: any
  }

  const Link: ComponentType<LinkProps>
  export default Link
}

declare module 'next/navigation' {
  export function useRouter(): {
    push(href: string): void
    replace(href: string): void
    refresh(): void
    back(): void
    forward(): void
    prefetch(href: string): void
  }
  
  export function usePathname(): string
  export function useSearchParams(): URLSearchParams
  export function useParams(): Record<string, string | string[]>
  export function redirect(url: string): never
  export function notFound(): never
  export function permanentRedirect(url: string): never
}
