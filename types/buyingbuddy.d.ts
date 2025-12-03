// TypeScript declarations for BuyingBuddy custom elements

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'bb-widget': {
        'data-type'?: 'ListingResults' | 'SearchDetails' | 'Communities' | 'MarketReports' | 'Search' | 'Disclaimer' | string;
        'data-account'?: string;
        'data-widget'?: string;
        children?: never;
      };
    }
  }
}

export {};

