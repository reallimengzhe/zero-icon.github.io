import SwIcon from "./src/sw-icon";

SwIcon.install = Vue => {
  Vue.component(SwIcon.name, SwIcon);
};

const req = require.context("../../icons", false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

// 导出组件
export default SwIcon;
