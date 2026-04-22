import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const PHONE = "+2349079096419";
const WA_LINK = `https://wa.me/${PHONE.replace("+", "")}`;

export default function PropertiesSection() {
  const { properties } = useAdmin();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 1 },
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo  = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="properties" className="py-28 bg-navy-surface">
      <div className="container mx-auto px-6">

        {/* ── Header row with arrows ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
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

          {/* Right: description + arrow buttons */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="font-body text-sm text-muted-foreground max-w-sm font-light leading-relaxed md:text-right">
              Handpicked premium properties in Lagos's most sought-after
              neighbourhoods.
            </p>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                id="properties-prev-btn"
                onClick={scrollPrev}
                aria-label="Previous property"
                className={`w-10 h-10 border flex items-center justify-center transition-all duration-200
                  ${canScrollPrev
                    ? "border-gold/40 text-gold hover:gradient-gold hover:text-primary-foreground hover:border-transparent"
                    : "border-gold/15 text-muted-foreground/30 cursor-not-allowed"
                  }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                id="properties-next-btn"
                onClick={scrollNext}
                aria-label="Next property"
                className={`w-10 h-10 border flex items-center justify-center transition-all duration-200
                  ${canScrollNext
                    ? "border-gold/40 text-gold hover:gradient-gold hover:text-primary-foreground hover:border-transparent"
                    : "border-gold/15 text-muted-foreground/30 cursor-not-allowed"
                  }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {properties.map((p) => (
              <div
                key={p.id ?? p.title}
                /* Show 1 card on mobile, 2 on tablet, 3 on desktop, 4 on XL */
                className="group relative overflow-hidden bg-background border border-gold/10
                  hover:border-gold/40 transition-all duration-500 shadow-card hover:shadow-elevated
                  flex flex-col shrink-0
                  w-[85vw] sm:w-[48%] lg:w-[31%] xl:w-[23%]"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-72">
                  {p.img ? (
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
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
                  <p className="font-body text-xs text-gold tracking-wider mb-1">
                    📍 {p.location}
                  </p>
                  {p.price && (
                    <p className="font-body text-xs text-muted-foreground mb-2">
                      💰 {p.price}
                    </p>
                  )}
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
                    href={`${WA_LINK}?text=${encodeURIComponent(
                      `Hello Immanuel Luxury Homes, I am interested in the ${p.title} at ${p.location}.`
                    )}`}
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

        {/* ── Dot indicators ── */}
        {properties.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {properties.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-0.5 transition-all duration-300 rounded-full ${
                  i === selectedIndex
                    ? "w-8 gradient-gold"
                    : "w-3 bg-gold/20 hover:bg-gold/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
