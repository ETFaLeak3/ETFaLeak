<script lang="ts">
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import { onMount } from "svelte";
    
    import ProfileAvatar from "$lib/components/ui/profileAvatar/ProfileAvatar.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Separator } from "$lib/components/ui/separator";
    import { Label } from "$lib/components/ui/label";
    
    export let data;

    onMount(() => {
      if (data.loginSuccess) {
        toast.success("You have been successfully logged in");
      }
    });
    
</script>

<main class="w-screen h-screen">
    <div class="max-w-5xl mx-auto px-4 flex items-center justify-center h-screen">
        <div
            class="sm:w-6/12 flex p-6 border border-gray-300 shadow-md rounded-md flex-col gap-8 items-center"
        >
            <h1 class="text-2xl text-gray-700 font-bold">{data.userProfile?.username} profile</h1>
            <ProfileAvatar src={data.userProfile?.profilePicture} alt={data.userProfile?.username} fallback={data.userProfile?.username.slice(0, 2).toUpperCase()} />
            <div class="flex flex-row gap-4 w-full items-center">
              <Label>Email</Label>
              <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={data.userProfile?.email}
                  readonly
              />
            </div>
            <div class="flex flex-row gap-4 w-full items-center">
              <Label>Username</Label>
              <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={data.userProfile?.username}
                  readonly
              />
            </div>
            <Separator />
            <form method="post" action="http://localhost:5173/" use:enhance>
              <Button type="submit">
                Logout
              </Button>
            </form>
        </div>
    </div>
</main>