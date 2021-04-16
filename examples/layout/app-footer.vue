<template>
  <footer class="app-footer">
    <h4 @click="'mailto:' + mail">
      <span> develop by </span>
      <a :href="'mailto:' + mail">{{ mail }}</a>
    </h4>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return { mail: "limengzhe@tom.com" };
  },
};
</script>

<style lang="less">
@import "@/styles/variables";
.app-footer {
  // width: 100%;
  padding: 0 5vw;
  h4 {
    padding: 40px 0;
    text-align: center;
    border-top: 1px solid @--color-info;
    color: @--color-text-placeholder;
  }
}
</style>