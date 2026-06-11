import { SDG_GOALS } from "@/lib/worldData";

export default function SDGSection() {
  return (
    <section className="py-16 bg-[hsl(222,47%,11%)]">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <div className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-2">Framework</div>
          <h2 className="font-display text-3xl font-bold text-white">UN Sustainable Development Goals</h2>
          <p className="text-white/60 mt-2 max-w-2xl mx-auto text-sm">
            Our platform tracks all 17 SDGs across every country, enabling precise targeting of development resources.
          </p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-3">
          {SDG_GOALS.map((sdg) => (
            <div
              key={sdg.id}
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              style={{ backgroundColor: sdg.color + "20", border: `1px solid ${sdg.color}40` }}
            >
              <div className="p-3 text-center">
                <div className="text-2xl mb-1">{sdg.icon}</div>
                <div className="text-[9px] font-bold text-white/80 leading-tight uppercase tracking-wide">
                  SDG {sdg.id}
                </div>
                <div className="text-[9px] text-white/60 mt-0.5 leading-tight">{sdg.name}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-white/40">
          <span>Source: United Nations 2030 Agenda for Sustainable Development</span>
          <span>•</span>
          <span>193 UN Member States committed</span>
          <span>•</span>
          <span>Deadline: 2030</span>
        </div>
      </div>
    </section>
  );
}