import { Router, type IRouter, type Request, type Response } from "express";
import { db, teachersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const teachers = await db.select().from(teachersTable).orderBy(desc(teachersTable.createdAt));
    res.json({ teachers });
  } catch (err) {
    req.log.error({ err }, "Get teachers error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const { fullName, branch, title, bio, imageUrl, videoUrl, email } = req.body;
    const items = await db.insert(teachersTable).values({ fullName, branch, title, bio, imageUrl, videoUrl, email }).returning();
    res.status(201).json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Create teacher error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(String(req.params.id), 10);
    const { fullName, branch, title, bio, imageUrl, videoUrl, email } = req.body;
    const items = await db.update(teachersTable)
      .set({ fullName, branch, title, bio, imageUrl, videoUrl, email })
      .where(eq(teachersTable.id, id)).returning();
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Update teacher error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(String(req.params.id), 10);
    await db.delete(teachersTable).where(eq(teachersTable.id, id));
    res.json({ success: true, message: "Silindi" });
  } catch (err) {
    req.log.error({ err }, "Delete teacher error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
