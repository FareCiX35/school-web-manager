import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-primary" />
      </div>
      <h1 className="text-4xl font-display font-bold text-foreground mb-4">404 - Sayfa Bulunamadı</h1>
      <p className="text-muted-foreground text-lg mb-8 text-center max-w-md">
        Aradığınız sayfa silinmiş veya adresi değiştirilmiş olabilir.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-xl px-8 h-14">
          Ana Sayfaya Dön
        </Button>
      </Link>
    </div>
  );
}
