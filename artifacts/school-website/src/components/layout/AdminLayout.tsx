import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, Megaphone, CalendarDays, Newspaper, 
  Users, UserCheck, GraduationCap, Image as ImageIcon,
  MessageSquare, Settings, LogOut, Loader2
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import logoImg from "@assets/download_1774721779500.png";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/announcements", label: "Duyurular", icon: Megaphone },
  { href: "/admin/events", label: "Etkinlikler", icon: CalendarDays },
  { href: "/admin/news", label: "Haberler", icon: Newspaper },
  { href: "/admin/students", label: "Öğrenciler", icon: Users },
  { href: "/admin/teachers", label: "Öğretmenler", icon: UserCheck },
  { href: "/admin/alumni", label: "Mezunlar", icon: GraduationCap },
  { href: "/admin/gallery", label: "Galeri", icon: ImageIcon },
  { href: "/admin/clubs", label: "Kulüpler", icon: Users },
  { href: "/admin/contact", label: "Mesajlar", icon: MessageSquare },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && location !== "/admin/login") {
    setLocation("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex-shrink-0 fixed h-full shadow-2xl z-20">
        <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="w-10 h-10 bg-white rounded-full p-0.5" />
          <div>
            <h2 className="font-display font-bold text-sm leading-tight text-white">Şehit Hakan Gülşen</h2>
            <p className="text-xs text-sidebar-primary">Yönetim Paneli</p>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-140px)]">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const active = location === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  active 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground/80"
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? "" : "opacity-70"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-sidebar-border bg-sidebar">
          <button 
            onClick={() => logout.mutate(undefined, { onSuccess: () => setLocation("/admin/login") })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-destructive hover:bg-destructive/20 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <h1 className="font-display font-bold text-xl text-foreground">
            {ADMIN_LINKS.find(l => l.href === location)?.label || "Yönetim Paneli"}
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
              Siteye Dön
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              {user?.fullName?.charAt(0) || "A"}
            </div>
          </div>
        </header>
        
        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
