import { createApp } from "vue";
import "./style.css";
import "virtual:uno.css";
import "ant-design-vue/dist/reset.css";
import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import {
  renderWithQiankun,
  qiankunWindow,
  QiankunProps,
} from "vite-plugin-qiankun/dist/helper";

const pinia = createPinia();
let app = null;
const render = (props: any = {}) => {
  const { container } = props;
  const dom = container?.querySelector("#app");
  app = createApp(App);
  if (dom) {
    console.log("mount-子应用注册已完成。。。");
  } else {
    console.log("子应用独立启动。。。");
  }
  app.use(router).use(Antd).use(pinia);
  app.mount(dom ? dom : "#app");
};

// 独立运行
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}

renderWithQiankun({
  bootstrap() {
    console.log("bootstrap-子应用启动了。。。");
  },
  mount(props) {
    render(props);
  },
  unmount: function (props: QiankunProps): void | Promise<void> {
    console.log("unmount", props);
  },
  update: function (props: QiankunProps): void | Promise<void> {
    console.log("update", props);
  },
});
