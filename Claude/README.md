# AURA One — immersive commerce front end

A high-end e-commerce prototype in the Apple product-page idiom: a full-screen
hero built around an interactive 3D product, an Apple-style pinned scroll
sequence, an inverted spec section, and a glass product grid.

The fictional product is **AURA One**, a spatial-audio speaker — a faceted glass
shell, a machined aluminium ring, and a driver core. Grounding the geometry in a
real product idea is what keeps it from reading as a spinning demo cube.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
npm run typecheck            # tsc --noEmit
```

Node 18.18+.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router) + TypeScript, strict |
| Styling | Tailwind CSS 3 |
| Scroll & UI motion | Framer Motion 11 |
| 3D | React Three Fiber 8 + drei 9 + three 0.169 |

## How the scroll choreography works

The single most important decision: **one canvas for the whole page, and scroll
position never enters React state.**

- `src/components/three/SceneLayer.tsx` mounts a fixed, full-screen canvas
  behind the content. It never unmounts, which is what lets the product travel
  continuously from the hero into the showcase rather than popping in and out
  per section.
- `src/components/ScrollDriver.tsx` measures the hero and showcase on every
  animation frame and writes normalised progress into a plain module object
  (`src/lib/scroll-store.ts`). `useFrame` reads from it. A `setState` per scroll
  frame would re-render the tree and stutter the scene.
- `src/components/three/AuraModel.tsx` maps that progress to a pose — position,
  scale, tilt, spin, ring separation — and damps toward it with
  `THREE.MathUtils.damp`, so it is frame-rate independent and never snaps.
- `src/components/ScrollShowcase.tsx` pins a viewport-tall pane inside a 380svh
  section and cross-fades three blocks of copy against that same progress. All
  three chapters are placed into one grid row so they overlap and stay
  vertically centred.

Once the product's story finishes, the driver fades the WebGL layer out via a
direct DOM style write, so the spec and grid sections sit on clean, undisturbed
backgrounds and the GPU goes idle.

### Interaction

Drag anywhere on the background to rotate the product. `PresentationControls` is
used rather than `OrbitControls` specifically because it does not capture wheel
events, so scrolling still works over the canvas. The canvas carries
`touch-action: pan-y`, so on a phone horizontal drags rotate and vertical drags
scroll.

## Deliberate choices worth knowing about

**No HDRI download.** `<Environment preset="city" />` fetches a multi-megabyte
map from a CDN at runtime. `src/components/three/Studio.tsx` builds an
equivalent studio rig out of `Lightformer` panes, rendered once into a 256px cube
map — it works offline and gives the glass the long soft highlights that read as
product photography.

**No bitmap placeholders.** `src/components/ui/ProductVisual.tsx` composites the
product imagery in CSS. It never ships a broken image or a network round trip,
and it keeps the six products on-palette so the grid reads as one family. Swap
the inner element for `next/image` when real renders exist.

**Geometry is memoised.** Recreating `BufferGeometry` per frame is the usual
cause of GC stutter in scroll-driven scenes.

**Object scale is viewport-relative.** Both the lateral travel and the overall
scale are derived from `state.viewport.width`, so the product never crops off
the edges of a narrow desktop window or a portrait phone.

## Quality floor

- Responsive from 390px up; the showcase drops to centred copy over a scrim on
  narrow screens.
- `prefers-reduced-motion` is respected — idle rotation, float, entrance travel
  and smooth scrolling all switch off.
- Visible keyboard focus rings throughout, a skip link, real `<nav>`/`<dl>`
  semantics, `aria-expanded` on the menu, and decorative layers marked
  `aria-hidden`.
- three.js is code-split out of the first load (≈135 kB first load JS).

## Design tokens

Defined in `tailwind.config.ts` and `src/app/globals.css`.

- **Colour** — `#000000` true black, `#F5F5F7` for the inverted section,
  `#1D1D1F` ink, `#86868B` secondary, and an aurora accent (`#6E8BFF` →
  `#B08CFF`) used almost entirely as emitted light in the 3D scene.
- **Type** — one family. The stack prefers SF Pro where it exists and falls back
  gracefully. To self-host Inter instead, replace `--font-display` in
  `globals.css` and load it with `next/font/local`.
- **Scale** — fluid `clamp()` sizes (`text-display`, `text-headline`,
  `text-title`, `text-lede`) with tight display tracking.

## Structure

```
src/
├── app/                     layout, page composition, global CSS
├── components/
│   ├── three/
│   │   ├── SceneLayer.tsx   client-only dynamic import of the canvas
│   │   ├── Scene.tsx        canvas, drag controls, contact shadows
│   │   ├── AuraModel.tsx    the product + scroll choreography
│   │   └── Studio.tsx       Lightformer studio rig
│   ├── ui/                  Reveal, ProductVisual
│   ├── ScrollDriver.tsx     rAF scroll measurement
│   ├── Navbar / Hero / ScrollShowcase / SpecSection
│   └── ProductGrid / CallToAction / Footer
└── lib/
    ├── products.ts          product data
    └── scroll-store.ts      shared scroll state + range helpers
```

## Swapping in real content

- **Products** — edit `src/lib/products.ts`. `finish` and `form` drive the
  placeholder render.
- **A real 3D model** — drop a `.glb` in `public/`, load it with drei's
  `useGLTF`, and replace the meshes inside `AuraModel`'s `<group ref={shell}>`.
  The choreography above it is model-agnostic.
- **Copy** — the showcase chapters live in the `chapters` array at the top of
  `ScrollShowcase.tsx`; each has a `window` of `[fadeIn, holdStart, holdEnd,
  fadeOut]` as fractions of the section.

AURA is a fictional brand created for this prototype.
