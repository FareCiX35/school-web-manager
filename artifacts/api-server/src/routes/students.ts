import { Router, type IRouter, type Request, type Response } from "express";
import { db, studentPostsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const posts = await db.select().from(studentPostsTable).orderBy(desc(studentPostsTable.createdAt));
    res.json({ posts });
  } catch (err) {
    req.log.error({ err }, "Get students error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const { title, content, authorName, authorClass, type, imageUrl, isStudentOfMonth } = req.body;
    const items = await db.insert(studentPostsTable).values({
      title, content, authorName, authorClass, type, imageUrl, isStudentOfMonth: isStudentOfMonth ?? false,
    }).returning();
    res.status(201).json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Create student post error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(req.params.id);
    const { title, content, authorName, authorClass, type, imageUrl, isStudentOfMonth } = req.body;
    const items = await db.update(studentPostsTable)
      .set({ title, content, authorName, authorClass, type, imageUrl, isStudentOfMonth: isStudentOfMonth ?? false })
      .where(eq(studentPostsTable.id, id)).returning();
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Update student post error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(req.params.id);
    await db.delete(studentPostsTable).where(eq(studentPostsTable.id, id));
    res.json({ success: true, message: "Silindi" });
  } catch (err) {
    req.log.error({ err }, "Delete student post error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
