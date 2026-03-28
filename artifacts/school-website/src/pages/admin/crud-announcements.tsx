import { AdminDataView, FieldDef } from "@/components/admin/AdminDataView";
import { useAnnouncementsApi } from "@/hooks/use-announcements";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function AdminAnnouncements() {
  const api = useAnnouncementsApi();

  const columns = [
    { 
      header: "Başlık", 
      cell: (item: any) => <span className="font-medium">{item.title}</span> 
    },
    { 
      header: "Durum", 
      cell: (item: any) => item.isImportant ? <Badge variant="destructive">Önemli</Badge> : <Badge variant="secondary">Normal</Badge> 
    },
    { 
      header: "Tarih", 
      cell: (item: any) => <span className="text-sm text-muted-foreground">{format(new Date(item.createdAt), 'd MMM yyyy', { locale: tr })}</span> 
    }
  ];

  const fields: FieldDef[] = [
    { name: "title", label: "Başlık", type: "text", required: true },
    { name: "content", label: "İçerik", type: "textarea", required: true },
    { name: "isImportant", label: "Önemli Duyuru (Ana sayfada kırmızı görünür)", type: "boolean" },
  ];

  return (
    <AdminDataView 
      title="Duyuru Yönetimi" 
      description="Okul ile ilgili genel duyuruları ekleyin ve düzenleyin."
      api={api}
      extractData={(data) => data?.announcements || []}
      columns={columns}
      fields={fields}
    />
  );
}
