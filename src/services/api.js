const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CACHE_KEY_PREFIX = 'gadget_store_cache_';
const CACHE_EXPIRATION_MS = 60 * 60 * 1000; // 1 hour

const fetchWithCache = async (endpoint) => {
  const cacheKey = `${CACHE_KEY_PREFIX}${endpoint}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRATION_MS) {
      console.log(`Serving from cache: ${endpoint}`);
      return data;
    }
  }

  console.log(`Fetching from API: ${endpoint}`);
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) throw new Error('API request failed');

  const data = await response.json();
  localStorage.setItem(cacheKey, JSON.stringify({
    data,
    timestamp: Date.now()
  }));

  return data;
};

export const getProducts = async () => {
  return await fetchWithCache('/product');
};

export const getProductDetails = async (id) => {
  return await fetchWithCache(`/product/${id}`);
};

export const addToCart = async (productId, colorCode, storageCode) => {
  const response = await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: productId,
      colorCode,
      storageCode,
    }),
  });

  if (!response.ok) throw new Error('Failed to add to cart');

  const data = await response.json();
  // The API returns the number of products that were added? 
  // Document says "returns the number of products in the basket".
  // We'll update our local count with this value.
  return data;
};
