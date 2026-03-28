import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import announcementsRouter from "./announcements";
import eventsRouter from "./events";
import newsRouter from "./news";
import studentsRouter from "./students";
import teachersRouter from "./teachers";
import galleryRouter from "./gallery";
import alumniRouter from "./alumni";
import contactRouter from "./contact";
import settingsRouter from "./settings";
import clubsRouter from "./clubs";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/announcements", announcementsRouter);
router.use("/events", eventsRouter);
router.use("/news", newsRouter);
router.use("/students", studentsRouter);
router.use("/teachers", teachersRouter);
router.use("/gallery", galleryRouter);
router.use("/alumni", alumniRouter);
router.use("/contact", contactRouter);
router.use("/settings", settingsRouter);
router.use("/clubs", clubsRouter);

export default router;
