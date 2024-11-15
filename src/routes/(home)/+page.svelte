<script lang="ts">
    import { toast } from "svelte-sonner";
    import Navigation from "$lib/components/ui/navigation/Navigation.svelte";
    import { onMount } from "svelte";

    export let data;

    onMount(() => {
      if (data.logoutSuccess) {
        toast.success("You have been successfully logged out");
      }
    });
</script>

<div class="w-screen h-screen flex flex-col gap-8 px-48 py-16 bg-noise">
    <Navigation src={data.userProfile?.profilePicture} alt={data.userProfile?.username} fallback={data.userProfile?.username.slice(0, 2).toUpperCase()}/>
</div>