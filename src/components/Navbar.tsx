import { useState, useEffect } from "react";
import logo from "@/assets/logo.jpg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-navy-surface/95 backdrop-blur-md shadow-card border-b border-gold/10"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Immanuel Luxury Homes"
            className="h-12 w-12 object-contain rounded-sm bg-white p-1"
          />
          <div className="hidden sm:block">
            <p className="font-display text-lg font-semibold text-foreground leading-tight">
              Immanuel
            </p>
            <p className="font-body text-xs tracking-[0.2em] text-gold uppercase">
              LUXURY HOMES
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="nav-link-luxury font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://wa.me/2349079096419"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 gradient-gold text-primary-foreground font-body text-xs tracking-[0.15em] uppercase font-medium px-6 py-2.5 transition-all duration-300 hover:opacity-90 hover:shadow-gold"
        >
          Contact Us
        </a>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gold transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-surface/98 backdrop-blur-md border-t border-gold/10 px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/2349079096419"
            target="_blank"
            rel="noopener noreferrer"
            className="gradient-gold text-primary-foreground font-body text-xs tracking-[0.15em] uppercase font-medium px-6 py-3 text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
