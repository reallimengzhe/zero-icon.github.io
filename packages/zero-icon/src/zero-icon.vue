<template>
  <svg class="zero-icon">
    <use :href="'#icon-' + icon" />
  </svg>
</template>

<script>
export default {
  name: "ZeroIcon",
  props: {
    icon: { type: String, required: true }
  }
};
</script> 
<style lang="less">
.zero-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
  vertical-align: -0.15em;
}
</style>