// import './assets/main.css'
import {useCounterStore} from '@/stores/counter'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import pers from 'pinia-plugin-persistedstate';

import App from './App.vue'
import router from './router'
import MBX from '@/components/bread.vue'
//生成svg sprite图标
// import "virtual:svg-icons-register";
// 引入所有icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App);



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 全局自定义指令
// app.directive('color', {
//   created (el, binding) {
//     // console.log(el);
//     // console.log(binding);
//     if (binding.value)
//     {
//       el.style.backgroundColor=binding.value
//     } else
//     {
//       el.style.backgroundColor = 'green';
//     }


//   }
// })
app.directive('btnBind', {
  mounted(el, binding) {
    const store = useCounterStore();

    //el:元素
    if (!store.getInfo.find((item) => item == binding.value)) {
      el.disabled = true;
    }
  },
});

app.use(createPinia().use(pers));
app.use(router)
app.component('MBX',MBX)
app.mount('#app')
