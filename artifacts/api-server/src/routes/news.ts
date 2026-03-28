import { Router, type IRouter, type Request, type Response } from "express";
import { db, newsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const news = await db.select().from(newsTable).orderBy(desc(newsTable.publishedAt));
    res.json({ news });
  } catch (err) {
    req.log.error({ err }, "Get news error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(String(req.params.id), 10);
    const items = await db.select().from(newsTable).where(eq(newsTable.id, id));
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Get news item error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const { title, summary, content, imageUrl, category, publishedAt } = req.body;
    const items = await db.insert(newsTable).values({
      title, summary, content, imageUrl, category,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    }).returning();
    res.status(201).json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Create news error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(String(req.params.id), 10);
    const { title, summary, content, imageUrl, category, publishedAt } = req.body;
    const items = await db.update(newsTable)
      .set({ title, summary, content, imageUrl, category, publishedAt: publishedAt ? new Date(publishedAt) : new Date() })
      .where(eq(newsTable.id, id)).returning();
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Update news error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(String(req.params.id), 10);
    await db.delete(newsTable).where(eq(newsTable.id, id));
    res.json({ success: true, message: "Silindi" });
  } catch (err) {
    req.log.error({ err }, "Delete news error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
