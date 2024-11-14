import { github } from '$lib/server/auth/oauth';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const generateId = (length : number) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const timestamp = {
    createdAt: integer("created_at", { mode: "number" })
      .notNull()
      .$defaultFn(() => Math.floor(Date.now() / 1000)),
    updatedAt: integer("updated_at", { mode: "number" })
      .notNull()
      .$defaultFn(() => Math.floor(Date.now() / 1000)),
};

export const user = sqliteTable('user', {
    ...timestamp,
    id: text('id').primaryKey().notNull().$defaultFn(() => generateId(15)),
    githubId: text('github_id').unique(),
    email: text('email').notNull().unique(),
    username: text('username').notNull(),
    passwordHash: text('password_hash'),
    profilePicture: text('profile_picture'),
    refreshToken: text('refresh_token'),
});

export const session = sqliteTable("session", {
    ...timestamp,
    id: text('id').primaryKey().notNull().$defaultFn(() => generateId(15)),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
