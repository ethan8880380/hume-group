"use client"

import { usePathname } from "next/navigation"
import { Header } from "./header"

export function HeaderWrapper() {
  const pathname = usePathname()
  
  // Define which pages should have color switching enabled
  // Home page benefits from transparent header over hero section
  const pagesWithColorSwitching = [
    '', // Blog page
  ]
  
  // Check if current page should have color switching
  // Handle exact matches and dynamic blog routes (e.g., /blog/[slug])
  const enableColorSwitching = pagesWithColorSwitching.includes(pathname) || 
    pathname.startsWith('/neighborhoods/')
  
  return <Header enableColorSwitching={enableColorSwitching} />
}