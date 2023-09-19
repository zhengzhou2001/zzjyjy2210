<template>

  <router-view></router-view>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import {useRouter, useRoute} from "vue-router";

const route = useRoute();
const router = useRouter();
</script>

<style lang="scss">

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}</style>