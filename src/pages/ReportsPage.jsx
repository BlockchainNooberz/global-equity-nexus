import AppLayout from "@/components/layout/AppLayout";
import { COUNTRIES_DATA, CONTINENTS, getHDIColor } from "@/lib/worldData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter, CartesianGrid, Cell, PieChart, Pie, Legend } from "recharts";
import { FileText, TrendingDown, Globe, AlertTriangle, Zap, Wifi } from "lucide-react";

const COLORS = ["#F59E0B", "#3B82F6", "#10B981", "#EF4444", "#8B5CF6", "#F97316"];

export default function ReportsPage() {
  // Deduplicate by iso
  const seen = new Set();
  const unique = COUNTRIES_DATA.filter(c => {
    if (seen.has(c.iso)) return false;
    seen.add(c.iso);
    return true;
  });

  // Continent avg HDI
  const continentHDI = CONTINENTS.map(cont => {
    const countries = unique.filter(c => c.continent === cont.name);
    const avg = countries.length > 0 ? (countries.reduce((a, c) => a + (c.hdi || 0), 0) / countries.length).toFixed(3) : 0;
    return { name: cont.name.replace(" America", ""), hdi: parseFloat(avg), countries: countries.length };
  });

  // Status distribution
  const statusDist = [
    { name: "Developed", value: unique.filter(c => c.status === "Developed").length, fill: "#22c55e" },
    { name: "Emerging", value: unique.filter(c => c.status === "Emerging").length, fill: "#3b82f6" },
    { name: "Developing", value: unique.filter(c => c.status === "Developing").length, fill: "#eab308" },
    { name: "Least Dev.", value: unique.filter(c => c.status === "Least Developed").length, fill: "#ef4444" },
  ];

  // Top 15 by HDI
  const top15 = [...unique].sort((a, b) => (b.hdi || 0) - (a.hdi || 0)).slice(0, 15);

  // Bottom 15 by HDI
  const bottom15 = [...unique].sort((a, b) => (a.hdi || 0) - (b.hdi || 0)).slice(0, 15);

  // Internet gap chart
  const internetGap = CONTINENTS.map(cont => {
    const countries = unique.filter(c => c.continent === cont.name);
    const avg = countries.length > 0 ? Math.round(countries.reduce((a, c) => a + (c.internet || 0), 0) / countries.length) : 0;
    return { name: cont.name.replace(" America", ""), internet: avg };
  });

  // Poverty by continent
  const povertyData = CONTINENTS.map(cont => {
    const countries = unique.filter(c => c.continent === cont.name);
    const avg = countries.length > 0 ? +(countries.reduce((a, c) => a + (c.poverty || 0), 0) / countries.length).toFixed(1) : 0;
    return { name: cont.name.replace(" America", ""), poverty: avg };
  });

  // Fragile states
  const fragileStates = unique.filter(c => (c.stability || 0) < -1.5).sort((a, b) => a.stability - b.stability).slice(0, 10);

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-12">
        <div className="mb-10">
          <div className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Analytics & Intelligence</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">Global Development Reports</h1>
          <p className="text-muted-foreground max-w-2xl">
            Data-driven insights on global development trends, investment gaps, and priority intervention areas across all {unique.length} tracked countries.
          </p>
        </div>

        {/* Summary KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Countries Below 0.55 HDI", value: unique.filter(c => (c.hdi || 0) < 0.55).length, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
            { label: "People Without Electricity", value: "760M+", icon: Zap, color: "text-yellow-600", bg: "bg-yellow-50" },
            { label: "Countries Below 50% Internet", value: unique.filter(c => (c.internet || 0) < 50).length, icon: Wifi, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Fragile/Conflict States", value: unique.filter(c => (c.stability || 0) < -1.5).length, icon: Globe, color: "text-orange-600", bg: "bg-orange-50" },
          ].map(({ label, value, icon: Ic, color, bg }) => (
            <div key={label} className={`${bg} rounded-xl p-4 border border-border`}>
              <Ic className={`w-5 h-5 ${color} mb-2`} />
              <div className={`text-2xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Average HDI by Continent */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-1">Average HDI by Continent</h3>
            <p className="text-xs text-muted-foreground mb-4">Human Development Index (0-1 scale)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={continentHDI} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(220,13%,91%)" />
                <XAxis type="number" domain={[0, 1]} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip formatter={(v) => [v.toFixed(3), "Avg HDI"]} />
                <Bar dataKey="hdi" radius={[0, 4, 4, 0]}>
                  {continentHDI.map((entry, i) => (
                    <Cell key={i} fill={getHDIColor(entry.hdi)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Development Status Distribution */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-1">Development Status Distribution</h3>
            <p className="text-xs text-muted-foreground mb-4">Countries by development classification</p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusDist} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false} fontSize={10}>
                  {statusDist.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Internet penetration by continent */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-1">Digital Divide: Internet by Continent</h3>
            <p className="text-xs text-muted-foreground mb-4">Average internet penetration %</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={internetGap} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(220,13%,91%)" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip formatter={(v) => [`${v}%`, "Internet"]} />
                <Bar dataKey="internet" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Poverty by continent */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-1">Poverty Rate by Continent</h3>
            <p className="text-xs text-muted-foreground mb-4">Average % population below $2.15/day</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={povertyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(220,13%,91%)" />
                <XAxis type="number" domain={[0, 80]} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip formatter={(v) => [`${v}%`, "Poverty"]} />
                <Bar dataKey="poverty" fill="#EF4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top & Bottom HDI tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Highest HDI Countries</h3>
            <div className="space-y-2">
              {top15.map((c, i) => (
                <div key={c.iso} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-sm flex-1 text-foreground">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.hdi * 100}%`, backgroundColor: getHDIColor(c.hdi) }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: getHDIColor(c.hdi) }}>{c.hdi?.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Priority: Lowest HDI Countries
            </h3>
            <div className="space-y-2">
              {bottom15.map((c, i) => (
                <div key={c.iso} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-sm flex-1 text-foreground">{c.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${c.hdi * 100}%`, backgroundColor: getHDIColor(c.hdi) }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: getHDIColor(c.hdi) }}>{c.hdi?.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fragile states */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            Fragile & Conflict-Affected States (Priority Intervention)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {fragileStates.map(c => (
              <div key={c.iso} className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 border border-orange-100">
                <span className="text-xl">{c.flag}</span>
                <div>
                  <div className="text-xs font-semibold text-foreground">{c.name}</div>
                  <div className="text-[10px] text-orange-700">Stability: {c.stability?.toFixed(2)}</div>
                  <div className="text-[10px] text-red-600">HDI: {c.hdi?.toFixed(3)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}