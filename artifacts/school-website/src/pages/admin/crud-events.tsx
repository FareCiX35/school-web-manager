import { AdminDataView, FieldDef } from "@/components/admin/AdminDataView";
import { useEventsApi } from "@/hooks/use-events";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export default function AdminEvents() {
  const api = useEventsApi();

  const columns = [
    { 
      header: "Etkinlik Adı", 
      cell: (item: any) => <span className="font-medium">{item.title}</span> 
    },
    { 
      header: "Tarih", 
      cell: (item: any) => <span className="text-sm">{format(new Date(item.eventDate), 'd MMM yyyy', { locale: tr })}</span> 
    },
    { 
      header: "Kategori", 
      cell: (item: any) => <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">{item.category}</Badge> 
    }
  ];

  const fields: FieldDef[] = [
    { name: "title", label: "Etkinlik Adı", type: "text", required: true },
    { name: "description", label: "Açıklama", type: "textarea", required: true },
    { name: "eventDate", label: "Etkinlik Tarihi", type: "date", required: true },
    { name: "location", label: "Yer/Mekan", type: "text", required: true },
    { name: "category", label: "Kategori (Örn: Seminer, Gezi)", type: "text", required: true },
    { name: "imageUrl", label: "Görsel URL (İsteğe bağlı)", type: "text" },
  ];

  return (
    <AdminDataView 
      title="Etkinlik Yönetimi" 
      description="Okul etkinlik takvimini yönetin."
      api={api}
      extractData={(data) => data?.events || []}
      columns={columns}
      fields={fields}
    />
  );
}
