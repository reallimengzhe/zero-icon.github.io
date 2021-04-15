<template>
  <div class="app-container">
    <header class="app-container-header" ref="cardWrap">
      <a-input class="app-nav-search" v-model="iconName" placeholder="搜索图标">
        <a-icon slot="prefix" type="search" />
      </a-input>
    </header>
    <div class="icon-group" v-for="group in iconList" :key="group.name">
      <h3
        class="icon-group-title"
        :hidden="iconName.length > 0"
      >{{ group.name }} · {{ group.label }}</h3>
      <div class="icon-group-list">
        <icon-cell
          v-for="(tag, key) in group.list"
          v-show="iconName === '' || tag.includes(iconName) || key.indexOf(iconName) > -1"
          :key="key"
          :name="key"
          :tag="tag"
          :style="{width: cardWidth + 'px'}"
        ></icon-cell>
      </div>
    </div>
  </div>
</template>

<script>
import IconCell from "@/components/icon-cell";
export default {
  name: "AppContainer",
  components: {
    IconCell,
  },
  data() {
    return {
      // 搜索图标名字
      iconName: "",
      //
      iconList: [],
      // 卡片数量
      cardWidth: 128,
      cardNumber: 4,
    };
  },
  created() {
    this.handleGetIconList();
  },
  mounted() {
    this.returnCardWidth();
    window.addEventListener("resize", this.returnCardWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.returnCardWidth);
  },
  methods: {
    // 获取图标
    handleGetIconList() {
      this.iconList = require("../../icon.json");
    },
    // 获取本地图标
    handleGetLocalIconList() {
      const allIcons = require.context("../../icons", false, /\.svg$/).keys();
      allIcons.forEach((item) => {
        let name = item.substring(0, item.length - 4).slice(2);
        this.iconList.push(name);
      });
    },
    // 计算卡片宽度
    returnCardWidth() {
      let wrapWidth = this.$refs.cardWrap.offsetWidth - 1;
      this.cardNumber = Math.floor(wrapWidth / 128);
      this.cardWidth = wrapWidth / this.cardNumber;
    },
  },
};
</script>

<style lang="less">
@import "@/styles/variables";
.app-container {
  width: 100%;
  padding: 40px 5vw;
  &-header {
    height: 52px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    position: sticky;
    top: 52px;
  }
}
.icon-group {
  &-title {
    color: @--color-primary;
    margin: 40px 0 10px;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>