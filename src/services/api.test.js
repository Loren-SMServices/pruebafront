import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProducts } from './api';

// Create a mock fetch for the API
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('API Service Caching', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    // Default mock response
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: '1', brand: 'Test', model: 'Device' }]
    });
  });

  it('should fetch from API on first call and store in cache', async () => {
    const products = await getProducts();
    
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(products[0].id).toBe('1');
    
    const cacheKey = 'gadget_store_cache_/product';
    expect(localStorage.getItem(cacheKey)).not.toBeNull();
  });

  it('should fetch from cache on second call if less than 1 hour has passed', async () => {
    // First call to populate cache
    await getProducts();
    expect(mockFetch).toHaveBeenCalledTimes(1);
    
    // Second call
    const products = await getProducts();
    expect(mockFetch).toHaveBeenCalledTimes(1); // Should NOT be called again
    expect(products[0].id).toBe('1');
  });

  it('should fetch from API if cache has expired (more than 1 hour)', async () => {
    // Populate cache with an old timestamp
    const cacheKey = 'gadget_store_cache_/product';
    const oldTimestamp = Date.now() - (61 * 60 * 1000); // 1 hour and 1 min ago
    localStorage.setItem(cacheKey, JSON.stringify({
      data: [{ id: 'old', brand: 'Old', model: 'Device' }],
      timestamp: oldTimestamp
    }));
    
    const products = await getProducts();
    
    // Should have called the API again since cache is expired
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(products[0].id).toBe('1'); // New data from API
  });
});
