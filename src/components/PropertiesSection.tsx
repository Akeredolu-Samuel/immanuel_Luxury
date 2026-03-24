import shortlet3bed from "@/assets/shortlet-3bed-ps5.png";
import shortlet2bed from "@/assets/shortlet-2bed-ikate.png";
import shortletOniru from "@/assets/shortlet-oniru-vi.png";
import forSaleLekki from "@/assets/for-sale-lekki.png";

const PHONE = "+2349079096419";
const WA_LINK = `https://wa.me/${PHONE.replace("+", "")}`;

const amenitiesOniru = [
  "Gated Estate", "Elevator", "Dedicated Car Park", "Internet",
  "Netflix & YouTube", "Housekeeping", "Hot Bath", "24/7 Power",
  "Modern Kitchen", "Washing Machine", "Microwave", "Security 24/7",
  "Beach Proximity",
];

const properties = [
  {
    img: forSaleLekki,
    tag: "For Sale",
    badge: "Now Selling",
    title: "3-Bedroom Apartment, Lekki",
    location: "Lekki Phase 1, Lagos",
    beds: 3,
    baths: 3,
    desc: "Spacious unit with large living room, 3 bedrooms + study, 3 baths / 4 toilets, and a modern kitchen. Prime location in Lekki Phase One.",
    amenities: null,
  },
  {
    img: shortletOniru,
    tag: "Shortlet",
    badge: null,
    title: "Serviced 1-Bedroom, Oniru",
    location: "Oniru, Victoria Island, Lagos",
    beds: 1,
    baths: 1,
    desc: "Fresh out! Neatly furnished & serviced apartment. Close to the beach. Disclaimer: Agency services, not direct ownership.",
    amenities: amenitiesOniru,
  },
  {
    img: shortlet3bed,
    tag: "Shortlet",
    badge: null,
    title: "Luxury 3-Bedroom with PS5",
    location: "Lekki Phase 1, Lagos",
    beds: 3,
    baths: 3,
    desc: "Available for reservations from 2 nights. Fully equipped with PS5 gaming console.",
    amenities: null,
  },
  {
    img: shortlet2bed,
    tag: "Shortlet / Rent",
    badge: null,
    title: "Sleek 2-Bedroom, Ikate Lekki",
    location: "Paradise Homes, Spear Road, Ikate Lekki",
    beds: 2,
    baths: 2,
    desc: "Modern finishes, 24/7 power supply, CCTV surveillance. Perfect for residential living or Airbnb hosting.",
    amenities: null,
  },
];

export default function PropertiesSection() {
  return (
    <section id="properties" className="py-28 bg-navy-surface">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="gold-divider" />
              <span className="font-body text-xs tracking-[0.35em] uppercase text-gold">
                Featured Properties
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
              Curated{" "}
              <span className="italic text-gold">Listings</span>
            </h2>
          </div>
          <p className="font-body text-sm text-muted-foreground max-w-sm font-light leading-relaxed">
            Handpicked premium properties in Lagos's most sought-after
            neighbourhoods.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {properties.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden bg-background border border-gold/10 hover:border-gold/40 transition-all duration-500 shadow-card hover:shadow-elevated flex flex-col"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-72">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                {/* Category tag */}
                <span className="absolute top-4 left-4 gradient-gold text-primary-foreground font-body text-xs tracking-[0.2em] uppercase px-3 py-1.5">
                  {p.tag}
                </span>
                {/* "Now Selling" badge */}
                {p.badge && (
                  <span className="absolute top-4 right-4 bg-destructive text-destructive-foreground font-body text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 animate-pulse">
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl font-medium text-foreground mb-1">
                  {p.title}
                </h3>
                <p className="font-body text-xs text-gold tracking-wider mb-3">
                  📍 {p.location}
                </p>
                {p.desc && (
                  <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                    {p.desc}
                  </p>
                )}
                {p.amenities && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.amenities.map((a) => (
                      <span
                        key={a}
                        className="font-body text-[10px] tracking-wide border border-gold/20 text-gold/70 px-2 py-0.5 rounded-sm"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-6 mb-6 mt-auto pt-3">
                  <span className="font-body text-xs text-muted-foreground">
                    🛏 {p.beds} Bed{p.beds > 1 ? "s" : ""}
                  </span>
                  <span className="font-body text-xs text-muted-foreground">
                    🚿 {p.baths} Bath{p.baths > 1 ? "s" : ""}
                  </span>
                </div>
                <a
                  href={`${WA_LINK}?text=${encodeURIComponent(`Hello Immanuel Luxury Homes, I am interested in the ${p.title} at ${p.location}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center border border-gold/30 text-gold font-body text-xs tracking-[0.15em] uppercase py-3 hover:gradient-gold hover:text-primary-foreground transition-all duration-300"
                >
                  Contact Us
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
