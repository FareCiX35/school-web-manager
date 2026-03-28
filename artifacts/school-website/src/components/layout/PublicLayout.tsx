import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, MapPin, Phone, Mail, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/download_1774721779500.png";
import { useSettingsApi } from "@/hooks/use-settings";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/etkinlikler", label: "Etkinlikler" },
  { href: "/ogrenci-kosesi", label: "Öğrenci Köşesi" },
  { href: "/ogretmen-atolyesi", label: "Öğretmen Atölyesi" },
  { href: "/mezunlar-kulubu", label: "Mezunlar Kulübü" },
  { href: "/galeri", label: "Galeri" },
  { href: "/iletisim", label: "İletişim" },
];

export function PublicLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { get: settings } = useSettingsApi();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-xs font-medium hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-accent" /> 
              {settings.data?.email || "bilgi@hghlisesi.edu.tr"}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-accent" /> 
              {settings.data?.phone || "+90 (312) 123 45 67"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-accent">Bilgi, İman, Erdem</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-effect py-3" : "bg-white py-5 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative overflow-hidden rounded-full w-12 h-12 border-2 border-primary/10 shadow-sm group-hover:shadow-md transition-all">
              <img src={logoImg} alt="Okul Logosu" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-display font-bold text-lg leading-tight text-primary">
                Şehit Hakan Gülşen
              </h1>
              <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                Anadolu İmam Hatip Lisesi
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  location === link.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 rounded-md hover:bg-muted text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-border shadow-xl overflow-hidden absolute top-full left-0 w-full z-40"
          >
            <nav className="flex flex-col px-4 py-6 gap-2">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`flex items-center justify-between p-4 rounded-xl font-medium ${
                    location === link.href 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="flex-1 flex flex-col relative z-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground relative overflow-hidden pt-16 pb-8 border-t-[6px] border-accent">
        {/* Abstract background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full p-1">
                  <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">Şehit Hakan Gülşen</h3>
                  <p className="text-xs text-primary-foreground/70 uppercase tracking-widest">AİHL</p>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                Milli ve manevi değerlerine bağlı, çağın gerektirdiği bilgi ve becerilerle donatılmış, geleceğin liderlerini yetiştiriyoruz.
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                Hızlı Bağlantılar
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.slice(1, 5).map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-accent hover:translate-x-1 transition-all inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                İletişim
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                  <MapPin className="w-5 h-5 text-accent shrink-0" />
                  <span>{settings.data?.address || "Örnek Mahallesi, Okul Sokak No:1 Merkez/Ankara"}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                  <Phone className="w-5 h-5 text-accent shrink-0" />
                  <span>{settings.data?.phone || "+90 (312) 123 45 67"}</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                  <Mail className="w-5 h-5 text-accent shrink-0" />
                  <span>{settings.data?.email || "bilgi@hghlisesi.edu.tr"}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                Okul Tanıtım Videosu
              </h4>
              <div className="bg-primary-foreground/10 rounded-xl aspect-video flex items-center justify-center relative overflow-hidden group cursor-pointer border border-white/10">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all" />
                <div className="w-12 h-12 bg-accent text-primary rounded-full flex items-center justify-center relative z-10 shadow-lg group-hover:scale-110 transition-transform">
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-primary border-b-[8px] border-b-transparent ml-1" />
                </div>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60 text-center md:text-left">
              &copy; {new Date().getFullYear()} Şehit Hakan Gülşen AİHL. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-xs text-primary-foreground/40 hover:text-white transition-colors">
                Yönetim
              </Link>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-all"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
