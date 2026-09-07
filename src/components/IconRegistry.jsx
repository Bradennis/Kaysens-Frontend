import {
  Truck,
  MapPin,
  ShieldCheck,
  Wifi,
  UtensilsCrossed,
  Waves,
  Briefcase,
  Award,
  Users,
  Leaf,
  Droplet,
  GraduationCap,
  Star,
  Building2,
  Fuel,
  HelpCircle,
} from "lucide-react";

// Maps a plain string (as stored in MongoDB) to a lucide-react icon component,
// so editors can pick an icon by name in the CMS without shipping JSX to the DB.
const registry = {
  Truck,
  MapPin,
  ShieldCheck,
  Wifi,
  UtensilsCrossed,
  Waves,
  Briefcase,
  Award,
  Users,
  Leaf,
  Droplet,
  GraduationCap,
  Star,
  Building2,
  Fuel,
};

export const iconNames = Object.keys(registry);

export function Icon({ name, size = 20, className = "" }) {
  const Cmp = registry[name] || HelpCircle;
  return <Cmp size={size} className={className} />;
}

export default registry;
