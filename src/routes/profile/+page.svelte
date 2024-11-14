<script lang="ts">
    import { enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import { afterNavigate } from "$app/navigation";
    
    import * as Avatar from "$lib/components/ui/avatar";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Separator } from "$lib/components/ui/separator";
    import { Label } from "$lib/components/ui/label";
    
    export let data;
  
    const title = data.userProfile?.email
      ? `${data.userProfile?.username} profile`
      : "Profile";

    afterNavigate(({from}) => {
      if (from?.url.pathname === "/login") {
        toast.success("You have been successfully logged in");
      }
      else if (from?.url.pathname === "/register") {
        toast.success("You have been successfully registered");
      }
    });

</script>

<main class="w-screen h-screen">
    <div class="max-w-5xl mx-auto px-4 flex items-center justify-center h-screen">
        <div
            class="sm:w-6/12 flex p-6 border border-gray-300 shadow-md rounded-md flex-col gap-8 items-center"
        >
            <h1 class="text-2xl text-gray-700 font-bold">{title}</h1>
            <Avatar.Root>
                <Avatar.Image src={data.userProfile?.profilePicture} alt={data.userProfile?.username} />
                <Avatar.Fallback>{data.userProfile?.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
            </Avatar.Root>
            <Input
                type="email"
                placeholder="Email"
                name="email"
                value={data.userProfile?.email}
                readonly
            />
            <Input
                type="text"
                placeholder="Username"
                name="username"
                value={data.userProfile?.username}
                readonly
            />
            <Separator />
            <form method="post" action="http://localhost:5173/" use:enhance>
              <Button type="submit">
                Logout
              </Button>
            </form>
        </div>
    </div>
</main>