import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { registerRoute } from 'workbox-routing'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import { precacheAndRoute } from 'workbox-precaching'
import { warmStrategyCache } from 'workbox-recipes'

// Precache and route assets
precacheAndRoute(self.__WB_MANIFEST)

// Cache page navigations (HTML) with CacheFirst strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
})

// Warm up the cache for critical pages like the homepage and index.html
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
})

// Cache pages (HTML) using the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache)

// Cache static assets like JS and CSS with StaleWhileRevalidate strategy
registerRoute(
  ({ request }) =>
    request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate({
    cacheName: 'static-assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
)

// Cache images with CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Only cache 50 images
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
      }),
    ],
  })
)
