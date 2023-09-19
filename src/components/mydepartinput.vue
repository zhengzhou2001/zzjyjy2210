<template>
 <div>
  <el-tree :data="tabled" :props="defaultProps" @node-click="handleNodeClick" default-expand-all  :expand-on-click-node="false"/>
 </div>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import {useRouter, useRoute} from "vue-router";
import { queryParent,queryMenuParent } from '@/request/index';

const route = useRoute();
const router = useRouter();

const tabled = ref<any[]>([])



onMounted(() => {
  queryParent({}).then((res: any) => {
    // console.log(res);
    tabled.value = res.data.data

  })

})
const defaultProps = {
  children: 'children' as const,
  label: 'name',
};
const emit=defineEmits()
const handleNodeClick = (data: any) => {
  console.log(data);

  emit('handleNodeClick',data)
}
</script>
<style lang="scss" scoped></style>