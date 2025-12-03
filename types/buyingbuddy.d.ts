// TypeScript declarations for BuyingBuddy custom elements

declare namespace JSX {
  interface IntrinsicElements {
    'bb-widget': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'data-type'?: 'ListingResults' | 'SearchDetails' | 'Communities' | 'MarketReports' | 'Search' | string;
        'data-account'?: string;
        'data-widget'?: string;
      },
      HTMLElement
    >;
  }
}

