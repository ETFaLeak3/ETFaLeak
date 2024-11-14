import * as auth from '$lib/server/auth';
import { fail, redirect } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth/lucia";
import { hash, verify } from '@node-rs/argon2';

import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {

		const formData = await request.formData();
		const email = formData.get("email");
		const password = formData.get("password");
		// basic check
		if (
			typeof email !== "string" ||
            email.length < 4 ||
            email.length > 255
        ) {
            return fail(400, {
                message: "Invalid email"
            });
        }
		if (
			typeof password !== "string" ||
			password.length < 1 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		try {
			// find user by key
			// and validate password
			const key = (await db.select().from(table.user).where(eq(table.user.email, email))).at(0);
            
			if (!key) {
				return fail(400, {
					message: "Incorrect username or password"
				});
			}

			if (!key.passwordHash) {
				return fail(400, {
					message: "Incorrect username or password"
				});
			}

			console.log(key.passwordHash);

			const isValid = await verify(key.passwordHash, password);
			if (!isValid) {
				return fail(400, {
					message: "Incorrect username or password"
				});
			}

			// create session
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, key.id);
			const sessionCookie = lucia.createSessionCookie(session.id);

			cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
              });
			
		} catch (e) {
			if (
				e instanceof Error &&
				(e.message === "AUTH_INVALID_KEY_ID" ||
					e.message === "AUTH_INVALID_PASSWORD")
			) {
				// user does not exist
				// or invalid password
				return fail(400, {
					message: "Incorrect username or password"
				});
			}
			console.log(e);
			return fail(500, {
				message: "Internal Server Error"
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, "/profile");
	}
};