<script lang="ts">
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Separator } from '$lib/components/ui/separator';
</script>

<svelte:head>
  <title>Login with Google</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 flex items-center justify-center h-screen">
  <div
    class="sm:w-6/12 flex p-6 border border-gray-300 shadow-md rounded-md flex-col gap-4 items-center"
  >
    <h1 class="text-2xl text-gray-700 font-bold">Login with Credentials</h1>

    <Input
      type="email"
      placeholder="Email"
    />

    <Input
      type="password"
      placeholder="Password"
    />

    <div class="flex flex-row gap-8">
        <Button>
            Login
        </Button>
        <Button>
            Register
        </Button>
    </div>

    <Separator />

    <h1 class="text-2xl text-gray-700 font-bold">Login with Google</h1>

    <Button
      href="/login/google"
    >
      Login
    </Button>
  </div>
</div>