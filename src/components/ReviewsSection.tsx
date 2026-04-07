import { User, Star } from "lucide-react";

/**
 * Reviews matching the user's provided screenshots. 
 */
const REVIEWS = [
  {
    name: "Guest 1",
    text: "Thanks for allowing us to stay at your place at short notice. Enjoyed my time there!",
    rating: 5,
  },
  {
    name: "Guest 2",
    text: "I enjoyed my stay",
    rating: 5,
  },
  {
    name: "Guest 3",
    text: "Thanks for a very nice stay. i'm sure i'll be back sometime",
    rating: 5,
  },
  {
    name: "Guest 4",
    text: "Despite the issues encountered, we had a nice stay, thank you for always going over and above to make me comfortable. I appreciate it ",
    rating: 5,
  },
  {
    name: "Guest 5",
    text: "I wish i would have saw this sooner to accomodate my stay longer",
    rating: 5,
  },
  {
    name: "Guest 6",
    text: "Thank you for being a wonderful host, I loved every moment of my stay in C1 it is my home away from home. I apreciate you and your staff for quick response and action to my needs and request",
    rating: 5,
  },
  {
    name: "Guest 7",
    text: "Enjoyed my stay becauseof the facility i am staying in, it's so peaceful ",
    rating: 5,
  },
  {
    name: "Banjo's Guest",
    text: "Thanks Banjo. It was a quick trip. Everything was great. I enjoyed my stay",
    rating: 5,
  },
  {
    name: "Guest 8",
    text: "I wanted to personally thank you for the incredible insights you shared yesterday, your expertise is truly inspiring",
    rating: 5,
  },
  {
    name: "Mrs. Ronke",
    text: "The experience was 👍. Thank you for always making my stay memorable.",
    rating: 5,
  },
];

const ReviewsSection = () => {
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
