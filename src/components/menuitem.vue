<template>
  <template v-for="(item, index) in menuList" :key="index" :index="item.path">
    <el-sub-menu :index="item.meta.title" v-if="item.children && item.children.length > 0">
      <template #title>
        <el-icon><component :is="item.meta.icon" /> </el-icon> <span>{{ item.meta.title }}</span>
      </template>
      <menuitem :menuList="item.children"></menuitem>
    </el-sub-menu>

    <el-menu-item v-else :index="item.path">
      <template #title>
        <el-icon> <component :is="item.meta.icon" /> </el-icon><span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCounterStore } from '../stores/counter';
import menuitem from './menuitem.vue';

const route = useRoute();
const router = useRouter();
const store = useCounterStore();
const props = defineProps(['menuList']);

</script>

<style lang="scss" scoped></style>
