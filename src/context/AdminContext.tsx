import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// ─── Static imports (Vite resolves these to hashed URLs) ────────────────────
import shortlet3bed from "@/assets/shortlet-3bed-ps5.png";
import shortlet2bed from "@/assets/shortlet-2bed-ikate.png";
import shortletOniru from "@/assets/shortlet-oniru-vi.png";
import forSaleLekki from "@/assets/for-sale-lekki.png";

// ─── Types ──────────────────────────────────────────────────────────────────
export interface Property {
  id: string;
  img: string; // base64 data-URL or vite asset URL
  tag: string;
  badge: string | null;
  title: string;
  location: string;
  beds: number;
  baths: number;
  desc: string;
  amenities: string[] | null;
  price?: string; // optional price string e.g. "₦85M"
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

// ─── Seed Data ───────────────────────────────────────────────────────────────
const SEED_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    img: forSaleLekki,
    tag: "For Sale",
    badge: "Now Selling",
    title: "3-Bedroom Apartment, Lekki",
    location: "Lekki Phase 1, Lagos",
    beds: 3,
    baths: 3,
    desc: "Spacious unit with large living room, 3 bedrooms + study, 3 baths / 4 toilets, and a modern kitchen. Prime location in Lekki Phase One.",
    amenities: null,
    price: "",
  },
  {
    id: "prop-2",
    img: shortletOniru,
    tag: "Shortlet",
    badge: null,
    title: "Serviced 1-Bedroom, Oniru",
    location: "Oniru, Victoria Island, Lagos",
    beds: 1,
    baths: 1,
    desc: "Fresh out! Neatly furnished & serviced apartment. Close to the beach. Disclaimer: Agency services, not direct ownership.",
    amenities: [
      "Gated Estate", "Elevator", "Dedicated Car Park", "Internet",
      "Netflix & YouTube", "Housekeeping", "Hot Bath", "24/7 Power",
      "Modern Kitchen", "Washing Machine", "Microwave", "Security 24/7",
      "Beach Proximity",
    ],
    price: "",
  },
  {
    id: "prop-3",
    img: shortlet3bed,
    tag: "Shortlet",
    badge: null,
    title: "Luxury 3-Bedroom with PS5",
    location: "Lekki Phase 1, Lagos",
    beds: 3,
    baths: 3,
    desc: "Available for reservations from 2 nights. Fully equipped with PS5 gaming console.",
    amenities: null,
    price: "",
  },
  {
    id: "prop-4",
    img: shortlet2bed,
    tag: "Shortlet / Rent",
    badge: null,
    title: "Sleek 2-Bedroom, Ikate Lekki",
    location: "Paradise Homes, Spear Road, Ikate Lekki",
    beds: 2,
    baths: 2,
    desc: "Modern finishes, 24/7 power supply, CCTV surveillance. Perfect for residential living or Airbnb hosting.",
    amenities: null,
    price: "",
  },
];

const SEED_REVIEWS: Review[] = [
  { id: "rev-1", name: "Guest 1", text: "Thanks for allowing us to stay at your place at short notice. Enjoyed my time there!", rating: 5 },
  { id: "rev-2", name: "Guest 2", text: "I enjoyed my stay", rating: 5 },
  { id: "rev-3", name: "Guest 3", text: "Thanks for a very nice stay. i'm sure i'll be back sometime", rating: 5 },
  { id: "rev-4", name: "Guest 4", text: "Despite the issues encountered, we had a nice stay, thank you for always going over and above to make me comfortable. I appreciate it", rating: 5 },
  { id: "rev-5", name: "Guest 5", text: "I wish i would have saw this sooner to accomodate my stay longer", rating: 5 },
  { id: "rev-6", name: "Guest 6", text: "Thank you for being a wonderful host, I loved every moment of my stay in C1 it is my home away from home. I apreciate you and your staff for quick response and action to my needs and request", rating: 5 },
  { id: "rev-7", name: "Guest 7", text: "Enjoyed my stay becauseof the facility i am staying in, it's so peaceful", rating: 5 },
  { id: "rev-8", name: "Banjo's Guest", text: "Thanks Banjo. It was a quick trip. Everything was great. I enjoyed my stay", rating: 5 },
  { id: "rev-9", name: "Guest 8", text: "I wanted to personally thank you for the incredible insights you shared yesterday, your expertise is truly inspiring", rating: 5 },
  { id: "rev-10", name: "Mrs. Ronke", text: "The experience was 👍. Thank you for always making my stay memorable.", rating: 5 },
];

