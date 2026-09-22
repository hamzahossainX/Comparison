export type Chapter = {
  index: string;
  title: string;
  body: string;
  accent: string;
};

export type Product = {
  id: string;
  name: string;
  kicker: string;
  tagline: string;
  price: number;
  accent: string;
};

export const CHAPTERS: Chapter[] = [
  {
    index: "01 — DESIGN",
    title: "Sculpted from light.",
    body: "A seamless unibody, precision-milled from a single billet of aerospace ceramic. No seams. No screws. No compromise.",
    accent: "#7c8cf8",
  },
  {
    index: "02 — PERFORMANCE",
    title: "Silent power.",
    body: "The A9 Neural engine renders worlds in real time while staying whisper-quiet, thanks to a vapor chamber carved into the frame.",
    accent: "#34d399",
  },
  {
    index: "03 — BATTERY",
    title: "All day. Every day.",
    body: "36 hours of continuous use. Charges to 80% in 20 minutes. The battery you will simply forget about.",
    accent: "#f472b6",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "aura-one",
    name: "AURA One",
    kicker: "Flagship",
    tagline: "The flagship. Nothing comes close.",
    price: 1299,
    accent: "#7c8cf8",
  },
  {
    id: "aura-air",
    name: "AURA Air",
    kicker: "Ultra-light",
    tagline: "Featherweight. Heavyweight performance.",
    price: 899,
    accent: "#34d399",
  },
  {
    id: "aura-sound",
    name: "AURA Sound",
    kicker: "Spatial audio",
    tagline: "Spatial audio that wraps around you.",
    price: 549,
    accent: "#f472b6",
  },
  {
    id: "aura-vision",
    name: "AURA Vision",
    kicker: "Immersive",
    tagline: "See beyond the screen.",
    price: 1899,
    accent: "#fbbf24",
  },
];
