import { lucia } from "$lib/server/auth/lucia";
import { github } from "$lib/server/auth/oauth";
import { OAuth2RequestError } from "arctic";
import * as auth from '$lib/server/auth';

import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const GET = async ({ url, cookies }) => {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	const savedState = cookies.get("github_oauth_state");

	if (
        !code ||
        !state ||
        !savedState
    ) {
        console.error("Invalid state or code");

        return new Response(null, {
            status: 400,
            statusText: "Bad Request",
        });
    }

	try {
		const tokens = await github.validateAuthorizationCode(
            code
        );

        const githubUserResponse = await fetch(
            "https://api.github.com/user", 
            {
                headers: {
                    Authorization: `Bearer ${tokens.accessToken()}`
                }
            }
        );

        const githubUser = await githubUserResponse.json();

	    const existingUser = await (await db.select().from(table.user).where(eq(table.user.githubId, githubUser.id))).at(0);
	
        if (existingUser != undefined) {
            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, existingUser.id);
            const sessionCookie = lucia.createSessionCookie(session.id);

            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
            });

            // Update the user's data
            /* await db.update(table.user).set({
                username: githubUser.login,
                email: githubUser.email,
                profilePicture: githubUser.avatar_url,
            }).where(eq(table.user.id, existingUser.id)); */

        } else {
            const newUser = await db.insert(table.user).values({
                username: githubUser.login,
                email: githubUser.email,
                githubId: githubUser.id,
                profilePicture: githubUser.avatar_url,
            }).returning().get();

            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, newUser.id);
            const sessionCookie = lucia.createSessionCookie(session.id);

            cookies.set(sessionCookie.name, sessionCookie.value, {
                path: ".",
                ...sessionCookie.attributes,
            });
        }

        return new Response(null, {
            status: 302,
            headers: {
              Location: "/profile?loginSuccess=true",
            },
          });
        } catch (error) {
          console.error("Error exchanging code for token", error);
      
          if (error instanceof OAuth2RequestError) {
            return new Response(null, {
              status: 400,
              statusText: "Bad Request",
            });
        }
      
        return new Response(null, {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
};