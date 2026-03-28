import { useTeachersApi } from "@/hooks/use-teachers";
import { Loader2, Mail, PlayCircle } from "lucide-react";

export default function TeachersPage() {
  const { list: { data, isLoading } } = useTeachersApi();

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <div className="bg-primary pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/pattern-bg.png)` }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Öğretmen Atölyesi</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Uzman kadromuzla geleceğin liderlerini yetiştiriyoruz.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data?.teachers.map(teacher => (
              <div key={teacher.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border group hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                  <img src={teacher.imageUrl || `${import.meta.env.BASE_URL}images/about-school.png`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-primary via-primary/50 to-transparent pt-20 pb-4 px-4">
                    <h3 className="text-xl font-bold text-white leading-tight mb-1">{teacher.fullName}</h3>
                    <p className="text-accent font-medium text-sm">{teacher.branch}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4">
                    {teacher.title}
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4 h-[60px]">
                    {teacher.bio || "Biyografi eklenmemiş."}
                  </p>
                  
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    {teacher.email && (
                      <a href={`mailto:${teacher.email}`} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                    {teacher.videoUrl && (
                      <a href={teacher.videoUrl} target="_blank" rel="noreferrer" className="flex-1 h-10 rounded-full bg-accent/10 text-accent-foreground font-semibold text-sm flex items-center justify-center hover:bg-accent transition-colors gap-2">
                        <PlayCircle className="w-4 h-4" /> Örnek Ders
                      </a>
                    )}
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
