import { useEventsApi } from "@/hooks/use-events";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { useState } from "react";

export default function EventsPage() {
  const { list: { data, isLoading } } = useEventsApi();
  const [filter, setFilter] = useState("Tümü");

  const categories = ["Tümü", ...Array.from(new Set(data?.events.map(e => e.category) || []))];
  
  const filteredEvents = filter === "Tümü" 
    ? data?.events 
    : data?.events.filter(e => e.category === filter);

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <div className="bg-primary pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/pattern-bg.png)` }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Etkinlik Takvimi</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Okulumuzda gerçekleşecek tüm seminer, gezi, sınav ve sosyal etkinlikleri buradan takip edebilirsiniz.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl p-4 shadow-lg shadow-black/5 flex overflow-x-auto gap-2 mb-12 border border-border scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                filter === cat ? "bg-primary text-white shadow-md" : "bg-muted/50 hover:bg-muted text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents?.map(evt => (
              <div key={evt.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border group flex flex-col">
                <div className="aspect-video bg-muted relative">
                  <img src={evt.imageUrl || `${import.meta.env.BASE_URL}images/about-school.png`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-2 rounded-lg font-bold text-center shadow-lg border border-white/50">
                    <div className="text-xs uppercase">{format(new Date(evt.eventDate), 'MMM', { locale: tr })}</div>
                    <div className="text-2xl leading-none font-display">{format(new Date(evt.eventDate), 'dd')}</div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{evt.category}</div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{evt.title}</h3>
                  <p className="text-muted-foreground text-sm flex-1 line-clamp-3 mb-6">{evt.description}</p>
                  
                  <div className="space-y-2 text-sm font-medium text-foreground/80 mt-auto pt-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {format(new Date(evt.eventDate), 'EEEE, HH:mm', { locale: tr })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {evt.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
