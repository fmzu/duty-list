import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

/**
 * 当番作業
 */
export const tasks = sqliteTable("tasks", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  /**
   * 作業項目
   */
  taskItemId: text("task_items", { length: 256 }).notNull(),
  /**
   * ユーザ
   */
  ownerId: text("owner_id", { length: 36 }),
  /**
   * 作業日時
   */
  taskDate: integer("task_date", { mode: "timestamp" }),
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
    // タスクが持つ1人のオーナー
    owner: fn.one(users, {
      fields: [tasks.ownerId],
      references: [users.id],
    }),
    // タスクが持つ複数の作業項目
    taskItem: fn.many(taskItems),
    // タスクが持つ1つのタグ
    tag: fn.one(tags, {
      fields: [tasks.tagId],
      references: [tags.id],
    }),
  }
})

/**
 * ユーザ
 */
export const users = sqliteTable("users", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  email: text("email", { length: 256 }).notNull().unique(),
  hashedPassword: text("hashed_password", { length: 256 }).notNull(),
  login: text("login", { length: 256 }).notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const userRelations = relations(users, (fn) => {
  return {
    // ユーザが持つ複数のタスク
    tasks: fn.many(tasks),
  }
})

/**
 * 作業項目
 */
export const taskItems = sqliteTable("task_items", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  overview: text("overviews", { length: 256 }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const taskItemsRelations = relations(taskItems, (fn) => {
  return {
    // 作業項目が持つ複数のタスク
    tasks: fn.one(tasks, {
      fields: [taskItems.id],
      references: [tasks.taskItemId],
    }),
  }
})

/**
 * 作業項目のタグ
 */
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
    // タグが持つ複数のタスク
    tasks: fn.many(tasks),
  }
})
