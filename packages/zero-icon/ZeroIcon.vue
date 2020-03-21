<template>
  <svg aria-hidden="true" v-on="$listeners" :style="style">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "ZeroIcon",
  props: {
    icon: { type: String, required: true }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    style() {
      return {
        width: "1em",
        height: "1em",
        overflow: "hidden",
        fill: "currentColor",
        verticalAlign: "-0.15em"
      };
    }
  }
};
</script>
