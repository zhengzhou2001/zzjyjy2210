<template>
  <el-dialog v-model="store.dialogVisible" :title="id ? '编辑' : '新增'" width="50%">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="上级部门" prop="parentName">
          <el-input v-model="ruleForm.parentName" @click="d = true" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="ruleForm.deptCode" />
        </el-form-item>
        <el-form-item label="部门电话">
          <el-input v-model="ruleForm.deptPhone" />
        </el-form-item>
        <el-form-item label="部门经理">
          <el-input v-model="ruleForm.manager" />
        </el-form-item>
        <el-form-item label="部门地址">
          <el-input v-model="ruleForm.deptAddress" />
        </el-form-item>
        <el-form-item label="部门序号">
          <el-input v-model="ruleForm.orderNum" />
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
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCounterStore } from '../stores/counter'
import type {FormInstance, FormRules} from 'element-plus';
import mydepartinput from "@/components/mydepartinput.vue";

const route = useRoute();
const router = useRouter();

const store = useCounterStore()
const props=defineProps(['id', 'ruleForm'])
const d = ref(false);

const formSize = ref('default');
const ruleFormRef = ref<FormInstance>();

const jj = ref('');
const rules = reactive<FormRules<any>>({
  parentName: [{ required: true, message: '请选择上级部门', trigger: 'blur' }],
  name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
});


const handleNodeClick = (data: any) => {
  console.log(data.name);
  jj.value = data.name;
  props.ruleForm.type = data.likeId;
  props.ruleForm.pid = data.id;
};
const sureHandle = () => {
  d.value = false;
  props.ruleForm.parentName = jj.value;
};


const emits = defineEmits(['resetForm', 'submitForm',])
const resetForm = (val: any) => {
  emits('resetForm',val)
}
const submitForm = (val: any) => {
  emits('submitForm',val)
}
</script>

<style lang="scss" scoped>

</style>