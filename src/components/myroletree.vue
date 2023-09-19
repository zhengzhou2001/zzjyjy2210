<template>
  <el-dialog
    v-model="store.dd"
    :title="`为【${name}】分配权限`"
    width="50%"
  >
     <el-tree
    :data="roletree"
    show-checkbox
    node-key="id"
    default-expand-all
    :default-checked-keys="rolecheck"
    :props="defaultProps"
    @check="dian"
  />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.dd = false">取消</el-button>
        <el-button type="primary" @click="sureHandle">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import {useRouter, useRoute} from "vue-router";
import {useCounterStore} from '../stores/counter'
import { queryRoleSave } from '../request/index'

const route = useRoute();
const router = useRouter();
const store=useCounterStore()

const defaultProps = {
  children: 'children',
  label: 'label',
}
const props=defineProps(['roletree','name','rolecheck','id'])

const tree = reactive({
  roleId: props.id,
  list:[]
})
const dian = (props,data) => {
  console.log(data);
  tree.list=  data.checkedKeys
}

const sureHandle = () => {
  queryRoleSave({
    roleId: props.id,
    list:tree.list
  }).then(res => {
    console.log(res);

  })
  store.dd = false
}
</script>

<style lang="scss" scoped></style>