import ceoImage from "@/assets/ceo.png";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            {/* Gold frame accent */}
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border border-gold/20 pointer-events-none z-0" />
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-gold/10 pointer-events-none z-0" />

            {/* CEO Photo */}
            <div className="relative z-10 overflow-hidden">
              <img
                src={ceoImage}
                alt="Olayemi Banjo — CEO, Immanuel Luxury Homes"
                loading="lazy"
                className="w-full max-w-md mx-auto object-cover shadow-elevated"
              />
              {/* Gold bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 gradient-gold h-1" />
            </div>

            {/* Name badge */}
            <div className="absolute bottom-8 right-4 lg:-right-8 bg-navy-surface border border-gold/30 px-6 py-4 shadow-elevated z-20">
              <p className="font-display text-xl font-semibold text-foreground">
                Olayemi Banjo
              </p>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mt-0.5">
                Chief Operating Officer - COO
              </p>
            </div>
          </div>

          {/* Text Column */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-divider" />
              <span className="font-body text-xs tracking-[0.35em] uppercase text-gold">
                Leadership
              </span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight">
              Meet the Visionary{" "}
              <span className="italic text-gold">Behind</span>
              <br />
              the Brand
            </h2>

            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 font-light">
              Olayemi Banjo is a seasoned Real Estate Executive, Consultant, and
              Project Manager (MBA) with deep expertise in Nigeria's most
              dynamic property market — Lagos. As CEO of Immanuel Luxury Homes,
              he has built a reputation for delivering uncompromising quality
              and trusted advisory to high-net-worth individuals and investors.
            </p>

            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10 font-light">
              With a portfolio spanning premium shortlets, exclusive agency
              services, investment consulting and full-service property
              management, Olayemi leads with a philosophy that luxury is not
              just about space — it's about the standard of life within it.
            </p>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { label: "Real Estate Executive" },
                { label: "Real Estate Consultant" },
                { label: "Project Manager (MBA)" },
                { label: "Lekki, Lagos Based" },
              ].map((cred) => (
                <div
                  key={cred.label}
                  className="flex items-center gap-2 font-body text-xs text-muted-foreground font-light"
                >
                  <span className="text-gold text-xs">◆</span>
                  {cred.label}
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/immanuelluxury_homes/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 gradient-gold text-primary-foreground font-body text-xs tracking-[0.15em] uppercase px-6 py-3 hover:opacity-90 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @immanuelluxury_homes
              </a>
              <a
                href="mailto:immanuelluxuryhomes@gmail.com"
                className="flex items-center gap-2 border border-gold/30 text-gold font-body text-xs tracking-[0.15em] uppercase px-6 py-3 hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
