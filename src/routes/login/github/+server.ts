import { redirect } from "@sveltejs/kit";
import { generateState } from "arctic";
import { github, scopesGithub } from "$lib/server/auth/oauth";

import type { RequestEvent } from "@sveltejs/kit";

export const GET = async ({ cookies }) => {
	const state = generateState();
	const url = github.createAuthorizationURL(state, scopesGithub);

	cookies.set("github_oauth_state", state, {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax"
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}