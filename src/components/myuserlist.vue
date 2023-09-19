<template>
  <div class="userlist">
    <el-dialog v-model="store.dialogVisible" :title="id ? '编辑' : '新增'" width="60%">
      <el-form :inline="true" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="所属部门" prop="deptName">
          <el-input v-model="ruleForm.deptName" @click="d = true" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="姓名" prop="loginName">
          <el-input v-model="ruleForm.loginName" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="ruleForm.mobile"  prop="mobile"/>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="ruleForm.nickName" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="登录名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="密码" v-if="!id"  prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
          </el-radio-group>
          </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="resetForm(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 第一个input弹框 -->
    <el-dialog v-model="d" title="选择上级部门" width="30%">
      <mydepartinput @handleNodeClick="handleNodeClick"></mydepartinput>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="d = false">取消</el-button>
          <el-button type="primary" @click="sureHandle"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {useRouter, useRoute} from "vue-router";
import {useCounterStore} from '../stores/counter'
import type {FormInstance, FormRules} from 'element-plus';

const route = useRoute();
const router = useRouter();
const store = useCounterStore()
const props=defineProps(['id', 'ruleForm'])
const d = ref(false);

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();

const jj = ref('');
const rules = reactive<FormRules<any>>({
  deptName: [{ required: true, message: '请选择所属部门', trigger: 'blur' }],
  loginName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
  mobile: [{ required: true, message: '请填写电话', trigger: 'blur' }],
  username: [{ required: true, message: '请填写登录名', trigger: 'blur' }],
  password: [{ required: true, message: '请填写密码', trigger: 'blur' }],
  sex: [{ required: true, message: '请选择性别', trigger: 'blur' }],
});

const emits = defineEmits(['resetForm', 'submitForm','handleNodeClick'])
const handleNodeClick = (data: any) => {
  jj.value = data.name;
  props.ruleForm.deptId=data.deptId
  props.ruleForm.id = data.id;
  emits('handleNodeClick',data)
};
const sureHandle = () => {
  d.value = false;
  props.ruleForm.deptName = jj.value;
};



const resetForm = (val: any) => {
  emits('resetForm',val)
}
const submitForm = (val: any) => {
  emits('submitForm',val)
}
</script>

<style lang="scss" scoped></style>