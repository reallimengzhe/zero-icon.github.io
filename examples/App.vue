<template>
  <div id="app">
    <AppNav />
    <div class="app-header">
      <h2>简单易用的 VUE 图标组件</h2>
      <p>Zero Icon 为设计师和开发人员精心设计。是一个既包含中性风格，又包含针对产品专门设计的图标库。</p>
    </div>
    <span>示例：</span>
    <!-- <ZeroIcon icon="message" />
    <zero-icon icon="book" /> -->
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    AppNav: () => import("@/layout/AppNav")
  }
};
</script>
<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
}
.app {
  &-header {
    padding: 80px 0;
    background-color: #f2f6fc;
    h2,
    p {
      text-align: center;
    }
    h2{
      margin-bottom: 20px;
    }
  }
}
</style>