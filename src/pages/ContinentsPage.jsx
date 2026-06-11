import { Link } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import { CONTINENTS, COUNTRIES_DATA, getHDIColor } from "@/lib/worldData";
import { MapPin, ArrowRight, Users, TrendingUp, Globe } from "lucide-react";

export default function ContinentsPage() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <div className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Global Coverage</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-3">All Continents</h1>
          <p className="text-muted-foreground max-w-3xl">
            Explore development data, investment opportunities, and humanitarian needs by continent.
            Each region offers unique challenges and opportunities for global development partnerships.
          </p>
        </div>

        {/* Continent Cards */}
        <div className="space-y-8">
          {CONTINENTS.map((continent) => {
            const countries = COUNTRIES_DATA.filter(c => c.continent === continent.name);
            const avgHDI = countries.length > 0
              ? (countries.reduce((a, c) => a + (c.hdi || 0), 0) / countries.length).toFixed(3)
              : "N/A";
            const totalPop = countries.reduce((a, c) => a + (c.population || 0), 0);
            const totalGDP = countries.reduce((a, c) => a + (c.gdp || 0), 0);
            const ldcCount = countries.filter(c => c.status === "Least Developed").length;

            return (
              <div key={continent.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-amber-400/40 hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row">
                  {/* Image side */}
                  <div className="relative lg:w-80 h-48 lg:h-auto shrink-0">
                    <img src={continent.bgImage} alt={continent.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-r ${continent.gradient} opacity-70`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">{continent.emoji}</div>
                        <h2 className="text-2xl font-bold text-white">{continent.name}</h2>
                        <div className="text-white/80 text-sm mt-1">{continent.countries} Countries</div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 lg:p-8">
                    <p className="text-muted-foreground mb-5">{continent.description}</p>

                    {/* Stats grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                      {[
                        { label: "Countries in DB", value: countries.length, icon: MapPin },
                        { label: "Total Population", value: totalPop >= 1e9 ? `${(totalPop/1e9).toFixed(1)}B` : `${(totalPop/1e6).toFixed(0)}M`, icon: Users },
                        { label: "Combined GDP", value: `$${(totalGDP/1000).toFixed(1)}T`, icon: TrendingUp },
                        { label: "Avg HDI", value: avgHDI, icon: Globe },
                      ].map(({ label, value, icon: Ic }) => (
                        <div key={label} className="bg-muted/40 rounded-xl p-3">
                          <Ic className="w-4 h-4 text-muted-foreground mb-1" />
                          <div className="text-lg font-bold text-foreground">{value}</div>
                          <div className="text-[11px] text-muted-foreground">{label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Highlights & LDC */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                      {continent.highlights.map(h => (
                        <span key={h} className="text-xs bg-background border border-border px-2.5 py-1 rounded-full text-foreground/70">
                          {h}
                        </span>
                      ))}
                      {ldcCount > 0 && (
                        <span className="text-xs bg-red-50 border border-red-200 text-red-700 px-2.5 py-1 rounded-full font-medium">
                          {ldcCount} Least Developed Countries
                        </span>
                      )}
                    </div>

                    {/* Country preview flags */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="flex -space-x-1">
                        {countries.slice(0, 10).map(c => (
                          <span key={c.iso} className="text-lg hover:z-10 transition-all" title={c.name}>{c.flag}</span>
                        ))}
                        {countries.length > 10 && (
                          <span className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                            +{countries.length - 10}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link
                      to={`/continents/${continent.id}`}
                      className="inline-flex items-center gap-2 bg-[hsl(222,47%,11%)] hover:bg-[hsl(222,47%,18%)] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
                    >
                      Explore {continent.name} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}