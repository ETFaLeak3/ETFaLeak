import { redirect } from "@sveltejs/kit";

import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load = async ({ locals }) => {
  if (!locals.session || !locals.user) {
    redirect(302, "/login");
  }

  const userProfile = (await db.select().from(table.user).where(eq(table.user.id, locals.user.id))).at(0);

  return {
    session: locals.session,
    userProfile,
  };
};