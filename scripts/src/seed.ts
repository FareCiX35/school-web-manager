import { db, adminUsersTable, announcementsTable, eventsTable, newsTable, teachersTable, clubsTable, alumniTable, studentPostsTable, galleryItemsTable, siteSettingsTable } from "@workspace/db";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  const existing = await db.select().from(adminUsersTable);
  if (existing.length === 0) {
    const hash = await bcrypt.hash("admin", 10);
    await db.insert(adminUsersTable).values({
      username: "admin",
      passwordHash: hash,
      fullName: "Sistem Yöneticisi",
    });
    console.log("Admin user created: admin/admin");
  } else {
    const hash = await bcrypt.hash("admin", 10);
    await db.update(adminUsersTable).set({ passwordHash: hash });
    console.log("Admin password reset to: admin");
  }

  const existingSettings = await db.select().from(siteSettingsTable);
  if (existingSettings.length === 0) {
    await db.insert(siteSettingsTable).values({
      schoolName: "Şehit Hakan Gülşen Anadolu İmam Hatip Lisesi",
      slogan: "Bilgi, İman, Erdem",
      address: "Örnek Mahallesi, Okul Caddesi No:1, 34000 İstanbul",
      phone: "+90 212 000 00 00",
      email: "info@hgaihl.edu.tr",
      whatsapp: "+905320000000",
      heroTitle: "Şehit Hakan Gülşen Anadolu İmam Hatip Lisesi",
      heroSubtitle: "Bilgi, İman ve Erdem ile geleceği inşa ediyoruz",
      aboutText: "Okulumuz, köklü bir geçmişe sahip olup öğrencilerimizi hem akademik hem de manevi değerler açısından donanımlı bireyler olarak yetiştirmeyi hedeflemektedir. Yılların verdiği tecrübe ile binlerce mezun verdik.",
      principalName: "Ahmet Yılmaz",
      principalMessage: "Değerli öğrenci, veli ve öğretmenlerimiz; okulumuz bilgi, iman ve erdem temelinde nesiller yetiştirmeyi kendine misyon edinmiştir. Her öğrencimiz bizim için kıymetlidir.",
      updatedAt: new Date(),
    });
    console.log("Site settings created");
  }

  const existingAnnouncements = await db.select().from(announcementsTable);
  if (existingAnnouncements.length === 0) {
    await db.insert(announcementsTable).values([
      {
        title: "2024-2025 Kayıt Dönemi Başladı",
        content: "2024-2025 eğitim öğretim yılı kayıt işlemleri başlamıştır. Detaylı bilgi için okul sekretaryamızla iletişime geçiniz.",
        isImportant: true,
        updatedAt: new Date(),
      },
      {
        title: "Dönem Sonu Sınav Takvimi",
        content: "Birinci dönem sonu sınavları 15-25 Ocak tarihleri arasında yapılacaktır. Öğrencilerimize başarılar diliyoruz.",
        isImportant: true,
        updatedAt: new Date(),
      },
      {
        title: "Veli Toplantısı Duyurusu",
        content: "Bu ay veli toplantımız 28 Ocak Salı günü saat 18:00'de okul konferans salonunda yapılacaktır. Tüm velilerimizi bekliyoruz.",
        isImportant: false,
        updatedAt: new Date(),
      },
      {
        title: "Kütüphane Yeni Kitaplar",
        content: "Okul kütüphanemize yeni kitaplar eklenmiştir. Öğrencilerimiz kütüphane saatlerinde yararlanabilirler.",
        isImportant: false,
        updatedAt: new Date(),
      },
    ]);
    console.log("Announcements seeded");
  }

  const existingEvents = await db.select().from(eventsTable);
  if (existingEvents.length === 0) {
    await db.insert(eventsTable).values([
      {
        title: "Bilim Şenliği 2025",
        description: "Öğrencilerimizin hazırladığı bilim projeleri sergilenecek, ilgi çekici deneylerin gösterimi yapılacaktır.",
        eventDate: new Date("2025-03-15"),
        location: "Okul Bahçesi",
        category: "Bilim",
      },
      {
        title: "Spor Günü",
        description: "Yıllık spor müsabakaları ve oyunlarımız düzenlenecektir. Tüm öğrencilerimiz katılabilir.",
        eventDate: new Date("2025-04-05"),
        location: "Okul Spor Salonu",
        category: "Spor",
      },
      {
        title: "Kur'an-ı Kerim Tilavet Yarışması",
        description: "Geleneksel tilavet yarışmamız bu yıl da düzenlenecektir. Başvurular okul idaresine yapılabilir.",
        eventDate: new Date("2025-03-25"),
        location: "Okul Konferans Salonu",
        category: "Kültürel",
      },
      {
        title: "Mezuniyet Töreni 2025",
        description: "2024-2025 eğitim yılı mezuniyet törenimiz. Aileleri ile birlikte tüm mezunlarımızı bekliyoruz.",
        eventDate: new Date("2025-06-20"),
        location: "Okul Amfisi",
        category: "Tören",
      },
    ]);
    console.log("Events seeded");
  }

  const existingNews = await db.select().from(newsTable);
  if (existingNews.length === 0) {
    await db.insert(newsTable).values([
      {
        title: "Öğrencilerimiz Matematik Olimpiyatlarında Birinci Oldu",
        summary: "Okulumuz öğrencileri il matematik olimpiyatlarında birincilik elde etti.",
        content: "Okulumuz öğrencileri, bu yıl düzenlenen il matematik olimpiyatlarında üstün başarı göstererek birincilik kupasını kazandı. Öğretmenlerimiz ve öğrencilerimizi tebrik ediyoruz.",
        category: "Başarı",
        publishedAt: new Date("2025-01-15"),
      },
      {
        title: "Yeni Bilgisayar Laboratuvarı Açıldı",
        summary: "Okulumuzda modern donanımlı yeni bilgisayar laboratuvarı hizmete girdi.",
        content: "50 bilgisayardan oluşan yeni laboratuvarımız, öğrencilerimizin teknoloji eğitimini daha etkin bir şekilde almasına imkan sağlayacak.",
        category: "Haber",
        publishedAt: new Date("2025-01-10"),
      },
      {
        title: "Çevre Temizliği Etkinliği Düzenlendi",
        summary: "Öğrencilerimiz çevre temizliğine destek verdi.",
        content: "Kulüp öğrencilerimiz, okul çevresinde çevre temizliği etkinliği düzenledi. Bu etkinlik ile öğrencilerimize çevre bilinci kazandırılmaktadır.",
        category: "Etkinlik",
        publishedAt: new Date("2025-01-05"),
      },
    ]);
    console.log("News seeded");
  }

  const existingTeachers = await db.select().from(teachersTable);
  if (existingTeachers.length === 0) {
    await db.insert(teachersTable).values([
      {
        fullName: "Mehmet Kaya",
        branch: "Matematik",
        title: "Öğretmen",
        bio: "20 yıllık deneyimi ile matematik derslerini sevdiren bir öğretmen.",
        email: "mehmet.kaya@hgaihl.edu.tr",
      },
      {
        fullName: "Fatma Şahin",
        branch: "Türk Dili ve Edebiyatı",
        title: "Öğretmen",
        bio: "Edebiyat aşkını öğrencilerine aktaran, ödüllü bir öğretmen.",
        email: "fatma.sahin@hgaihl.edu.tr",
      },
      {
        fullName: "Ali Demir",
        branch: "Fizik",
        title: "Öğretmen",
        bio: "Fizik derslerini deneylerle öğreten yenilikçi bir öğretmen.",
        email: "ali.demir@hgaihl.edu.tr",
      },
      {
        fullName: "Ayşe Yıldız",
        branch: "Kuran-ı Kerim",
        title: "Öğretmen",
        bio: "Hafızlık eğitiminde uzman, öğrencileri ile manevi bağ kuran bir öğretmen.",
        email: "ayse.yildiz@hgaihl.edu.tr",
      },
      {
        fullName: "Hasan Arslan",
        branch: "Beden Eğitimi",
        title: "Öğretmen",
        bio: "Spor ve sağlıklı yaşamı öğrencilerine aşılayan enerjik bir öğretmen.",
        email: "hasan.arslan@hgaihl.edu.tr",
      },
      {
        fullName: "Zeynep Koç",
        branch: "İngilizce",
        title: "Öğretmen",
        bio: "Yurt dışı deneyimi ile İngilizce eğitimini çok daha etkili kılan bir öğretmen.",
        email: "zeynep.koc@hgaihl.edu.tr",
      },
    ]);
    console.log("Teachers seeded");
  }

  const existingClubs = await db.select().from(clubsTable);
  if (existingClubs.length === 0) {
    await db.insert(clubsTable).values([
      {
        name: "Bilim Kulübü",
        description: "Bilim projelerini keşfeden ve yenilikçi deneyler yapan bir kulüp.",
        advisorName: "Ali Demir",
        memberCount: 45,
      },
      {
        name: "Spor Kulübü",
        description: "Futbol, basketbol ve voleybol takımlarımızla öğrencilerin spor yapmasını sağlayan kulüp.",
        advisorName: "Hasan Arslan",
        memberCount: 80,
      },
      {
        name: "Edebiyat Kulübü",
        description: "Öğrencilerin yazı yazmalarını ve okuma alışkanlığı kazanmalarını teşvik eden kulüp.",
        advisorName: "Fatma Şahin",
        memberCount: 35,
      },
      {
        name: "Çevre Kulübü",
        description: "Çevre bilinci ve doğa sevgisini geliştiren etkinlikler düzenleyen kulüp.",
        advisorName: "Zeynep Koç",
        memberCount: 30,
      },
      {
        name: "Münazara Kulübü",
        description: "Öğrencilerin hitabet ve tartışma becerilerini geliştiren kulüp.",
        advisorName: "Mehmet Kaya",
        memberCount: 25,
      },
      {
        name: "Satranç Kulübü",
        description: "Stratejik düşünmeyi ve mantık gelişimini destekleyen satranç kulübü.",
        advisorName: "Mehmet Kaya",
        memberCount: 40,
      },
    ]);
    console.log("Clubs seeded");
  }

  const existingAlumni = await db.select().from(alumniTable);
  if (existingAlumni.length === 0) {
    await db.insert(alumniTable).values([
      {
        fullName: "Dr. Mustafa Öztürk",
        graduationYear: 2010,
        occupation: "Tıp Doktoru",
        story: "Okulumuzdan mezun olduktan sonra tıp fakültesini bitirerek İstanbul'da cerrah olarak görev yapıyorum.",
        isMentor: true,
      },
      {
        fullName: "Prof. Dr. Selim Aydın",
        graduationYear: 2005,
        occupation: "Üniversite Öğretim Üyesi",
        story: "İmam hatip eğitimimin bana kazandırdığı değerler ile akademik kariyerimi sürdürüyorum.",
        isMentor: true,
      },
      {
        fullName: "Av. Selin Yılmaz",
        graduationYear: 2012,
        occupation: "Avukat",
        story: "Hukuk fakültesini bitirerek avukatlık yapıyorum. Okulumun bana kattığı disiplin çok büyük.",
        isMentor: false,
      },
      {
        fullName: "Mühendis Kadir Çelik",
        graduationYear: 2015,
        occupation: "Yazılım Mühendisi",
        story: "Teknoloji alanında çalışıyorum. İmam hatip eğitimi bana güçlü bir ahlaki temel kazandırdı.",
        isMentor: true,
      },
    ]);
    console.log("Alumni seeded");
  }

  const existingStudents = await db.select().from(studentPostsTable);
  if (existingStudents.length === 0) {
    await db.insert(studentPostsTable).values([
      {
        title: "Teknoloji ve İnsanlık",
        content: "Günümüzde teknoloji hayatımızın her alanına girmiştir. Bu gelişmeleri doğru kullanmak bizim elimizdedir...",
        authorName: "Enes Kara",
        authorClass: "11-A",
        type: "blog",
        isStudentOfMonth: true,
      },
      {
        title: "Çevre Kirliliğine Karşı Çözümler",
        content: "Çevre kirliliği dünyamızı tehdit etmektedir. Bu konuda yapabileceğimiz küçük değişiklikler...",
        authorName: "Merve Demir",
        authorClass: "10-B",
        type: "proje",
        isStudentOfMonth: false,
      },
      {
        title: "Dijital Dünyada Gençlik",
        content: "Sosyal medya ve dijital araçlar hayatımızın ayrılmaz bir parçası haline geldi. Bizi nasıl etkilediğini ele aldım...",
        authorName: "Yusuf Şahin",
        authorClass: "12-A",
        type: "blog",
        isStudentOfMonth: false,
      },
    ]);
    console.log("Student posts seeded");
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
