<template>
  <div>
    <!-- svg的组件 -->
     <svg aria-hidden="true">
        <use :href="symbolId" :fill="color" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive,computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
    prefix: {
        type: String,
        default: 'icon',
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: '#333',
    },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss" scoped></style>