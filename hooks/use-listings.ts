import { useState, useEffect, useCallback } from 'react';
import { Listing } from '@/app/api/listings/route';

interface UseListingsOptions {
  limit?: number;
  offset?: number;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  propertyType?: string;
  city?: string;
  state?: string;
  autoFetch?: boolean;
}

interface UseListingsReturn {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  total: number;
  hasMore: boolean;
  fetchListings: (options?: UseListingsOptions) => Promise<void>;
  fetchMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useListings(initialOptions: UseListingsOptions = {}): UseListingsReturn {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [currentOptions, setCurrentOptions] = useState(initialOptions);

  const fetchListings = useCallback(async (options: UseListingsOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.offset) params.append('offset', options.offset.toString());
      if (options.status) params.append('status', options.status);
      if (options.minPrice) params.append('minPrice', options.minPrice.toString());
      if (options.maxPrice) params.append('maxPrice', options.maxPrice.toString());
      if (options.bedrooms) params.append('bedrooms', options.bedrooms.toString());
      if (options.propertyType) params.append('propertyType', options.propertyType);
      if (options.city) params.append('city', options.city);
      if (options.state) params.append('state', options.state);

      const response = await fetch(`/api/listings?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      const data = await response.json();
      
      setListings(data.listings);
      setTotal(data.total);
      setHasMore(data.hasMore);
      setCurrentOptions(options);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMore = useCallback(async () => {
    if (!hasMore || loading) return;

    const newOffset = (currentOptions.offset || 0) + (currentOptions.limit || 10);
    await fetchListings({ ...currentOptions, offset: newOffset });
  }, [hasMore, loading, currentOptions, fetchListings]);

  const refresh = useCallback(async () => {
    await fetchListings(currentOptions);
  }, [fetchListings, currentOptions]);

  // Auto-fetch on mount if autoFetch is true
  useEffect(() => {
    if (initialOptions.autoFetch !== false) {
      fetchListings(initialOptions);
    }
  }, [fetchListings, initialOptions]);

  return {
    listings,
    loading,
    error,
    total,
    hasMore,
    fetchListings,
    fetchMore,
    refresh,
  };
}

// Hook for fetching a single listing
export function useListing(id: string) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchListing = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/listings/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch listing');
      }

      const data = await response.json();
      setListing(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchListing();
  }, [fetchListing]);

  return {
    listing,
    loading,
    error,
    refresh: fetchListing,
  };
}

// Hook for featured listings
export function useFeaturedListings(limit: number = 6) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatured = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/listings?limit=${limit}&status=active`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch featured listings');
      }

      const data = await response.json();
      setListings(data.listings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchFeatured();
  }, [fetchFeatured]);

  return {
    listings,
    loading,
    error,
    refresh: fetchFeatured,
  };
} 