<template>
  <div class="app-nav">
    <div class="app-nav-logo">
      <zero-icon icon="zero-icon" />
    </div>
    <h2>ZEROICON</h2>
    <div style="flex: 1;"></div>
    <div class="app-nav-install">install / 安装</div>
  </div>
</template>

<script>
export default {
  name: "AppNav"
};
</script>

<style lang="scss">
.app-nav {
  width: 100%;
  height: 66px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 0 5vw;
  display: flex;
  align-items: center;
  &-logo {
    font-size: 40px;
    margin-right: 10px;
  }
  h2 {
    font-size: 20px;
    line-height: 20px;
    font-family: "Bahnschrift";
    font-weight: lighter;
  }
  &-install {
    height: 100%;
    background-color: black;
    color: #fff;
    line-height: 66px;
    font-size: 12px;
    padding: 0 20px;
  }
}
</style>