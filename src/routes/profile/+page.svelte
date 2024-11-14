<script lang="ts">
    import { enhance } from "$app/forms";
    export let data;
  
    const title = data.userProfile?.email
      ? `${data.userProfile?.email} profile`
      : "Profile";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4">
  <p>Hello {data.userProfile?.username}</p>
  <p>You are logged in as {data.userProfile?.email}</p>
  <p>Last logged in {new Date(data.session.updatedAt + 0).toLocaleString()}</p>

  <img
    src={data.userProfile?.profilePicture}
    alt="{data.userProfile?.username}'s profile picture"
  />

  <form method="post" action="http://localhost:5173/" use:enhance>
    <input type="submit" value="Sign out" />
  </form>
</div>