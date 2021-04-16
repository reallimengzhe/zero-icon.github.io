<template>
  <div class="app-banner">
    <h2>中性风格 简单易用</h2>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: "Zero Icon 为所有设计师和开发者而设计。免费、开源。",
    };
  },
};
</script>

<style lang="less">
@import "@/styles/variables";
.app-banner {
  padding: 80px 5vw;
  background-color: @--color-background-base;
  h2,
  p {
    text-align: center;
  }
  h2 {
    margin-bottom: 20px;
    // font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }
  p {
    color: @--color-text-placeholder;
  }
}
</style>