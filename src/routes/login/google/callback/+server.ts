import { lucia } from "$lib/server/auth/lucia";
import { google } from "$lib/server/auth/oauth";
import { OAuth2RequestError } from "arctic";
import * as auth from '$lib/server/auth';

import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

export const GET = async ({ url, cookies }) => {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const savedState = cookies.get("google_oauth_state");
  const savedCodeVerifier = cookies.get("google_oauth_code_verifier");

  if (
    !code ||
    !state ||
    !savedState ||
    !savedCodeVerifier ||
    state !== savedState
  ) {
    console.error("Invalid state or code");

    return new Response(null, {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      savedCodeVerifier
    );
    let googleRefreshToken: any | undefined = undefined;

    if (tokens.refreshToken) {
      googleRefreshToken = await google.refreshAccessToken(tokens.refreshToken());
    }

    const googleUserResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken()}`,
        },
      }
    );

    const googleUser = await googleUserResponse.json();

    const existingUser = await (await db.select().from(table.user).where(eq(table.user.email, googleUser.email))).at(0);

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
        id: existingUser.id,
        email: googleUser.email,
        refreshToken: googleRefreshToken?.data.access_token,
        profilePicture: googleUser.picture,
        username: googleUser.given_name,
      }).where(eq(table.user.id, existingUser.id)); */

    } else {
      const newUser = await db.insert(table.user).values({
        email: googleUser.email,
        refreshToken: googleRefreshToken?.data.access_token,
        profilePicture: googleUser.picture,
        username: googleUser.given_name,
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