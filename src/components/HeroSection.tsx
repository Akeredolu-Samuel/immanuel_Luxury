import heroProperty from "@/assets/hero-property.jpg";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={heroProperty}
        alt="Luxury property in Lekki, Lagos"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      {/* Gold line top */}
      <div className="absolute top-0 left-0 right-0 h-0.5 gradient-gold opacity-60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pb-24 pt-40">
        <div className="max-w-3xl">
          {/* Overline */}
          <div className="flex items-center gap-4 mb-6 animate-fade-up-delay-1">
            <div className="gold-divider" />
            <span className="font-body text-xs tracking-[0.35em] uppercase text-gold">
              Water Corporation Drive, Lekki · Lagos
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-light leading-[1.05] text-foreground mb-6 animate-fade-up-delay-2">
            Where{" "}
            <em className="text-shimmer not-italic">Luxury</em>
            <br />
            Meets{" "}
            <span className="font-medium">Home.</span>
          </h1>

          {/* Sub */}
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10 animate-fade-up-delay-3 font-light tracking-wide">
            Premium real estate services in Lagos's most coveted addresses.
            Property management, exclusive listings & investment consulting —
            curated for discerning clients.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-4">
            <a
              href="#services"
              className="gradient-gold text-primary-foreground font-body text-sm tracking-[0.15em] uppercase font-medium px-8 py-4 hover:opacity-90 transition-all duration-300 hover:shadow-gold text-center"
            >
              Explore Our Services
            </a>
            <a
              href="https://wa.me/2349079096419?text=Hello%20Immanuel%20Luxury%20Homes,%20I%20am%20interested%20in%20booking%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold/40 text-gold font-body text-sm tracking-[0.15em] uppercase font-medium px-8 py-4 hover:border-gold hover:bg-gold/10 transition-all duration-300 text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 bg-navy-surface/90 backdrop-blur-sm border-t border-gold/10">
        <div className="container mx-auto px-6 py-5 grid grid-cols-3 divide-x divide-gold/10">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "100+", label: "Properties Managed" },
            { value: "3", label: "Core Services" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-2">
              <span className="font-display text-2xl md:text-3xl font-semibold text-gold">
                {stat.value}
              </span>
              <span className="font-body text-xs tracking-widest uppercase text-muted-foreground mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
