<template>
  <div class="app-banner">
    <h2>体量丰富、简单易用的图标库和图标组件</h2>
    <p>树维图标库为树维设计师和开发人员而设计，是一个既包含中性风格，又包含产品个性化风格的图标库。</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: `<sw-icon icon="icon" />`
    };
  }
};
</script>

<style lang="less">
.app-banner {
  padding: 80px 0;
  background-color: #f2f6fc;
  h2,
  p {
    text-align: center;
  }
  h2 {
    margin-bottom: 20px;
    // font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }
  p {
    color: #999;
  }
}
</style>