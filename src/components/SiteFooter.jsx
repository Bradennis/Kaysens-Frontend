import { useCallback } from "react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Music, Phone, Twitter } from "lucide-react";
import { useFetch } from "../hooks/useFetch";
import { settingsApi } from "../api/resources";

export function SiteFooter() {
  const fetcher = useCallback(() => settingsApi.get(), []);
  const { data: settings } = useFetch(fetcher, []);

  const address = settings
    ? `${settings.address}, ${settings.city}`
    : "Community 1, Tema, opposite Japan Motors";
  const phone = settings?.phone || "027 640 0000";
  const email = settings?.email || "kaysensorders@gmail.com";
  const footerTagline = settings?.footerTagline || "Discipline. Integrity. Stewardship.";
  const siteName = settings?.siteName || "Kaysens Group";
  const social = settings?.social || {};

  return (
    <footer className="bg-forest text-cream/60 pt-14 pb-8 px-6 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="size-9 bg-gold rounded-md flex items-center justify-center">
                <span className="text-forest font-semibold">K</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-cream">{siteName}</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-cream/60">
Headquartered in Tema, Ghana. Building long-term value across distribution,
                hospitality, energy and strategic ventures.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-gold mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-cream/60">
              <div className="flex flex-wrap items-center gap-3">
                <MapPin size={16} />
                <span>{address}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Phone size={16} />
                <span>{phone}</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Mail size={16} />
                <span>{email}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-5 text-sm font-medium text-cream/80">
              <a href={social.instagram || "#"} className="text-cream/80 hover:text-gold" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href={social.x || "#"} className="text-cream/80 hover:text-gold" aria-label="X">
                <Twitter size={18} />
              </a>
              <a href={social.facebook || "#"} className="text-cream/80 hover:text-gold" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href={social.tiktok || "#"} className="text-cream/80 hover:text-gold" aria-label="TikTok">
                <Music size={18} />
              </a>
              <a href={social.linkedin || "#"} className="text-cream/80 hover:text-gold" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-4 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/40">
          <p>&copy; {new Date().getFullYear()} {siteName}. Registered in the Republic of Ghana.</p>
          <p>{footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
