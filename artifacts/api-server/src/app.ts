import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pinoHttp from "pino-http";
import session from "express-session";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
const isProduction = process.env.NODE_ENV === "production";
const sessionSecret = process.env.SESSION_SECRET;

if (isProduction && !sessionSecret) {
  throw new Error("SESSION_SECRET must be set in production.");
}

if (isProduction) {
  app.set("trust proxy", 1);
}

const corsOrigin = process.env.CORS_ORIGIN;
const allowedOrigins = corsOrigin
  ? corsOrigin
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : true;

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: sessionSecret || "local-dev-session-secret",
    resave: false,
    saveUninitialized: false,
    proxy: isProduction,
    cookie: {
      secure: isProduction ? "auto" : false,
      sameSite: "lax",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use("/api", router);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));
const defaultFrontendDist = path.resolve(
  artifactDir,
  "..",
  "..",
  "school-website",
  "dist",
  "public",
);
const frontendDist = process.env.FRONTEND_DIST || defaultFrontendDist;
const frontendEntry = path.join(frontendDist, "index.html");

if (fs.existsSync(frontendEntry)) {
  logger.info({ frontendDist }, "Serving built frontend");
  app.use(express.static(frontendDist));
  app.get(/^(?!\/api(?:\/|$)).*/, (_req, res) => {
    res.sendFile(frontendEntry);
  });
} else {
  logger.warn(
    { frontendDist },
    "Frontend build output was not found; API-only mode is active",
  );
}

export default app;
