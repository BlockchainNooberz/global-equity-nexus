import { Link } from "react-router-dom";
import { Globe, ArrowRight, TrendingUp, Users, Briefcase } from "lucide-react";
import { COUNTRIES_DATA } from "@/lib/worldData";

const stats = [
  { label: "Countries Covered", value: "195+", icon: Globe, color: "text-amber-400" },
  { label: "Active Projects", value: "$2.4T", icon: Briefcase, color: "text-blue-400" },
  { label: "People Impacted", value: "8.1B", icon: Users, color: "text-green-400" },
  { label: "SDG Goals Tracked", value: "17", icon: TrendingUp, color: "text-purple-400" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{background: "linear-gradient(135deg, hsl(222,47%,8%) 0%, hsl(222,47%,14%) 50%, hsl(222,30%,20%) 100%)"}}>
      {/* Background globe pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/3" />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 lg:px-8 py-20 lg:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 text-xs font-semibold tracking-wider uppercase">UN · US · EU Aligned Platform</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            The World's Most Comprehensive{" "}
            <span className="text-gradient-gold">Global Development</span>{" "}
            Intelligence Platform
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-3xl leading-relaxed">
            Empowering governments, multilateral institutions, and development finance organizations with 
            real-time intelligence on <strong className="text-white">195+ countries</strong> — 
            tracking development indicators, investment opportunities, and humanitarian needs across every continent.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mb-16">
            <Link to="/continents" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40">
              Explore All Continents <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/partnerships/new" className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold border border-white/20 px-6 py-3.5 rounded-xl transition-all">
              Submit Partnership Proposal
            </Link>
            <Link to="/reports" className="flex items-center gap-2 text-white/60 hover:text-white font-medium px-4 py-3.5 transition-all">
              View Global Reports →
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <Icon className={`w-5 h-5 ${color} mb-2`} />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-xs text-white/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 0C1200 50 960 60 720 40C480 20 240 10 0 40L0 60Z" fill="hsl(220,20%,97%)" />
        </svg>
      </div>
    </section>
  );
}