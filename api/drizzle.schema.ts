import { relations, sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

/**
 * 授業情報
 */
export const programs = sqliteTable("programs", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  name: text("name", { length: 256 }).notNull(),
  /**
   * 時間枠（時間）
   */
  timeSlot: integer("time_slot").notNull(),
  /**
   * 時間枠（曜日）
   */
  weekSlot: integer("week_slot").notNull(),
  /**
   * 担当教員
   */
  ownerId: text("owner_id", { length: 36 }).notNull(),
  /**
   * 単位数
   */
  unitsCount: integer("units_count").notNull(),
  /**
   * 授業概要
   */
  overview: text("overview", { length: 2048 }).notNull(),
  /**
   * 実施時期（年度）
   */
  year: integer("year").notNull(),
  /**
   * 実施時期（前期後期）
   */
  period: integer("period").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const programRelations = relations(programs, (fn) => {
  return {
    enrollments: fn.many(enrollments),
    owner: fn.one(users, {
      fields: [programs.ownerId],
      references: [users.id],
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
   * 0: 学生
   * 1: 教員
   * 2: 管理者など
   */
  role: integer("role").notNull(),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const userRelations = relations(users, (fn) => {
  return {
    enrollments: fn.many(enrollments),
    programs: fn.many(programs),
  }
})

/**
 * 講義の受講登録
 */
export const enrollments = sqliteTable("enrollments", {
  id: text("uuid", { length: 36 }).notNull().unique(),
  userId: text("user_id", { length: 36 }).notNull(),
  programId: text("program_id", { length: 36 }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  isDeleted: integer("is_deleted", { mode: "boolean" })
    .notNull()
    .default(false),
})

export const enrollmentRelations = relations(enrollments, (fn) => {
  return {
    user: fn.one(users, {
      fields: [enrollments.userId],
      references: [users.id],
    }),
    program: fn.one(programs, {
      fields: [enrollments.programId],
      references: [programs.id],
    }),
  }
})
