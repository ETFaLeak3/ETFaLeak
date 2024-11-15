// Tu reçois un JSON avec un avatar et le path ou tu dois l'enregistrer et tu te sers des locals pour récuperer l'id de l'utilisateur et mettre à jour son avatar.

import { writeFile } from 'node:fs/promises';
import { updateUserProfilePicture } from '$lib/db';

export async function POST(event) {
    const id = event.locals.user?.id;
    const data = await event.request.formData()
    let file = data.get('file') as File;
    let name = data.get('filename') as string;

    if (!id) {
        return new Response(null, { status: 401 });
    }
    
    const filename = `/images/avatars/${name}`;
    
    await writeFile(`./static${filename}`, Buffer.from(await file?.arrayBuffer()));
    await updateUserProfilePicture(id, filename);

    return new Response(null, { status: 200 });
}