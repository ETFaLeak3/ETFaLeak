// Tu reçois un JSON avec un avatar et le path ou tu dois l'enregistrer et tu te sers des locals pour récuperer l'id de l'utilisateur et mettre à jour son avatar.

import { writeFile } from 'node:fs/promises';
import { extname } from "node:path";
import { updateUserProfilePicture } from '$lib/db';

export async function POST(event) {
    const id = event.locals.user?.id;
    const data = await event.request.formData()
    let file = data.get('file')

    if (!id) {
        return new Response(null, { status: 401 });
    }

    console.log('id', id)
    console.log('file', file)
    
    // @ts-ignore
    const filename = `/public/users/avatars/${crypto.randomUUID()}${extname(file?.name)}`;
    console.log('filename', filename)
    // @ts-ignore
    await writeFile(`.${filename}`, Buffer.from(await file?.arrayBuffer()));
    console.log('file written')
    await updateUserProfilePicture(id, "http://localhsot:5173"+filename);
    console.log('user updated')

    return new Response(null, { status: 200 });
}