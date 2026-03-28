import { useGetAnnouncements, useGetEvents, useGetStudents, useGetTeachers } from "@workspace/api-client-react";
import { Users, Megaphone, CalendarDays, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const { data: annData } = useGetAnnouncements();
  const { data: eventsData } = useGetEvents();
  const { data: studentsData } = useGetStudents();
  const { data: teachersData } = useGetTeachers();

  const stats = [
    { title: "Duyurular", value: annData?.total || 0, icon: Megaphone, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Etkinlikler", value: eventsData?.events.length || 0, icon: CalendarDays, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Öğrenci Yazıları", value: studentsData?.posts.length || 0, icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
    { title: "Öğretmenler", value: teachersData?.teachers.length || 0, icon: UserCheck, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-display font-bold text-foreground">Hoş Geldiniz!</h2>
        <p className="text-muted-foreground mt-1">Okul web sitesinin tüm içeriklerini buradan yönetebilirsiniz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="border-border shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
        <h3 className="text-xl font-display font-bold text-primary mb-2">Hızlı İpuçları</h3>
        <ul className="list-disc list-inside space-y-2 text-primary/80">
          <li>Sol menüden yönetmek istediğiniz modülü seçin.</li>
          <li>Önemli duyurular ana sayfada kayan bantta gösterilir.</li>
          <li>Eklediğiniz etkinlikler tarihlerine göre otomatik sıralanır.</li>
          <li>Site genel ayarlarını "Ayarlar" sekmesinden değiştirebilirsiniz.</li>
        </ul>
      </div>
    </div>
  );
}
