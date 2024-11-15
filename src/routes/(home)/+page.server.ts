import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getUserInfo } from "$lib/db.js";

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session) {
			return fail(401);
		}
		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		throw redirect(302, '/?logoutSuccess=true');
	},
};

export const load = async ({ url, locals }) => {
	
	const logoutSuccess = url.searchParams.get('logoutSuccess') === 'true';

	if (logoutSuccess) return {
		logoutSuccess,
	};

	// @ts-ignore
	if (!locals.session) return {};
	if (!locals.user) return {};
	const userProfile = await getUserInfo(locals.user.id);

	const loginSuccess = url.searchParams.get('loginSuccess') === 'true';

	return {
		session: locals.session,
		userProfile,
		loginSuccess
	};

};