<script lang="ts">
    export let data;
  
    const title = data.userProfile?.email
      ? `${data.userProfile?.email} profile`
      : "Profile";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="max-w-5xl mx-auto px-4">
  <p>Hello {data.userProfile?.email}</p>
  <p>You are logged in as {data.userProfile?.email}</p>
  <p>Last logged in {new Date(data.session.updatedAt * 1000).toLocaleString()}</p>

  <img
    src={data.userProfile?.profilePicture}
    alt="{data.userProfile?.email}'s profile picture"
  />
</div>