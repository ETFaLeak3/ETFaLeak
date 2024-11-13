<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Badge } from '$lib/components/ui/badge';
    import Title from '$lib/components/ui/title/Title.svelte';
    import Texte from '$lib/components/ui/texte/Texte.svelte';
    import Informations from '$lib/components/ui/informations/Informations.svelte';
</script>

<div class="w-screen h-screen flex flex-col gap-8 px-48 py-16 bg-noise">
    <Title>Neuralab</Title>
    <Texte>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </Texte>
    <Badge>New</Badge>
    <Button>Click me</Button>
    <Button variant="outline">Click me</Button>
    <Informations />
</div>