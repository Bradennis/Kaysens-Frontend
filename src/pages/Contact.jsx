import { useCallback, useState } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { PageHero, Container } from "../components/Section";
import { useFetch } from "../hooks/useFetch";
import { contactApi, settingsApi } from "../api/resources";

export default function Contact() {
  const settingsFetcher = useCallback(() => settingsApi.get(), []);
  const { data: settings } = useFetch(settingsFetcher, []);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await contactApi.submit(form);
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong sending your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const address = settings ? `${settings.address}, ${settings.city}` : "12 Independence Avenue, Airport Residential Area, Accra, Ghana";
  const phone = settings?.phone || "+233 (0) 302 000 000";
  const email = settings?.email || "hello@kaysensgroup.com";
  const pressEmail = settings?.pressEmail || "press@kaysensgroup.com";
  const hours = settings?.workingHours?.length ? settings.workingHours : ["Mon — Fri: 08:00 – 17:00", "Sat: 09:00 – 13:00"];
  const mapUrl =
    settings?.mapEmbedUrl ||
    "https://www.openstreetmap.org/export/embed.html?bbox=-0.2%2C5.58%2C-0.15%2C5.62&layer=mapnik";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        description="Whether you're a partner, journalist, supplier or guest — we'd love to hear from you."
      />

      <section className="py-20">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12">
            <form onSubmit={handleSubmit} className="lg:col-span-3 p-8 bg-cream rounded-3xl ring-1 ring-black/5 space-y-5">
              <h2 className="text-2xl font-semibold text-forest mb-2">Send us a message</h2>
              {sent ? (
                <div className="p-6 rounded-2xl bg-emerald/10 text-emerald font-medium">
                  Thanks — we've received your message and will respond shortly.
                </div>
              ) : (
                <>
                  {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm font-medium">{error}</div>
                  )}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Name" id="name" value={form.name} onChange={handleChange} />
                    <Field label="Email" id="email" type="email" value={form.email} onChange={handleChange} />
                  </div>
                  <Field label="Subject" id="subject" value={form.subject} onChange={handleChange} />
                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-forest">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className="mt-1.5 w-full px-4 py-3 rounded-xl bg-cream border border-forest/15 focus:outline-none focus:ring-2 focus:ring-emerald"
                    />
                  </div>
                  <button
                    disabled={submitting}
                    className="bg-forest text-cream px-6 py-3 rounded-full font-semibold text-sm hover:bg-emerald transition disabled:opacity-60"
                  >
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                </>
              )}
            </form>

            <aside className="lg:col-span-2 space-y-6">
              <Info icon={MapPin} title="Head Office" lines={address.split(", ")} />
              <Info icon={Phone} title="Phone" lines={[phone]} />
              <Info icon={Mail} title="Email" lines={[email, pressEmail]} />
              <Info icon={Clock} title="Working Hours" lines={hours} />
            </aside>
          </div>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          <div className="aspect-[16/7] rounded-3xl overflow-hidden ring-1 ring-black/5">
            <iframe title="Kaysens Group office location" src={mapUrl} className="w-full h-full border-0" loading="lazy" />
          </div>
        </Container>
      </section>
    </>
  );
}

function Field({ label, id, type = "text", value, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-forest">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        className="mt-1.5 w-full px-4 py-3 rounded-xl bg-cream border border-forest/15 focus:outline-none focus:ring-2 focus:ring-emerald"
      />
    </div>
  );
}

function Info({ icon: IconCmp, title, lines }) {
  return (
    <div className="p-6 bg-cream rounded-2xl ring-1 ring-black/5">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-lg bg-emerald/10 text-emerald flex items-center justify-center">
          <IconCmp size={18} />
        </div>
        <h3 className="font-semibold text-forest">{title}</h3>
      </div>
      <div className="text-sm text-forest/60 space-y-1">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </div>
  );
}
