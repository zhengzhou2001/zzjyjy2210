<template>
  <el-dialog v-model="store.dialogVisible" :title="id ? '编辑' : '新增'" width="60%">
      <el-form :inline="true" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="菜单类型" style="width:100%;">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="0">目录</el-radio>
              <el-radio label="1">菜单</el-radio>
              <el-radio label="2">按钮</el-radio>
          </el-radio-group>
          </el-form-item>
        <el-form-item label="上级菜单" prop="parentName">
          <el-input v-model="ruleForm.parentName" @click="d = true" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="菜单名称" prop="label">
          <el-input v-model="ruleForm.label" />
        </el-form-item>
        <el-form-item v-show="ruleForm.type!=2" label="菜单图标" prop="icon">
          <el-input v-model="ruleForm.icon" />
        </el-form-item>
        <el-form-item v-show="ruleForm.type==1" label="路由名称"  prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item v-show="ruleForm.type==1" label="路由地址" prop="path">
          <el-input v-model="ruleForm.path"  />
        </el-form-item>
        <el-form-item v-show="ruleForm.type==1" label="组件路径" prop="url">
          <el-input v-model="ruleForm.url"  />
        </el-form-item>
        <el-form-item label="权限字段"  prop="code">
          <el-input v-model="ruleForm.code"  />
        </el-form-item>
        <el-form-item label="菜单序号"  prop="orderNum">
          <el-input v-model="ruleForm.orderNum" />
        </el-form-item>
        <el-form>


        </el-form>
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
      <myparents @handleNodeClick="handleNodeClick"></myparents>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="d = false">取消</el-button>
          <el-button type="primary" @click="sureHandle"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
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
  // parentId: [{ required: true, message: '请选择上级菜单', trigger: 'blur' }],
  // type: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
  // name: [{ required: true, message: '请填写路由名称', trigger: 'blur' }],
  // icon: [{ required: true, message: '请填写菜单图标', trigger: 'blur' }],
  // url: [{ required: true, message: '请填写组件路径', trigger: 'blur' }],
  // path: [{ required: true, message: '请填写路由地址', trigger: 'blur' }],
  // code: [{ required: true, message: '请填写权限字段', trigger: 'blur' }],
  // label: [{ required: true, message: '请填写菜单名称称', trigger: 'blur' }],
});

const emits = defineEmits(['resetForm', 'submitForm'])
const handleNodeClick = (data: any) => {
  console.log(data);

  jj.value = data.label;
  props.ruleForm.parentId = data.id;
};
const sureHandle = () => {
  d.value = false;
  props.ruleForm.parentName = jj.value;
};



const resetForm = (val: any) => {
  emits('resetForm',val)
}
const submitForm = (val: any) => {
  emits('submitForm',val)
}
</script>

<style lang="scss" scoped></style>