// ─── Storage helpers ─────────────────────────────────────────────────────────
const KEYS = {
  properties: "ilh_properties",
  reviews: "ilh_reviews",
  auth: "ilh_admin_auth",
  seeded: "ilh_seeded",
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

// ─── Image compression util ───────────────────────────────────────────────────
export function compressImage(file: File, maxPx = 1200, quality = 0.78): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(maxPx / Math.max(img.width, img.height), 1);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  });
}

// ─── Admin password (read from env or fallback) ──────────────────────────────────
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "immanuel2024";

// ─── Context ──────────────────────────────────────────────────────────────────
interface AdminContextType {
  properties: Property[];
  reviews: Review[];
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  addProperty: (p: Omit<Property, "id">) => void;
  updateProperty: (p: Property) => void;
  deleteProperty: (id: string) => void;
  reorderProperties: (from: number, to: number) => void;
  addReview: (r: Omit<Review, "id">) => void;
  updateReview: (r: Review) => void;
  deleteReview: (id: string) => void;
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  // Seed on very first load so default data is visible immediately
  const [properties, setProperties] = useState<Property[]>(() => {
    const seeded = localStorage.getItem(KEYS.seeded);
    if (!seeded) {
      // First time: pre-populate with seed data
      localStorage.setItem(KEYS.properties, JSON.stringify(SEED_PROPERTIES));
      localStorage.setItem(KEYS.reviews, JSON.stringify(SEED_REVIEWS));
      localStorage.setItem(KEYS.seeded, "true");
      return SEED_PROPERTIES;
    }
    return load(KEYS.properties, SEED_PROPERTIES);
  });

  const [reviews, setReviews] = useState<Review[]>(() =>
    load(KEYS.reviews, SEED_REVIEWS)
  );

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem(KEYS.auth) === "true"
  );

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(KEYS.properties, JSON.stringify(properties));
    } catch {
      console.warn("Storage full — images may be too large.");
    }
  }, [properties]);

  useEffect(() => {
    try {
      localStorage.setItem(KEYS.reviews, JSON.stringify(reviews));
    } catch {
      console.warn("Storage full.");
    }
  }, [reviews]);

  // ── Auth ──
  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem(KEYS.auth, "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(KEYS.auth);
  };

  // ── Property CRUD ──
  const addProperty = (p: Omit<Property, "id">) =>
    setProperties((prev) => [...prev, { ...p, id: `prop-${Date.now()}` }]);

  const updateProperty = (p: Property) =>
    setProperties((prev) => prev.map((x) => (x.id === p.id ? p : x)));

  const deleteProperty = (id: string) =>
    setProperties((prev) => prev.filter((x) => x.id !== id));

  const reorderProperties = (from: number, to: number) => {
    setProperties((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  // ── Review CRUD ──
  const addReview = (r: Omit<Review, "id">) =>
    setReviews((prev) => [...prev, { ...r, id: `rev-${Date.now()}` }]);

  const updateReview = (r: Review) =>
    setReviews((prev) => prev.map((x) => (x.id === r.id ? r : x)));

  const deleteReview = (id: string) =>
    setReviews((prev) => prev.filter((x) => x.id !== id));

  const resetToDefaults = () => {
    setProperties(SEED_PROPERTIES);
    setReviews(SEED_REVIEWS);
  };

  return (
    <AdminContext.Provider
      value={{
        properties, reviews, isAuthenticated,
        login, logout,
        addProperty, updateProperty, deleteProperty, reorderProperties,
        addReview, updateReview, deleteReview,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
