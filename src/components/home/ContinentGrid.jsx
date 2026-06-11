import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { CONTINENTS } from "@/lib/worldData";

export default function ContinentGrid() {
  return (
    <section className="py-16 lg:py-24 max-w-screen-2xl mx-auto px-4 lg:px-8">
      <div className="mb-10">
        <div className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Global Coverage</div>
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">Explore by Continent</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Comprehensive development data, investment profiles, and partnership opportunities across all world continents.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CONTINENTS.map((c) => (
          <Link
            key={c.id}
            to={`/continents/${c.id}`}
            className="group relative rounded-2xl overflow-hidden border border-border hover:border-amber-400/50 shadow-sm hover:shadow-xl transition-all duration-300 bg-card"
          >
            {/* Background image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={c.bgImage}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-b ${c.gradient} opacity-70`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{c.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{c.name}</h3>
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <MapPin className="w-3 h-3" />
                      {c.countries} Countries · Pop. {c.population}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Body */}
            <div className="p-5">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{c.description}</p>
              <div className="space-y-1.5 mb-4">
                {c.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-2 text-xs text-foreground/80">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.color }} />
                    {h}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs font-medium text-muted-foreground">GDP: {c.gdp}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-amber-600 group-hover:text-amber-500">
                  Explore <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}