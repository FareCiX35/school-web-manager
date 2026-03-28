import { AdminDataView, FieldDef } from "@/components/admin/AdminDataView";
import { useNewsApi } from "@/hooks/use-news";
import { useStudentsApi } from "@/hooks/use-students";
import { useTeachersApi } from "@/hooks/use-teachers";
import { useGalleryApi } from "@/hooks/use-gallery";
import { useAlumniApi } from "@/hooks/use-alumni";
import { useClubsApi } from "@/hooks/use-clubs";
import { useContactApi } from "@/hooks/use-contact";
import { useSettingsApi } from "@/hooks/use-settings";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

// Centralized exports for simpler CRUD pages using the generic AdminDataView
export function AdminNews() {
  const api = useNewsApi();
  const columns = [
    { header: "Haber Başlığı", cell: (item: any) => <span className="font-medium">{item.title}</span> },
    { header: "Kategori", cell: (item: any) => <Badge variant="secondary">{item.category}</Badge> }
  ];
  const fields: FieldDef[] = [
    { name: "title", label: "Başlık", type: "text", required: true },
    { name: "summary", label: "Özet", type: "textarea", required: true },
    { name: "content", label: "İçerik", type: "textarea", required: true },
    { name: "category", label: "Kategori", type: "text", required: true },
    { name: "imageUrl", label: "Görsel URL", type: "text" },
  ];
  return <AdminDataView title="Haber Yönetimi" api={api} extractData={(d) => d?.news || []} columns={columns} fields={fields} />;
}

export function AdminStudents() {
  const api = useStudentsApi();
  const columns = [
    { header: "Yazar", cell: (item: any) => <span className="font-medium">{item.authorName} ({item.authorClass})</span> },
    { header: "Başlık", cell: (item: any) => item.title },
    { header: "Ayın Öğrencisi", cell: (item: any) => item.isStudentOfMonth ? <Badge className="bg-accent">Evet</Badge> : "-" }
  ];
  const fields: FieldDef[] = [
    { name: "authorName", label: "Öğrenci Adı", type: "text", required: true },
    { name: "authorClass", label: "Sınıfı", type: "text", required: true },
    { name: "title", label: "Başlık", type: "text", required: true },
    { name: "content", label: "İçerik/Açıklama", type: "textarea", required: true },
    { name: "type", label: "İçerik Türü (Blog, Proje vs)", type: "text", required: true },
    { name: "imageUrl", label: "Görsel URL", type: "text" },
    { name: "isStudentOfMonth", label: "Ayın Öğrencisi mi?", type: "boolean" },
  ];
  return <AdminDataView title="Öğrenci Köşesi" api={api} extractData={(d) => d?.posts || []} columns={columns} fields={fields} />;
}

export function AdminTeachers() {
  const api = useTeachersApi();
  const columns = [
    { header: "Ad Soyad", cell: (item: any) => <span className="font-medium">{item.fullName}</span> },
    { header: "Branş", cell: (item: any) => item.branch },
    { header: "Ünvan", cell: (item: any) => <Badge variant="outline">{item.title}</Badge> }
  ];
  const fields: FieldDef[] = [
    { name: "fullName", label: "Ad Soyad", type: "text", required: true },
    { name: "branch", label: "Branşı", type: "text", required: true },
    { name: "title", label: "Ünvanı (Örn: Uzman Öğretmen)", type: "text", required: true },
    { name: "bio", label: "Biyografi", type: "textarea" },
    { name: "email", label: "E-posta", type: "text" },
    { name: "imageUrl", label: "Fotoğraf URL", type: "text" },
    { name: "videoUrl", label: "Örnek Ders Video URL", type: "text" },
  ];
  return <AdminDataView title="Öğretmen Kadrosu" api={api} extractData={(d) => d?.teachers || []} columns={columns} fields={fields} />;
}

export function AdminAlumni() {
  const api = useAlumniApi();
  const columns = [
    { header: "Ad Soyad", cell: (item: any) => <span className="font-medium">{item.fullName}</span> },
    { header: "Mezuniyet Yılı", cell: (item: any) => item.graduationYear },
    { header: "Meslek", cell: (item: any) => item.occupation },
    { header: "Mentor", cell: (item: any) => item.isMentor ? <Badge>Mentor</Badge> : "-" }
  ];
  const fields: FieldDef[] = [
    { name: "fullName", label: "Ad Soyad", type: "text", required: true },
    { name: "graduationYear", label: "Mezuniyet Yılı", type: "number", required: true },
    { name: "occupation", label: "Meslek/Üniversite", type: "text", required: true },
    { name: "story", label: "Başarı Hikayesi", type: "textarea" },
    { name: "imageUrl", label: "Fotoğraf URL", type: "text" },
    { name: "isMentor", label: "Mentorluk Yapıyor mu?", type: "boolean" },
  ];
  return <AdminDataView title="Mezunlar Kulübü" api={api} extractData={(d) => d?.alumni || []} columns={columns} fields={fields} />;
}

