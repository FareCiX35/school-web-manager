import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LockKeyhole } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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
          toast({ title: "Giriş Başarılı", description: "Yönetim paneline yönlendiriliyorsunuz." });
          setLocation("/admin");
        },
        onError: () => {
          toast({ title: "Giriş Başarısız", description: "Kullanıcı adı veya şifre hatalı.", variant: "destructive" });
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="p-8 sm:p-12">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-primary/5 rounded-full p-2 border-4 border-white shadow-lg">
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-2xl font-display font-bold text-foreground">Yönetim Paneli</h1>
            <p className="text-muted-foreground text-sm mt-2">Lütfen yetkili bilgilerinizi giriniz.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input 
                id="username" 
                required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 px-4 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 px-4 rounded-xl bg-muted/50 border-transparent focus:border-primary focus:bg-white transition-colors" 
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              disabled={login.isPending}
            >
              {login.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <><LockKeyhole className="w-5 h-5 mr-2" /> Giriş Yap</>}
            </Button>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">Sadece yetkili personel içindir.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
