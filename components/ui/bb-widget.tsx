// Wrapper component for BuyingBuddy widgets
// This ensures proper TypeScript support

interface BBWidgetProps {
  dataType: 'ListingResults' | 'SearchDetails' | 'Communities' | 'MarketReports' | 'Search' | 'Disclaimer';
  dataAccount?: string;
  dataWidget?: string;
}

export function BBWidget({ dataType, dataAccount, dataWidget }: BBWidgetProps) {
  const attrs = {
    'data-type': dataType,
    ...(dataAccount && { 'data-account': dataAccount }),
    ...(dataWidget && { 'data-widget': dataWidget }),
  };

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<bb-widget ${Object.entries(attrs)
          .map(([key, value]) => `${key}="${value}"`)
          .join(' ')}></bb-widget>`,
      }}
    />
  );
}


