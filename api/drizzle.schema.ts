import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

/**
 * 授業情報
 */
export const duty = sqliteTable("duty", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  /**
   * 時間枠（午前とか午後とか）
   */
  timeSlot: integer("time_slot"),
  /**
   * 時間枠（曜日が決まっているものがあれば）
   */
  weekSlot: integer("week_slot"),
  /**
   * 当番担当者
   */
  ownerId: text("owner_id", { length: 36 }),
  /**
   * 当番説明
   */
  overview: text("overview", { length: 2048 }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const users = sqliteTable("users", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull().unique(),
  hashedPassword: text("hashed_password", { length: 256 }).notNull(),
  login: text("login", { length: 256 }).notNull().unique(),
  /**
   * ユーザの役職
   * 0: 管理者
   * 1: 一般ユーザ
   */
  role: integer("role").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const tags = sqliteTable("tags", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})
