"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = ["Store", "Vision", "Sound", "Accessories", "Support"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/[0.06] bg-ink/60 backdrop-blur-2xl">
        <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between px-5">
          <a href="#" className="text-[15px] font-semibold tracking-tight text-white">
            AURA<span className="text-[#2997ff]">.</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-xs text-silver/90 transition-colors duration-300 hover:text-white"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <button
              aria-label="Search"
              className="text-silver transition-colors hover:text-white"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            <button
              aria-label="Shopping bag"
              className="relative text-silver transition-colors hover:text-white"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 7h12l1 14H5L6 7Z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#2997ff] text-[9px] font-semibold text-white">
                2
              </span>
            </button>

            <button
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-4 w-5 flex-col justify-between md:hidden"
            >
              <span
                className={`h-px bg-white transition-transform duration-300 ${
                  open ? "translate-y-[7.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px bg-white transition-opacity duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-px bg-white transition-transform duration-300 ${
                  open ? "-translate-y-[7.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/[0.06] md:hidden"
            >
              <ul className="space-y-1 px-6 py-4">
                {LINKS.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="block py-2 text-lg font-medium text-mist/90"
                      onClick={() => setOpen(false)}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
