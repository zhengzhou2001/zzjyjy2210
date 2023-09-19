<template>
  <div>
    <div class="top">
      <div class="left">
        <div @click="store.collapse">
          <el-icon :size="20" v-if="store.isCollapse"><Expand /></el-icon><el-icon v-if="!store.isCollapse" :size="20"><Fold /></el-icon>
        </div>

        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in store.pathobj">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="right">
        <el-dropdown>
          <img src="../../public/xz.jpg" alt="" />

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="remove1">还原数据</el-dropdown-item>
              <el-dropdown-item @click="remove2">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="top1">
      <el-tabs v-model="store.editableTabsValue" type="card" class="demo-tabs" closable @tab-click="changepage" @tab-remove="removeTab">
        <el-tab-pane v-for="item in store.editableTabs" :key="item.name" :label="item.title" :name="item.name"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCounterStore } from '../stores/counter';

const route = useRoute();
const router = useRouter();

const store = useCounterStore();
const paths = ref(null);

watch(
  route,
  (val: any) => {
    // console.log(val);
    store.editableTabsValue = val.path;
  },
  {
    immediate: true,
    deep: true,
  },
);

const changepage = (pane: any) => {
  console.log(pane);
  if (pane.props.label == '首页') {
    console.log(111);
    router.push('/welcome');
  } else {
    router.push(pane.props.name);
  }

  //   let index = store.addpath.findIndex((item: any) => {
  //     return item.path == pane.props.name;
  //   });
  //  console.log(store.addpath);
};

const removeTab = (targetName: string) => {
  console.log(targetName);
  const tabs = store.editableTabs;
  let i = tabs.findIndex((item) => {
    return item.name == targetName;
  });
  console.log(i);
  store.remmoeditableTabs(i);
  console.log(route.path);

  //判断删除的页面是否是当前页面

  if (route.path == targetName) {
    //是在当.editableTabs
    router.push(store.editableTabs[i - 1].name);
  }

  // let activeName = store.editableTabsValue;
  // if (activeName === targetName) {
  //   tabs.forEach((tab, index) => {
  //     if (tab.name === targetName) {
  //       const nextTab = tabs[index + 1] || tabs[index - 1];
  //       if (nextTab) {
  //         activeName = nextTab.name;
  //       }
  //     }
  //   });
  // }

  // store.editableTabsValue = activeName;
  // store.editableTabs = tabs.filter((tab) => tab.name !== targetName);
};

// watchEffect(() => {
//   if (store.pathobj.namestr)
// {
//   paths.value=store.pathobj.namestr.split('-')
// }
// })

const remove1 = () => {
  ElMessageBox.confirm('确定还原数据吗?', '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      localStorage.removeItem('token');
      router.push('/login');
      ElMessage({
        type: 'success',
        message: '数据库还原成功',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消还原数据',
      });
    });
};
const remove2 = () => {
  ElMessageBox.confirm('确定退出登录吗?', '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      localStorage.removeItem('token');
      router.push('/login');
      ElMessage({
        type: 'success',
        message: '已成功退出登录',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      });
    });
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bebebe;
}
.left {
  display: flex;
}
.right {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.top1 {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  height: 26px;
  width: 100%;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
