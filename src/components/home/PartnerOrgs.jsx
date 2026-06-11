import { Link } from "react-router-dom";
import { PARTNER_ORGS } from "@/lib/worldData";
import { ArrowRight } from "lucide-react";

export default function PartnerOrgs() {
  return (
    <section className="py-16 lg:py-24 max-w-screen-2xl mx-auto px-4 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Target Partners</div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">Institutional Partners</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            The platform is designed to integrate with and serve the world's leading development institutions.
          </p>
        </div>
        <Link to="/partnerships/new" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-3 rounded-xl text-sm transition-colors shrink-0">
          Propose Partnership <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {PARTNER_ORGS.map((org) => (
          <div key={org.name} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl hover:border-amber-400/40 hover:shadow-md transition-all">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">
              {org.logo}
            </div>
            <div>
              <div className="font-semibold text-sm text-foreground leading-tight">{org.name}</div>
              <div className="text-[10px] text-amber-600 font-semibold uppercase tracking-wide mt-0.5">{org.type}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-tight">{org.focus}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}