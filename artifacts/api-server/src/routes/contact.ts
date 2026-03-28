import { Router, type IRouter, type Request, type Response } from "express";
import { db, contactMessagesTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "Tüm alanları doldurun" });
      return;
    }
    await db.insert(contactMessagesTable).values({ name, email, phone, subject, message });
    res.json({ success: true, message: "Mesajınız iletildi" });
  } catch (err) {
    req.log.error({ err }, "Submit contact error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const messages = await db.select().from(contactMessagesTable).orderBy(desc(contactMessagesTable.createdAt));
    res.json({ messages });
  } catch (err) {
    req.log.error({ err }, "Get contacts error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:id/read", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(String(req.params.id), 10);
    await db.update(contactMessagesTable).set({ isRead: true }).where(eq(contactMessagesTable.id, id));
    res.json({ success: true, message: "Okundu olarak işaretlendi" });
  } catch (err) {
    req.log.error({ err }, "Mark read error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
