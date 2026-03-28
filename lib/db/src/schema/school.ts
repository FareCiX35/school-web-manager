import { pgTable, text, serial, boolean, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const adminUsersTable = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAdminUserSchema = createInsertSchema(adminUsersTable).omit({ id: true, createdAt: true });
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
export type AdminUser = typeof adminUsersTable.$inferSelect;

export const announcementsTable = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  content: text("content").notNull(),
  isImportant: boolean("is_important").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAnnouncementSchema = createInsertSchema(announcementsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;
export type Announcement = typeof announcementsTable.$inferSelect;

export const eventsTable = pgTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  eventDate: timestamp("event_date").notNull(),
  location: varchar("location", { length: 300 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertEventSchema = createInsertSchema(eventsTable).omit({ id: true, createdAt: true });
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof eventsTable.$inferSelect;

export const newsTable = pgTable("news", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: varchar("category", { length: 100 }).notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNewsSchema = createInsertSchema(newsTable).omit({ id: true, createdAt: true });
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof newsTable.$inferSelect;

export const studentPostsTable = pgTable("student_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  content: text("content").notNull(),
  authorName: varchar("author_name", { length: 200 }).notNull(),
  authorClass: varchar("author_class", { length: 100 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  imageUrl: text("image_url"),
  isStudentOfMonth: boolean("is_student_of_month").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStudentPostSchema = createInsertSchema(studentPostsTable).omit({ id: true, createdAt: true });
export type InsertStudentPost = z.infer<typeof insertStudentPostSchema>;
export type StudentPost = typeof studentPostsTable.$inferSelect;

export const teachersTable = pgTable("teachers", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  branch: varchar("branch", { length: 200 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  bio: text("bio"),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  email: varchar("email", { length: 200 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertTeacherSchema = createInsertSchema(teachersTable).omit({ id: true, createdAt: true });
export type InsertTeacher = z.infer<typeof insertTeacherSchema>;
export type Teacher = typeof teachersTable.$inferSelect;

export const galleryItemsTable = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItemsTable).omit({ id: true, createdAt: true });
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;
export type GalleryItem = typeof galleryItemsTable.$inferSelect;

export const alumniTable = pgTable("alumni", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 200 }).notNull(),
  graduationYear: integer("graduation_year").notNull(),
  occupation: varchar("occupation", { length: 300 }).notNull(),
  story: text("story"),
  imageUrl: text("image_url"),
  isMentor: boolean("is_mentor").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAlumnusSchema = createInsertSchema(alumniTable).omit({ id: true, createdAt: true });
export type InsertAlumnus = z.infer<typeof insertAlumnusSchema>;
export type Alumnus = typeof alumniTable.$inferSelect;

export const contactMessagesTable = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 300 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessagesTable).omit({ id: true, createdAt: true, isRead: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessagesTable.$inferSelect;

export const siteSettingsTable = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  schoolName: varchar("school_name", { length: 300 }).notNull(),
  slogan: varchar("slogan", { length: 300 }),
  address: text("address"),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 200 }),
  whatsapp: varchar("whatsapp", { length: 50 }),
  heroTitle: varchar("hero_title", { length: 300 }),
  heroSubtitle: text("hero_subtitle"),
  aboutText: text("about_text"),
  principalName: varchar("principal_name", { length: 200 }),
  principalMessage: text("principal_message"),
  facebookUrl: text("facebook_url"),
  twitterUrl: text("twitter_url"),
  instagramUrl: text("instagram_url"),
  youtubeUrl: text("youtube_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettingsTable).omit({ id: true, updatedAt: true });
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettingsTable.$inferSelect;

export const clubsTable = pgTable("clubs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description").notNull(),
  advisorName: varchar("advisor_name", { length: 200 }),
  imageUrl: text("image_url"),
  memberCount: integer("member_count"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertClubSchema = createInsertSchema(clubsTable).omit({ id: true, createdAt: true });
export type InsertClub = z.infer<typeof insertClubSchema>;
export type Club = typeof clubsTable.$inferSelect;
