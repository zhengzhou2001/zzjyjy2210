<template>
  <div class="wo">
    <!-- <MBX title1="系统管理" title2="用户管理"></MBX> -->

    <div class="left">
      <mydepartinput @handleNodeClick="handleNodeClick"></mydepartinput>
    </div>
    <div class="right">
      <!-- 搜索添加 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="formInline.loginName" placeholder="请输入用户姓名" clearable @input="getData()" />
        </el-form-item>
        <el-form-item>
          <el-button :icon="Search" @click="onSubmit">搜索</el-button>
          <el-button @click="reset" :icon="Close" class="chong">重置</el-button>
          <el-button type="primary" :icon="Plus" @click="add" v-btnBind="'sys:user:add'" >新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
        <el-table-column prop="loginName" label="姓名" sortable />
        <el-table-column prop="deptName" label="所属部门" />
        <el-table-column prop="mobile" label="电话" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="操作" width="280px">
          <template #default="scope">
            <el-button size="small" :icon="Edit" type="primary" @click="edit(scope.row)" v-btnBind="'sys:user:edit'">编辑</el-button>
            <el-button size="small" :icon="Setting" type="primary" @click="setting(scope.row)">分配角色</el-button>
            <el-button size="small" :icon="Delete" type="danger" @click="del(scope.row)" v-btnBind="'sys:user:delete'">删除</el-button>
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

        <myuserlist @submitForm="submitForm" @resetForm="resetForm" :id="id" :ruleForm="ruleForm" @handleNodeClick="handleNodeClick"></myuserlist>
        <myusertree ></myusertree>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { queryUser,queryUserAdd,queryUserEdit,queryUserDelete,queryUserTree } from '@/request/index'
import {Search, Close, Plus, Edit, Delete, Setting} from '@element-plus/icons-vue';
import mydepartinput from '@/components/mydepartinput.vue'
import myuserlist from '@/components/myuserlist.vue'
import {useCounterStore} from '../../stores/counter'
import myusertree from '@/components/myusertree.vue'


const route = useRoute();
const router = useRouter();
const store=useCounterStore()
const tableData = ref<any[]>([]);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const total=ref('')
const id = ref()
const deptId = ref<any>(1);


const formInline =reactive( {
  loginName: '',
})
const handleNodeClick = (data: any) => {
  // console.log(data,1);

  deptId.value = data.id;
  ruleForm.deptId = data.id;
  ruleForm.type = data.likeId

  getData()
};
const params = reactive({
  currentPage:1,
  pageSize: 10,
})

onMounted(() => {
  getData();
});
const getData = async () => {

  const res: any = await queryUser({loginName:formInline.loginName,currentPage:params.currentPage,pageSize:params.pageSize,deptId:deptId.value})
  console.log(res);
  tableData.value = res.data.data.records
  total.value=res.data.data.total



};
const onSubmit = () => {
  getData();
  // console.log(11);
};


interface RuleForm {
  deptId: number,
  deptName: string,
  email: string,
  loginName: string,
  mobile: string,
  nickName: string,
  password: string,
  username: string,
  sex: string,
  type: string,
  id:string
}


const ruleForm = reactive<RuleForm>({
  deptId: 1,
  deptName: '',
  email: '',
  loginName: '',
  mobile: '',
  nickName: '',
  password: '',
  username: '',
  sex: '',
  type: '0',
  id:''
});


const submitForm = async (formEl:any) => {
  if (!formEl) return;
  await formEl.validate((valid:any, fields:any) => {
    if (valid)
    {
      if (id.value)
      {
        console.log(1);

        queryUserEdit({id: id.value,deptId:deptId.value,deptName:ruleForm.deptName,email:ruleForm.email,loginName:ruleForm.loginName,mobile:ruleForm.mobile,nickName:ruleForm.nickName,password:ruleForm.password,username:ruleForm.username,sex:ruleForm.sex}).then((res:any) => {
          getData()
        })
      } else
      {
        console.log(2);
        console.log(ruleForm);


         queryUserAdd({id: id.value,deptId:deptId.value,deptName:ruleForm.deptName,email:ruleForm.email,loginName:ruleForm.loginName,mobile:ruleForm.mobile,nickName:ruleForm.nickName,password:ruleForm.password,username:ruleForm.username,sex:ruleForm.sex,type:ruleForm.type}).then((res: any) => {
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
  ruleForm.deptName= '',
  ruleForm.email= '',
  ruleForm.loginName= '',
  ruleForm.mobile= '',
  ruleForm.nickName= '',
  ruleForm.password= '',
  ruleForm.username='',
  ruleForm.sex= '',

  store.dialogVisible = true;
};
const reset = () => {
  formInline.loginName =''
  // getData()
};
const edit = (row: any) => {
   console.log(row);
  id.value=row.id
  ruleForm.deptId = row.deptId
  ruleForm.deptName = row.deptName
  ruleForm.email = row.email
  ruleForm.loginName = row.loginName
  ruleForm.mobile = row.mobile
  ruleForm.nickName = row.nickName
  ruleForm.password=row.password
  ruleForm.username=row.username
  ruleForm.sex=row.sex
  store.dialogVisible=true
};
const del = (row: any) => {
  console.log(row);
  ElMessageBox.confirm('确定要删除吗?', '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      queryUserDelete({id: row.id}).then((res: any) => {
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
const handleSizeChange = (val: number) => {
  params.pageSize=val
  getData()
};
const handleCurrentChange = (val: number) => {
  params.currentPage = val
  getData()
};
const tree = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  userId:id.value
})
const setting = (row: any) => {
  // console.log(row.id);

  id.value = row.id
  queryUserTree({currentPage:tree.currentPage,pageSize:tree.pageSize,total:tree.total,userId:tree.userId}).then((res: any) => {
    console.log(res);

  })
  store.dd=true
}
</script>

<style lang="scss" scoped>
.wo {
  width:100%;
  display: flex !important;
  justify-content: space-around;
  // background-color:#f00;
  padding: 10px;
  height: 100%;
  .left {
    width: 25%;
    border-right: 1px solid #dbdbdb;
  }
  .right {
    width: 77%;
    border-left: 1px solid #dbdbdb;
    padding: 5px;
    height: 100%;
  }
}
.chong {
  color: red;
}
</style>
