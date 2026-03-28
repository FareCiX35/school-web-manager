import { Router, type IRouter, type Request, type Response } from "express";
import { db, alumniTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const alumni = await db.select().from(alumniTable).orderBy(desc(alumniTable.graduationYear));
    res.json({ alumni });
  } catch (err) {
    req.log.error({ err }, "Get alumni error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const { fullName, graduationYear, occupation, story, imageUrl, isMentor } = req.body;
    const items = await db.insert(alumniTable).values({
      fullName, graduationYear, occupation, story, imageUrl, isMentor: isMentor ?? false,
    }).returning();
    res.status(201).json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Create alumnus error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(req.params.id);
    const { fullName, graduationYear, occupation, story, imageUrl, isMentor } = req.body;
    const items = await db.update(alumniTable)
      .set({ fullName, graduationYear, occupation, story, imageUrl, isMentor: isMentor ?? false })
      .where(eq(alumniTable.id, id)).returning();
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Update alumnus error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(req.params.id);
    await db.delete(alumniTable).where(eq(alumniTable.id, id));
    res.json({ success: true, message: "Silindi" });
  } catch (err) {
    req.log.error({ err }, "Delete alumnus error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
