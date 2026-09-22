# AURE — Find your frequency

A responsive audio storefront prototype built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and React Three Fiber. Features original geometric product illustrations and procedural 3D headphones; no external images, model downloads, fonts, or API keys are required at runtime.

## Run

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

Deploy `dist/` to a static host. Requires Node.js 22.12+ or 20.19+.

## Features

- Interactive 3D headphones with drag rotation, accessible rotation controls, finish selection, and SVG loading/error fallback.
- Sticky scroll storytelling with 3D rotation, scaling, translation, and reduced-motion support.
- Responsive product collection, filtering, quick add, details, and search.
- Shopping bag with quantities, removal, validated local persistence, and simulated checkout.
- Native dialogs with focus trapping, Escape dismissal, focus restoration, and scroll locking.
- Mobile navigation, support content, shipping information, and privacy information.
- Lazy-loaded 3D code, capped pixel density, and offscreen animation suspension.

## Tests

```sh
npx playwright install chromium
npm run test:e2e
```

## Source

- `src/App.tsx`: storefront, interactions, dialogs, scroll story.
- `src/Scene.tsx`: procedural 3D headphones and lighting.
- `src/ProductArt.tsx`: SVG placeholder products.
- `src/data.ts`: fictional catalog and validated cart persistence.
- `src/styles.css`: responsive design and Tailwind theme.

This is production-buildable frontend code, not a live commerce service. All products, specifications, prices, and policies are illustrative. Real commerce requires server-validated prices, inventory, payment processing, taxes, fulfillment, and actual policies. Demo checkout details are never transmitted or stored.

Implementation references: [Tailwind CSS with Vite](https://tailwindcss.com/docs/installation/using-vite) and [Motion scroll values](https://motion.dev/docs/react-use-scroll).
