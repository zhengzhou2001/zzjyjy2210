<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!-- 组件菜单 -->
        <myaside :menuList="menuList"></myaside>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 组件头部 -->
          <myhead></myhead>
        </el-header>

        <el-main>
          <!-- <p><input type="text" v-model="jj" /> {{ jj }}</p>
          <p><input type="text" v-throttle="2" />{{ jj1 }}</p> -->
          <router-view></router-view
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { queryMenuList, queryGetinfo } from '../request/index';
import myaside from '@/components/myaside.vue';
import myhead from '@/components/myhead.vue';
import { useCounterStore } from '../stores/counter';

const route = useRoute();
const router = useRouter();
const menuList = ref<any[]>([]);
const store = useCounterStore();
const jj = ref('');
const jj1 = ref('');

// const throttle = {
//   created(el: any, binding: any) {
//     console.log(el);
//     console.log(binding);
//     if (!binding.value) {
//       binding.value = 2;
//     }
//     let timer: any;
//     el.addEventListener(
//       'focus',
//       (event: any) => {
//         if (!timer) {
//           // 第⼀次执⾏
//           timer = setTimeout(() => {
//             timer = null;
//           }, binding.value);
//         } else {
//           event && event.stopImmediatePropagation();
//         }
//       },
//       true,
//     );
//   },
// };

onMounted(() => {
  queryMenuList({}).then((res: any) => {
    // console.log(res);
    menuList.value = res.data.data;
  });
  queryGetinfo({}).then((res: any) => {
    console.log(res);
    store.getInfo = res.data.data.roles;
  });
});
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  background-color: #304156;
}
.el-header {
  width: 100%;
  height: 100px;

  padding: 10px;
  border-bottom: 1px solid #bebebe;
}
</style>
