import { useStudentsApi } from "@/hooks/use-students";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { Loader2, Star, User } from "lucide-react";

export default function StudentsPage() {
  const { list: { data, isLoading } } = useStudentsApi();

  const studentOfMonth = data?.posts.find(p => p.isStudentOfMonth);
  const otherPosts = data?.posts.filter(p => !p.isStudentOfMonth) || [];

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <div className="bg-primary pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/pattern-bg.png)` }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Öğrenci Köşesi</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Öğrencilerimizin kaleminden yazılar, projeler ve başarı hikayeleri.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <>
            {studentOfMonth && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <Star className="w-8 h-8 text-accent fill-accent" />
                  <h2 className="text-3xl font-display font-bold text-foreground">Ayın Öğrencisi</h2>
                </div>
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-1 shadow-2xl">
                  <div className="bg-white rounded-[22px] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-accent/20 shrink-0">
                      <img src={studentOfMonth.imageUrl || `${import.meta.env.BASE_URL}images/about-school.png`} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
                        {studentOfMonth.authorClass}
                      </div>
                      <h3 className="text-3xl font-bold text-foreground mb-4">{studentOfMonth.authorName}</h3>
                      <h4 className="text-xl font-semibold text-accent mb-4">{studentOfMonth.title}</h4>
                      <p className="text-muted-foreground leading-relaxed text-lg">"{studentOfMonth.content}"</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-8">Öğrenci Çalışmaları</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map(post => (
                  <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all">
                    <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground">{post.authorName}</div>
                        <div className="text-xs text-muted-foreground font-medium">{post.authorClass} • {post.type}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{post.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-4 leading-relaxed mb-4">{post.content}</p>
                    <div className="text-xs text-muted-foreground text-right font-medium">
                      {format(new Date(post.createdAt), 'dd MMMM yyyy', { locale: tr })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
