import { redirect } from "@sveltejs/kit";

import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const load = async ({ locals }) => {
  // Permet de protéger la page profile
  if (!locals.session || !locals.user) {
    redirect(302, "/login");
  }

  // Récupère le profil de l'utilisateur
  const userProfile = (await db.select().from(table.user).where(eq(table.user.id, locals.user.id))).at(0);

  // Retourne les données à la page, accessible via `data.session` et `data.userProfile`, il faut `export let data` dans +page.svelte
  return {
    session: locals.session,
    userProfile,
  };
};