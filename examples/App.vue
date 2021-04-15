<template>
  <div id="app" class="app">
    <app-nav />
    <app-banner />
    <app-container />
  </div>
</template>

<script>
import AppNav from "@/layout/app-nav";
import AppBanner from "@/layout/app-banner";
import AppContainer from "@/layout/app-container";
export default {
  name: "App",
  components: {
    AppNav,
    AppBanner,
    AppContainer
  }
};
</script>
<style lang="less">
.app {
  width: 100%;
}
</style>