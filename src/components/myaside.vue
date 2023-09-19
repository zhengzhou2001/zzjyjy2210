<template>
  <el-menu
    @select="savePath"
    unique-opened
    :collapse="store.isCollapse"
    active-text-color="#409eff"
    background-color="#304156"
    class="el-menu-vertical-demo"
    default-active="/welcome"
    text-color="#fff"
    router>
    <div style="width: 100%; height: 50px; display: flex; justify-content: space-around; align-items: center; background-color: #333">
      <img style="width: 32px; height: 32px" src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" alt="" /><span
        style="color: white; font-size: 14px; font-weight: 600"
        v-if="!store.isCollapse"
        >Vue3+TypeScript实战</span
      >
    </div>
    <el-menu-item index="/welcome">
      <el-icon><HomeFilled /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <menuitem :menuList="menuList"></menuitem>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCounterStore } from '../stores/counter';
import menuitem from './menuitem.vue';
import { queryMenuList } from '../request/index';

const route = useRoute();
const router = useRouter();
const menuList = ref<any[]>([]);

const store = useCounterStore();
onMounted(() => {
  queryMenuList({}).then((res: any) => {
    // console.log(res);
    menuList.value = res.data.data;
    // 写入pinia

    getLeaf(menuList.value);
    // console.log(getLeaf(menuList.value));

    if (store.menuList.length == 0) {
      store.setlist(newarr);
    }
  });
});

let newarr = <any[]>[];
function getLeaf(arr: any) {
  for (var i = 0; i < arr.length; i++) {
    if (!arr[i].children) {
      newarr.push(arr[i]);
    } else {
      getLeaf(arr[i].children);
    }
  }
}

const savePath = (index: any, indexPath: any, item: any) => {
  // console.log(index,indexPath);

  let str = '';
  let key = store.menuList.findIndex((item: any) => {
    return item.path == index;
  });
  for (let i = 0; i < indexPath.length - 1; i++) {
    str += indexPath[i] + '-';
  }

  str += store.menuList[key].meta.title;
  // console.log(str);
  store.setPathobj({ path: index, namestr: str });
  let newarr = str.split('-');
  // console.log(newarr);
  store.setPathobj(newarr);

  let obj ={
    title: store.menuList[key].meta.title,
    name: index,
  }
  // console.log(obj);
   store.addTabs(obj)

};

</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
</style>
