"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Building2, 
  ShoppingBag, 
  MapPin, 
  FileText,
  Search,
  Map,
  Phone,
  Mail,
  ChevronRight,
  ArrowRight
} from "lucide-react"

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
} from "@/components/ui/drawer"

const mainLinks = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "About",
    href: "/about",
    icon: Users,
  },
  {
    title: "Selling",
    href: "/selling",
    icon: Building2,
  },
  {
    title: "Buying",
    href: "/buying",
    icon: ShoppingBag,
  },
  {
    title: "Neighborhoods",
    href: "/neighborhoods",
    icon: MapPin,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: FileText,
  }
]

const listingsDropdown = [
  {
    title: "Our Listings",
    href: "/listings",
    description: "View properties listed by our team",
    icon: Building2,
  },
  {
    title: "Home Search",
    href: "/listing-results",
    description: "Search all available homes",
    icon: Search,
  },
  {
    title: "Search by Neighborhood",
    href: "/neighborhoods",
    description: "Explore homes by area",
    icon: Map,
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
        <DrawerContent className="h-[100dvh] max-h-[100dvh] rounded-none">
          {/* Header with Logo */}
          <div className="border-b border-border px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
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
                <span className="text-primary font-medium">The Hume Group</span>
              </div>
              <DrawerClose asChild>
                <button
                  className="p-2 hover:bg-primary/10 rounded-full transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </DrawerClose>
            </div>
          </div>
          
          {/* Menu Content */}
          <div className="flex-1 overflow-y-auto bg-background">
            <nav className="px-4 py-6">
              {/* Main Navigation Links */}
              <div className="space-y-1">
                {mainLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href + "/"))
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-4 rounded-xl text-base font-medium transition-all",
                        isActive
                          ? "bg-primary text-white"
                          : "text-foreground hover:bg-primary/5 active:bg-primary/10"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          isActive ? "bg-white/20" : "bg-primary/10"
                        )}>
                          <Icon className={cn(
                            "h-5 w-5",
                            isActive ? "text-white" : "text-primary"
                          )} />
                        </div>
                        <span>{link.title}</span>
                      </div>
                      <ChevronRight className={cn(
                        "h-5 w-5",
                        isActive ? "text-white/70" : "text-muted-foreground"
                      )} />
                    </Link>
                  )
                })}
              </div>

              {/* Listings Section */}
              <div className="mt-8">
                <div className="px-4 mb-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Find Your Home
                  </p>
                </div>
                <div className="space-y-1">
                  {listingsDropdown.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                          isActive
                            ? "bg-primary/10"
                            : "hover:bg-muted/50 active:bg-muted"
                        )}
                      >
                        <div className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center",
                          isActive ? "bg-primary/20" : "bg-muted"
                        )}>
                          <Icon className={cn(
                            "h-4 w-4",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )} />
                        </div>
                        <div className="flex-1">
                          <p className={cn(
                            "text-sm font-medium",
                            isActive ? "text-primary" : "text-foreground"
                          )}>
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </nav>
          </div>

          {/* Footer with CTA and Contact */}
          <div className="border-t bg-muted/30 px-4 py-5 space-y-4">
            {/* Contact Info */}
            <div className="flex items-center justify-center gap-6 text-sm">
              <a 
                href="tel:+12533181005" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>(253) 318-1005</span>
              </a>
              <a 
                href="mailto:tom@thehumegroup.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Email Us</span>
              </a>
            </div>
            
            {/* CTA Button */}
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button 
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 rounded-xl"
              >
                <span>Get in Touch</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
