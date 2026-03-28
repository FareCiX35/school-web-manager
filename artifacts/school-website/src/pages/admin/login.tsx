import { useState } from "react";
import { useLocation } from "wouter";
import { Loader2, LockKeyhole } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logoImg from "@assets/download_1774721779500.png";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate(
      { data: { username, password } },
      {
        onSuccess: () => {
          toast({
            title: "Giris Basarili",
            description: "Yonetim paneline yonlendiriliyorsunuz.",
          });
          setLocation("/admin");
        },
        onError: (error: any) => {
          const description =
            typeof error?.status === "number" && error.status >= 500
              ? "Sunucuya ulasilamadi. API servisinin dogru porta baglandigini kontrol edin."
              : "Kullanici adi veya sifre hatali.";

          toast({
            title: "Giris Basarisiz",
            description,
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary p-4">
      <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-1/3 rounded-full bg-accent/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-white/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-500">
        <div className="p-8 sm:p-12">
          <div className="mb-8 flex justify-center">
            <div className="h-20 w-20 rounded-full border-4 border-white bg-primary/5 p-2 shadow-lg">
              <img src={logoImg} alt="Logo" className="h-full w-full object-contain" />
            </div>
          </div>

          <div className="mb-10 text-center">
            <h1 className="text-2xl font-display font-bold text-foreground">Yonetim Paneli</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Lutfen yetkili bilgilerinizi giriniz.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Kullanici Adi</Label>
              <Input
                id="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 rounded-xl border-transparent bg-muted/50 px-4 transition-colors focus:border-primary focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sifre</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-transparent bg-muted/50 px-4 transition-colors focus:border-primary focus:bg-white"
              />
            </div>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <LockKeyhole className="mr-2 h-5 w-5" /> Giris Yap
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">Sadece yetkili personel icindir.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
