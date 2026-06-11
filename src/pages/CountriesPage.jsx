import { useState, useMemo } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { COUNTRIES_DATA } from "@/lib/worldData";
import CountryCard from "@/components/countries/CountryCard";
import CountryFilters from "@/components/countries/CountryFilters";
import { Globe } from "lucide-react";

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("hdi-desc");

  const filtered = useMemo(() => {
    let data = [...COUNTRIES_DATA];
    if (search) data = data.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.capital?.toLowerCase().includes(search.toLowerCase()));
    if (continent) data = data.filter(c => c.continent === continent);
    if (status) data = data.filter(c => c.status === status);

    data.sort((a, b) => {
      switch (sortBy) {
        case "hdi-desc": return (b.hdi || 0) - (a.hdi || 0);
        case "hdi-asc": return (a.hdi || 0) - (b.hdi || 0);
        case "gdp-desc": return (b.gdp || 0) - (a.gdp || 0);
        case "population-desc": return (b.population || 0) - (a.population || 0);
        case "name-asc": return a.name.localeCompare(b.name);
        case "poverty-desc": return (b.poverty || 0) - (a.poverty || 0);
        default: return 0;
      }
    });
    return data;
  }, [search, continent, status, sortBy]);

  // Deduplicate by iso
  const unique = useMemo(() => {
    const seen = new Set();
    return filtered.filter(c => {
      if (seen.has(c.iso)) return false;
      seen.add(c.iso);
      return true;
    });
  }, [filtered]);

  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8 py-12">
        <div className="mb-8">
          <div className="text-xs font-bold text-amber-600 tracking-widest uppercase mb-2">Country Intelligence</div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">All Countries</h1>
          <p className="text-muted-foreground max-w-2xl">
            Comprehensive development profiles for every country — including HDI, economic data, infrastructure, 
            digital readiness, and investment opportunities.
          </p>
        </div>

        <CountryFilters
          search={search} onSearch={setSearch}
          continent={continent} onContinent={setContinent}
          status={status} onStatus={setStatus}
          sortBy={sortBy} onSort={setSortBy}
        />

        <div className="flex items-center gap-2 mb-4">
          <Globe className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Showing <strong className="text-foreground">{unique.length}</strong> countries</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {unique.map(c => (
            <CountryCard key={c.iso} country={c} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}