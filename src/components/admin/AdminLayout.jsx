import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Newspaper,
  HeartHandshake,
  Images,
  Clapperboard,
  BarChart3,
  MessageSquare,
  Settings,
  UserCog,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/businesses", label: "Businesses", icon: Building2 },
  { to: "/admin/leaders", label: "Leadership", icon: Users },
  { to: "/admin/news", label: "News & Awards", icon: Newspaper },
  { to: "/admin/csr", label: "CSR Programmes", icon: HeartHandshake },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
  { to: "/admin/videos", label: "Videos", icon: Clapperboard },
  { to: "/admin/stats", label: "Stats", icon: BarChart3 },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/users", label: "CMS Users", icon: UserCog, adminOnly: true },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-muted/40">
      <aside className="w-64 shrink-0 bg-forest text-cream flex flex-col">
        <div className="p-6 border-b border-cream/10">
          <p className="font-semibold tracking-tight text-lg">Kaysens CMS</p>
          <p className="text-xs text-cream/50 mt-1">Content management</p>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems
            .filter((item) => !item.adminOnly || user?.role === "admin")
            .map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-cream/10 text-gold" : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                  }`
                }
              >
                <item.icon size={17} />
                {item.label}
              </NavLink>
            ))}
        </nav>

        <div className="p-4 border-t border-cream/10 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-cream/60 hover:text-cream"
          >
            <ExternalLink size={14} /> View live site
          </a>
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-cream">{user?.name}</p>
            <p className="text-xs text-cream/50 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-cream/70 hover:bg-cream/5 hover:text-cream"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
