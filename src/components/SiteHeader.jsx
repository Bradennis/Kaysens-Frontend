import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronsDown } from "lucide-react";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/businesses", label: "Businesses" },
  { to: "/csr", label: "CSR" },
  { to: "/news", label: "Awards" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

const aboutSubLinks = [
  { hash: "about-us", label: "About Us" },
  { hash: "vision", label: "Vision and Mission" },
  { hash: "leadership", label: "Leadership" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/85 backdrop-blur-md border-b border-forest/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="font-semibold tracking-tight text-forest text-2xl">Kaysens Group</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-forest/70">
          {links.map((l) =>
            l.to === "/about" ? (
              <div key={l.to} className="relative group">
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 transition-colors hover:text-forest ${
                      isActive ? "text-forest border-b-2 border-gold pb-0.5" : ""
                    }`
                  }
                >
                  {l.label}
                  <ChevronsDown size={16} className="text-forest/70" />
                </NavLink>
                <div className="pointer-events-none absolute left-0 top-full z-10 mt-1 hidden w-48 flex-col border-t border-l border-r border-forest/10 bg-cream p-1 shadow-lg transition duration-150 group-hover:pointer-events-auto group-hover:flex">
                  {aboutSubLinks.map((item) => (
                    <Link
                      key={item.hash}
                      to={`/about#${item.hash}`}
                      className="px-3 py-2 text-sm text-forest/80 transition hover:bg-forest/5 hover:text-forest"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `transition-colors hover:text-forest ${
                    isActive ? "text-forest border-b-2 border-gold pb-0.5" : ""
                  }`
                }
              >
                {l.label}
              </NavLink>
            ),
          )}
        </nav>

        <button
          className="lg:hidden p-2 text-forest"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-forest/10 bg-cream">
          <nav className="px-6 py-4 flex flex-col gap-3 text-sm font-medium text-forest/80">
            {links.map((l) => (
              <div key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `py-1.5 block ${isActive ? "text-gold" : ""}`}
                >
                  {l.label}
                </NavLink>
                {l.to === "/about" && (
                  <div className="mt-2 ml-3 flex flex-col gap-2 border-l border-forest/10 pl-3 text-sm text-forest/70">
                    {aboutSubLinks.map((item) => (
                      <Link
                        key={item.hash}
                        to={`/about#${item.hash}`}
                        onClick={() => setOpen(false)}
                        className="py-1"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
