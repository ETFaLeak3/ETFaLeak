import * as auth from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

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

export const load = async ({ url }) => {
	
	const logoutSuccess = url.searchParams.get('logoutSuccess') === 'true';

	return {
		logoutSuccess,
	};

};