import { lucia } from "$lib/server/auth/lucia";
import { github } from "$lib/server/auth/oauth";
import { OAuth2RequestError } from "arctic";
import type { OAuth2Tokens } from "arctic";
import * as auth from '$lib/server/auth';

import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const GET = async ({ url, cookies }) => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("github_oauth_state") ?? null;
	if (code === null || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const githubUserResponse = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const githubUser = await githubUserResponse.json();
	const githubUserId = githubUser.id;
	const githubUsername = githubUser.login;
    console.log(githubUser);

	const existingUser = await (await db.select().from(table.user).where(eq(table.user.githubId, githubUserId))).at(0);
	if (existingUser != undefined) {
		const sessionToken = auth.generateSessionToken();
        const session = await auth.createSession(sessionToken, existingUser.id);
        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes,
        });

        // Update the user's data
        await db.update(table.user).set({
            username: githubUsername,
            email: githubUser.email,
            profilePicture: githubUser.avatar_url,
        }).where(eq(table.user.id, existingUser.id));
	}

	const user = await db.insert(table.user).values({
        username: githubUsername,
        email: githubUser.email,
        githubId: githubUserId,
        profilePicture: githubUser.avatar_url,
    }).returning().get();

	const sessionToken = auth.generateSessionToken();
	const session = await auth.createSession(sessionToken, user.id);
	const sessionCookie = lucia.createSessionCookie(session.id);

    cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
    });

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/profile"
		}
	});
}