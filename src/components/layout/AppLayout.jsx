import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Globe, BarChart2, Briefcase, Users, FileText, Menu, X, ChevronRight, Search } from "lucide-react";

const navItems = [
  { path: "/", label: "Global Hub", icon: Globe },
  { path: "/continents", label: "Continents", icon: Globe },
  { path: "/countries", label: "Countries", icon: BarChart2 },
  { path: "/projects", label: "Projects", icon: Briefcase },
  { path: "/partnerships", label: "Partnerships", icon: Users },
  { path: "/reports", label: "Reports", icon: FileText },
];

export default function AppLayout({ children }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top nav bar */}
      <header className="sticky top-0 z-50 bg-[hsl(222,47%,11%)] border-b border-white/10 shadow-xl">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-white text-base leading-none">Global Dev Hub</div>
              <div className="text-[10px] text-amber-400/80 tracking-widest uppercase mt-0.5">International Development Platform</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  location.pathname === path
                    ? "bg-amber-500/20 text-amber-400"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link to="/partnerships/new" className="hidden sm:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4" />
              Submit Proposal
            </Link>
            <button className="md:hidden p-2 text-white/80 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[hsl(222,47%,11%)] border-t border-white/10 px-4 py-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  location.pathname === path ? "bg-amber-500/20 text-amber-400" : "text-white/70"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <Link to="/partnerships/new" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 mt-2 bg-amber-500 text-black font-semibold text-sm px-3 py-2.5 rounded-lg">
              <ChevronRight className="w-4 h-4" />
              Submit Partnership Proposal
            </Link>
          </div>
        )}
      </header>

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[hsl(222,47%,11%)] border-t border-white/10 py-8 mt-12">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-amber-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-white/60 text-sm">Global Development Hub — International Development Platform</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-white/40">
              <span>Data Sources: World Bank, UNDP, IMF, WHO</span>
              <span>•</span>
              <span>UN SDG Aligned</span>
              <span>•</span>
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}