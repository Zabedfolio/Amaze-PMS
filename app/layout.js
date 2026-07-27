import { Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import LenisProvider from "../components/layout/LenisProvider";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import GlobalErrorSuppressor from "../components/layout/GlobalErrorSuppressor";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <LenisProvider>
          <GlobalErrorSuppressor />
          <Navbar />
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
