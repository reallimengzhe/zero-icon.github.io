<template>
  <nav class="app-nav">
    <div class="app-nav-logo">
      <sw-icon icon="supwisdom" />
    </div>
    <h2 class="app-nav-title">树维图标库</h2>
    <a-tag>{{ version }}</a-tag>
    <div style="flex: 1;"></div>
    <a-button type="primary" class="app-nav-button" @click="visible = true">开始使用</a-button>
    <a-popover title="待开发">
      <a-button class="app-nav-button" disabled>上传图标</a-button>
    </a-popover>
    <a-popover title="待开发">
      <a-button class="app-nav-button" type="primary" disabled>登录</a-button>
    </a-popover>
    <a-modal
      centered
      v-model="visible"
      width="700px"
      title="Get Started / 开始使用"
      dialog-class="app-nav-course"
      :footer="null"
    >
      <a-timeline>
        <a-timeline-item>
          <h4>添加树维组件库私有源</h4>
          <a-tag>nrm add sw http://npm-repo.dice.supwisdom.com/repository/supwisdom-component/</a-tag>
        </a-timeline-item>
        <a-timeline-item>
          <h4>切换到树维组件库私有源</h4>
          <a-tag>nrm use sw</a-tag>
        </a-timeline-item>
        <a-timeline-item>
          <h4>安装</h4>
          <a-tag>npm i sw-icon</a-tag>
        </a-timeline-item>
        <a-timeline-item>
          <h4>在 main.js 引用</h4>
          <a-tag style="margin-bottom: 10px;">import SwIcon from 'sw-icon'</a-tag>
          <br />
          <a-tag>Vue.use(SwIcon)</a-tag>
        </a-timeline-item>
        <a-timeline-item>
          <h4>在页面中使用</h4>
          <a-tag>{{test}}</a-tag>
        </a-timeline-item>
      </a-timeline>
    </a-modal>
  </nav>
</template>

<script>
export default {
  name: "AppNav",
  data() {
    return {
      // 版本号
      version: require("../../package.json").version,
      // 使用方法
      visible: false,
      // 使用方法
      test: `<sw-icon icon="add" />`,
    };
  },
  methods: {
    //
    handleSearch(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less">
@import "@/styles/variables";
.app-nav {
  position: sticky;
  top: 0;
  width: 100%;
  height: 52px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 0 5vw;
  display: flex;
  align-items: center;
  &-logo {
    color: @--color-primary;
    font-size: 36px;
    margin-right: 10px;
  }
  &-title {
    font-size: 18px;
    line-height: 1;
    margin-right: 10px;
  }
  &-button {
    margin-left: 10px;
  }
  &-course {
    h4 {
      margin-bottom: 10px;
    }
    .ant-tag {
      font-family: @--font-family-code;
    }
  }
}

@media (max-width: 1200px) {
  .app-nav-button {
    display: none;
  }
}
</style>