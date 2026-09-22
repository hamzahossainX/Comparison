const columns = [
  {
    title: 'Shop',
    links: ['AURA One', 'AURA Mini', 'AURA Bar', 'AURA Buds', 'Accessories'],
  },
  {
    title: 'Learn',
    links: ['Room sensing', 'Placement guide', 'Firmware notes', 'Measurements'],
  },
  {
    title: 'Support',
    links: ['Track an order', 'Returns', 'Replace a driver', 'Contact us'],
  },
  {
    title: 'Company',
    links: ['About', 'Materials', 'Repairability', 'Careers'],
  },
];

export default function Footer() {
  return (
    <footer id="support" className="relative z-10 border-t border-white/10 bg-void">
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[13px] font-semibold text-white/90">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#shop"
                      className="text-[13px] text-white/50 transition-colors duration-300 hover:text-white/90"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-relaxed text-white/40">
            Prices shown in USD and exclude tax. AURA is a fictional brand built for this
            prototype.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {['Privacy', 'Terms', 'Accessibility', 'Sitemap'].map((item) => (
              <a
                key={item}
                href="#support"
                className="text-[12px] text-white/45 transition-colors duration-300 hover:text-white/85"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
