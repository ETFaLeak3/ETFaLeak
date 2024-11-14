<script lang="ts">
	import '../app.css';
	import 'animate.css';
    import { onMount, onDestroy } from "svelte";
    import { Toaster } from "$lib/components/ui/sonner/index.js";

    let mounted;

    onMount(() => {
        setTimeout(() => {
            mounted = true;
        }, 100);
    });

    onDestroy(() => {
        mounted = false;
    });

	let { children } = $props();
</script>

<svelte:head>
    <title>App</title>
</svelte:head>
<div class="animate__animated animate__fadeIn animate__faster">
    <Toaster richColors />
    {@render children()}
</div>
