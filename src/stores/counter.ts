import { ref, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { queryMenuList } from '../request/index';
export const useCounterStore = defineStore(
  'counter',
  () => {
    // 收缩
    const isCollapse = ref(false);
    // department的控制弹框
    const dialogVisible = ref(false);
    // 扁平化数据
    const menuList = ref<any[]>([]);
    // 面包屑数据
    const pathobj = ref<any[]>([]);
    const dd=ref(false)
    const editableTabsValue = ref('0');
    // getInfo数据
    const getInfo=ref([])
    // tab的数据
    const editableTabs = ref([
      {
        title: '首页',
        name: '/welcome',
      },
    ]);

    // 要跳的路径
    const addpath = ref<any[]>([]);
    // 收缩的方法
    const collapse = () => {
      isCollapse.value = !isCollapse.value;
    };
    const setlist = (arr: any) => {
      menuList.value = arr;
    };
    const setPathobj = (obj: any) => {

      pathobj.value = obj;
    };
    // 添加选项库
    const addTabs = (obj: any) => {
      let index = editableTabs.value.findIndex((item: any) => {
        return item.name == obj.name;
      });
      if (index == -1) {
        editableTabs.value.push(obj);
      }
    };
    const remmoeditableTabs = (i: number) => {
      editableTabs.value.splice(i, 1);
    };

    //
    const addallpath = computed((obj: any) => {
      let index = addpath.value.findIndex((item: any) => {
        return item.path == obj.path;
      });
    });

    onMounted(() => {
      queryMenuList({}).then((res: any) => {
        console.log(res);
        menuList.value = res.data.data;
      });
    });
    return { isCollapse, collapse, setPathobj, pathobj, menuList, setlist, addTabs, addpath, addallpath, dialogVisible, editableTabsValue, editableTabs, remmoeditableTabs,dd,getInfo };
  },
  {
    persist: true,
  },
);
