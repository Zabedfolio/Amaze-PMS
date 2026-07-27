# AI Coding Prompt — Amaze PMS Dark-Mode Redesign (Frontend-Only)

Paste this whole document into your AI coding assistant (Claude Code, Cursor, etc.) as the build spec. It's written so you can also hand pieces of it to the assistant page-by-page if you want to work incrementally.

**This is a frontend-only project.** There is no backend, no database, no real API. All content is driven from static JSON files in `/data`. Forms simulate submission (client-side validation → fake async delay → toast feedback → `console.log` the payload) so the UI/UX is fully demonstrable without any server.

---

## 0. Context (read first)

You are a **senior frontend engineer and UI designer**. Rebuild the marketing website for **Amaze Property Management Solutions Pvt Ltd (AMAZE PMS)**, currently at amazepms.com.

**What the business actually is** (keep this real — don't invent a SaaS product): Amaze is a facility/property management services company, a division of ACTION GROUP, founded in 2001 by Subhani Abdul, HQ in Cyberabad, Telangana, India. They provide **in-house, pan-India** services: Housekeeping, MEP (Mechanical, Electrical, Plumbing), Security, Pest Control, Gardening, STP & WTP (sewage/water treatment plant) operations, Parking Management, Swimming Pool Maintenance, Office Support Services, Deep Cleaning, and site audits for cost/power optimization. They employ 15,000+ professionals and serve 200+ clients across 20M+ sq ft of managed property.

**Your job**: keep this exact business purpose, but rebuild the site as a premium, dark-mode, animation-rich, modern web experience that would not look out of place next to Stripe, Apple, Vercel, or Framer's marketing sites — while remaining a believable B2B facility-management company site (not a startup SaaS pastiche).

---

## 1. Tech stack (mandatory)

- **Next.js 14+ (App Router)** + React 18 + JavaScript
- **SCSS Modules** for component styles + a small set of CSS variables for the design system (dark theme tokens)
- **Framer Motion** (motion.dev) — page transitions, in-view reveals, hover/tap micro-interactions
- **GSAP + ScrollTrigger** — scroll-driven animations, and specifically a **sticky card stack** section (pin the section, cards stack/scale/fade in as you scroll, one GSAP timeline per card triggered by scroll position)
- **Lenis** — smooth scroll wrapper around the whole app
- **AOS (Animate On Scroll)** — for simpler fade/slide-up reveals on lighter sections (use GSAP/Framer for anything that needs real choreography; don't mix AOS into the same element as GSAP)
- **Three.js** (`@react-three/fiber` + `@react-three/drei`) — optional subtle 3D element in the hero (e.g. an abstract animated wireframe building/particle field). Must lazy-load, must have a static fallback/poster for reduced-motion and low-end devices.
- **react-hot-toast** — all success/error feedback (form submissions, etc.)
- **A loading spinner component** — shown on form submit buttons and any async fetch state
- **Gravity UI Icons** (`@gravity-ui/icons`) as the primary icon set; fall back to `lucide-react` for anything Gravity UI doesn't cover
- **Recharts** (or Tremor charts) for the small stats/analytics visuals in the bento grid — treat "bklit ui" as "a charts/bar library"; Recharts is the safe, well-documented choice
- Native HTML `<form>` elements (not just onSubmit-only divs) with proper `name` attributes on every input, for the Contact and Careers forms — validate client-side, call `preventDefault()`, then **simulate** submission (no backend — see §2a "Mock form handling")
- Fully responsive: mobile-first SCSS, breakpoints at ~480 / 768 / 1024 / 1440
- **No backend, no database, no real API routes, no auth.** Deploy as a fully static export (`next export` / static-friendly App Router config) so it can be hosted on Vercel/Netlify with zero server cost.

## 2. Data layer — `/data/*.json` (ships with this prompt)

All page content comes from JSON files, imported directly into Server Components (no fetch needed since it's local/static). Seven files are provided alongside this prompt — copy them into `/data/` in the project root and document each data shape with lightweight JSDoc typedefs in `/lib/types.js` if helpful.

| File | Drives | Shape summary |
|---|---|---|
| `services.json` | Home sticky card stack + full `/services` page | Array of 10 service objects: `id`, `order`, `name`, `shortDescription`, `icon` (Gravity UI icon name), `stat {value,label}`, `gradient [color,color]`, `included` (array of strings), `cardImage` |
| `stats.json` | Home bento grid, About numbers strip, Recharts charts | `heroStats[]` (counter data), `growthChart` (sq ft over years), `clientGrowthChart` (clients over years), `serviceMix` (category % breakdown), `regionalPresence[]` (state/city + `isHQ` flag) |
| `clients.json` | `/clients` page + Home "trusted by" strip | `categories` array for filter tabs, `logos[]` (`id,name,category,logo`), `caseStudies[]` (`propertyName, category, sqft, servicesProvided` array of ids matching services.json, `outcome`, `image`) |
| `testimonials.json` | Home + `/clients` testimonial carousel | Array of `{id, quoteSummary, authorName, authorRole, propertyType, avatar}` — **note:** `quoteSummary` is paraphrased placeholder copy, not a verbatim quote; swap in real client quotes before launch |
| `careers.json` | `/careers` page | `benefits[]` (icon tiles), `departments` array (filter list), `openRoles[]` (`id,title,department,location,type,experience,description`) |
| `company.json` | `/about` page | Founder info, HQ, `milestones[]` (timeline), `values[]`, `differentiators` array |
| `navigation.json` | Navbar, Footer, form `<select>` options | `navLinks[]`, `ctaButton`, `footer` (columns + socials + legal), `serviceOptionsForForms[]`, `propertyTypeOptionsForForms[]` — **reuse these two option arrays** to populate the `<select>`/checkbox fields in the Contact and Careers forms so service names stay in sync everywhere |

**Placeholder data you must swap before real launch:** client logos (`clients.json`), case study copy, testimonial copy, growth-chart numbers in `stats.json`, and the open-roles list in `careers.json` are all realistic-but-invented placeholders built from Amaze's public company profile (founded 2001 by Subhani Abdul, HQ Cyberabad/Telangana, 15,000+ staff, 200+ clients, 20M+ sq ft). Everything else (service list, founder bio, milestones' early years, HQ location) reflects Amaze's actual public profile and can stay.

## 2a. Mock form handling (Contact & Careers)

Since there's no backend:

```js
// lib/mockSubmit.js
export async function mockSubmit(formData) {
  await new Promise((resolve) => setTimeout(resolve, 1200)); // simulate network delay
  console.log("Form submission (mock):", formData);
  // Simulate an occasional failure path for realistic UX/testing:
  if (Math.random() < 0.05) throw new Error("Mock submission failed");
  return { success: true };
}
```

Usage pattern in each form component:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  const formData = Object.fromEntries(new FormData(e.currentTarget));
  try {
    await mockSubmit(formData);
    toast.success("Thanks! We'll be in touch shortly.");
    e.currentTarget.reset();
  } catch {
    toast.error("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
```

Button shows the shared `<Spinner />` in place of its label while `loading` is true, and is `disabled` during submission.

## 3. Design system — Dark Mode

- **Background layers**: `--bg-base: #0A0A0C`, `--bg-elevated: #111114`, `--bg-card: #17171B` (subtle layering, not flat black)
- **Accent**: pick a single confident accent (e.g. amber/gold `#E8A94A` or electric teal `#3ED9C6`) tying back to "Amaze" — used sparingly for CTAs, active states, chart highlights, gradient glows
- **Text**: `--text-primary: #F5F5F7`, `--text-muted: #A1A1AA`
- **Typography**: one display/geometric sans for headings (e.g. Satoshi, General Sans, or Inter Tight), Inter for body. Large, confident hero type (clamp() fluid sizing), tight tracking on headings.
- **Glassmorphism**: frosted `backdrop-filter: blur()` cards on the navbar and on a few feature cards — used where it adds depth, not everywhere
- **Grid**: 12-col bento grid system for stats/services cards, mixed cell sizes (2x1, 1x1, 2x2)
- **Motion language**: soft ease-out entrances (0.6–0.9s), spring-based hover states (scale 1.02–1.04, subtle glow), scroll-linked parallax on hero media

## 4. Global structure

```
/app
  /page.jsx                 → Home
  /about/page.jsx
  /services/page.jsx
  /clients/page.jsx          (portfolio / case studies / client logos)
  /careers/page.jsx
  /contact/page.jsx
  /layout.jsx                → Lenis provider, Navbar, Footer, Toaster
/components
  /ui        (Button, Spinner, Badge, GlassCard, IconTile, BentoCell, Chart)
  /layout    (Navbar, Footer, MobileMenu)
  /sections  (Hero, StickyCardStack, BentoStats, ClientLogos, Testimonials, CTA, ContactForm, CareersForm)
  /three     (HeroScene.jsx — lazy loaded)
/lib
  /animations (gsap.js, motionVariants.js, lenis.js)
  /mockSubmit.js
  /types.js                 → optional JSDoc typedefs matching every file in /data
/data
  services.json, stats.json, clients.json, testimonials.json,
  careers.json, company.json, navigation.json
/styles
  /globals.scss, /_variables.scss, /_mixins.scss
```

Use **named, reusable components** — no copy-pasted section markup. Every card/tile/stat pulls from `/data/*.json` (see §2), not hardcoded JSX, so content is easy to edit without touching component code.

---

## 5. Page-by-page spec

### 5.1 Home (`/`)

1. **Navbar** — sticky, glassmorphic, transparent-over-hero → solid-on-scroll (Framer Motion `useScroll`). Logo, nav links, "Get a Quote" CTA button, hamburger → full-screen mobile menu with staggered link entrance.
2. **Hero**
   - Full-viewport, dark gradient background with the optional Three.js abstract 3D element (animated wireframe building or particle grid) sitting behind the headline, subtle parallax on scroll/mouse-move
   - Headline: something like "Facility Management, Reimagined" — animated word-by-word or line-by-line reveal (Framer Motion `staggerChildren`)
   - Subheadline, two CTAs ("Get a Quote", "Explore Services")
   - Scroll-cue indicator (animated, GSAP-driven bounce)
3. **Trusted-by strip** — auto-scrolling/marquee row of client logos (CSS animation or Framer `animate` loop), pause on hover
4. **Services — Sticky Card Stack** (the signature interactive section)
   - Pin this section with GSAP ScrollTrigger (`pin: true`)
   - 6 service cards (Housekeeping, MEP, Security, Pest Control, Gardening, STP & WTP / Parking / Pool as remaining cards) — each fills the viewport as you scroll, previous card scales down + dims and slides back, next card scales up from 0.9→1 and slides in on top, in a literal "stack" (each card `position: sticky; top: X` with an increasing `translateY`/`scale` transform driven by scroll progress)
   - Each card: large Gravity UI icon, service name, 2-line description, a small stat (e.g. "20M+ sq ft managed"), a subtle background gradient/pattern unique per card
   - Use one GSAP timeline per card scoped to its own ScrollTrigger instance (`scrub: true`) so movement tracks scroll 1:1
5. **Bento Grid — Stats & Capabilities**
   - Mixed-size grid: big cell with an animated counter (15,000+ professionals), a Recharts mini bar/line chart cell (e.g. sq. ft managed growth or client growth over years), a "PAN-India presence" cell with a simple animated dot-map or India outline, 2–3 smaller icon+text capability cells
   - Counters animate on scroll into view (Framer `useInView` + a `useCountUp` hook)
6. **Why Amaze / Process** — 3–4 step horizontal or vertical timeline with AOS fade/slide reveals, connecting line that draws in via GSAP as you scroll (`strokeDashoffset` trick)
7. **Testimonials** — glass cards in a horizontal auto-scroll or drag-to-scroll carousel (Framer Motion `drag="x"`)
8. **CTA banner** — full-width gradient/glow section, "Ready to elevate your property?" + button, subtle animated background (moving gradient or noise/particles)
9. **Footer** (shared across pages, see §5.6)

### 5.2 About (`/about`)

- Hero: shorter, company story headline + founder mention (Subhani Abdul, 2001, ex-Indian Navy, Certified Security Practitioner) as a pull-quote block
- Timeline/milestones (2001 founding → growth milestones → today) — vertical scroll-driven timeline, GSAP ScrollTrigger progress line
- Leadership/founder card — portrait placeholder, glass card, socials
- Values/Mission bento grid (Quality, Compliance, Training, Safety Standards — from the source content)
- Numbers strip reused from home (professionals, clients, sq ft) with different chart framing
- CTA banner (shared component)

### 5.3 Services (`/services`)

- Hero: "Comprehensive, In-House Facility Solutions"
- Full detailed list, NOT just the stacked cards from home — this page fully expands each service:
  Housekeeping, MEP, Security, Pest Control, Gardening, STP & WTP, Parking Management, Swimming Pool Maintenance, Office Support Services, Deep Cleaning
- Layout: alternating left/right image+text rows (Framer Motion slide-in-from-side, alternating direction), each with an icon, bullet list of what's included, and a small "request this service" inline link that deep-links to the Contact form with the service pre-selected (`?service=housekeeping`)
- An accordion ("What's included") for granular sub-services per category — animate height with Framer Motion `AnimatePresence` + `layout`
- CTA banner

### 5.4 Clients / Portfolio (`/clients`)

- Hero: "Trusted Across 200+ Properties"
- Filterable logo grid (category tabs: Corporate / Residential / Retail / Industrial) — animate filter transitions with Framer Motion `layout` + `AnimatePresence`
- Featured case-study bento cards (2–3 larger cards: property name, sq ft, services provided, a short outcome blurb) — hover reveals more detail via a glass overlay
- Map or region breakdown (reuse the PAN-India visual from the bento grid) showing regional presence

### 5.5 Careers (`/careers`)

- Hero: "Join 15,000+ Professionals"
- Bento grid of culture/benefits (Training, Safety-first, Growth, Compliance culture)
- Open roles list (accordion or card list) — static/mock data array, filter by department
- **Careers `<form>`** (native form tag), fields with `name` attributes:
  - `name="fullName"`, `name="email"`, `name="phone"`, `name="position"` (select), `name="experience"`, `name="currentLocation"`, `name="resume"` (file input), `name="message"`
  - Submit → shows spinner in button → `react-hot-toast` success/error → resets form
- Validate required fields client-side before submit (simple, no heavy lib needed — or use `zod` + `react-hook-form` if you want stronger typing)

### 5.6 Contact (`/contact`) + shared Footer

- Hero: "Let's Talk Property Management"
- Two-column layout: contact info / office locations (glass cards) + the **Contact `<form>`**:
  - `name="fullName"`, `name="companyName"`, `name="email"`, `name="phone"`, `name="propertyType"` (select), `name="propertySize"`, `name="serviceInterest"` (multi-select or checkboxes: Housekeeping/MEP/Security/etc.), `name="message"`
  - Same spinner + toast pattern as careers form
  - Honeypot field for spam protection (hidden `name="company_website"` field, reject if filled)
- Embed a simple map placeholder (styled div is fine, or a lightweight map lib) for the Cyberabad HQ
- **Footer** (global, rendered from `layout.jsx`): logo + tagline, sitemap columns (Company / Services / Careers / Contact), social icons (Gravity UI icon set), newsletter input (native form, `name="email"`), legal line, all on the dark background with a subtle top gradient border

---

## 6. Animation implementation notes

- Wrap the whole app in a `<LenisProvider>` (client component) that instantiates Lenis once and syncs its `scroll` event with `ScrollTrigger.update()` so GSAP and Lenis don't fight each other.
- Respect `prefers-reduced-motion`: gate GSAP/Framer heavy animations behind a media-query check; fall back to simple opacity fades and disable the Three.js scene entirely.
- Load GSAP plugins and Three.js scene with `next/dynamic` (`ssr: false`) to keep initial bundle light.
- Keep all scroll-triggered GSAP instances cleaned up in `useEffect` return functions (`ScrollTrigger.getAll().forEach(t => t.kill())` on unmount) to avoid duplicate triggers on route change (App Router keeps components mounted differently than Pages Router — test this carefully).

## 7. Performance & code quality

- `next/image` for all images, explicit width/height or `fill` + proper `sizes`
- Font loading via `next/font` (no FOUT)
- Code-split heavy sections (sticky card stack, Three.js hero, charts) with dynamic imports + suspense/spinner fallback
- Lighthouse targets: Performance 90+, Accessibility 95+, SEO 95+
- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<footer>`), alt text on all images, focus states visible even in dark mode, form labels tied to inputs via `htmlFor`/`id` (not just placeholders)
- ESLint + Prettier configured; use `jsconfig.json` path aliases for clean imports

## 8. Deliverables checklist (matches the hiring assignment)

- [ ] GitHub repo, clean commit history
- [ ] Live deploy on Vercel (static export — no server/env vars needed)
- [ ] README: setup steps, tech stack rationale, folder structure explanation, animation approach notes, and a short note that forms are mocked client-side (no backend) with instructions on where to wire a real API later
- [ ] `/data/*.json` included in the repo with a one-line comment at the top of the README on which fields are placeholder vs. real company info
- [ ] (Optional) Figma file for the design system + key screens
- [ ] Credit/list any stock imagery or icon packs used

---

### How to use this doc

1. Drop the seven JSON files (`services.json`, `stats.json`, `clients.json`, `testimonials.json`, `careers.json`, `company.json`, `navigation.json`) into `/data` in your new project.
2. Paste this whole document into your coding assistant as the system/task prompt.
3. Work top-to-bottom: scaffold the Next.js project + design tokens first, build shared UI components (Button, Spinner, GlassCard, BentoCell) second, document `/lib/types.js` JSDoc typedefs against the JSON shapes if helpful, then build page-by-page starting with Home. Get the sticky card stack working in isolation (feed it `services.json` directly) before wiring it into the full page — it's the trickiest interactive piece.
4. Wire the Contact and Careers forms last, using `mockSubmit.js` (§2a) so the whole flow — validation → spinner → toast — works without any backend.
