"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const dashboardLinks = [
  {
    title: "All Dashboards",
    href: "/dashboards",
    description: "All the dashboards available across IFP sorted by category and team."
  },
  {
    title: "In Market Performance", 
    href: "/dashboards?category=In%20Market%20Performance",
    description: "The top category of dashboards available across IFP."
  },
  {
    title: "Marketing",
    href: "/dashboards?team=growthCB", 
    description: "Dashboards specifically for the Marketing team."
  }
]

const mainLinks = [
  {
    title: "Listings",
    href: "/listings",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Selling",
    href: "/selling",
  },
  {
    title: "Buying",
    href: "/buying",
  },
  {
    title: "Neighborhoods",
    href: "/neighborhoods",
  },
  {
    title: "Blog",
    href: "/blog",
  }
]

export function Header() {
  const [hasScrolled, setHasScrolled] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
    setIsClient(true)
    
    function handleScroll() {
      setHasScrolled(window.scrollY > 20)
    }
    
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-700 border-b border-border backdrop-blur bg-white/80 dark:bg-zinc-900/80"
      )}
      style={{
        borderBottomColor: isClient && hasScrolled 
          ? 'var(--border)' 
          : 'transparent'
      }}
    >
      <div className={cn(
        "container mx-auto flex justify-between items-center px-6 py-4"
      )}>
        <Link 
          href="/" 
          className="flex items-center gap-4"
        >
          <svg 
            width="61" 
            height="22" 
            viewBox="0 0 61 22" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-auto text-primary"
          >
            <path d="M1 22V12L7.5 5.5L14 12V21H20V1H30.5V17H35L43.5 10L51.5 16.5V12H56.5V19L59.5 21" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <div className="text-lg font-medium font-sans text-foreground">
            The Hume Group
          </div>
        </Link>
        <div className="flex items-center gap-4">
        <NavigationMenu>
          <NavigationMenuList className="font-sans text-foreground">
          {/*<NavigationMenuItem>
            <NavigationMenuTrigger>
              Dashboards
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 w-full grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
                 <li className="row-span-full">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-orange-500 hover:bg-orange-500/70 p-6 no-underline outline-none focus:shadow-md transition-colors duration-500 transition-ease-in"
                      href="https://app.powerbi.com/groups/fce8f169-7295-4633-a512-59790c500b50/reports/5ad15a81-d4e2-4321-8f8c-09bface2d504/bdd60cd2c8376e0d7578?experience=power-bi"
                    >
                      <ShoppingCart className="size-6 text-background" />
                      <div className="mb-2 mt-4 text-lg text-background font-medium">
                        IFP Market Share - Priority Cohorts
                      </div>
                      <p className="text-sm leading-tight text-background/80">
                        A tool that provides the business with the latest weighted market share results for the 17 measured IFP cohorts.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li> 
                <div className="grid gap-3">
                  {dashboardLinks.map((link) => (
                    <ListItem key={link.href} href={link.href} title={link.title}>
                      {link.description}
                    </ListItem>
                  ))}
                </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>*/}
          
          
          {mainLinks.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                href={link.href}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-sans text-foreground hover:text-foreground/80"
              >
                {link.title}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-3">
          <Link href="/faqs">
            <Button 
              variant="default" 
              className="cursor-pointer font-sans bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Contact Us
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuLink>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuLink> & {
    title: string;
  }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
