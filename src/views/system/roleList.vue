<template>
  <el-card>
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="params.name" placeholder="请输入用户姓名" clearable />
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="onSubmit">搜索</el-button>
        <el-button @click="reset" :icon="Close" class="chong">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="add" v-btnBind="'sys:role:add'">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table :data="tableData" row-key="id" border default-expand-all>
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="remark" label="角色备注" />
      <el-table-column label="操作" width="280px">
        <template #default="scope">
          <el-button size="small" :icon="Edit" type="primary" @click="edit(scope.row)" v-btnBind="'sys:role:edit'">编辑</el-button>
          <el-button size="small" :icon="Setting" type="primary" @click="setting(scope.row)">分配角色</el-button>
          <el-button size="small" :icon="Delete" type="danger" @click="del(scope.row)" v-btnBind="'sys:role:delete'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="params.currentPage"
      v-model:page-size="params.pageSize"
      :page-sizes="[1, 4, 7, 10]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
    <myrolelist @submitForm="submitForm" @resetForm="resetForm" :id="id" :ruleForm="ruleForm"></myrolelist>
    <myroletree :roletree="roletree" :name="name" :rolecheck="rolecheck" :id="id"></myroletree>
  </el-card>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { Search, Close, Plus, Edit, Delete, Setting } from '@element-plus/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { queryRoles, queryRolesAdd, queryRolesEdit, queryRolesDelete, queryRolesTree } from '../../request/index';
import { useCounterStore } from '../../stores/counter';
import myrolelist from '@/components/myrolelist.vue';
import myroletree from '@/components/myroletree.vue';

const route = useRoute();
const router = useRouter();

const tableData = ref<any[]>([]);
const small = ref(false);
const total = ref(0);
const store = useCounterStore();
const background = ref(false);
const disabled = ref(false);
const roletree = ref<any[]>([]);
const rolecheck = ref<any[]>([]);
const name = ref('');
const id = ref();
const params = reactive({
  userId: 9,
  currentPage: 1,
  pageSize: 10,
  name: '',
});

onMounted(() => {
  getData();
});
// 获取角色数据
const getData = async () => {
  const res: any = await queryRoles(params);
  // console.log(res);
  tableData.value = res.data.data.records;
  total.value = res.data.data.total;
};

interface RuleForm {
  name: string;
  remark: string;
  createUser: string;
  id: string;
  type: string;
}

const ruleForm = reactive<RuleForm>({
  name: '',
  remark: '',
  createUser: '',
  id: '',
  type: '',
});

const submitForm = async (formEl: any) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      if (id.value) {
        queryRolesEdit({ id: id.value, name: ruleForm.name, remark: ruleForm.remark, createUser: ruleForm.createUser }).then((res: any) => {
          getData();
        });
      } else {
        queryRolesAdd(ruleForm).then((res: any) => {
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

// 添加
const add = () => {
  store.dialogVisible = true;
  id.value = '';
  ruleForm.name = '';
  ruleForm.remark = '';
};
// 编辑
const edit = (row: any) => {
  id.value = row.id;
  ruleForm.name = row.name;
  ruleForm.remark = row.remark;
  store.dialogVisible = true;
};
// 删除
const del = (row: any) => {
  console.log(row);
  ElMessageBox.confirm('确定要删除吗?', '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      queryRolesDelete({ id: row.id }).then((res: any) => {
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

// 搜索按钮
const onSubmit = () => {
  getData();
};
// 重置按钮
const reset = () => {
  params.name = '';
  getData();
};
// 分页
const handleSizeChange = (val: number) => {
  params.pageSize = val;
  getData();
};
const handleCurrentChange = (val: number) => {
  params.currentPage = val;
  getData();
};
// 分配角色
const setting = (row: any) => {
  console.log(row);
  id.value = row.id;
  // console.log(id.value);

  name.value = row.name;

  queryRolesTree({
    userId: 9,
    roleId: id.value,
  }).then((res: any) => {
    // console.log(id.value);
    console.log(res);
    roletree.value = res.data.data.listmenu;
    rolecheck.value = res.data.data.checkList;
  });

  store.dd = true;
};
</script>
<style>
.chong {
  color: red;
}
</style>
