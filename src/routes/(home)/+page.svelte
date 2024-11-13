<script lang="ts">
    import { toast } from "svelte-sonner";
    import { Button } from '$lib/components/ui/button';
    import { Badge } from '$lib/components/ui/badge';
    import * as Avatar from '$lib/components/ui/avatar';
    import Title from '$lib/components/ui/title/Title.svelte';
    import Texte from '$lib/components/ui/texte/Texte.svelte';
    import Informations from '$lib/components/ui/informations/Informations.svelte';
    import Combobox from "$lib/components/ui/combobox/Combobox.svelte";
</script>

<div class="w-screen h-screen flex flex-col gap-8 px-48 py-16 bg-noise">
    <div class="w-full flex items-center justify-between">
    <Title>Neuralab</Title>
    <Avatar.Root>
        <Avatar.Image src="https://picsum.photos/200/200" alt="@shadcn" />
        <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
    </div>
    <Texte>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </Texte>
    <Badge>New</Badge>
    <Button>Click me</Button>
    <Button variant="outline">Click me</Button>
    <Informations />
    <Button
        variant="outline"
        onclick={() =>
        toast.success("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
            label: "Undo",
            onClick: () => console.info("Undo")
            }
        })}
    >
        Show Toast
    </Button>
    <Combobox data={[{ value: "one", label: "One" }, { value: "two", label: "Two" }]} item="item" />
</div>