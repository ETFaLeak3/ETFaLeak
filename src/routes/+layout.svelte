<script lang="ts">
	import '../app.css';
	import 'animate.css';
    import { onMount, onDestroy } from "svelte";

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

<div class="animate__animated animate__fadeIn animate__faster">
    {@render children()}
</div>
