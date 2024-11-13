import type { PageServerLoad } from './$types';
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "$lib/schema/zod";
import { zod } from "sveltekit-superforms/adapters";
 
export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};