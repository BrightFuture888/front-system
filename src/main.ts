import { createApp, nextTick } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

import { registerMicroApps, start, initGlobalState } from 'qiankun'
// 初始化 state
const actions: any = initGlobalState({test: 'global state'});

actions.onGlobalStateChange((state:any) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state,'qiankun-master');
});


nextTick(()=>{
  actions.setGlobalState({    sender: 'qiankun-master', test:'我是主应用中的数据'});
})
registerMicroApps([
  {
    name: 'vite-vue',
    entry: '//localhost:1112',
    container: '#micro-container',
    activeRule: '/application-one',
      props: { actions },
  },
  {
    name: 'umi-react-template',
    entry: '//web-admin-template.manjuu.com:1113',
    container: '#micro-container',
    activeRule: '/umi-react-template',
    props: { actions },
  },
])



// 启动 qiankun
start({
  sandbox: {
    experimentalStyleIsolation: true,
  },
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

app.mount('#app')