export function AdminGallery() {
  const api = useGalleryApi();
  const columns = [
    { header: "Görsel", cell: (item: any) => <img src={item.imageUrl} className="w-16 h-12 object-cover rounded" /> },
    { header: "Başlık", cell: (item: any) => item.title },
    { header: "Kategori", cell: (item: any) => item.category }
  ];
  const fields: FieldDef[] = [
    { name: "title", label: "Başlık", type: "text", required: true },
    { name: "category", label: "Kategori (Okul, Etkinlik vs)", type: "text", required: true },
    { name: "imageUrl", label: "Görsel URL", type: "text", required: true },
    { name: "description", label: "Açıklama", type: "textarea" },
  ];
  return <AdminDataView title="Galeri Yönetimi" api={api} extractData={(d) => d?.items || []} columns={columns} fields={fields} />;
}

export function AdminClubs() {
  const api = useClubsApi();
  const columns = [
    { header: "Kulüp Adı", cell: (item: any) => <span className="font-medium">{item.name}</span> },
    { header: "Danışman", cell: (item: any) => item.advisorName },
    { header: "Üye Sayısı", cell: (item: any) => item.memberCount }
  ];
  const fields: FieldDef[] = [
    { name: "name", label: "Kulüp Adı", type: "text", required: true },
    { name: "advisorName", label: "Danışman Öğretmen", type: "text" },
    { name: "description", label: "Açıklama", type: "textarea", required: true },
    { name: "memberCount", label: "Üye Sayısı", type: "number" },
    { name: "imageUrl", label: "Görsel URL", type: "text" },
  ];
  return <AdminDataView title="Okul Kulüpleri" api={api} extractData={(d) => d?.clubs || []} columns={columns} fields={fields} />;
}

export function AdminContact() {
  const api = useContactApi();
  const columns = [
    { header: "Gönderen", cell: (item: any) => <span className="font-medium">{item.name}</span> },
    { header: "Konu", cell: (item: any) => item.subject },
    { header: "Tarih", cell: (item: any) => <span className="text-sm">{format(new Date(item.createdAt), 'dd.MM.yyyy HH:mm')}</span> }
  ];
  // Contact messages are read-only in this implementation
  return <AdminDataView title="Gelen Mesajlar" api={{ list: api.list }} extractData={(d) => d?.messages || []} columns={columns} />;
}

export function AdminSettings() {
  const { get, update } = useSettingsApi();
  const { toast } = useToast();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (get.data) setFormData(get.data);
  }, [get.data]);

  if (get.isLoading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update.mutate(
      { data: formData },
      { 
        onSuccess: () => toast({ title: "Başarılı", description: "Ayarlar güncellendi." }),
        onError: () => toast({ title: "Hata", description: "Güncelleme başarısız.", variant: "destructive" })
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-8 animate-in fade-in">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Site Ayarları</h2>
          <p className="text-muted-foreground mt-1">Okul iletişim bilgileri ve genel metinleri düzenleyin.</p>
        </div>
        <Button onClick={handleSubmit} disabled={update.isPending} className="rounded-xl px-6">
          {update.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Kaydet
        </Button>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Temel Bilgiler</h3>
          <div>
            <Label>Okul Adı</Label>
            <Input value={formData.schoolName || ''} onChange={e => setFormData({...formData, schoolName: e.target.value})} />
          </div>
          <div>
            <Label>Slogan</Label>
            <Input value={formData.slogan || ''} onChange={e => setFormData({...formData, slogan: e.target.value})} />
          </div>
          <div>
            <Label>Ana Sayfa Başlığı</Label>
            <Input value={formData.heroTitle || ''} onChange={e => setFormData({...formData, heroTitle: e.target.value})} />
          </div>
          <div>
            <Label>Hakkımızda Metni</Label>
            <Textarea className="h-32" value={formData.aboutText || ''} onChange={e => setFormData({...formData, aboutText: e.target.value})} />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">İletişim Bilgileri</h3>
          <div>
            <Label>Adres</Label>
            <Textarea value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} />
          </div>
          <div>
            <Label>Telefon</Label>
            <Input value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div>
            <Label>E-posta</Label>
            <Input value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <Label>Müdür Adı</Label>
            <Input value={formData.principalName || ''} onChange={e => setFormData({...formData, principalName: e.target.value})} />
          </div>
        </div>
      </form>
    </div>
  );
}
