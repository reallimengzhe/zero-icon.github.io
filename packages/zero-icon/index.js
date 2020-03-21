// import Vue from "vue";
import ZeroIcon from "./ZeroIcon";

// 全局注册
// Vue.component("z-icon", ZeroIcon);

// 为组件提供 install 安装方法，供按需引入
ZeroIcon.install = Vue => {
  Vue.component(ZeroIcon.name, ZeroIcon);
};

const req = require.context("../../icons", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

// 导出组件
export default ZeroIcon;
