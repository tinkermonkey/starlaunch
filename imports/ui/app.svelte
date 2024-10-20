<script>
  import { Meteor } from "meteor/meteor";
  import { onMount } from "svelte";
  import Router, { location } from "svelte-spa-router";
  import { Spinner } from "flowbite-svelte";
  import { log4js } from "/imports/api/logger.js";

  import Login from "/imports/ui/pages/login.svelte";
  import Home from "/imports/ui/pages/home.svelte";

  const logger = log4js.getLogger("app.svelte");

  let user = null;
  let loading = true;
  let currentLocation = null;
  const userTimeout = 500;

  const authenticatedRoutes = {
    "/": Home,
  };

  const anonymousRoutes = {
    "/anon/test": Login,
  };

  // Mimic the authenticated routes for the standalone usage
  const standaloneRoutes = Object.keys(authenticatedRoutes).reduce(
    (acc, key) => {
      acc["/standalone" + key] = authenticatedRoutes[key];
      return acc;
    },
    {}
  );

  $m: {
    user = Meteor.user();
    if (user && loading) {
      loading = false;
    } else if (loading) {
      setTimeout(() => {
        loading = false;
      }, userTimeout);
    }
  }

  location.subscribe((value) => {
    logger.info("Location changed:", value);
    currentLocation = value;
  });
</script>

{#if currentLocation && currentLocation.match(/^\/nolayout/i)}
  {#if user}
    <Router routes={standaloneRoutes} />
  {:else}
    <div class="min-h-screen flex flex-row">
      <Login />
    </div>
  {/if}
{:else if currentLocation && currentLocation.match(/^\/anon/i)}
  <div class="min-h-screen flex flex-row">
    {#if !loading}
      <div class="w-full">
        <main class="p-3">
          <Router routes={anonymousRoutes} />
        </main>
      </div>
    {:else}
      <Spinner />
    {/if}
  </div>
{:else}
  <div class="min-h-screen flex flex-row">
    {#if !loading}
      {#if user}
        <div class="w-full">
          <main class="p-3">
            <Router routes={authenticatedRoutes} />
          </main>
        </div>
      {:else}
        <Login />
      {/if}
    {:else}
      <Spinner />
    {/if}
  </div>
{/if}
