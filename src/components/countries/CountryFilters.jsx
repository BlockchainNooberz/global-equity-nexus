import { Search, SlidersHorizontal } from "lucide-react";
import { CONTINENTS } from "@/lib/worldData";

export default function CountryFilters({ search, onSearch, continent, onContinent, status, onStatus, sortBy, onSort }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search countries..."
          value={search}
          onChange={e => onSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
        />
      </div>

      {/* Continent filter */}
      <select
        value={continent}
        onChange={e => onContinent(e.target.value)}
        className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
      >
        <option value="">All Continents</option>
        {CONTINENTS.map(c => (
          <option key={c.id} value={c.name}>{c.name}</option>
        ))}
      </select>

      {/* Status filter */}
      <select
        value={status}
        onChange={e => onStatus(e.target.value)}
        className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
      >
        <option value="">All Status</option>
        <option value="Developed">Developed</option>
        <option value="Emerging">Emerging</option>
        <option value="Developing">Developing</option>
        <option value="Least Developed">Least Developed</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={e => onSort(e.target.value)}
        className="px-3 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
      >
        <option value="hdi-desc">Highest HDI</option>
        <option value="hdi-asc">Lowest HDI</option>
        <option value="gdp-desc">Highest GDP</option>
        <option value="population-desc">Largest Population</option>
        <option value="name-asc">Alphabetical</option>
        <option value="poverty-desc">Highest Poverty</option>
      </select>
    </div>
  );
}