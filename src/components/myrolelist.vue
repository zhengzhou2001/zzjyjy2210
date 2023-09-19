<template>
  <div>
    <el-dialog v-model="store.dialogVisible" :title="id ? '编辑' : '新增'" width="60%">
      <el-form :inline="true" ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize" status-icon>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="电话" prop="remark">
          <el-input v-model="ruleForm.remark" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="danger" @click="resetForm(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {useRouter, useRoute} from "vue-router";
import type {FormInstance, FormRules} from 'element-plus';
import { useCounterStore } from '../stores/counter'



const route = useRoute();
const router = useRouter();
const props = defineProps(['id', 'ruleForm'])
const ruleFormRef = ref<FormInstance>();
const store=useCounterStore()

const emits = defineEmits(['resetForm', 'submitForm'])
const resetForm = (val: any) => {
  emits('resetForm',val)
}
const submitForm = (val: any) => {
  emits('submitForm',val)
}
</script>

<style lang="scss" scoped></style>