<template>
  <div>
    <div class="top">
       <myearchs title="今日访客" :id="'jin'" :option="option1"></myearchs>
    <myearchs title="订单统计" :id="'ding'" :option="option2"></myearchs>
    <myearchs title="待发送" :id="'dai'" :option="option3"></myearchs>
    </div>

       <div class="bottom">
      <div style="color: blue" class="oo">课程介绍</div>
      <div class="bottom1">
        <div>
          <p>1、Vue3 + Ts + Element Plus项目实战学习地址</p>
          <p>2、vue-element-admin、jwt、Spring Security、Spring Boot项目实战</p>
          <p>3、vue、element-ui、springboot前后端分离权限管理系统实战</p>
          <p>4、vue-admin-template + springboot+vue前后端分离项目实战-物业管理系统</p>
        </div>
        <div><myearchs title="课程介绍" :id="'ke'" :option="option4"></myearchs></div>
      </div>
    </div>



    <!-- <myearchs></myearchs> -->
    <!-- <button v-test:add>点我</button>
    <button v-test:abc>点我</button>
    <p v-color="color">123</p> -->
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import myearchs from '@/components/myearchs.vue'

const route = useRoute();
const router = useRouter();

// 局部自定义指令
// const arr = ['add', 'del', 'edit']
// const color=ref('red')
// const vTest = {
//   created (el, binding) {

//     // console.log(el);
//     // console.log(binding);
//     if (!arr.includes(binding.arg))
//     {
//       el.setAttribute('disabled',true)
//     }


//   }
// }


 const option1 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
        },
      },
    ],
  };





 const  option2 = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };




 const option3 = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };




 const option4 = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };



</script>

<style lang="scss" scoped>
.top{
  width: 100%;
  display: flex;
}
.bottom {
  box-shadow: 0 0 10px -5px #333;

  margin: 20px;
  padding: 20px;
  height: 400px;
  .bottom1 {
    display: flex;
    justify-content: space-around;

  }
}
</style>
