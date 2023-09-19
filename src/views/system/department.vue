<template>
  <div>
    <!-- <MBX title1="系统管理" title2="机构管理"></MBX> -->

    <el-button v-permission="[$route.path, 'add']">++++</el-button>
    <!-- 搜索添加 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.searchName" clearable @input="getData()" />
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="onSubmit">搜索</el-button>
        <el-button @click="reset" :icon="Close" class="chong">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table height="704px" :data="tableData" style="width: 100%; " row-key="id" border default-expand-all>
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="deptCode" label="部门编码" />
      <el-table-column prop="deptPhone" label="部门电话" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button :icon="Edit" type="primary" @click="edit(scope.row)">编辑</el-button>
          <el-button :icon="Delete" type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <mydepartment @submitForm="submitForm" @resetForm="resetForm" :id="id" :ruleForm="ruleForm"></mydepartment>
    <!-- 弹框 -->

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Search, Close, Plus, Edit, Delete } from '@element-plus/icons-vue';
import { queryDepartmentList, queryDepartmentListAdd, queryDepartmentListDelete,queryDepartmentListEdit } from '@/request/index';

import mydepartment from '@/components/mydepartment.vue'
import { useCounterStore } from '../../stores/counter'

const route = useRoute();
const router = useRouter();
const id = ref<any>('');
const tableData = ref([]);
const store = useCounterStore()




const formInline = reactive({
  searchName: '',
});

interface RuleForm {
  parentName: string;
  name: string;
  deptCode: string;
  deptPhone: string;
  manager: string;
  deptAddress: string;
  orderNum: string;
  type: string;
  id: string;
  pid: any;
}


const ruleForm = reactive<RuleForm>({

  parentName: '',
  name: '',
  deptCode: '',
  deptPhone: '',
  manager: '',
  deptAddress: '',
  orderNum: '',
  type: '',
  id: '',
  pid: null,
});


const onSubmit = () => {
  getData();
  // console.log(11);
};
const reset = () => {
  formInline.searchName = '';
  // getData()
};
const add = () => {
  id.value = ''
  ruleForm.parentName = ''
  ruleForm.name = ''
  ruleForm.deptAddress = ''
  ruleForm.deptCode = ''
  ruleForm.deptPhone = ''
  ruleForm.manager = ''
  ruleForm.orderNum=''
  store.dialogVisible = true;
};

onMounted(() => {
  getData();
  // queryParent({}).then((res: any) => {
  //   console.log(res);
  //   tabled.value=res.data.data
  // })
});
const getData = async () => {
  const res: any = await queryDepartmentList({ searchName: formInline.searchName });
  // console.log(res);
  tableData.value = res.data.data;
};

const del = (row: any) => {
  console.log(row);

  ElMessageBox.confirm('确定要删除吗?', '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      queryDepartmentListDelete({id: row.id}).then((res: any) => {
        getData()

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
const edit = (row: any) => {

  console.log(row);
  id.value=row.id
  ruleForm.parentName = row.parentName
  ruleForm.name = row.name
  ruleForm.deptAddress = row.deptAddress
  ruleForm.deptCode = row.deptCode
  ruleForm.deptPhone = row.deptPhone
  ruleForm.manager = row.manager
  ruleForm.orderNum=row.orderNum
  store.dialogVisible=true

}
const submitForm = async (formEl:any) => {
  if (!formEl) return;
  await formEl.validate((valid:any, fields:any) => {
    if (valid)
    {
      if (id.value)
      {
        queryDepartmentListEdit({id: id.value,parentName:ruleForm.parentName,name:ruleForm.name,deptCode:ruleForm.deptCode,manager:ruleForm.manager,deptAddress:ruleForm.deptAddress,orderNum:ruleForm.orderNum,deptPhone:ruleForm.deptPhone,pid:ruleForm.pid}).then((res:any) => {
          getData()
        })
      } else
      {
         queryDepartmentListAdd(ruleForm).then((res: any) => {
        // console.log(res);

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


</script>

<style lang="scss" scoped>
.chong {
  color: red;
}

</style>
