import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAdmin,
  compressImage,
  type Property,
  type Review,
} from "@/context/AdminContext";
import {
  Plus, Pencil, Trash2, LogOut, Star, X, Upload, Home,
  MessageSquare, ChevronLeft, ChevronRight, ImagePlus, RotateCcw,
  Eye,
} from "lucide-react";

// ─── Guard: redirect to login if not authenticated ───────────────────────────
function useAuthGuard() {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/admin", { replace: true });
  }, [isAuthenticated, navigate]);
}

// ─── Image Upload Component ───────────────────────────────────────────────────
function ImageUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [compressing, setCompressing] = useState(false);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setCompressing(true);
    const url = await compressImage(file);
    onChange(url);
    setCompressing(false);
  };

  return (
    <div className="space-y-2">
      <label className="block font-body text-xs tracking-[0.18em] uppercase text-muted-foreground">
        Property Image
      </label>

      {/* Drop zone / preview */}
      <div
        className={`relative border-2 border-dashed rounded-sm transition-colors duration-200 cursor-pointer
          ${dragging ? "border-gold bg-gold/5" : "border-gold/20 hover:border-gold/40"}`}
        style={{ minHeight: "180px" }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={async (e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) await processFile(file);
        }}
      >
        {value ? (
          <>
            <img
              src={value}
              alt="Property preview"
              className="w-full h-44 object-cover rounded-sm"
            />
            <div className="absolute inset-0 bg-background/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-sm">
              <ImagePlus className="text-gold w-6 h-6" />
              <span className="font-body text-xs text-gold tracking-wider">
                Change Image
              </span>
            </div>
          </>
        ) : (
          <div className="h-44 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            {compressing ? (
              <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gold/40" />
                <p className="font-body text-xs tracking-wide text-center px-4">
                  Click or drag an image here
                </p>
                <p className="font-body text-[10px] text-muted-foreground/50">
                  JPG, PNG, WEBP — auto compressed
                </p>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) await processFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

// ─── Star Rating Picker ───────────────────────────────────────────────────────
function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
        >
          <Star
            className={`w-5 h-5 transition-colors duration-100 ${
              n <= (hovered || value) ? "text-gold fill-gold" : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Form Input / Textarea helpers ────────────────────────────────────────────
const inputCls =
  "w-full bg-background border border-gold/20 focus:border-gold/50 text-foreground font-body text-sm px-3 py-2.5 outline-none transition-colors duration-150 placeholder:text-muted-foreground/40";

function Field({
  label, id, children,
}: { label: string; id?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block font-body text-xs tracking-[0.18em] uppercase text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Modal Backdrop ───────────────────────────────────────────────────────────
function Modal({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "hsl(214 57% 4% / 0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-xl bg-card border border-gold/20 shadow-elevated max-h-[90vh] overflow-y-auto relative"
        style={{ boxShadow: "0 40px 80px hsl(214 57% 4% / 0.9)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10 sticky top-0 bg-card z-10">
          <h2 className="font-display text-xl text-foreground">{title}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-gold transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ─── Property Form ────────────────────────────────────────────────────────────
const TAGS = ["For Sale", "Shortlet", "Rent", "Shortlet / Rent", "Joint Venture", "Off-Plan"];

type PropertyFormData = Omit<Property, "id">;

const emptyProperty: PropertyFormData = {
  img: "",
  tag: "Shortlet",
  badge: null,
  title: "",
  location: "",
  beds: 1,
  baths: 1,
  desc: "",
  amenities: null,
  price: "",
};

function PropertyModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: Property;
  onSave: (p: PropertyFormData) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PropertyFormData>(
    initial ? { img: initial.img, tag: initial.tag, badge: initial.badge, title: initial.title, location: initial.location, beds: initial.beds, baths: initial.baths, desc: initial.desc, amenities: initial.amenities, price: initial.price ?? "" }
      : emptyProperty
  );
  const [amenitiesText, setAmenitiesText] = useState(
    initial?.amenities?.join(", ") ?? ""
  );

  const set = <K extends keyof PropertyFormData>(k: K, v: PropertyFormData[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amenities = amenitiesText.trim()
      ? amenitiesText.split(",").map((s) => s.trim()).filter(Boolean)
      : null;
    onSave({ ...form, amenities });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Image */}
      <ImageUpload value={form.img} onChange={(v) => set("img", v)} />

      {/* Title */}
      <Field label="Property Title" id="p-title">
        <input
          id="p-title"
          required
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Luxury 3-Bedroom, Lekki"
          className={inputCls}
        />
      </Field>

      {/* Location */}
      <Field label="Location" id="p-loc">
        <input
          id="p-loc"
          required
          value={form.location}
          onChange={(e) => set("location", e.target.value)}
          placeholder="e.g. Lekki Phase 1, Lagos"
          className={inputCls}
        />
      </Field>

      {/* Tag + Price row */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category Tag" id="p-tag">
          <select
            id="p-tag"
            value={form.tag}
            onChange={(e) => set("tag", e.target.value)}
            className={inputCls}
          >
            {TAGS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field label="Price (optional)" id="p-price">
          <input
            id="p-price"
            value={form.price ?? ""}
            onChange={(e) => set("price", e.target.value)}
            placeholder="e.g. ₦85M / ₦150k/night"
            className={inputCls}
          />
        </Field>
      </div>

      {/* Beds + Baths row */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Bedrooms" id="p-beds">
          <input
            id="p-beds"
            type="number"
            min={1}
            max={20}
            value={form.beds}
            onChange={(e) => set("beds", Number(e.target.value))}
            className={inputCls}
          />
        </Field>
        <Field label="Bathrooms" id="p-baths">
          <input
            id="p-baths"
            type="number"
            min={1}
            max={20}
            value={form.baths}
            onChange={(e) => set("baths", Number(e.target.value))}
            className={inputCls}
          />
        </Field>
      </div>

      {/* Description */}
      <Field label="Description" id="p-desc">
        <textarea
          id="p-desc"
          required
          rows={3}
          value={form.desc}
          onChange={(e) => set("desc", e.target.value)}
          placeholder="Describe the property…"
          className={`${inputCls} resize-none`}
        />
      </Field>

      {/* Badge */}
      <Field label="Badge (optional — e.g. 'Now Selling')" id="p-badge">
        <input
          id="p-badge"
          value={form.badge ?? ""}
          onChange={(e) => set("badge", e.target.value || null)}
          placeholder="Leave blank for none"
          className={inputCls}
        />
      </Field>

      {/* Amenities */}
      <Field label="Amenities (comma-separated, optional)" id="p-amenities">
        <textarea
          id="p-amenities"
          rows={2}
          value={amenitiesText}
          onChange={(e) => setAmenitiesText(e.target.value)}
          placeholder="e.g. Pool, Gym, 24/7 Power, Smart TV"
          className={`${inputCls} resize-none`}
        />
      </Field>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gold/20 text-muted-foreground font-body text-xs tracking-[0.15em] uppercase py-3 hover:border-gold/40 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          id={initial ? "save-property-btn" : "add-property-btn"}
          className="flex-1 gradient-gold text-primary-foreground font-body text-xs tracking-[0.15em] uppercase py-3 hover:opacity-90 transition-opacity"
        >
          {initial ? "Save Changes" : "Add Property"}
        </button>
      </div>
    </form>
  );
}

// ─── Review Form ──────────────────────────────────────────────────────────────
function ReviewModal({
  initial,
  onSave,
  onClose,
}: {
  initial?: Review;
  onSave: (r: Omit<Review, "id">) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [text, setText] = useState(initial?.text ?? "");
  const [rating, setRating] = useState(initial?.rating ?? 5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, text, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Guest Name" id="r-name">
        <input
          id="r-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Mrs. Adaeze"
          className={inputCls}
        />
      </Field>

      <Field label="Review Text" id="r-text">
        <textarea
          id="r-text"
          required
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What the guest said…"
          className={`${inputCls} resize-none`}
        />
      </Field>

      <Field label="Rating">
        <StarPicker value={rating} onChange={setRating} />
      </Field>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gold/20 text-muted-foreground font-body text-xs tracking-[0.15em] uppercase py-3 hover:border-gold/40 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          id={initial ? "save-review-btn" : "add-review-btn"}
          className="flex-1 gradient-gold text-primary-foreground font-body text-xs tracking-[0.15em] uppercase py-3 hover:opacity-90 transition-opacity"
        >
          {initial ? "Save Changes" : "Add Review"}
        </button>
      </div>
    </form>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────
function DeleteConfirmModal({
  label,
  onConfirm,
  onClose,
}: {
  label: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose} title="Confirm Delete">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
          <Trash2 className="w-7 h-7 text-destructive" />
        </div>
        <div>
          <p className="font-body text-sm text-foreground">
            Are you sure you want to delete
          </p>
          <p className="font-display text-lg text-gold mt-1">"{label}"</p>
          <p className="font-body text-xs text-muted-foreground mt-2">
            This cannot be undone.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gold/20 text-muted-foreground font-body text-xs tracking-[0.15em] uppercase py-3 hover:border-gold/40 transition-colors"
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 bg-destructive text-destructive-foreground font-body text-xs tracking-[0.15em] uppercase py-3 hover:opacity-90 transition-opacity"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

// ─── Properties Tab ───────────────────────────────────────────────────────────
function PropertiesTab() {
  const { properties, addProperty, updateProperty, deleteProperty, reorderProperties } = useAdmin();
  const [addModal, setAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Property | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Property | null>(null);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-2xl text-foreground">Properties</h3>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            {properties.length} listing{properties.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          id="open-add-property-btn"
          onClick={() => setAddModal(true)}
          className="flex items-center gap-2 gradient-gold text-primary-foreground font-body text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          Add Property
        </button>
      </div>

      {/* Grid */}
      {properties.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Home className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-body text-sm">No properties yet. Add one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {properties.map((p, idx) => (
            <div
              key={p.id}
              className="bg-background border border-gold/10 hover:border-gold/30 transition-all duration-300 group overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <ImagePlus className="text-muted-foreground/30 w-8 h-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <span className="absolute top-3 left-3 gradient-gold text-primary-foreground font-body text-[10px] tracking-wider uppercase px-2.5 py-1">
                  {p.tag}
                </span>
                {p.badge && (
                  <span className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-body text-[10px] tracking-wider uppercase px-2 py-1">
                    {p.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h4 className="font-display text-base text-foreground truncate">{p.title}</h4>
                <p className="font-body text-xs text-gold mt-0.5 truncate">📍 {p.location}</p>
                {p.price && (
                  <p className="font-body text-xs text-muted-foreground mt-1">💰 {p.price}</p>
                )}
                <p className="font-body text-xs text-muted-foreground mt-1">
                  🛏 {p.beds} Bed{p.beds > 1 ? "s" : ""} &nbsp;·&nbsp; 🚿 {p.baths} Bath{p.baths > 1 ? "s" : ""}
                </p>

                {/* Controls */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gold/10">
                  {/* Reorder buttons */}
                  <button
                    title="Move left"
                    disabled={idx === 0}
                    onClick={() => reorderProperties(idx, idx - 1)}
                    className="p-1.5 text-muted-foreground hover:text-gold disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    title="Move right"
                    disabled={idx === properties.length - 1}
                    onClick={() => reorderProperties(idx, idx + 1)}
                    className="p-1.5 text-muted-foreground hover:text-gold disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>

                  <div className="flex-1" />

                  <button
                    id={`edit-property-${p.id}`}
                    onClick={() => setEditTarget(p)}
                    className="flex items-center gap-1.5 border border-gold/20 text-gold font-body text-[10px] tracking-wider uppercase px-3 py-1.5 hover:bg-gold/10 transition-colors"
                  >
                    <Pencil size={12} />
                    Edit
                  </button>
                  <button
                    id={`delete-property-${p.id}`}
                    onClick={() => setDeleteTarget(p)}
                    className="flex items-center gap-1.5 border border-destructive/30 text-destructive font-body text-[10px] tracking-wider uppercase px-3 py-1.5 hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {addModal && (
        <Modal title="Add New Property" onClose={() => setAddModal(false)}>
          <PropertyModal
            onSave={(p) => { addProperty(p); setAddModal(false); }}
            onClose={() => setAddModal(false)}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editTarget && (
        <Modal title="Edit Property" onClose={() => setEditTarget(null)}>
          <PropertyModal
            initial={editTarget}
            onSave={(p) => { updateProperty({ ...p, id: editTarget.id }); setEditTarget(null); }}
            onClose={() => setEditTarget(null)}
          />
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <DeleteConfirmModal
          label={deleteTarget.title}
          onConfirm={() => deleteProperty(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

// ─── Reviews Tab ──────────────────────────────────────────────────────────────
function ReviewsTab() {
  const { reviews, addReview, updateReview, deleteReview } = useAdmin();
  const [addModal, setAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Review | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display text-2xl text-foreground">Reviews</h3>
          <p className="font-body text-xs text-muted-foreground mt-0.5">
            {reviews.length} testimonial{reviews.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          id="open-add-review-btn"
          onClick={() => setAddModal(true)}
          className="flex items-center gap-2 gradient-gold text-primary-foreground font-body text-xs tracking-[0.2em] uppercase px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          <Plus size={15} />
          Add Review
        </button>
      </div>

      {/* List */}
      {reviews.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-body text-sm">No reviews yet. Add one!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-background border border-gold/10 hover:border-gold/25 p-4 transition-all duration-200 flex flex-col sm:flex-row sm:items-start gap-4"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <span className="font-display text-gold text-sm font-medium">
                  {r.name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-display text-sm text-foreground">{r.name}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`w-3 h-3 ${n <= r.rating ? "text-gold fill-gold" : "text-muted"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-body text-xs text-muted-foreground leading-relaxed italic">
                  "{r.text}"
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  id={`edit-review-${r.id}`}
                  onClick={() => setEditTarget(r)}
                  className="flex items-center gap-1.5 border border-gold/20 text-gold font-body text-[10px] tracking-wider uppercase px-3 py-1.5 hover:bg-gold/10 transition-colors"
                >
                  <Pencil size={11} />
                  Edit
                </button>
                <button
                  id={`delete-review-${r.id}`}
                  onClick={() => setDeleteTarget(r)}
                  className="flex items-center gap-1.5 border border-destructive/30 text-destructive font-body text-[10px] tracking-wider uppercase px-3 py-1.5 hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {addModal && (
        <Modal title="Add New Review" onClose={() => setAddModal(false)}>
          <ReviewModal
            onSave={(r) => { addReview(r); setAddModal(false); }}
            onClose={() => setAddModal(false)}
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editTarget && (
        <Modal title="Edit Review" onClose={() => setEditTarget(null)}>
          <ReviewModal
            initial={editTarget}
            onSave={(r) => { updateReview({ ...r, id: editTarget.id }); setEditTarget(null); }}
            onClose={() => setEditTarget(null)}
          />
        </Modal>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <DeleteConfirmModal
          label={`${deleteTarget.name}'s review`}
          onConfirm={() => deleteReview(deleteTarget.id)}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
type Tab = "properties" | "reviews";

export default function AdminDashboard() {
  useAuthGuard();
  const { logout, resetToDefaults, properties, reviews } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("properties");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div
      className="min-h-screen bg-background"
      style={{
        background:
          "radial-gradient(ellipse 120% 50% at 50% -10%, hsl(40 48% 56% / 0.06) 0%, transparent 60%), hsl(214 57% 11%)",
      }}
    >
      {/* ── Top bar ── */}
      <header className="border-b border-gold/10 bg-card/60 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-5 h-16 flex items-center justify-between">
          {/* Branding */}
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: "var(--gradient-gold)" }}
            >
              <Home className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-display text-sm text-foreground leading-tight">
                Immanuel Luxury Homes
              </p>
              <p className="font-body text-[10px] text-gold tracking-[0.2em] uppercase">
                Admin Dashboard
              </p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 font-body text-xs text-muted-foreground hover:text-gold transition-colors tracking-wide"
            >
              <Eye size={13} />
              View Site
            </a>
            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 border border-gold/20 text-muted-foreground hover:text-gold hover:border-gold/40 font-body text-xs tracking-[0.15em] uppercase px-4 py-2 transition-colors duration-200"
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Stats bar ── */}
      <div className="border-b border-gold/5 bg-card/30">
        <div className="container mx-auto px-5 py-4 flex gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-gold/10 flex items-center justify-center">
              <Home className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-body text-xs text-muted-foreground">Properties</p>
              <p className="font-display text-xl text-foreground">{properties.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-gold/10 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-gold" />
            </div>
            <div>
              <p className="font-body text-xs text-muted-foreground">Reviews</p>
              <p className="font-display text-xl text-foreground">{reviews.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="container mx-auto px-5">
        <div className="flex gap-0 border-b border-gold/10 mt-6">
          {(["properties", "reviews"] as Tab[]).map((t) => (
            <button
              key={t}
              id={`tab-${t}`}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase px-6 py-3 border-b-2 transition-all duration-200 ${
                tab === t
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "properties" ? <Home size={13} /> : <MessageSquare size={13} />}
              {t}
            </button>
          ))}

          {/* Reset button far right */}
          <div className="ml-auto flex items-center pb-1">
            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 font-body text-[10px] tracking-wider uppercase text-muted-foreground/50 hover:text-destructive transition-colors px-3 py-2"
              title="Reset all data back to site defaults"
            >
              <RotateCcw size={11} />
              Reset Defaults
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="py-8">
          {tab === "properties" ? <PropertiesTab /> : <ReviewsTab />}
        </div>
      </div>

      {/* Reset confirm */}
      {showResetConfirm && (
        <DeleteConfirmModal
          label="all properties and reviews (reset to defaults)"
          onConfirm={resetToDefaults}
          onClose={() => setShowResetConfirm(false)}
        />
      )}
    </div>
  );
}
