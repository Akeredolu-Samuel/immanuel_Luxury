import { User, Star } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const ReviewsSection = () => {
  const { reviews: REVIEWS } = useAdmin();
  // We duplicate the reviews array to create a seamless infinite scroll effect
  const repeatedReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section id="reviews" className="py-20 bg-muted/30 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12 text-center">
        <span className="text-sm font-medium tracking-wider text-gold uppercase mb-2 block">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-foreground">
          What Our Guests Say
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't just take our word for it—read real experiences from guests who have enjoyed their stay with us.
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Gradient overlays to smooth edges */}
        <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background flex-none z-10 hidden md:block"></div>
        <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background flex-none z-10 hidden md:block"></div>

        <div className="flex w-max animate-scroll gap-6 hover:[animation-play-state:paused] pb-4 px-4 md:px-0">
          {repeatedReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-6 w-[320px] md:w-[400px] shrink-0 flex flex-col shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "text-gold fill-gold" : "text-muted"
                      }`}
                  />
                ))}
              </div>
              <p className="text-foreground italic mb-6 flex-grow leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center font-semibold">
                  <User size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{review.name}</h4>
                  <p className="text-xs text-muted-foreground">Guest</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
