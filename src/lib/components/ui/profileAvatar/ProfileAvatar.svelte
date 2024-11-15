<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar";
    import Pencil from "lucide-svelte/icons/pencil";

    let {
        src,
        alt,
        Fallback,
    }: { src: string | null, alt: string | null, Fallback: string | null } = $props();
</script>

<div class="flex flex-col items-center">
    <Avatar.Root>
        <Avatar.Image {src} {alt} />
        <Avatar.Fallback>{Fallback}</Avatar.Fallback>
    </Avatar.Root>
    <input type="file" name="file" id="file" accept="image/png, image/jpeg, image/webp" class="w-0 h-0 opacity-0 overflow-hidden absolute z-[-1]"/>
    <div class="bg-black w-fit h-fit p-2 rounded-full cursor-pointer relative -top-6 -right-5">
        <label for="file" class="w-fit"><Pencil class="text-white size-4 cursor-pointer"/></label>
    </div>
</div>
