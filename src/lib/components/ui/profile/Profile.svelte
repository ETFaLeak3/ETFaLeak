<script lang="ts">
    import { enhance } from "$app/forms";
    import { goto } from "$app/navigation";

    import * as Avatar from "$lib/components/ui/avatar";
    import * as Popover from "$lib/components/ui/popover";
    import { Button } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";

    import User from "lucide-svelte/icons/user";
    import Settings from "lucide-svelte/icons/settings";
    import LogOut from "lucide-svelte/icons/log-out";

    let {
        src,
        alt,
        fallback,
    }: { src: string | null | undefined, alt: string | null | undefined, fallback: string | null | undefined } = $props();

    let open = $state(false);
</script>

<!-- svelte-ignore a11y_mouse_events_have_key_events -->
<div class="w-fit h-fit" role="button" tabindex="0" onmouseover={() => open = true}>
    <Popover.Root bind:open>
        <Popover.Trigger class="rounded-full">
            <Avatar.Root class="size-12">
                <Avatar.Image src={src ? src : null} alt={alt ? alt : null}/>
                <Avatar.Fallback>{fallback}</Avatar.Fallback>
            </Avatar.Root>
        </Popover.Trigger>
        <Popover.Content class="px-3 py-1">
            <div class="flex flex-col items-center gap-2">
                <div class="flex flex-col items-center gap-1">
                    <div class="flex flex-row items-center">
                        <a class="px-0 -mb-2 text-primary underline-offset-4 hover:underline flex flex-row items-center gap-2 text-sm font-medium py-2 [&_svg]:size-4 [&_svg]:font-medium" href="/profile"><User />Profile</a>
                    </div>
                    <div class="flex flex-row items-center">
                        <a class="px-0 text-primary underline-offset-4 hover:underline flex flex-row items-center gap-2 text-sm font-medium py-2 [&_svg]:size-4 [&_svg]:font-medium" href="/profile"><Settings />Settings</a>
                    </div>
                </div>
                <Separator />
                <form method="post" action="http://localhost:5173/" use:enhance>
                    <button type='submit' class="px-0 text-primary underline-offset-4 hover:underline flex flex-row items-center gap-2 text-sm font-medium py-2 [&_svg]:size-4 [&_svg]:font-medium"><LogOut />Logout</button>
                </form>
            </div>
        </Popover.Content>
    </Popover.Root>
</div>