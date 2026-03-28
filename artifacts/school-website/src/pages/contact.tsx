import { useState } from "react";
import { useContactApi } from "@/hooks/use-contact";
import { useSettingsApi } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { get: settings } = useSettingsApi();
  const { submit } = useContactApi();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit.mutate(
      { data: formData },
      {
        onSuccess: () => {
          toast({ title: "Mesajınız Alındı", description: "En kısa sürede size dönüş yapacağız." });
          setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        }
      }
    );
  };

  return (
    <div className="bg-muted/30 min-h-screen pb-20">
      <div className="bg-primary pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/pattern-bg.png)` }} />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">İletişim</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">Soru, görüş ve önerileriniz için bizimle iletişime geçebilirsiniz.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-2 gap-12">
          
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-border">
              <h2 className="text-2xl font-display font-bold mb-6">İletişim Bilgileri</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Adres</h4>
                    <p className="text-muted-foreground mt-1">{settings.data?.address || "Örnek Mah. Okul Sok. No:1 Ankara"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">Telefon</h4>
                    <p className="text-muted-foreground mt-1">{settings.data?.phone || "+90 312 123 4567"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">E-posta</h4>
                    <p className="text-muted-foreground mt-1">{settings.data?.email || "bilgi@okul.k12.tr"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-3xl h-[300px] overflow-hidden border border-border">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195884.30043132644!2d32.6588722!3d39.9032599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d52073281d%3A0x7b3f62be1d842469!2sAnkara!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str" 
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-border">
            <h2 className="text-2xl font-display font-bold mb-6">Bize Yazın</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="name">Ad Soyad</Label>
                <Input id="name" required className="mt-1 bg-muted/50 h-12" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" required className="mt-1 bg-muted/50 h-12" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input id="phone" className="mt-1 bg-muted/50 h-12" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Konu</Label>
                <Input id="subject" required className="mt-1 bg-muted/50 h-12" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="message">Mesajınız</Label>
                <Textarea id="message" required className="mt-1 bg-muted/50 min-h-[150px]" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 text-base rounded-xl" disabled={submit.isPending}>
                {submit.isPending ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Send className="w-5 h-5 mr-2" />}
                Mesajı Gönder
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
