import { Link } from "react-router-dom";
import { getHDIColor, getHDILabel, getStatusColor, formatNumber } from "@/lib/worldData";
import { TrendingUp, Users, Wifi } from "lucide-react";

export default function CountryCard({ country }) {
  const hdiColor = getHDIColor(country.hdi);
  const statusClass = getStatusColor(country.status);

  return (
    <Link
      to={`/countries/${country.iso}`}
      className="group block bg-card border border-border rounded-xl hover:border-amber-400/50 hover:shadow-lg transition-all duration-200 overflow-hidden"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{country.flag}</span>
            <div>
              <div className="font-semibold text-sm text-foreground leading-tight">{country.name}</div>
              <div className="text-[11px] text-muted-foreground">{country.capital} · {country.region}</div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusClass}`}>
            {country.status}
          </span>
        </div>

        {/* HDI bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-muted-foreground">HDI</span>
            <span className="font-bold" style={{ color: hdiColor }}>
              {country.hdi?.toFixed(3)} · {getHDILabel(country.hdi)}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${(country.hdi || 0) * 100}%`, backgroundColor: hdiColor }} />
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <Users className="w-3 h-3 text-muted-foreground mx-auto mb-0.5" />
            <div className="text-[11px] font-bold text-foreground">{formatNumber(country.population)}</div>
            <div className="text-[9px] text-muted-foreground">Population</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <TrendingUp className="w-3 h-3 text-muted-foreground mx-auto mb-0.5" />
            <div className="text-[11px] font-bold text-foreground">${country.gdp?.toFixed(0)}B</div>
            <div className="text-[9px] text-muted-foreground">GDP</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <Wifi className="w-3 h-3 text-muted-foreground mx-auto mb-0.5" />
            <div className="text-[11px] font-bold text-foreground">{country.internet}%</div>
            <div className="text-[9px] text-muted-foreground">Internet</div>
          </div>
        </div>

        {/* Priority sectors */}
        {country.sectors && (
          <div className="mt-3 flex flex-wrap gap-1">
            {country.sectors.slice(0, 3).map(s => (
              <span key={s} className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded-full">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}