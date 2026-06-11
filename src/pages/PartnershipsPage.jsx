import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { base44 } from "@/api/base44Client";
import { Plus, Users, CheckCircle, Clock, Globe, TrendingUp, Building, Star } from "lucide-react";
import { PARTNER_ORGS } from "@/lib/worldData";

export default function PartnershipsPage() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.PartnershipProposal.list("-created_date", 50)
      .then(data => setProposals(data || []))
      .catch(() => setProposals([]))
      .finally(() => setLoading(false));
  }, []);

  const statusConfig = {
    "Submitted": { color: "bg-blue-100 text-blue-800", icon: Clock },
    "Under Review": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
    "In Negotiation": { color: "bg-purple-100 text-purple-800", icon: TrendingUp },
    "Approved": { color: "bg-green-100 text-green-800", icon: CheckCircle },
    "Rejected": { color: "bg-red-100 text-red-800", icon: Globe },
    "Withdrawn": { color: "bg-gray-100 text-gray-800", icon: Globe },
  };

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Strategic Partnerships</div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">Partnership Hub</h1>
            <p className="text-muted-foreground max-w-2xl">
              Connect with the world's leading development institutions. Submit proposals for investment, 
              technical assistance, platform integration, or platform acquisition.
            </p>
          </div>
          <Link to="/partnerships/new" className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Submit Proposal
          </Link>
        </div>

        {/* Value proposition banner */}
        <div className="bg-gradient-navy rounded-2xl p-6 mb-10 border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "UN Partnership", desc: "Integrate with UNDP, UNICEF, WFP and all 44 UN specialized agencies for coordinated global development assistance." },
              { icon: Building, title: "Government Integration", desc: "Direct integration with USAID, EU development funds, bilateral agencies from G7 and G20 countries." },
              { icon: TrendingUp, title: "Platform Acquisition", desc: "Full acquisition or majority stake available. Platform serves 195+ countries with live development data infrastructure." },
            ].map(({ icon: Ic, title, desc }) => (
              <div key={title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Ic className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{title}</h3>
                  <p className="text-white/60 text-xs mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Target partners */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Target Institutional Partners</h2>
            <div className="space-y-3">
              {PARTNER_ORGS.map(org => (
                <div key={org.name} className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl hover:border-amber-400/40 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-xl shrink-0">{org.logo}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm text-foreground truncate">{org.name}</div>
                    <div className="text-[10px] text-amber-600 font-semibold uppercase tracking-wide">{org.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submitted proposals */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-foreground">Partnership Proposals</h2>
              <span className="text-sm text-muted-foreground">{proposals.length} submitted</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : proposals.length === 0 ? (
              <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No proposals yet</h3>
                <p className="text-muted-foreground text-sm mb-4">Be the first to submit a partnership proposal.</p>
                <Link to="/partnerships/new" className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold px-5 py-2.5 rounded-xl text-sm">
                  <Plus className="w-4 h-4" /> Submit First Proposal
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {proposals.map(p => {
                  const cfg = statusConfig[p.status] || statusConfig["Submitted"];
                  const StatusIcon = cfg.icon;
                  return (
                    <div key={p.id} className="bg-card border border-border rounded-xl p-5 hover:border-amber-400/40 transition-colors">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{p.organization_name}</h3>
                          <div className="text-xs text-muted-foreground mt-0.5">{p.contact_name} · {p.contact_title}</div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${cfg.color}`}>
                          {p.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                        <span className="bg-muted px-2 py-0.5 rounded-full">{p.organization_type}</span>
                        <span className="bg-muted px-2 py-0.5 rounded-full">{p.proposal_type}</span>
                        {p.proposed_budget_million_usd && <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">${p.proposed_budget_million_usd}M proposed</span>}
                      </div>
                      {p.description && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{p.description}</p>}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}