<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import Pencil from "lucide-svelte/icons/pencil";
    import { toast } from "svelte-sonner";

    let {
        src,
        alt,
        fallback,
    }: { src: string | null | undefined, alt: string | null | undefined, fallback: string | null | undefined } = $props();

    const checkFile = (file: File | undefined) => {
        if (!file) {
            return {
                error: true,
                message: "No file selected",
            };
        }
        if (file.size > 5000000) {
            return {
                error: true,
                message: "File size must be less than 5MB",
            };
        }
        if (!file.type.includes("image")) {
            return {
                error: true,
                message: "File must be an image",
            };
        }
        return {
            error: false,
            message: "",
        };
    }

    function updateAvatar(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        const check = checkFile(file);
        if (check.error) {
            toast.error(check.message);
            return;
        }
        // On fait une requete POST sur http://localhost:5173/API/users/avatars/updateAvatar avec le fichier et le filepath en paramètre
        // Utilise un FormData pour envoyer le fichier
        const data = new FormData();
        const name = crypto.randomUUID()+file?.name;
        if (file) {
            data.append("file", file);
        }
        data.append("filename", name);
        fetch("http://localhost:5173/API/users/avatar/updateAvatar", {
            method: "POST",
            body: data,
        }).then((res) => {
            console.log(res);
            if (res.ok) {
                toast.success("Avatar updated successfully");
                src = '/images/avatars/'+name;
            } else {
                toast.error("An error occurred while updating the avatar");
            }
        });
    }
</script>

<div class="flex flex-col items-center">
    <Avatar.Root class="size-20">
        <Avatar.Image src={src ? src : null} alt={alt ? alt : null}/>
        <Avatar.Fallback>{fallback}</Avatar.Fallback>
    </Avatar.Root>
    <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/webp" oninput={(e) => {updateAvatar(e)}} class="w-0 h-0 opacity-0 overflow-hidden absolute z-[-1]"/>
    <div class="bg-white border border-black w-fit h-fit p-1 rounded-full cursor-pointer relative -top-6 -right-5">
        <label for="file" class="w-fit"><Pencil class="text-black size-4 cursor-pointer"/></label>
    </div>
</div>
