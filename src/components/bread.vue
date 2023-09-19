<template>
  <div>
    <el-breadcrumb  separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{title1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{title2}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const props=defineProps({
  title1:{
    type:String,
    default:'一级标题'
  },
  title2:{
    type:String,
    default:'二级标题'
  }
})
</script>

<style lang="scss" scoped></style>