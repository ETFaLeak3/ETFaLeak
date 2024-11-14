import { redirect } from "@sveltejs/kit";
import { getUserInfo } from "$lib/db.js";

export const load = async ({ url, locals }) => {
  if (!locals.session || !locals.user) {
    throw redirect(302, "/login");
  }

  const userProfile = await getUserInfo(locals.user.id);

  const loginSuccess = url.searchParams.get('loginSuccess') === 'true';

  return {
    session: locals.session,
    userProfile,
    loginSuccess
  };
};