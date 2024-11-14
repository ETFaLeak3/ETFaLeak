<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { enhance } from "$app/forms";
    import { page } from '$app/stores';
    import { toast } from "svelte-sonner";
    
    $: {
        if ($page.status != 200) {
            toast.error($page.form?.message as string);
        }
    }
</script>

<div class="max-w-5xl mx-auto px-4 flex items-center justify-center h-screen">
  <div
    class="sm:w-6/12 flex p-6 border border-gray-300 shadow-md rounded-md flex-col gap-8 items-center"
  >
    <form method="post" use:enhance action="http://localhost:5173/register" class="flex flex-col items-center gap-4">
        <h1 class="text-2xl text-gray-700 font-bold">Sign up with Credentials</h1>
        <Input
        type="email"
        placeholder="Email"
        name="email"
        />

        <Input
        type="text"
        placeholder="Username"
        name="username"
        />

        <Input
        type="password"
        placeholder="Password"
        name="password"
        />

        <div class="flex flex-row gap-8">
            <Button
              type="submit"
            >
                Register
            </Button>
        </div>
    </form>
  </div>
</div>