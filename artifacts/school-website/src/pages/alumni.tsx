import { useAlumniApi } from "@/hooks/use-alumni";
import { Loader2, GraduationCap, Briefcase, ChevronRight } from "lucide-react";

export default function AlumniPage() {
  const { list: { data, isLoading } } = useAlumniApi();

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <div className="bg-primary pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Mezunlar Kulübü</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Okulumuzdan mezun olan ve başarılarıyla gurur duyduğumuz öğrencilerimiz.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.alumni.map(alumnus => (
              <div key={alumnus.id} className="bg-white rounded-3xl p-8 shadow-sm border border-border relative overflow-hidden group hover:shadow-xl transition-all">
                {alumnus.isMentor && (
                  <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                    Gönüllü Mentor
                  </div>
                )}
                
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-muted shrink-0">
                    <img src={alumnus.imageUrl || `${import.meta.env.BASE_URL}images/about-school.png`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{alumnus.fullName}</h3>
                    <div className="flex items-center gap-1 text-sm text-primary font-medium mt-1">
                      <GraduationCap className="w-4 h-4" /> {alumnus.graduationYear} Mezunu
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/50 p-3 rounded-xl mb-6 border border-border">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {alumnus.occupation}
                </div>
                
                <p className="text-muted-foreground text-sm leading-relaxed italic relative z-10 line-clamp-4">
                  "{alumnus.story || "Eğitim hayatına okulumuzda başlayan mezunumuz, kariyerinde emin adımlarla ilerliyor."}"
                </p>
                
                <div className="absolute -bottom-6 -right-6 text-primary/5 group-hover:text-primary/10 transition-colors">
                  <GraduationCap className="w-32 h-32" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
