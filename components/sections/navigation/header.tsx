"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

const mainLinks = [
  {
    title: "Home",
    href: "/",
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

const listingsDropdown = [
  {
    title: "Our Listings",
    href: "/listings",
    description: "View properties listed by our team"
  },
  {
    title: "Home Search",
    href: "/listing-results",
    description: "Search all available homes"
  },
  {
    title: "Search by Neighborhood",
    href: "/neighborhoods",
    description: "Explore homes by area"
  }
]

export function Header() {
  const [hasScrolled, setHasScrolled] = React.useState(false)
  const [isClient, setIsClient] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

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
    <>
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
          "container mx-auto flex justify-between items-center px-4 md:px-6 py-4"
        )}>
          <Link 
            href="/" 
            className="flex items-center gap-3 md:gap-4"
          >
            <svg 
              width="61" 
              height="22" 
              viewBox="0 0 61 22" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 md:h-5 w-auto text-primary"
            >
              <path d="M1 22V12L7.5 5.5L14 12V21H20V1H30.5V17H35L43.5 10L51.5 16.5V12H56.5V19L59.5 21" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="text-base md:text-md font-medium font-sans text-foreground">
              Matt Hume — Tom Hume — David Gala
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="font-sans text-foreground">
                {/* Home Link */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    className={cn(
                      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-sans",
                      pathname === "/" 
                        ? "text-primary font-semibold bg-primary/5" 
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Listings Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      "bg-transparent font-sans text-sm font-medium",
                      listingsDropdown.some(item => pathname === item.href || pathname.startsWith(item.href + "/"))
                        ? "text-primary font-semibold" 
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    Listings
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-1 p-2">
                      {listingsDropdown.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                        return (
                          <li key={item.href}>
                            <NavigationMenuLink
                              href={item.href}
                              className={cn(
                                "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActive && "bg-accent/50"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">{item.title}</div>
                              <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1.5">
                                {item.description}
                              </p>
                            </NavigationMenuLink>
                          </li>
                        )
                      })}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other Links */}
                {mainLinks.filter(link => link.href !== "/").map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                  return (
                    <NavigationMenuItem key={link.href}>
                      <NavigationMenuLink
                        href={link.href}
                        className={cn(
                          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 font-sans",
                          isActive 
                            ? "text-primary font-semibold bg-primary/5" 
                            : "text-foreground hover:text-primary"
                        )}
                      >
                        {link.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center">
            <Link href="/contact">
              <Button 
                variant="default" 
                className="cursor-pointer font-sans bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <Drawer open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-xl font-medium">Menu</DrawerTitle>
              <DrawerClose asChild>
                <button
                  className="p-2 hover:bg-accent rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          
          <div className="overflow-y-auto px-4 py-6">
            <nav className="flex flex-col gap-2">
              {/* Home Link */}
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors",
                  pathname === "/"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent"
                )}
              >
                Home
              </Link>

              {/* Listings Section */}
              <div className="mt-2">
                <div className="px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Listings
                </div>
                <div className="flex flex-col gap-1 ml-2">
                  {listingsDropdown.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground hover:bg-accent"
                        )}
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Other Links */}
              {mainLinks.filter(link => link.href !== "/").map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/")
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-md text-base font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                    )}
                  >
                    {link.title}
                  </Link>
                )
              })}
              
              <div className="pt-4 mt-4 border-t">
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant="default" 
                    className="w-full cursor-pointer font-sans bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </>
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
