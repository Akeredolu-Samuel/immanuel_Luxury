import { Building2, TrendingUp, Home, Key, HardHat } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Property Management",
    subtitle: "Full-Service Oversight",
    items: [
      "Full service oversight of your properties",
      "Tenant screening & placement",
      "Maintenance coordination",
      "Regular inspection reports",
      "Rent collection & remittance",
    ],
  },
  {
    icon: Key,
    title: "Agency",
    subtitle: "Exclusive Listings",
    items: [
      "Professional buying, selling & leasing",
      "Access to exclusive listings",
      "Expert negotiation on your behalf",
      "Seamless transaction management",
      "Market analysis & advisory",
    ],
  },
  {
    icon: TrendingUp,
    title: "Investment Consulting",
    subtitle: "Strategic Advisory",
    items: [
      "Strategic advice for maximum ROI",
      "Property valuation & due diligence",
      "Investment strategy development",
      "Portfolio optimization",
      "Risk assessment & reporting",
    ],
  },
  {
    icon: Home,
    title: "Shortlets",
    subtitle: "Premium Apartments",
    items: [
      "Fully furnished premium apartments",
      "Short & medium-term rentals",
      "Concierge & hospitality services",
      "Flexible booking options",
      "Professional housekeeping",
    ],
  },
  {
    icon: HardHat,
    title: "Project Management",
    subtitle: "End-to-End Delivery",
    items: [
      "Development oversight & coordination",
      "Contractor & vendor management",
      "Budget control & reporting",
      "Timeline & milestone tracking",
      "Quality assurance inspections",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-28 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-divider" />
            <span className="font-body text-xs tracking-[0.35em] uppercase text-gold">
              Premium Solutions
            </span>
            <div className="gold-divider" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            What We <span className="text-gold italic">Offer</span>
          </h2>
          <p className="font-body text-muted-foreground text-sm tracking-wide max-w-lg mx-auto font-light">
            A comprehensive suite of luxury real estate services — crafted
            for discerning clients who expect nothing but the finest.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-navy-surface border border-gold/10 p-8 hover:border-gold/40 transition-all duration-500 hover:shadow-gold relative overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-r-[48px] border-t-transparent border-r-gold/10 group-hover:border-r-gold/30 transition-colors duration-500" />
                </div>

                {/* Icon */}
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center mb-6 group-hover:border-gold/60 transition-colors duration-300">
                  <Icon
                    className="w-5 h-5 text-gold group-hover:text-gold-bright transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <p className="font-body text-xs tracking-[0.2em] uppercase text-gold mb-1">
                  {service.subtitle}
                </p>
                <h3 className="font-display text-2xl font-medium text-foreground mb-5">
                  {service.title}
                </h3>

                {/* Divider */}
                <div className="gold-divider mb-5 group-hover:w-full transition-all duration-700" />

                {/* Items */}
                <ul className="space-y-2.5 mb-8">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 font-body text-sm text-muted-foreground font-light"
                    >
                      <span className="text-gold mt-0.5 text-xs">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Service Contact Link */}
                <a
                  href={`https://wa.me/2349079096419?text=${encodeURIComponent(`Hello Immanuel Luxury Homes, I am interested in your ${service.title} services.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-bright transition-colors duration-300 flex items-center gap-2 group/link mt-auto"
                >
                  Contact Us <span className="text-lg transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </a>
              </div>
            );
          })}

          {/* Contact CTA card */}
          <div className="gradient-gold p-8 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <p className="font-body text-xs tracking-[0.25em] uppercase text-primary-foreground/70 mb-3">
                Ready to begin?
              </p>
              <h3 className="font-display text-3xl font-semibold text-primary-foreground leading-tight mb-4">
                Speak With a Luxury Advisor
              </h3>
              <p className="font-body text-sm text-primary-foreground/80 font-light leading-relaxed">
                Let us help you find, manage, or invest in the perfect property.
                Our team is ready.
              </p>
            </div>
            <a
              href="https://wa.me/2349079096419?text=Hello%20Immanuel%20Luxury%20Homes,%20I%20am%20interested%20in%20speaking%20with%20a%20luxury%20advisor."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block bg-primary-foreground text-gold font-body text-xs tracking-[0.2em] uppercase font-semibold px-8 py-4 hover:bg-opacity-90 transition-all duration-300 text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
