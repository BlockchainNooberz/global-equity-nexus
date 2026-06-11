import { COUNTRIES_DATA } from "@/lib/worldData";
import { TrendingDown, AlertTriangle, CheckCircle, Globe } from "lucide-react";

export default function GlobalStatsBar() {
  const total = COUNTRIES_DATA.length;
  const ldc = COUNTRIES_DATA.filter(c => c.status === "Least Developed").length;
  const developing = COUNTRIES_DATA.filter(c => c.status === "Developing").length;
  const emerging = COUNTRIES_DATA.filter(c => c.status === "Emerging").length;
  const developed = COUNTRIES_DATA.filter(c => c.status === "Developed").length;
  const avgHDI = (COUNTRIES_DATA.reduce((a, c) => a + (c.hdi || 0), 0) / total).toFixed(3);
  const conflictCount = COUNTRIES_DATA.filter(c => (c.stability || 0) < -1.5).length;

  const items = [
    { label: "Countries Tracked", value: total, icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Least Developed", value: ldc, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
    { label: "Developing Nations", value: developing, icon: TrendingDown, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Emerging Economies", value: emerging, icon: TrendingDown, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Developed Nations", value: developed, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Avg. Global HDI", value: avgHDI, icon: Globe, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Fragile States", value: conflictCount, icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <section className="py-10 border-b border-border bg-card">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {items.map(({ label, value, icon: Ic, color, bg }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background">
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                <Ic className={`w-4 h-4 ${color}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground leading-none">{value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}