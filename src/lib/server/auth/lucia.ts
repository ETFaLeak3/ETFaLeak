import { dev } from "$app/environment";
import { db, sqlite } from "$lib/server/db/index";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";

interface DatabaseUserAttributes {
  email: string;
  refresh_token: string;
}

interface DatabaseSessionAttributes {
  created_at: Date;
  updated_at: Date;
}

const adapter = new BetterSqlite3Adapter(sqlite, {
  user: "user",
  session: "session",
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      refresh_token: attributes.refresh_token,
    };
  },
  getSessionAttributes: (attributes) => {
    return {
      created_at: attributes.created_at,
      updated_at: attributes.updated_at,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}

export { lucia };