import Vue from "vue";
import App from "./App.vue";

// import local styles
import "./styles/index.less";

// import local component
import SelfComponent from "./../packages";
Vue.use(SelfComponent);

// ant-design-vue
import {
  Button,
  Input,
  Modal,
  message,
  Tag,
  Timeline,
  Icon,
  Popover,
} from "ant-design-vue";
Vue.use(Button)
  .use(Input)
  .use(Modal)
  .use(Tag)
  .use(Icon)
  .use(Timeline)
  .use(Popover);
Vue.prototype.$message = message;

Vue.config.productionTip = false;

// render pages
new Vue({
  render: h => h(App),
}).$mount("#app");
