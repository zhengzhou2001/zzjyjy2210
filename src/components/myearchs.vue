<template>
  <div>

      <div class="top">
        <div class="oo">{{ title }}</div>
        <div :id="props.id" style="width: 250px;height: 250px;"></div>
      </div>


  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import * as echarts from 'echarts';

const route = useRoute();
const router = useRouter();
const props = defineProps({
  title:{
    type: String,
    default:'11'
  },
  id: String,
   option: {
      type:Object
    }
})

onMounted(() => {
  var chartDom = document.getElementById(props.id!);
  var myChart = echarts.init(chartDom);
  props.option && myChart.setOption(props.option);
})
</script>

<style lang="scss" scoped>
.top {
  width: 330px;
  height: 350px;
  box-shadow: 0 0 10px -5px #333;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.oo{
  border-bottom: 1px solid #909090;
  margin-bottom: 10px;
}
</style>