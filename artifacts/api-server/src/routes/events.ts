import { Router, type IRouter, type Request, type Response } from "express";
import { db, eventsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const events = await db.select().from(eventsTable).orderBy(desc(eventsTable.eventDate));
    res.json({ events });
  } catch (err) {
    req.log.error({ err }, "Get events error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const { title, description, eventDate, location, category, imageUrl } = req.body;
    const items = await db.insert(eventsTable).values({
      title, description, eventDate: new Date(eventDate), location, category, imageUrl,
    }).returning();
    res.status(201).json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Create event error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(String(req.params.id), 10);
    const { title, description, eventDate, location, category, imageUrl } = req.body;
    const items = await db.update(eventsTable)
      .set({ title, description, eventDate: new Date(eventDate), location, category, imageUrl })
      .where(eq(eventsTable.id, id)).returning();
    if (!items[0]) { res.status(404).json({ error: "Bulunamadı" }); return; }
    res.json(items[0]);
  } catch (err) {
    req.log.error({ err }, "Update event error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  if (!req.session?.userId) { res.status(401).json({ error: "Yetkisiz" }); return; }
  try {
    const id = parseInt(String(req.params.id), 10);
    await db.delete(eventsTable).where(eq(eventsTable.id, id));
    res.json({ success: true, message: "Silindi" });
  } catch (err) {
    req.log.error({ err }, "Delete event error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
