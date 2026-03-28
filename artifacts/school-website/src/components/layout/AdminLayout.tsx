import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  CalendarDays,
  GraduationCap,
  Image as ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Megaphone,
  MessageSquare,
  Newspaper,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import logoImg from "@assets/download_1774721779500.png";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/announcements", label: "Duyurular", icon: Megaphone },
  { href: "/admin/events", label: "Etkinlikler", icon: CalendarDays },
  { href: "/admin/news", label: "Haberler", icon: Newspaper },
  { href: "/admin/students", label: "Ogrenciler", icon: Users },
  { href: "/admin/teachers", label: "Ogretmenler", icon: UserCheck },
  { href: "/admin/alumni", label: "Mezunlar", icon: GraduationCap },
  { href: "/admin/gallery", label: "Galeri", icon: ImageIcon },
  { href: "/admin/clubs", label: "Kulupler", icon: Users },
  { href: "/admin/contact", label: "Mesajlar", icon: MessageSquare },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user, isLoading, isError, error, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user && location !== "/admin/login") {
      setLocation("/admin/login");
    }
  }, [isLoading, location, setLocation, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user && location !== "/admin/login") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/50 px-6">
        <div className="max-w-md rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-display font-bold text-foreground">Oturum Dogrulanamadi</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {isError
              ? "API servisinden gecerli bir yanit alinamadi. Giris ekranina geri yonlendiriliyorsunuz."
              : "Giris yapmaniz gerekiyor. Giris ekranina geri yonlendiriliyorsunuz."}
          </p>
          {isError && (
            <p className="mt-3 text-xs text-muted-foreground">
              {(error as any)?.message || "Sunucuya baglanilamadi."}
            </p>
          )}
          <button
            onClick={() => setLocation("/admin/login")}
            className="mt-6 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Girise Don
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="fixed z-20 h-full w-64 flex-shrink-0 bg-sidebar text-sidebar-foreground shadow-2xl">
        <div className="flex items-center gap-3 border-b border-sidebar-border p-6">
          <img src={logoImg} alt="Logo" className="h-10 w-10 rounded-full bg-white p-0.5" />
          <div>
            <h2 className="text-sm font-display font-bold leading-tight text-white">
              Sehit Hakan Gulsen
            </h2>
            <p className="text-xs text-sidebar-primary">Yonetim Paneli</p>
          </div>
        </div>

        <nav className="h-[calc(100vh-140px)] overflow-y-auto p-4 space-y-1">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const active = location === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "" : "opacity-70"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full border-t border-sidebar-border bg-sidebar p-4">
          <button
            onClick={() => logout.mutate(undefined, { onSuccess: () => setLocation("/admin/login") })}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive transition-all hover:bg-destructive/20"
          >
            <LogOut className="h-5 w-5" />
            Cikis Yap
          </button>
        </div>
      </aside>

      <main className="ml-64 flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-white px-8 shadow-sm">
          <h1 className="text-xl font-display font-bold text-foreground">
            {ADMIN_LINKS.find((link) => link.href === location)?.label || "Yonetim Paneli"}
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              Siteye Don
            </Link>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {user?.fullName?.charAt(0) || "A"}
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">{children}</div>
      </main>
    </div>
  );
}
