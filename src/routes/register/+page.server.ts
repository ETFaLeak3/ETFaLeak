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
		const username = formData.get("username");
		const password = formData.get("password");
        const email = formData.get("email");
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
			typeof username !== "string" ||
			username.length < 4 ||
			username.length > 31
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 6 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		// hash password
		const passwordHash = await hash(password);
		console.log(passwordHash);
		try {
			const newUser = await db.insert(table.user).values({
                email,
                username,
                passwordHash,
            }).returning().get();

			const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, newUser.id);
			const sessionCookie = lucia.createSessionCookie(session.id);

            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
              });

		} catch (e) {
			// this part depends on the database you're using
			// check for unique constraint error in user table
			if (
				e instanceof Error &&
                e.message.includes("UNIQUE constraint failed: user.username")
			) {
				return fail(400, {
					message: "Username already taken"
				});
			}
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, "/profile");
	}
};