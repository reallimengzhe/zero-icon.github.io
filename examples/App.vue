<template>
  <div id="app" class="app">
    <app-nav />
    <app-banner />
    <app-container />
    <app-footer />
  </div>
</template>

<script>
import AppNav from "@/layout/app-nav";
import AppBanner from "@/layout/app-banner";
import AppContainer from "@/layout/app-container";
import AppFooter from "@/layout/app-footer";
export default {
  name: "App",
  components: {
    AppNav,
    AppBanner,
    AppContainer,
    AppFooter,
  },
};
</script>
<style lang="less">
.app {
  width: 100%;
}
</style>