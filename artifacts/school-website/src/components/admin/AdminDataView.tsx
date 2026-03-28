import { useState } from "react";
import { format } from "date-fns";
import { Plus, Edit2, Trash2, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export type FieldDef = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'boolean' | 'date' | 'number';
  required?: boolean;
};

interface AdminDataViewProps<T> {
  title: string;
  description?: string;
  api: {
    list: any; // UseQuery result
    create?: any; // UseMutation
    update?: any; // UseMutation
    remove?: any; // UseMutation
  };
  extractData: (data: any) => T[];
  columns: { header: string; cell: (item: T) => React.ReactNode }[];
  fields?: FieldDef[];
}

export function AdminDataView<T extends { id: number }>({ 
  title, description, api, extractData, columns, fields 
}: AdminDataViewProps<T>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingItem, setDeletingItem] = useState<T | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const data = api.list.data ? extractData(api.list.data) : [];
  const filteredData = data.filter(item => 
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingItem(null);
    const initialData: any = {};
    fields?.forEach(f => {
      initialData[f.name] = f.type === 'boolean' ? false : '';
    });
    setFormData(initialData);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: T) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && api.update) {
      api.update.mutate(
        { id: editingItem.id, data: formData },
        {
          onSuccess: () => {
            toast({ title: "Başarılı", description: "Kayıt güncellendi." });
            setIsModalOpen(false);
          },
          onError: () => toast({ title: "Hata", description: "İşlem başarısız.", variant: "destructive" })
        }
      );
    } else if (api.create) {
      api.create.mutate(
        { data: formData },
        {
          onSuccess: () => {
            toast({ title: "Başarılı", description: "Kayıt oluşturuldu." });
            setIsModalOpen(false);
          },
          onError: () => toast({ title: "Hata", description: "İşlem başarısız.", variant: "destructive" })
        }
      );
    }
  };

  const handleDelete = () => {
    if (!deletingItem || !api.remove) return;
    api.remove.mutate(
      { id: deletingItem.id },
      {
        onSuccess: () => {
          toast({ title: "Başarılı", description: "Kayıt silindi." });
          setIsDeleteModalOpen(false);
        }
      }
    );
  };

  const isPending = api.create?.isPending || api.update?.isPending;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-border">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">{title}</h2>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        {api.create && fields && (
          <Button onClick={handleOpenCreate} className="rounded-xl px-6">
            <Plus className="w-4 h-4 mr-2" /> Yeni Ekle
          </Button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-muted/20">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Ara..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white rounded-xl"
            />
          </div>
        </div>

        {api.list.isLoading ? (
          <div className="flex justify-center items-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {columns.map((col, i) => (
                    <TableHead key={i} className="font-semibold text-foreground">{col.header}</TableHead>
                  ))}
                  {(api.update || api.remove) && <TableHead className="text-right">İşlemler</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="text-center py-8 text-muted-foreground">
                      Kayıt bulunamadı.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="group">
                      {columns.map((col, i) => (
                        <TableCell key={i} className="align-middle py-3">{col.cell(item)}</TableCell>
                      ))}
                      {(api.update || api.remove) && (
                        <TableCell className="text-right py-3">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {api.update && fields && (
                              <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(item)} className="h-8 w-8 text-primary hover:bg-primary/10">
                                <Edit2 className="w-4 h-4" />
                              </Button>
                            )}
                            {api.remove && (
                              <Button variant="ghost" size="icon" onClick={() => { setDeletingItem(item); setIsDeleteModalOpen(true); }} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {fields && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? "Kaydı Düzenle" : "Yeni Kayıt Ekle"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              {fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>{field.label} {field.required && "*"}</Label>
                  
                  {field.type === 'textarea' ? (
                    <Textarea 
                      id={field.name}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                      className="min-h-[100px]"
                    />
                  ) : field.type === 'boolean' ? (
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch 
                        id={field.name}
                        checked={!!formData[field.name]}
                        onCheckedChange={(c) => setFormData({...formData, [field.name]: c})}
                      />
                      <Label htmlFor={field.name} className="font-normal cursor-pointer">Aktif / Evet</Label>
                    </div>
                  ) : field.type === 'date' ? (
                    <Input 
                      id={field.name}
                      type="date"
                      required={field.required}
                      value={formData[field.name]?.split('T')[0] || ''}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    />
                  ) : field.type === 'number' ? (
                    <Input 
                      id={field.name}
                      type="number"
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({...formData, [field.name]: parseInt(e.target.value, 10)})}
                    />
                  ) : (
                    <Input 
                      id={field.name}
                      required={field.required}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData({...formData, [field.name]: e.target.value})}
                    />
                  )}
                </div>
              ))}
              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>İptal</Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Kaydet
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Emin misiniz?</DialogTitle>
            <DialogDescription>
              Bu kaydı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>İptal</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={api.remove?.isPending}>
              {api.remove?.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Evet, Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
