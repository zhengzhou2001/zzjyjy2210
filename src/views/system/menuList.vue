<template>
  <div>
    <!-- <MBX title1="系统管理" title2="权限管理"></MBX> -->
    <el-card>
      <el-button type="primary" :icon="Plus" @click="add" v-btnBind="'sys:menu:add'">新增</el-button>

      <el-table :data="tableData" border row-key="id" default-expand-all height="704px">
        <el-table-column prop="label" label="菜单名称" width="180px" />
        <el-table-column label="类型">
          <template #default="scope">
            <el-tag :type="scope.row.type == 0 ? '' : scope.row.type == 1 ? 'success' : 'danger'">{{
              scope.row.type == 0 ? '目录' : scope.row.type == 1 ? '菜单' : '按钮'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="图标">
          <template #default="scope">
              <component :is="scope.row.icon" width="20px"></component>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="路由名称" />
        <el-table-column prop="path" label="路由地址" />
        <el-table-column prop="url" label="组件路径" />
        <el-table-column prop="code" label="权限字段" />
        <el-table-column label="操作" width="200px">
          <template #default="scope">
            <el-button size="small" type="primary" :icon="Edit" @click="edit(scope.row)" v-btnBind="'sys:menu:edit'">编辑</el-button>
            <el-button size="small" type="danger" :icon="Delete" @click="del(scope.row)" v-btnBind="'sys:menu:delete'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <mymenulist @submitForm="submitForm" @resetForm="resetForm" :id="id" :ruleForm="ruleForm"></mymenulist>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { queryMenulist, queryMenulistAdd, queryMenuListEdit, queryMenulistDelete } from '../../request/index';
import { useCounterStore } from '../../stores/counter';
import mymenulist from '@/components/mymenulist.vue';

const route = useRoute();
const router = useRouter();
const store = useCounterStore();
const tableData = ref<any[]>([]);
const id = ref('');
onMounted(() => {
  getData();
});
const getData = async () => {
  const res: any = await queryMenulist({});
  console.log(res);
  tableData.value = res.data.data;
};

interface RuleForm {
  parentId: string;
  parentName: string;
  label: string;
  code: string;
  path: string;
  name: string;
  url: string;
  orderNum: number;
  type: string;
  icon: string;
  editType: string;
  id: string;
}

const ruleForm = reactive<RuleForm>({
  id:'',
  parentId: '',
  parentName: '',
  editType:'0',
  label: '',
  code: '',
  path: '',
  name: '',
  url: '',
  orderNum: null,
  type: '1',
  icon: '',
});

const submitForm = async (formEl: any) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      if (id.value) {
        queryMenuListEdit({id:id.value,parentId:ruleForm.parentId,parentName:ruleForm.parentName,label:ruleForm.label,code:ruleForm.code,path:ruleForm.path,name:ruleForm.name,url:ruleForm.url,orderNum:ruleForm.orderNum,type:ruleForm.type,icon:ruleForm.icon}).then((res: any) => {
          getData();
        });
      } else {
        queryMenulistAdd(ruleForm).then((res: any) => {
          console.log(res);
          getData();
        });
      }

      store.dialogVisible = false;
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl: any) => {
  store.dialogVisible = false;

  if (!formEl) return;
  formEl.resetFields();
};

const add = () => {
  id.value = ''
  ruleForm.parentId= '',
  ruleForm.parentName= '',
  ruleForm.label= '',
  ruleForm.code= '',
  ruleForm.path= '',
  ruleForm.name= '',
  ruleForm.url= '',
  ruleForm.orderNum= '',
  ruleForm.type= '',
  ruleForm.icon='',
  store.dialogVisible = true;
};

const edit = (row: any) => {
  console.log(row);
  id.value=row.id
  ruleForm.parentId=row.parentId
  ruleForm.parentName=row.parentName
  ruleForm.label=row.label
  ruleForm.code=row.code
  ruleForm.path=row.path
  ruleForm.name=row.name
  ruleForm.url=row.url
  ruleForm.orderNum=row.orderNum
  ruleForm.type=row.type
  ruleForm.icon=row.icon
  store.dialogVisible = true;
};
const del = (row: any) => {
  console.log(row);
  ElMessageBox.confirm('确定要删除吗?', '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      queryMenulistDelete({ id: row.id }).then((res: any) => {
        getData();
      });
      ElMessage({
        type: 'success',
        message: '删除成功',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      });
    });
};
</script>

<style lang="scss" scoped></style>
