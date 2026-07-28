# Amaze Property Management Solutions (Amaze PMS)

> **Enterprise Integrated Facility Management & Asset Preservation Platform**

[![Live Demo](https://img.shields.io/badge/Live_Demo-amaze--pms--beta.vercel.app-FF5004?style=for-the-badge&logo=vercel&logoColor=white)](https://amaze-pms-beta.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

---

🌐 **Live Website**: [https://amaze-pms-beta.vercel.app/](https://amaze-pms-beta.vercel.app/)

---

## 📌 Executive Overview

**Amaze Property Management Solutions (Amaze PMS)** is an enterprise-grade web application built for India’s premier self-performing property management and integrated facility management (IFM) company. Managing over 25M+ sq. ft. across 50+ commercial towers, IT parks, industrial complexes, and residential communities, Amaze PMS provides end-to-end operational governance, MEP engineering, manpower staffing, and compliance-driven asset preservation.

This web application combines a high-performance **Next.js 16 (App Router)** architecture with immersive **Three.js WebGL 3D visualizers**, smooth micro-interactions, responsive analytics dashboards, and an integrated RFP & Audit scheduling system.

---

## ✨ Key Features & Highlights

### 🏢 1. Interactive 3D Real Estate Visualizers
- **Procedural City Grid Scene (`HeroScene`)**: Built with `@react-three/fiber` and `@react-three/fiber`, featuring dynamic wireframe towers, orbiting vehicle light trails, pulsing beacon beacons, and adaptive camera controls.
- **Global Operations Globe (`GlobeScene`)**: A 3D animated wireframe sphere visualizing regional hubs across New Delhi, Hyderabad, Bengaluru, and Mumbai.
- **404 Portal (`NotFoundScene`)**: An interactive 3D torus knot particle portal handling invalid routes seamlessly under `/_not-found`.

### 📅 2. Integrated Proposal & Audit Scheduler Drawer
- **Unified Slide-out Drawer**: Dual-mode interactive modal offering:
  - **Request Proposal (RFP)**: Multi-step service selection (IFM, MEP, Security, Housekeeping, Greenery), asset metrics, and contact details.
  - **Book Audit**: Consultant calendar widget for scheduling physical or virtual site audits with instant step progression.
- **Background Scroll Lock & Lenis Sync**: Prevents page scroll leak and ensures mobile touch swiping works natively via `data-lenis-prevent` touch isolation.

### 📊 3. Operations Analytics & Sector Breakdowns
- **Recharts Data Visualization**: Interactive glassmorphic pie and area charts displaying asset distribution across Commercial IT Parks, Industrial Plants, Pharma Facilities, and Luxury Residential.
- **Animated Counter Stats**: Dynamic viewport-triggered counter metrics tracking total managed area (25M+ Sq. Ft.), active workforce (3,500+), and compliance score (100%).

### 📑 4. Filterable Enterprise Property Directory
- **Multi-Sector Filtering**: Interactive directory spanning 50+ managed assets with real-time category filtering.
- **Staggered Text Cascade**: Motion-driven text entrance animations powered by Framer Motion (`blur(3px) -> blur(0px)` + staggered child delays).
- **Micro-Hover Feedback**: Interactive hover shifts with glowing brand orange index markers.

### 📱 5. Mobile & Tablet UX Optimization
- **Responsive Header Actions**: Visible `Book Audit` action button on mobile/tablet viewports outside the navigation menu.
- **Touch-Optimized Drawer**: Integrated 2-column Call (`tel:`) & Email (`mailto:`) quick action buttons within the hamburger menu.
- **Auto-Hiding Floating Widgets**: Fixed call/email floating buttons automatically hide when the mobile drawer opens to prevent UI overlap.

### 🔍 6. Enterprise SEO & Rich Metadata
- **OpenGraph & Twitter Cards**: Full social sharing preview metadata configured in `layout.js`.
- **JSON-LD Schema Markup**: Embedded `Organization` and `LocalBusiness` structured schema supporting Google Rich Snippets.

---

## 🛠️ Technology Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v3.4](https://tailwindcss.com/) |
| **3D Graphics** | [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei) |
| **Animations** | [Framer Motion v12](https://www.framer.com/motion/), [GSAP v3](https://gsap.com/) |
| **Smooth Scrolling**| [Lenis Scroll v1.3](https://lenis.darkroom.engineering/) |
| **Data Viz** | [Recharts v3](https://recharts.org/) |
| **Icons & Notifications** | [Lucide React](https://lucide.dev/), [React Hot Toast](https://react-hot-toast.com/) |

---

## 📂 Project Structure

```
Dacitos/
├── app/                        # Next.js 16 App Router Pages & Routes
│   ├── about/                  # Leadership, Company Heritage & Governance
│   ├── careers/                # Job Openings & Application Portal
│   ├── clients/                # Client Properties Directory & Impact Case Studies
│   ├── compliance/             # Statutory PF, ESI, Minimum Wages Compliance
│   ├── contact/                # Redirect Route (Triggers Proposal Drawer)
│   ├── privacy/                # Privacy Policy
│   ├── recruitment/            # Manpower Sourcing & Staffing Solutions
│   ├── services/               # Full IFM, MEP, Security & Deep Cleaning Catalog
│   ├── terms/                  # Terms & Conditions
│   ├── layout.js               # Global Root Layout (SEO, JSON-LD, Lenis, Drawer)
│   ├── not-found.jsx           # Custom 3D 404 Viewport
│   └── page.jsx                # Homepage (Hero 3D, Bento Stats, Services Overview)
├── components/
│   ├── layout/                 # Navbar, Footer, ProposalDrawer, RouteLoader
│   ├── sections/               # Hero, BentoStats, ServicesOverview, ClientLogos, CTABanner
│   ├── three/                  # HeroScene, GlobeScene, TimelineParticles, NotFoundScene, CanvasErrorBoundary
│   └── ui/                     # Button, GlassCard, SectionHeader, SchedulingWidget, AnimatedCounter
├── data/                       # JSON Data Schemas (navigation.json, services.json, clients.json, stats.json)
├── public/                     # Static Assets, Logos & Service Demonstration Imagery
├── package.json                # Project Dependencies & Scripts
├── next.config.js              # Next.js Configuration
├── tailwind.config.js          # Tailwind CSS Theme Tokens & Custom Colors (#FF5004)
└── README.md                   # Project Documentation
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Clone the Repository
```bash
git clone https://github.com/your-org/dacitos.git
cd dacitos
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
To create an optimized production build:
```bash
npm run build
```

To run the production server locally:
```bash
npm run start
```

---

## 🌐 Live Deployment

The application is deployed on **Vercel** with automatic continuous deployment (CD) enabled:

👉 **Live URL**: [https://amaze-pms-beta.vercel.app/](https://amaze-pms-beta.vercel.app/)

---

## 📄 License & Contact

**Copyright © 2026 Amaze Property Management Solutions.**  
All rights reserved. Proprietary commercial software.

- **Website**: [https://amaze-pms-beta.vercel.app/](https://amaze-pms-beta.vercel.app/)
- **Inquiries**: `info@amazepms.com` | `operations@amazepms.com`
- **Phone**: `+91 99887 76655` | `+91 40 4567 8900`
