import { Router, type IRouter, type Request, type Response } from "express";
import { db, clubsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const clubs = await db.select().from(clubsTable).orderBy(desc(clubsTable.createdAt));
    res.json({ clubs });
  } catch (err) {
    req.log.error({ err }, "Get clubs error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const { name, description, advisorName, imageUrl, memberCount } = req.body;
    const items = await db.insert(clubsTable).values({ name, description, advisorName, imageUrl, memberCount }).returning();
    res.status(201).json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Create club error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(req.params.id);
    const { name, description, advisorName, imageUrl, memberCount } = req.body;
    const items = await db.update(clubsTable)
      .set({ name, description, advisorName, imageUrl, memberCount })
      .where(eq(clubsTable.id, id)).returning();
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Update club error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(req.params.id);
    await db.delete(clubsTable).where(eq(clubsTable.id, id));
    res.json({ success: true, message: "Silindi" });
  } catch (err) {
    req.log.error({ err }, "Delete club error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
