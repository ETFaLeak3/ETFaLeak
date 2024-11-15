<script lang="ts">
    import Title from '$lib/components/ui/title/Title.svelte';
    import Profile from '$lib/components/ui/profile/Profile.svelte';
    import { Button } from '$lib/components/ui/button';

    let {
        src,
        alt,
        fallback,
    }: { src: string | null | undefined, alt: string | null | undefined, fallback: string | null | undefined } = $props();
</script>

<div class="w-full flex items-center justify-between">
    <Title>ETFaLeak</Title>
    {#if src}
        <Profile {src} {alt} {fallback}/>
    {:else}
        <Button href="/login">Se connecter</Button>
    {/if}
</div>