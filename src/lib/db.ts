import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';

type Result = {
    id: string;
    githubId: string | null;
    email: string;
    username: string;
    profilePicture: string | null;
    refreshToken: string | null;
    createdAt: number;
    updatedAt: number;
} | undefined;

export const getUserInfo = async (id: string) => {
    return (await (await db.select().from(table.user).where(eq(table.user.id, id))).at(0)) as Result;
}