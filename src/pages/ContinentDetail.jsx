import { useParams, Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { CONTINENTS, COUNTRIES_DATA, getHDIColor, getHDILabel, getStatusColor } from "@/lib/worldData";
import { ArrowLeft, MapPin, TrendingUp, Users, Globe, AlertTriangle, CheckCircle } from "lucide-react";
import CountryCard from "@/components/countries/CountryCard";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

export default function ContinentDetail() {
  const { id } = useParams();
  const continent = CONTINENTS.find(c => c.id === id);
  const countries = COUNTRIES_DATA.filter(c => c.continent === continent?.name);

  if (!continent) return (
    <AppLayout>
      <div className="flex items-center justify-center h-64 text-muted-foreground">Continent not found</div>
    </AppLayout>
  );

  const avgHDI = (countries.reduce((a, c) => a + (c.hdi || 0), 0) / countries.length).toFixed(3);
  const avgPoverty = (countries.reduce((a, c) => a + (c.poverty || 0), 0) / countries.length).toFixed(1);
  const avgInternet = (countries.reduce((a, c) => a + (c.internet || 0), 0) / countries.length).toFixed(0);
  const avgElectricity = (countries.reduce((a, c) => a + (c.electricity || 0), 0) / countries.length).toFixed(0);

  const statusCounts = {
    "Developed": countries.filter(c => c.status === "Developed").length,
    "Emerging": countries.filter(c => c.status === "Emerging").length,
    "Developing": countries.filter(c => c.status === "Developing").length,
    "Least Developed": countries.filter(c => c.status === "Least Developed").length,
  };

  const radarData = [
    { subject: "Infrastructure", value: +(countries.reduce((a, c) => a + (c.infra || 0), 0) / countries.length).toFixed(0) },
    { subject: "Digital", value: +(countries.reduce((a, c) => a + (c.digital || 0), 0) / countries.length).toFixed(0) },
    { subject: "Electricity", value: +(countries.reduce((a, c) => a + (c.electricity || 0), 0) / countries.length).toFixed(0) },
    { subject: "Clean Water", value: +(countries.reduce((a, c) => a + (c.water || 0), 0) / countries.length).toFixed(0) },
    { subject: "Internet", value: +(countries.reduce((a, c) => a + (c.internet || 0), 0) / countries.length).toFixed(0) },
  ];

  const topCountries = [...countries].sort((a, b) => (b.hdi || 0) - (a.hdi || 0)).slice(0, 8);
  const bottomCountries = [...countries].sort((a, b) => (a.hdi || 0) - (b.hdi || 0)).slice(0, 5);

  return (
    <AppLayout>
      {/* Hero banner */}
      <div className="relative h-56 overflow-hidden">
        <img src={continent.bgImage} alt={continent.name} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-r ${continent.gradient} opacity-80`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 w-full pb-8">
            <Link to="/continents" className="flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Continents
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{continent.emoji}</span>
              <div>
                <h1 className="text-3xl font-bold text-white font-display">{continent.name}</h1>
                <div className="flex items-center gap-3 text-white/70 text-sm mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{countries.length} countries in database</span>
                  <span>·</span>
                  <span>Avg HDI: {avgHDI}</span>
                  <span>·</span>
                  <span>Avg Internet: {avgInternet}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-8">
        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Avg HDI", value: avgHDI, sub: "Human Dev Index", color: "text-purple-600", bg: "bg-purple-50" },
            { label: `${avgPoverty}%`, value: null, sub: "Avg Poverty Rate", color: "text-red-600", bg: "bg-red-50", display: avgPoverty + "%" },
            { label: "Internet", value: avgInternet + "%", sub: "Avg Penetration", color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Electricity", value: avgElectricity + "%", sub: "Avg Access", color: "text-green-600", bg: "bg-green-50" },
          ].map((item, i) => (
            <div key={i} className={`${item.bg} rounded-xl p-4 border border-${item.color.replace('text-', '')}/20`}>
              <div className={`text-2xl font-bold ${item.color}`}>{item.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Development status breakdown */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Development Status</h3>
            <div className="space-y-3">
              {Object.entries(statusCounts).map(([status, count]) => {
                const pct = ((count / countries.length) * 100).toFixed(0);
                const colors = {
                  "Developed": "bg-green-500",
                  "Emerging": "bg-blue-500",
                  "Developing": "bg-yellow-500",
                  "Least Developed": "bg-red-500",
                };
                return (
                  <div key={status}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground/80">{status}</span>
                      <span className="font-bold text-foreground">{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${colors[status]}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Radar chart */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Regional Capability Avg</h3>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220,13%,88%)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(220,9%,46%)" }} />
                <Radar dataKey="value" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Priority alerts */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Priority Interventions</h3>
            <div className="space-y-2">
              {bottomCountries.map(c => (
                <Link key={c.iso} to={`/countries/${c.iso}`} className="flex items-center gap-3 p-2.5 rounded-lg bg-red-50 border border-red-100 hover:border-red-300 transition-colors">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="text-lg">{c.flag}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-foreground truncate">{c.name}</div>
                    <div className="text-[10px] text-red-600">HDI: {c.hdi?.toFixed(3)} · Poverty: {c.poverty}%</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Countries grid */}
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-foreground">All Countries in {continent.name}</h2>
          <span className="text-sm text-muted-foreground">{countries.length} countries</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {countries.map(c => (
            <CountryCard key={c.iso} country={c} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}