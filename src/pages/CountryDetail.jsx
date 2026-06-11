import { useParams, Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { COUNTRIES_DATA, getHDIColor, getHDILabel, getStatusColor, SDG_GOALS } from "@/lib/worldData";
import { ArrowLeft, MapPin, TrendingUp, Users, Wifi, Zap, Droplets, GraduationCap, Heart, Factory, AlertTriangle, CheckCircle, Globe, Building } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const MetricBar = ({ label, value, max = 100, color = "#F59E0B", format = (v) => `${v}%` }) => (
  <div className="mb-3">
    <div className="flex justify-between text-xs mb-1">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{format(value)}</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (value / max) * 100)}%`, backgroundColor: color }} />
    </div>
  </div>
);

const StatCard = ({ icon: Ic, label, value, sub, color = "text-foreground" }) => (
  <div className="bg-card border border-border rounded-xl p-4">
    <Ic className="w-5 h-5 text-muted-foreground mb-2" />
    <div className={`text-xl font-bold ${color}`}>{value}</div>
    <div className="text-xs font-medium text-foreground/70">{label}</div>
    {sub && <div className="text-[11px] text-muted-foreground mt-0.5">{sub}</div>}
  </div>
);

export default function CountryDetail() {
  const { iso } = useParams();
  const country = COUNTRIES_DATA.find(c => c.iso === iso);

  if (!country) return (
    <AppLayout>
      <div className="flex items-center justify-center h-64 text-muted-foreground">Country not found</div>
    </AppLayout>
  );

  const hdiColor = getHDIColor(country.hdi);
  const statusClass = getStatusColor(country.status);

  const radarData = [
    { subject: "Infrastructure", value: country.infra || 0 },
    { subject: "Digital", value: country.digital || 0 },
    { subject: "Education", value: country.literacy || 0 },
    { subject: "Health Access", value: country.access_to_clean_water || country.water || 0 },
    { subject: "Electricity", value: country.electricity || 0 },
    { subject: "Internet", value: country.internet || 0 },
  ];

  const economicData = [
    { name: "GDP/capita", value: country.gdpPC || 0 },
  ];

  const investmentScore = Math.round((
    ((country.cpi || 50) / 100 * 25) +
    ((country.infra || 50) / 100 * 25) +
    ((country.digital || 50) / 100 * 25) +
    ((100 - (country.poverty || 50)) / 100 * 25)
  ));

  return (
    <AppLayout>
      {/* Header */}
      <div className="bg-gradient-hero border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-8">
          <Link to="/countries" className="flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" /> All Countries
          </Link>
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex items-center gap-4">
              <span className="text-6xl">{country.flag}</span>
              <div>
                <h1 className="text-3xl font-bold text-white font-display">{country.name}</h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusClass}`}>{country.status}</span>
                  <span className="flex items-center gap-1 text-white/60 text-sm">
                    <MapPin className="w-3.5 h-3.5" />{country.capital}
                  </span>
                  <span className="flex items-center gap-1 text-white/60 text-sm">
                    <Globe className="w-3.5 h-3.5" />{country.continent} · {country.region}
                  </span>
                </div>
              </div>
            </div>
            {/* HDI badge */}
            <div className="md:ml-auto bg-white/10 border border-white/20 rounded-2xl p-4 text-center min-w-[120px]">
              <div className="text-3xl font-bold" style={{ color: hdiColor }}>{country.hdi?.toFixed(3)}</div>
              <div className="text-xs text-white/70 mt-1">HDI Score</div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: hdiColor }}>{getHDILabel(country.hdi)}</div>
              {country.hdiRank && <div className="text-[11px] text-white/50 mt-0.5">Rank #{country.hdiRank}</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          <StatCard icon={Users} label="Population" value={country.population >= 1e6 ? `${(country.population/1e6).toFixed(1)}M` : `${(country.population/1e3).toFixed(0)}K`} />
          <StatCard icon={TrendingUp} label="GDP" value={`$${country.gdp?.toFixed(0)}B`} sub="USD Billion" />
          <StatCard icon={TrendingUp} label="GDP/Capita" value={`$${country.gdpPC?.toLocaleString()}`} />
          <StatCard icon={Heart} label="Life Expectancy" value={`${country.lifeExp} yrs`} />
          <StatCard icon={GraduationCap} label="Literacy Rate" value={`${country.literacy}%`} />
          <StatCard icon={AlertTriangle} label="Poverty Rate" value={`${country.poverty}%`} color={country.poverty > 40 ? "text-red-600" : country.poverty > 20 ? "text-yellow-600" : "text-green-600"} sub="< $2.15/day" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Infrastructure radar */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Development Profile</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220,13%,88%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fill: "hsl(220,9%,46%)" }} />
                <Radar dataKey="value" stroke={hdiColor} fill={hdiColor} fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Key indicators */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Infrastructure & Access</h3>
            <MetricBar label="Electricity Access" value={country.electricity || 0} color="#F59E0B" />
            <MetricBar label="Clean Water Access" value={country.water || 0} color="#3B82F6" />
            <MetricBar label="Internet Penetration" value={country.internet || 0} color="#8B5CF6" />
            <MetricBar label="Mobile Penetration" value={Math.min(country.mobile || 0, 100)} max={100} color="#10B981" />
            <MetricBar label="Infrastructure Score" value={country.infra || 0} color="#F97316" />
            <MetricBar label="Digital Readiness" value={country.digital || 0} color="#EF4444" />
          </div>

          {/* Investment & Governance */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Governance & Investment</h3>
            <MetricBar label="Corruption Perceptions Index" value={country.cpi || 0} color="#22c55e" />
            <MetricBar label="Political Stability" value={Math.max(0, ((country.stability || 0) + 2.5) / 5 * 100)} color="#3B82F6" format={(v) => `${((v / 100) * 5 - 2.5).toFixed(2)}`} />
            <MetricBar label="Ease of Business" value={Math.max(0, 100 - (country.bizRank || 100) / 190 * 100)} color="#8B5CF6" format={(v) => `Rank #${country.bizRank}`} />
            <MetricBar label="Renewable Energy" value={country.renewPct || 0} color="#10B981" />
            <div className="mt-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-xs text-amber-700 font-semibold mb-1">Investment Attractiveness</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-amber-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${investmentScore}%` }} />
                </div>
                <span className="text-sm font-bold text-amber-700">{investmentScore}/100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Priority sectors */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Priority Development Sectors</h3>
            {country.sectors && country.sectors.map(s => (
              <div key={s} className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-amber-50 border border-amber-100">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm font-medium text-foreground">{s}</span>
              </div>
            ))}
            <div className="mt-4">
              <div className="text-xs font-semibold text-muted-foreground mb-2">ECONOMIC INDICATORS</div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-muted-foreground">Unemployment</div>
                  <div className="font-bold text-foreground">{country.unemployment}%</div>
                </div>
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-muted-foreground">Urbanization</div>
                  <div className="font-bold text-foreground">{country.urban}%</div>
                </div>
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-muted-foreground">Health Spend (% GDP)</div>
                  <div className="font-bold text-foreground">{country.healthGdp}%</div>
                </div>
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-muted-foreground">Education Spend (% GDP)</div>
                  <div className="font-bold text-foreground">{country.eduGdp}%</div>
                </div>
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-muted-foreground">Gini Index</div>
                  <div className="font-bold text-foreground">{country.gini}</div>
                </div>
                <div className="bg-muted/40 rounded-lg p-2">
                  <div className="text-muted-foreground">CO₂ per Capita</div>
                  <div className="font-bold text-foreground">{country.co2pc}t</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key challenges */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Key Development Challenges</h3>
            {country.challenges && country.challenges.map((ch, i) => (
              <div key={i} className="flex items-start gap-3 p-3 mb-2 rounded-lg bg-red-50 border border-red-100">
                <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-sm text-foreground">{ch}</span>
              </div>
            ))}
            <div className="mt-4 p-4 rounded-xl bg-gradient-navy border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">Partnership Opportunity</span>
              </div>
              <p className="text-xs text-white/70 mb-3">
                This country has identified {country.sectors?.length || 0} priority sectors for international development assistance and investment partnerships.
              </p>
              <Link to="/partnerships/new" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs px-4 py-2 rounded-lg transition-colors">
                Propose Partnership for {country.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}