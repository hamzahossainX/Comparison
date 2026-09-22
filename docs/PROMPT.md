# The Prompt

Every build in this repository was generated from a single prompt, issued once, with no
follow-up turns and no clarifying questions. The prompt is reproduced verbatim below so the
comparison can be reproduced or re-run against other models.

---

## v1 — the prompt as issued

> You are an expert frontend developer and UI/UX designer. I need you to build a complete,
> premium, and highly interactive portfolio website for a 3D artist. Use Next.js, TypeScript,
> Tailwind CSS, and Framer Motion for smooth animations, and integrate React Three Fiber
> (Three.js) for 3D elements.
>
> The design must be dark-themed, sleek, minimalist, and highly immersive—similar to an
> Awwwards-winning site. Include the following sections:
>
> 1. **Hero Section:** Full-screen with an interactive 3D object/background, bold modern
>    typography, and a clear call to action.
> 2. **Portfolio Gallery:** A dynamic grid or masonry layout showcasing 3D renders with
>    sophisticated hover effects and smooth transitions.
> 3. **About Section:** A clean layout detailing the artist's background and software expertise
>    (e.g., Blender, Maya, ZBrush).
> 4. **Contact Section:** A minimalist, functional contact form with links to social profiles.
>
> Use placeholder images, placeholder 3D models, and dummy text where necessary. Ensure the
> application is fully responsive and uses modern glassmorphism or brutalist UI accents where
> appropriate.
>
> **CRUCIAL INSTRUCTION:** Do not ask me any clarifying questions, do not ask for my
> preferences, and do not prompt me for missing information. Make expert executive decisions on
> all design and technical aspects based on what constitutes a premium 3D portfolio, and output
> the production-ready code immediately.

---

## What actually came back

All three models produced a dark-or-light **product showcase for a fictional audio brand**
rather than a 3D artist's portfolio with Portfolio / About / Contact sections. None of the three
shipped a contact form, an about section, or a gallery of an artist's work.

That the divergence is *unanimous* is the interesting part. It points at the prompt rather than
at any one model: "premium, immersive, 3D, dark, Awwwards-winning" is a much louder signal than
"portfolio for a 3D artist", and the strongest training examples of that aesthetic are product
launch pages — Apple, Bang & Olufsen, Teenage Engineering. Asked for a vibe and a structure at
the same time, all three optimised for the vibe.

Because the divergence is identical across all three, it does not separate them, and the
comparison in the [main README](../README.md) is scored on the parts of the brief that do:
the mandated stack, the dark immersive aesthetic, the interactive 3D hero, hover and transition
craft, responsiveness, and the glassmorphism/brutalist accent.

---

## v2 — refined

The rewrite below fixes what v1 left ambiguous. Changes and why:

| Change | Reason |
| --- | --- |
| Subject stated once, up front, and repeated in the section list | v1 named the subject once in sentence one, then spent three paragraphs on aesthetics. The subject got drowned out. |
| Sections marked **required**, with explicit failure conditions | v1 said "include the following sections" — read as a suggestion. Naming the failure condition makes omission unambiguous. |
| Content requirements per section | "Portfolio Gallery" alone left the *contents* undefined. Saying "9–12 fictional project cards" removes the guesswork. |
| "Not a product launch page" stated as a negative constraint | The single highest-value line. It closes off the attractor all three models fell into. |
| Aesthetic moved after structure, and capped | Structure first, mood second — so the mood modifies the structure instead of replacing it. |
| Stack pinned with versions | v1's "Next.js" produced 14.x from two models and Vite from a third. |
| Acceptance checklist appended | Gives the model something to self-verify against before emitting code. |

> You are an expert frontend developer and UI/UX designer.
>
> Build a complete, production-ready **personal portfolio website for a fictional freelance 3D
> artist**. This is a portfolio that showcases *an individual's body of work* and sells *their
> services*. It is explicitly **not** a product launch page, not an e-commerce storefront, and
> has no cart, no pricing, and no "Buy" button.
>
> **Stack (required, no substitutions):** Next.js 14+ App Router, TypeScript in strict mode,
> Tailwind CSS, Framer Motion, and React Three Fiber / Three.js.
>
> **Required sections — omitting any one is a failed response:**
>
> 1. **Hero** — full-screen. An interactive 3D object the visitor can manipulate directly
>    (drag to rotate, or cursor-reactive). The artist's name, their discipline, and one clear
>    primary CTA.
> 2. **Portfolio Gallery** — 9–12 fictional project cards in a masonry or asymmetric grid, each
>    with a title, a year, a medium, and a distinct hover treatment. Placeholder imagery is fine.
> 3. **About** — the artist's biography plus a software-proficiency display covering Blender,
>    Maya, ZBrush, Houdini, and Substance Painter, with a visual indication of skill level.
> 4. **Contact** — a working contact form (name, email, message) with client-side validation,
>    visible error and success states, plus links to ArtStation, Instagram and LinkedIn.
>
> **Art direction:** dark-themed, sleek, minimalist, immersive — Awwwards-caliber. Use
> glassmorphism or brutalist accents. Motion should be choreographed and purposeful, never
> decorative fade-ins on every element.
>
> **Engineering requirements:** fully responsive from 320px up; honour
> `prefers-reduced-motion`; visible `focus-visible` states on every interactive element;
> semantic landmarks; meaningful alt text; and memoised Three.js geometries and materials so
> nothing is reallocated per frame.
>
> **Before you output, verify:** all four sections present · contact form validates · 3D is
> directly interactive · works at 320px · reduced-motion respected.
>
> **CRUCIAL:** Do not ask clarifying questions and do not prompt for missing information. Make
> expert executive decisions on everything unspecified and output the complete, production-ready
> code immediately.
