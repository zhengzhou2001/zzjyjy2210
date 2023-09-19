<template>
<el-dialog
    v-model="store.dd"
    title="Tips"
    width="50%"
  >
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
  </el-table>
   <!-- <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[1, 3, 5, 7]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change=""
      @current-change=""
    /> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.dd = false">Cancel</el-button>
        <el-button type="primary" @click="store.dd = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import { useCounterStore } from '../stores/counter'


const route = useRoute();
const router = useRouter();
const store = useCounterStore()
const tableData = ref<any[]>([])



</script>

<style lang="scss" scoped></style>