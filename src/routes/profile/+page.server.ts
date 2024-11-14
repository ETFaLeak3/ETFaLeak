import { redirect } from "@sveltejs/kit";
import { getUserInfo } from "$lib/db.js";

export const load = async ({ locals }) => {
  // Permet de protéger la page profile
  if (!locals.session || !locals.user) {
    redirect(302, "/login");
  }

  // Récupère le profil de l'utilisateur
  const userProfile = await getUserInfo(locals.user.id);

  // Retourne les données à la page, accessible via `data.session` et `data.userProfile`, il faut `export let data` dans +page.svelte
  return {
    session: locals.session,
    userProfile,
  };
};