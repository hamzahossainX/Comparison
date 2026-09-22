const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Shop",
    links: ["AURA One", "AURA Air", "AURA Sound", "AURA Vision", "Accessories"],
  },
  {
    title: "Services",
    links: ["AURA Care+", "Trade In", "Financing", "Music", "Cloud"],
  },
  {
    title: "About AURA",
    links: ["Newsroom", "Careers", "Investors", "Ethics", "Environment"],
  },
  {
    title: "Support",
    links: ["Contact", "Warranty", "Repairs", "Order Status", "Community"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-coal">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="max-w-3xl text-xs leading-relaxed text-silver/70">
          AURA is a fictional concept brand created for design demonstration
          purposes. All products, prices, and features shown are placeholders.
          Prototype crafted with Next.js, Tailwind CSS, Framer Motion, and
          React Three Fiber.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-mist">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-xs text-silver/80 transition-colors hover:text-white hover:underline"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-silver md:flex-row md:items-center md:justify-between">
          <p>Copyright &copy; 2026 AURA Inc. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Legal", "Sitemap"].map((l) => (
              <a
                key={l}
                href="#"
                className="transition-colors hover:text-white hover:underline"
              >
                {l}
              </a>
            ))}
          </div>
          <p>United States</p>
        </div>
      </div>
    </footer>
  );
}
