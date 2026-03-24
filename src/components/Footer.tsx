import logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-gold/10">
      {/* Top line */}
      <div className="gradient-gold h-0.5" />

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={logo}
                alt="Immanuel Luxury Homes"
                loading="lazy"
                className="h-12 w-12 object-contain rounded-sm bg-white p-1"
              />
              <div>
                <p className="font-display text-lg font-semibold text-foreground">
                  Immanuel LUXURY HOMES
                </p>
                <p className="font-body text-xs tracking-[0.2em] uppercase text-gold">
                  Real Estate Services
                </p>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground font-light leading-relaxed max-w-sm">
              Premier real estate services in Lagos, Nigeria. Specialising in
              luxury property management, exclusive agency, investment
              consulting, shortlets, and project management.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/immanuelluxury_homes/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="mailto:immanuelluxuryhomes@gmail.com"
                className="w-9 h-9 border border-gold/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300"
                aria-label="Email"
              >
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                "Property Management",
                "Agency",
                "Investment Consulting",
                "Shortlets",
                "Project Management",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="font-body text-sm text-muted-foreground hover:text-gold transition-colors font-light"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-6">
              Contact
            </h4>
            <ul className="space-y-3 font-body text-sm text-muted-foreground font-light">
              <li>Water Corporation Drive</li>
              <li>Lekki, Lagos, Nigeria</li>
              <li className="pt-2">
                <a
                  href="mailto:immanuelluxuryhomes@gmail.com"
                  className="hover:text-gold transition-colors"
                >
                  immanuelluxuryhomes@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/immanuelluxury_homes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  @immanuelluxury_homes
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gold/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground font-light">
            © {new Date().getFullYear()} Immanuel Luxury Homes. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground font-light">
            CEO: <span className="text-gold">Olayemi Duke</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
