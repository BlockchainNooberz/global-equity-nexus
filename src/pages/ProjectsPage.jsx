import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { base44 } from "@/api/base44Client";
import { Plus, Search, Filter, Briefcase, TrendingUp, AlertTriangle, CheckCircle, Clock, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const SECTOR_COLORS = {
  "Infrastructure": "bg-blue-100 text-blue-800",
  "Healthcare": "bg-red-100 text-red-800",
  "Education": "bg-purple-100 text-purple-800",
  "Agriculture": "bg-green-100 text-green-800",
  "Energy": "bg-yellow-100 text-yellow-800",
  "Digital": "bg-cyan-100 text-cyan-800",
  "Water & Sanitation": "bg-teal-100 text-teal-800",
  "Governance": "bg-gray-100 text-gray-800",
  "Climate": "bg-emerald-100 text-emerald-800",
  "Financial Inclusion": "bg-orange-100 text-orange-800",
};

const STATUS_ICONS = {
  "Proposed": Clock,
  "Under Review": Filter,
  "Approved": CheckCircle,
  "In Progress": TrendingUp,
  "Completed": CheckCircle,
  "On Hold": AlertTriangle,
};

const SAMPLE_PROJECTS = [
  { id: "1", title: "West Africa Digital Infrastructure Corridor", country_name: "Nigeria, Ghana, Senegal", continent: "Africa", sector: "Digital", status: "In Progress", budget_million_usd: 850, funding_secured_million_usd: 520, beneficiaries: 45000000, sdg_goals: ["SDG 9", "SDG 8"], implementing_partners: ["World Bank", "AFDB"], priority: "High", description: "Building 5G backbone and digital economic zones across 3 West African nations.", risk_level: "Medium" },
  { id: "2", title: "Sahel Food Security & Climate Adaptation", country_name: "Niger, Mali, Burkina Faso, Chad", continent: "Africa", sector: "Agriculture", status: "Under Review", budget_million_usd: 420, funding_secured_million_usd: 180, beneficiaries: 12000000, sdg_goals: ["SDG 2", "SDG 13"], implementing_partners: ["WFP", "USAID"], priority: "Critical", description: "Emergency climate-adaptive agriculture and food security program targeting 12M at-risk people.", risk_level: "High" },
  { id: "3", title: "South Asia Clean Energy Transition", country_name: "India, Bangladesh, Nepal", continent: "Asia", sector: "Energy", status: "Approved", budget_million_usd: 2100, funding_secured_million_usd: 1400, beneficiaries: 180000000, sdg_goals: ["SDG 7", "SDG 13"], implementing_partners: ["ADB", "World Bank", "GIZ"], priority: "High", description: "Rapid deployment of solar and grid infrastructure across South Asia.", risk_level: "Low" },
  { id: "4", title: "Ukraine Post-War Reconstruction Fund", country_name: "Ukraine", continent: "Europe", sector: "Infrastructure", status: "In Progress", budget_million_usd: 15000, funding_secured_million_usd: 8500, beneficiaries: 43000000, sdg_goals: ["SDG 11", "SDG 16", "SDG 9"], implementing_partners: ["EU", "World Bank", "IMF", "USAID"], priority: "Critical", description: "Multi-donor reconstruction of war-damaged infrastructure, housing and public services.", risk_level: "High" },
  { id: "5", title: "Pacific Island Climate Resilience Program", country_name: "Fiji, Samoa, Vanuatu, Tonga", continent: "Oceania", sector: "Climate", status: "Approved", budget_million_usd: 340, funding_secured_million_usd: 270, beneficiaries: 1800000, sdg_goals: ["SDG 13", "SDG 14", "SDG 11"], implementing_partners: ["ADB", "NZ Aid", "Australia DFAT"], priority: "Urgent", description: "Comprehensive climate adaptation for Pacific island nations facing existential sea-level rise.", risk_level: "Medium" },
  { id: "6", title: "Central America Anti-Poverty & Migration Root Causes", country_name: "Guatemala, Honduras, El Salvador", continent: "North America", sector: "Governance", status: "In Progress", budget_million_usd: 860, funding_secured_million_usd: 700, beneficiaries: 8000000, sdg_goals: ["SDG 1", "SDG 16", "SDG 8"], implementing_partners: ["USAID", "IDB", "UNDP"], priority: "High", description: "Tackling poverty, governance and security as root causes of northward migration.", risk_level: "Medium" },
  { id: "7", title: "Congo Basin Forest Conservation & Livelihoods", country_name: "DRC, Republic of Congo, Cameroon", continent: "Africa", sector: "Climate", status: "Under Review", budget_million_usd: 600, funding_secured_million_usd: 220, beneficiaries: 60000000, sdg_goals: ["SDG 15", "SDG 13", "SDG 1"], implementing_partners: ["EU", "World Bank", "CAFI"], priority: "High", description: "Protecting the Congo Basin - the world's second largest rainforest - while supporting local livelihoods.", risk_level: "High" },
  { id: "8", title: "MENA Water Security Initiative", country_name: "Jordan, Yemen, Libya", continent: "Asia", sector: "Water & Sanitation", status: "Approved", budget_million_usd: 480, funding_secured_million_usd: 310, beneficiaries: 15000000, sdg_goals: ["SDG 6", "SDG 3"], implementing_partners: ["World Bank", "USAID", "GIZ"], priority: "Urgent", description: "Addressing acute water scarcity in the world's most water-stressed region.", risk_level: "High" },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);

  useEffect(() => {
    base44.entities.DevelopmentProject.list("-created_date", 50)
      .then(data => { if (data?.length) setProjects([...SAMPLE_PROJECTS, ...data]); })
      .catch(() => {});
  }, []);

  const filtered = projects.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !search || p.title?.toLowerCase().includes(q) || p.country_name?.toLowerCase().includes(q);
    const matchSector = !sectorFilter || p.sector === sectorFilter;
    const matchStatus = !statusFilter || p.status === statusFilter;
    return matchSearch && matchSector && matchStatus;
  });

  const totalFunding = projects.reduce((a, p) => a + (p.budget_million_usd || 0), 0);
  const secured = projects.reduce((a, p) => a + (p.funding_secured_million_usd || 0), 0);
  const totalBeneficiaries = projects.reduce((a, p) => a + (p.beneficiaries || 0), 0);

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Project Portfolio</div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">Development Projects</h1>
            <p className="text-muted-foreground max-w-2xl">
              Tracking global development and humanitarian projects across all sectors and continents.
            </p>
          </div>
          <Link to="/projects/new" className="flex items-center gap-2 bg-[hsl(222,47%,11%)] hover:bg-[hsl(222,47%,18%)] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Project
          </Link>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Projects", value: projects.length, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Total Funding Needed", value: `$${(totalFunding / 1000).toFixed(1)}B`, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Funding Secured", value: `$${(secured / 1000).toFixed(1)}B`, color: "text-green-600", bg: "bg-green-50" },
            { label: "People Impacted", value: `${(totalBeneficiaries / 1e6).toFixed(0)}M+`, color: "text-purple-600", bg: "bg-purple-50" },
          ].map(({ label, value, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-4 border border-border`}>
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Search projects or countries..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-amber-400 transition-all" />
          </div>
          <select value={sectorFilter} onChange={e => setSectorFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-amber-400">
            <option value="">All Sectors</option>
            {Object.keys(SECTOR_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-amber-400">
            <option value="">All Status</option>
            {["Proposed", "Under Review", "Approved", "In Progress", "Completed", "On Hold"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map(project => {
            const StatusIcon = STATUS_ICONS[project.status] || Clock;
            const fundingPct = project.budget_million_usd ? Math.round((project.funding_secured_million_usd / project.budget_million_usd) * 100) : 0;
            return (
              <div key={project.id} className="bg-card border border-border rounded-xl p-5 hover:border-amber-400/40 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${SECTOR_COLORS[project.sector] || "bg-gray-100 text-gray-800"}`}>{project.sector}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${project.priority === "Critical" ? "bg-red-100 text-red-800" : project.priority === "Urgent" ? "bg-orange-100 text-orange-800" : project.priority === "High" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>{project.priority}</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug">{project.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Globe className="w-3 h-3" />{project.country_name}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-3 shrink-0">
                    <StatusIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{project.status}</span>
                  </div>
                </div>

                {project.description && (
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                )}

                {/* Funding bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Funding Progress</span>
                    <span className="font-semibold text-foreground">${project.funding_secured_million_usd}M / ${project.budget_million_usd}M</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${fundingPct}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] mt-1">
                    <span className="text-muted-foreground">{fundingPct}% secured</span>
                    <span className="text-red-600 font-medium">Gap: ${(project.budget_million_usd - project.funding_secured_million_usd)}M</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{(project.beneficiaries / 1e6).toFixed(1)}M</span> beneficiaries
                  </div>
                  {project.sdg_goals && (
                    <div className="flex gap-1">
                      {project.sdg_goals.slice(0, 3).map(g => (
                        <span key={g} className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">{g}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}