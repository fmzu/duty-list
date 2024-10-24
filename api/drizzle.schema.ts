import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

/**
 * 当番作業情報
 */
export const tasks = sqliteTable("tasks", {
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
  /**
   * タグ
   */
  tagId: text("tag_id", { length: 256 }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const taskRelations = relations(tasks, (fn) => {
  return {
    owner: fn.one(users, {
      fields: [tasks.ownerId],
      references: [users.id],
    }),
    tag: fn.one(tags, {
      fields: [tasks.tagId],
      references: [tags.id],
    }),
    roster: fn.one(rosters, {
      fields: [tasks.id],
      references: [rosters.taskId],
    }),
  }
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

export const userRelations = relations(users, (fn) => {
  return {
    tasks: fn.many(tasks),
    amOwner: fn.one(rosters, {
      fields: [users.id],
      references: [rosters.amOwnerId],
    }),
    pmOwner: fn.one(rosters, {
      fields: [users.id],
      references: [rosters.pmOwnerId],
    }),
  }
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

export const tagRelations = relations(tags, (fn) => {
  return {
    tasks: fn.one(tasks),
  }
})

export const rosters = sqliteTable("rosters", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  /**
   * 午前当番担当者
   */
  amOwnerId: text("am_owner_id", { length: 36 }),
  /**
   * 午後当番担当者
   */
  pmOwnerId: text("pm_owner_id", { length: 36 }),
  /**
   * 当番作業
   */
  taskId: text("task_id", { length: 36 }),
  /**
   * 当番作業を終了したかどうか
   */
  isDone: integer("is_done", { mode: "boolean" }).notNull().default(false),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const rosterRelations = relations(rosters, (fn) => {
  return {
    task: fn.many(tasks),
    amOwner: fn.one(users, {
      fields: [rosters.amOwnerId],
      references: [users.id],
    }),
    pmOwner: fn.one(users, {
      fields: [rosters.pmOwnerId],
      references: [users.id],
    }),
  }
})
