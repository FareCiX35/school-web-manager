import { useGalleryApi } from "@/hooks/use-gallery";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function GalleryPage() {
  const { list: { data, isLoading } } = useGalleryApi();
  const [filter, setFilter] = useState("Tümü");

  const categories = ["Tümü", ...Array.from(new Set(data?.items.map(i => i.category) || []))];
  const filteredItems = filter === "Tümü" ? data?.items : data?.items.filter(i => i.category === filter);

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <div className="bg-primary pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Okul Galerisi</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Okulumuzdan kareler, etkinlik fotoğrafları ve videolar.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                filter === cat ? "bg-primary text-white shadow-md" : "bg-white text-foreground border border-border hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems?.map(item => (
              <div key={item.id} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-border group relative">
                <img src={item.imageUrl} alt={item.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{item.category}</div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  {item.description && <p className="text-white/80 text-sm mt-2">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
