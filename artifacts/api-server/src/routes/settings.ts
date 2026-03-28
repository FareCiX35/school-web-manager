import { Router, type IRouter, type Request, type Response } from "express";
import { db, siteSettingsTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const settings = await db.select().from(siteSettingsTable).limit(1);
    if (!settings[0]) {
      const defaults = await db.insert(siteSettingsTable).values({
        schoolName: "Şehit Hakan Gülşen Anadolu İmam Hatip Lisesi",
        slogan: "Bilgi, İman, Erdem",
        address: "Örnek Mah. Okul Cad. No:1, İstanbul",
        phone: "+90 212 000 00 00",
        email: "info@hgaihl.edu.tr",
        whatsapp: "+90 212 000 00 00",
        heroTitle: "Şehit Hakan Gülşen Anadolu İmam Hatip Lisesi",
        heroSubtitle: "Bilgi, İman ve Erdem ile geleceği inşa ediyoruz",
        aboutText: "Okulumuz, köklü bir geçmişe sahip olup öğrencilerimizi hem akademik hem de manevi değerler açısından donanımlı bireyler olarak yetiştirmeyi hedeflemektedir.",
        principalName: "Okul Müdürü",
        principalMessage: "Değerli öğrenci, veli ve öğretmenlerimiz, okulumuz bilgi, iman ve erdem temelinde nesiller yetiştirmeyi kendine misyon edinmiştir.",
        updatedAt: new Date(),
      }).returning();
      res.json(defaults[0]);
      return;
    }
    res.json(settings[0]);
  } catch (err) {
    req.log.error({ err }, "Get settings error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const existing = await db.select().from(siteSettingsTable).limit(1);
    const data = { ...req.body, updatedAt: new Date() };
    if (!existing[0]) {
      const items = await db.insert(siteSettingsTable).values(data).returning();
      res.json(items[0]);
    } else {
      const items = await db.update(siteSettingsTable).set(data).returning();
      res.json(items[0]);
    }
  } catch (err) {
    req.log.error({ err }, "Update settings error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
