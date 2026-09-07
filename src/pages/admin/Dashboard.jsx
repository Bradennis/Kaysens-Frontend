import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Building2, Users, Newspaper, HeartHandshake, Images, Clapperboard, MessageSquare } from "lucide-react";
import {
  businessesApi,
  leadersApi,
  newsApi,
  csrApi,
  galleryApi,
  videosApi,
  contactApi,
} from "../../api/resources";
import { useAuth } from "../../context/AuthContext";
import { PageLoader } from "../../components/Feedback";

const cards = [
  { key: "businesses", label: "Businesses", to: "/admin/businesses", icon: Building2, fetcher: () => businessesApi.listAdmin() },
  { key: "leaders", label: "Leadership", to: "/admin/leaders", icon: Users, fetcher: () => leadersApi.listAdmin() },
  { key: "news", label: "News & Awards", to: "/admin/news", icon: Newspaper, fetcher: () => newsApi.listAdmin() },
  { key: "csr", label: "CSR Programmes", to: "/admin/csr", icon: HeartHandshake, fetcher: () => csrApi.listAdmin() },
  { key: "gallery", label: "Gallery Images", to: "/admin/gallery", icon: Images, fetcher: () => galleryApi.listAdmin() },
  { key: "videos", label: "Videos", to: "/admin/videos", icon: Clapperboard, fetcher: () => videosApi.listAdmin() },
  { key: "messages", label: "New Messages", to: "/admin/messages", icon: MessageSquare, fetcher: () => contactApi.list("status=new") },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all(cards.map((c) => c.fetcher().then((r) => r.count).catch(() => 0))).then((results) => {
      if (!cancelled) {
        setCounts(Object.fromEntries(cards.map((c, i) => [c.key, results[i]])));
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-forest">Welcome back, {user?.name?.split(" ")[0]}</h1>
      <p className="text-sm text-forest/60 mt-1">Here's an overview of your Kaysens Group website content.</p>

      {!counts ? (
        <div className="mt-8">
          <PageLoader label="Loading dashboard…" />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <Link
              key={c.key}
              to={c.to}
              className="bg-white rounded-2xl p-5 ring-1 ring-forest/10 hover:ring-emerald/40 transition"
            >
              <div className="size-10 rounded-lg bg-emerald/10 text-emerald flex items-center justify-center mb-4">
                <c.icon size={18} />
              </div>
              <div className="text-2xl font-semibold text-forest">{counts[c.key] ?? 0}</div>
              <div className="text-sm text-forest/60 mt-1">{c.label}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
