import { Router, type IRouter, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import { db, adminUsersTable } from "@workspace/db";
import { eq } from "drizzle-orm";

declare module "express-session" {
  interface SessionData {
    userId?: number;
    username?: string;
  }
}

const router: IRouter = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Kullanıcı adı ve şifre gerekli" });
    return;
  }

  try {
    const users = await db.select().from(adminUsersTable).where(eq(adminUsersTable.username, username));
    const user = users[0];
    if (!user) {
      res.status(401).json({ error: "Geçersiz kullanıcı adı veya şifre" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Geçersiz kullanıcı adı veya şifre" });
      return;
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({
      success: true,
      user: { id: user.id, username: user.username, fullName: user.fullName },
    });
  } catch (err) {
    req.log.error({ err }, "Login error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.json({ success: true, message: "Çıkış yapıldı" });
  });
});

router.get("/me", async (req: Request, res: Response) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Giriş yapılmamış" });
    return;
  }
  try {
    const users = await db.select().from(adminUsersTable).where(eq(adminUsersTable.id, req.session.userId));
    const user = users[0];
    if (!user) {
      res.status(401).json({ error: "Kullanıcı bulunamadı" });
      return;
    }
    res.json({ id: user.id, username: user.username, fullName: user.fullName });
  } catch (err) {
    req.log.error({ err }, "Get me error");
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

export default router;
