import { Router, type IRouter, type Request, type Response } from "express";
import { db, galleryItemsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const items = await db.select().from(galleryItemsTable).orderBy(desc(galleryItemsTable.createdAt));
    res.json({ items });
  } catch (err) {
    req.log.error({ err }, "Get gallery error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const { title, description, imageUrl, category } = req.body;
    const items = await db.insert(galleryItemsTable).values({ title, description, imageUrl, category }).returning();
    res.status(201).json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Create gallery item error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(String(req.params.id), 10);
    await db.delete(galleryItemsTable).where(eq(galleryItemsTable.id, id));
    res.json({ success: true, message: "Silindi" });
  } catch (err) {
    req.log.error({ err }, "Delete gallery item error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
