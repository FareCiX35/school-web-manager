import { Router, type IRouter, type Request, type Response } from "express";
import { db, announcementsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const limit = req.query.limit ? parseInt(String(req.query.limit)) : 100;
    const offset = req.query.offset ? parseInt(String(req.query.offset)) : 0;
    const all = await db.select().from(announcementsTable).orderBy(desc(announcementsTable.createdAt)).limit(limit).offset(offset);
    const countResult = await db.select().from(announcementsTable);
    res.json({ announcements: all, total: countResult.length });
  } catch (err) {
    req.log.error({ err }, "Get announcements error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const items = await db.select().from(announcementsTable).where(eq(announcementsTable.id, id));
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Get announcement error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const { title, content, isImportant } = req.body;
    const items = await db.insert(announcementsTable).values({
      title, content, isImportant: isImportant ?? false,
      updatedAt: new Date(),
    }).returning();
    res.status(201).json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Create announcement error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(req.params.id);
    const { title, content, isImportant } = req.body;
    const items = await db.update(announcementsTable)
      .set({ title, content, isImportant: isImportant ?? false, updatedAt: new Date() })
      .where(eq(announcementsTable.id, id)).returning();
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Update announcement error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(req.params.id);
    await db.delete(announcementsTable).where(eq(announcementsTable.id, id));
    res.json({ success: true, message: "Silindi" });
  } catch (err) {
    req.log.error({ err }, "Delete announcement error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
