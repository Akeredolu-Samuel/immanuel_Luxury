import { useState } from "react";
import { MapPin, Mail, Instagram, Phone } from "lucide-react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link
    const subject = encodeURIComponent(`Enquiry from ${form.name} — ${form.service || "General"}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService Interest: ${form.service}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:immanuelluxuryhomes@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <section id="contact" className="py-28 bg-navy-surface">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="gold-divider" />
            <span className="font-body text-xs tracking-[0.35em] uppercase text-gold">
              Get in Touch
            </span>
            <div className="gold-divider" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Begin Your{" "}
            <span className="italic text-gold">Luxury</span> Journey
          </h2>
          <p className="font-body text-sm text-muted-foreground font-light max-w-md mx-auto">
            Reach out to our team and we'll respond promptly with expert advice
            tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info Panel */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="bg-background border border-gold/10 p-8 flex flex-col gap-6">
              <h3 className="font-display text-2xl font-medium text-foreground">
                Contact Details
              </h3>
              <div className="gold-divider" />

              {[
                {
                  Icon: MapPin,
                  label: "Address",
                  value: "Water Corporation Drive, Lekki, Lagos, Nigeria",
                },
                {
                  Icon: Mail,
                  label: "Email",
                  value: "immanuelluxuryhomes@gmail.com",
                  href: "mailto:immanuelluxuryhomes@gmail.com",
                },
                {
                  Icon: Instagram,
                  label: "Instagram",
                  value: "@immanuelluxury_homes",
                  href: "https://www.instagram.com/immanuelluxury_homes/",
                },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-body text-xs tracking-widest uppercase text-gold mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-muted-foreground hover:text-gold transition-colors font-light"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-muted-foreground font-light">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/2349079096419"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 gradient-gold text-primary-foreground font-body text-sm tracking-[0.15em] uppercase font-medium py-5 hover:opacity-90 transition-all duration-300 hover:shadow-gold"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-background border border-gold/10 p-8">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mb-6">
                  <span className="text-gold text-2xl">✓</span>
                </div>
                <h3 className="font-display text-3xl text-foreground mb-3">
                  Message Sent
                </h3>
                <p className="font-body text-sm text-muted-foreground font-light">
                  Thank you for reaching out. Our team will get back to you
                  shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h3 className="font-display text-2xl font-medium text-foreground mb-2">
                  Send an Enquiry
                </h3>
                <div className="gold-divider mb-2" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs tracking-widest uppercase text-gold">
                      Full Name
                    </label>
                    <input
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="bg-navy-surface border border-gold/20 text-foreground font-body text-sm placeholder:text-muted-foreground/50 px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors font-light"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs tracking-widest uppercase text-gold">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="bg-navy-surface border border-gold/20 text-foreground font-body text-sm placeholder:text-muted-foreground/50 px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs tracking-widest uppercase text-gold">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234..."
                      className="bg-navy-surface border border-gold/20 text-foreground font-body text-sm placeholder:text-muted-foreground/50 px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors font-light"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-body text-xs tracking-widest uppercase text-gold">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="bg-navy-surface border border-gold/20 text-foreground font-body text-sm px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors font-light"
                    >
                      <option value="">Select a service</option>
                      <option>Property Management</option>
                      <option>Agency (Buy/Sell/Lease)</option>
                      <option>Investment Consulting</option>
                      <option>Shortlets</option>
                      <option>Project Management</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-xs tracking-widest uppercase text-gold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    className="bg-navy-surface border border-gold/20 text-foreground font-body text-sm placeholder:text-muted-foreground/50 px-4 py-3 focus:outline-none focus:border-gold/60 transition-colors resize-none font-light"
                  />
                </div>

                <button
                  type="submit"
                  className="gradient-gold text-primary-foreground font-body text-sm tracking-[0.15em] uppercase font-medium py-4 hover:opacity-90 transition-all duration-300 hover:shadow-gold mt-2"
                >
                  Contact Us
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
