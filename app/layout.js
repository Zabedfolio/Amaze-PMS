import { Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import LenisProvider from "../components/layout/LenisProvider";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProposalDrawer from "../components/layout/ProposalDrawer";
import "../styles/globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Amaze Property Management Solutions | Premium Facility Services",
  description: "Amaze PMS (a division of Action Group) delivers premium, in-house facility management, security, MEP engineering, and cleaning operations across India. Employing 15,000+ professionals.",
  keywords: "facility management, property management, MEP engineering, security services, STP operations, commercial property maintenance, action group, Hyderabad facilities",
  icons: {
    icon: "/images/favicon.png",
    shortcut: "/favicon.ico",
    apple: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const SUPPRESSED = [
                  "removeChild",
                  "NotFoundError",
                  "The node to be removed is not a child",
                ];
                
                function showConflictModal() {
                  if (document.getElementById("nav-conflict-modal")) return;

                  // Add style override to block Next.js dev error overlays
                  const style = document.createElement("style");
                  style.innerHTML = "nextjs-portal { display: none !important; }";
                  document.head.appendChild(style);

                  // Create reload overlay container in the DOM
                  const modal = document.createElement("div");
                  modal.id = "nav-conflict-modal";
                  modal.style.cssText = "position:fixed; inset:0; z-index:999999; display:flex; align-items:center; justify-content:center; background-color:rgba(0,0,0,0.75); backdrop-filter:blur(8px); padding:24px;";
                  
                  modal.innerHTML = \`
                    <div style="width: 100%; max-width: 400px; background: #111114; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 28px 24px; text-align: center; box-shadow: 0 30px 60px rgba(0,0,0,0.6); position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: 20px; font-family: var(--font-sans), Inter, system-ui, sans-serif;">
                      <div style="position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #FF5004, transparent);"></div>
                      
                      <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(255,80,4,0.1); border: 1px solid rgba(255,80,4,0.25); display: flex; align-items: center; justify-content: center; color: #FF5004; font-size: 20px; font-weight: bold;">
                        ⚠️
                      </div>
                      
                      <div style="display: flex; flex-direction: column; gap: 8px;">
                        <h3 style="margin: 0; font-size: 18px; font-weight: 800; color: #F5F5F7; letter-spacing: -0.01em; font-family: var(--font-display), Outfit, sans-serif;">
                          Navigation Conflict Detected
                        </h3>
                        <p style="margin: 0; font-size: 13.5px; color: #A1A1AA; line-height: 1.55;">
                          Google Translate or a browser extension modified the webpage structure, causing a layout unmount conflict.
                        </p>
                      </div>
                      
                      <button id="nav-conflict-reload" style="width: 100%; font-size: 14px; font-weight: 700; color: #0A0A0C; background: #FF5004; border: none; padding: 14px 16px; border-radius: 12px; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px; font-family: var(--font-sans), Inter, sans-serif; box-shadow: 0 4px 12px rgba(255,80,4,0.2);">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                          <path d="M3 3v5h5"/>
                          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                          <path d="M16 16h5v5"/>
                        </svg>
                        <span>Reload Page</span>
                      </button>
                    </div>
                  \`;

                  document.body.appendChild(modal);

                  const reloadBtn = document.getElementById("nav-conflict-reload");
                  if (reloadBtn) {
                    reloadBtn.onclick = function() {
                      window.location.reload();
                    };
                    reloadBtn.onmouseover = function() {
                      reloadBtn.style.background = "#FF6A28";
                      reloadBtn.style.boxShadow = "0 6px 18px rgba(255,80,4,0.35)";
                    };
                    reloadBtn.onmouseout = function() {
                      reloadBtn.style.background = "#FF5004";
                      reloadBtn.style.boxShadow = "0 4px 12px rgba(255,80,4,0.2)";
                    };
                  }
                }

                const checkSuppress = (msg) => {
                  if (SUPPRESSED.some((s) => msg.includes(s))) {
                    showConflictModal();
                    return true;
                  }
                  return false;
                };

                window.addEventListener("error", (event) => {
                  const msg = event?.error?.message || event?.message || "";
                  if (checkSuppress(msg)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  }
                }, true);

                window.addEventListener("unhandledrejection", (event) => {
                  const msg = event?.reason?.message || String(event?.reason || "");
                  if (checkSuppress(msg)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  }
                }, true);

                const originalConsoleError = console.error;
                console.error = function(...args) {
                  const msg = args.map((arg) => String(arg)).join(" ");
                  if (checkSuppress(msg)) {
                    return; // Swallowed
                  }
                  originalConsoleError.apply(console, args);
                };
              })();
            `,
          }}
        />
      </head>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <LenisProvider>
          <Navbar />
          <ProposalDrawer />
          <main style={{ flex: 1, paddingTop: "80px" }}>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#17171B",
                color: "#F5F5F7",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                fontFamily: "var(--font-sans)",
              },
            }}
          />
        </LenisProvider>
      </body>
    </html>
  );
}
