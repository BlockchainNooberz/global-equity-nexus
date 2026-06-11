import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Send, CheckCircle, Globe, Building, DollarSign } from "lucide-react";
import { CONTINENTS, SDG_GOALS } from "@/lib/worldData";

const ORG_TYPES = ["Government", "UN Agency", "Multilateral Bank", "NGO", "Private Sector", "Academic", "Bilateral Agency", "Regional Organization"];
const PROPOSAL_TYPES = ["Investment", "Technical Assistance", "Data Sharing", "Platform Integration", "Joint Program", "Acquisition/Buyout", "Licensing"];

export default function PartnershipForm() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedSDGs, setSelectedSDGs] = useState([]);

  const [form, setForm] = useState({
    organization_name: "",
    organization_type: "",
    contact_name: "",
    contact_email: "",
    contact_title: "",
    proposal_type: "",
    proposed_budget_million_usd: "",
    description: "",
    priority: "Standard",
  });

  const toggleRegion = (region) => {
    setSelectedRegions(prev => prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]);
  };

  const toggleSDG = (sdg) => {
    setSelectedSDGs(prev => prev.includes(sdg) ? prev.filter(s => s !== sdg) : [...prev, sdg]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await base44.entities.PartnershipProposal.create({
        ...form,
        proposed_budget_million_usd: form.proposed_budget_million_usd ? parseFloat(form.proposed_budget_million_usd) : null,
        target_regions: selectedRegions,
        sdg_alignment: selectedSDGs,
        status: "Submitted",
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-3">Proposal Submitted</h1>
          <p className="text-muted-foreground mb-2">
            Thank you, <strong>{form.contact_name}</strong>. Your partnership proposal from <strong>{form.organization_name}</strong> has been received.
          </p>
          <p className="text-muted-foreground text-sm mb-8">Our team will review your proposal and contact you at <strong>{form.contact_email}</strong> within 5-10 business days.</p>
          <div className="flex gap-3 justify-center">
            <Link to="/partnerships" className="bg-[hsl(222,47%,11%)] text-white font-semibold px-6 py-3 rounded-xl text-sm">
              View All Proposals
            </Link>
            <Link to="/" className="border border-border text-foreground font-semibold px-6 py-3 rounded-xl text-sm">
              Back to Hub
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-12">
        <Link to="/partnerships" className="flex items-center gap-1 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" /> Back to Partnerships
        </Link>

        <div className="mb-8">
          <div className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Partnership Application</div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Submit Partnership Proposal</h1>
          <p className="text-muted-foreground">
            Submit a formal partnership proposal for investment, technical cooperation, platform integration, 
            or acquisition. All proposals are reviewed by our executive team within 5-10 business days.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Building className="w-4 h-4 text-amber-600" />
              <h2 className="font-semibold text-foreground">Organization Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Organization Name *</label>
                <input required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400" value={form.organization_name} onChange={e => setForm({...form, organization_name: e.target.value})} placeholder="e.g. United Nations Development Programme" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Organization Type *</label>
                <select required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400" value={form.organization_type} onChange={e => setForm({...form, organization_type: e.target.value})}>
                  <option value="">Select type...</option>
                  {ORG_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Contact Name *</label>
                <input required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400" value={form.contact_name} onChange={e => setForm({...form, contact_name: e.target.value})} placeholder="Full name" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Contact Title</label>
                <input className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400" value={form.contact_title} onChange={e => setForm({...form, contact_title: e.target.value})} placeholder="e.g. Deputy Director" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1">Contact Email *</label>
                <input required type="email" className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400" value={form.contact_email} onChange={e => setForm({...form, contact_email: e.target.value})} placeholder="official@organization.org" />
              </div>
            </div>
          </div>

          {/* Proposal details */}
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-amber-600" />
              <h2 className="font-semibold text-foreground">Proposal Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Proposal Type *</label>
                <select required className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400" value={form.proposal_type} onChange={e => setForm({...form, proposal_type: e.target.value})}>
                  <option value="">Select type...</option>
                  {PROPOSAL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Proposed Budget (USD Millions)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="number" min="0" className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400" value={form.proposed_budget_million_usd} onChange={e => setForm({...form, proposed_budget_million_usd: e.target.value})} placeholder="e.g. 500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">Priority Level</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                  <option value="Standard">Standard</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">Proposal Description *</label>
              <textarea required rows={5} className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-amber-400 resize-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe the partnership, objectives, expected impact, and how you intend to use the Global Development Hub platform..." />
            </div>
          </div>

          {/* Target Regions */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold text-foreground mb-4">Target Regions</h2>
            <div className="flex flex-wrap gap-2">
              {["Global", ...CONTINENTS.map(c => c.name)].map(region => (
                <button key={region} type="button" onClick={() => toggleRegion(region)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedRegions.includes(region) ? "bg-amber-500 text-black border-amber-500" : "bg-background border-border text-foreground hover:border-amber-400"}`}>
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* SDG Alignment */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="font-semibold text-foreground mb-4">SDG Alignment</h2>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
              {SDG_GOALS.map(sdg => (
                <button key={sdg.id} type="button" onClick={() => toggleSDG(`SDG ${sdg.id}`)} className={`p-2 rounded-lg border text-center transition-all ${selectedSDGs.includes(`SDG ${sdg.id}`) ? "border-amber-500 bg-amber-50" : "border-border hover:border-amber-300"}`}>
                  <div className="text-xl">{sdg.icon}</div>
                  <div className="text-[9px] font-bold text-foreground mt-0.5">SDG {sdg.id}</div>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold py-3.5 rounded-xl transition-colors text-sm">
            {loading ? <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Submitting..." : "Submit Partnership Proposal"}
          </button>
        </form>
      </div>
    </AppLayout>
  );
}