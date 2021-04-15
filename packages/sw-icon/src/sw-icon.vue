<template>
  <svg class="sw-icon">
    <use :href="'#icon-' + icon" />
  </svg>
</template>

<script>
export default {
  name: "SwIcon",
  props: {
    icon: { type: String, required: true }
  }
};
</script> 
<style lang="less">
.sw-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
  vertical-align: -0.15em;
}
</style>