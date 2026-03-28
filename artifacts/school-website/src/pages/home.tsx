import { Link } from "wouter";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, ChevronRight, GraduationCap, ArrowRight, Bell, BookOpen, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnnouncementsApi } from "@/hooks/use-announcements";
import { useNewsApi } from "@/hooks/use-news";
import { useEventsApi } from "@/hooks/use-events";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const { list: { data: annData } } = useAnnouncementsApi();
  const { list: { data: newsData } } = useNewsApi();
  const { list: { data: eventsData } } = useEventsApi();

  const importantAnns = annData?.announcements.filter(a => a.isImportant) || [];
  const latestNews = newsData?.news.slice(0, 3) || [];
  const upcomingEvents = eventsData?.events.slice(0, 4) || [];

  const slides = [
    {
      title: "Geleceğin Liderleri Yetişiyor",
      desc: "Milli ve manevi değerlerine bağlı, akademik başarıya odaklı eğitim anlayışı.",
      img: `${import.meta.env.BASE_URL}images/hero-bg.png`
    },
    {
      title: "Bilgi, İman, Erdem",
      desc: "Modern laboratuvarlar, zengin kütüphane ve donanımlı atölyelerle kapsamlı eğitim.",
      img: `${import.meta.env.BASE_URL}images/about-school.png`
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] bg-primary overflow-hidden">
        <div className="absolute inset-0 z-0" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, idx) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 relative h-full">
                <img src={slide.img} alt={slide.title} className="w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent font-semibold text-sm mb-6 backdrop-blur-md">
              Kayıt Dönemi Başladı
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-6 drop-shadow-lg">
              Şehit Hakan Gülşen <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">Anadolu İHL</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl font-medium drop-shadow-md">
              Akademik başarı ve ahlaki değerleri harmanlayan eğitim kadromuzla geleceğin vizyoner nesillerini yetiştiriyoruz.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/iletisim">
                <Button size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-white px-8 h-14 text-base shadow-xl shadow-accent/20 transition-all">
                  Bize Ulaşın <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/ogretmen-atolyesi">
                <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white hover:text-primary px-8 h-14 text-base backdrop-blur-sm">
                  Kadromuzu Tanıyın
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Announcements */}
      {importantAnns.length > 0 && (
        <div className="bg-destructive text-destructive-foreground py-3 overflow-hidden flex items-center relative z-20 shadow-md">
          <div className="bg-destructive z-10 px-4 flex items-center gap-2 font-bold whitespace-nowrap absolute left-0 h-full shadow-[10px_0_10px_rgba(0,0,0,0.1)]">
            <Bell className="w-5 h-5 animate-pulse" /> ÖNEMLİ DUYURULAR:
          </div>
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] pl-48">
            {importantAnns.map((ann, i) => (
              <span key={i} className="mx-8 font-medium">• {ann.title}</span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/pattern-bg.png)` }}></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, num: "850+", label: "Öğrenci" },
              { icon: GraduationCap, num: "65", label: "Öğretmen" },
              { icon: BookOpen, num: "15", label: "Aktif Kulüp" },
              { icon: Trophy, num: "25+", label: "Derece ve Ödül" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-primary transition-colors text-primary shadow-sm border border-primary/10">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-display font-bold text-foreground mb-1">{stat.num}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events Split */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* News */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex justify-between items-end border-b border-border pb-4">
                <div>
                  <h2 className="text-3xl font-display font-bold text-foreground">Güncel Haberler</h2>
                  <p className="text-muted-foreground mt-1">Okulumuzdan son gelişmeler ve başarılar</p>
                </div>
                <Link href="/news" className="text-primary font-semibold hover:text-accent flex items-center gap-1 hidden sm:flex">
                  Tümü <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {latestNews.map((news) => (
                  <Link key={news.id} href={`/news/${news.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-md shadow-black/5 border border-border hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                      <img src={news.imageUrl || `${import.meta.env.BASE_URL}images/about-school.png`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-4 left-4 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        {news.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-muted-foreground mb-3 font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(news.publishedAt || news.createdAt), 'dd MMMM yyyy', { locale: tr })}
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {news.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {news.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Events Sidebar */}
            <div className="space-y-8">
              <div className="border-b border-border pb-4">
                <h2 className="text-2xl font-display font-bold text-foreground">Yaklaşan Etkinlikler</h2>
              </div>
              
              <div className="space-y-4">
                {upcomingEvents.map((evt) => (
                  <div key={evt.id} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-border hover:border-primary/30 transition-colors group">
                    <div className="flex flex-col items-center justify-center w-16 h-16 bg-primary/5 rounded-xl border border-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                      <span className="text-xs font-bold uppercase">{format(new Date(evt.eventDate), 'MMM', { locale: tr })}</span>
                      <span className="text-2xl font-display font-bold leading-none">{format(new Date(evt.eventDate), 'dd')}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{evt.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {format(new Date(evt.eventDate), 'HH:mm')}
                      </p>
                      <p className="text-xs font-medium text-accent mt-2">{evt.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/etkinlikler" className="block w-full">
                <Button variant="outline" className="w-full rounded-xl border-primary/20 text-primary hover:bg-primary hover:text-white">
                  Tüm Etkinlikleri Gör
                </Button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
