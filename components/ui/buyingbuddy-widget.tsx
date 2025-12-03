'use client';

import { useEffect, useRef } from 'react';

interface BuyingBuddyWidgetProps {
  widgetId?: string;
  accountId?: string;
  widgetType?: 'search' | 'listings' | 'featured' | 'map' | 'single-listing';
  listingId?: string;
  className?: string;
  height?: string;
  filters?: {
    city?: string;
    state?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    propertyType?: string;
  };
}

export function BuyingBuddyWidget({
  widgetId = process.env.NEXT_PUBLIC_BUYINGBUDDY_WIDGET_ID,
  accountId = process.env.NEXT_PUBLIC_BUYINGBUDDY_ACCOUNT_ID,
  widgetType = 'listings',
  listingId,
  className = '',
  height = '600px',
  filters = {},
}: BuyingBuddyWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetId || !accountId) {
      console.warn('BuyingBuddy widget requires widgetId and accountId');
      return;
    }

    // Load BuyingBuddy widget script if not already loaded
    const scriptId = 'buyingbuddy-widget-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.buyingbuddy.com/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    const initWidget = () => {
      if (containerRef.current && (window as unknown as { BuyingBuddy?: { init: (config: unknown) => void } }).BuyingBuddy) {
        // Clear previous widget
        containerRef.current.innerHTML = '';

        // Initialize BuyingBuddy widget
        const config = {
          accountId,
          widgetId,
          widgetType,
          listingId,
          container: containerRef.current,
          filters,
        };

        (window as unknown as { BuyingBuddy: { init: (config: unknown) => void } }).BuyingBuddy.init(config);
      }
    };

    // Check if script is already loaded
    if ((window as unknown as { BuyingBuddy?: unknown }).BuyingBuddy) {
      initWidget();
    } else {
      script.addEventListener('load', initWidget);
      return () => script.removeEventListener('load', initWidget);
    }
  }, [widgetId, accountId, widgetType, listingId, filters]);

  if (!widgetId || !accountId) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`} style={{ height }}>
        <p className="text-muted-foreground">
          BuyingBuddy widget configuration missing. Please set NEXT_PUBLIC_BUYINGBUDDY_WIDGET_ID and NEXT_PUBLIC_BUYINGBUDDY_ACCOUNT_ID environment variables.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`buyingbuddy-widget ${className}`}
      style={{ height, width: '100%' }}
    />
  );
}

// Alternative iframe-based widget for when script-based integration is not available
export function BuyingBuddyIframe({
  widgetId = process.env.NEXT_PUBLIC_BUYINGBUDDY_WIDGET_ID,
  accountId = process.env.NEXT_PUBLIC_BUYINGBUDDY_ACCOUNT_ID,
  widgetType = 'listings',
  listingId,
  className = '',
  height = '600px',
  filters = {},
}: BuyingBuddyWidgetProps) {
  if (!widgetId || !accountId) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`} style={{ height }}>
        <p className="text-muted-foreground">
          BuyingBuddy widget configuration missing.
        </p>
      </div>
    );
  }

  // Build query parameters from filters
  const params = new URLSearchParams({
    account_id: accountId,
    widget_id: widgetId,
    widget_type: widgetType,
    ...(listingId && { listing_id: listingId }),
    ...(filters.city && { city: filters.city }),
    ...(filters.state && { state: filters.state }),
    ...(filters.minPrice && { min_price: filters.minPrice.toString() }),
    ...(filters.maxPrice && { max_price: filters.maxPrice.toString() }),
    ...(filters.bedrooms && { bedrooms: filters.bedrooms.toString() }),
    ...(filters.propertyType && { property_type: filters.propertyType }),
  });

  const iframeUrl = `https://widget.buyingbuddy.com/embed?${params.toString()}`;

  return (
    <iframe
      src={iframeUrl}
      className={`w-full border-0 ${className}`}
      style={{ height }}
      title="BuyingBuddy Property Listings"
      loading="lazy"
    />
  );
}


