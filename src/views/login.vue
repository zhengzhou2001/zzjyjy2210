<template>
  <div class="loginbox">
    <div class="login">
      <h2>系统登录</h2>
      <el-form ref="formRef" :model="form" label-width="auto">
        <el-form-item>
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" show-password />
        </el-form-item>
        <el-form-item> <el-input v-model="form.code" style="width: 350px" /><img :src="imgText" alt="" @click="changeImg" /> </el-form-item>
      </el-form>
      <el-button type="primary" size="large" @click="login">登录</el-button><el-button size="large" plain type="danger" @click="remove">还原数据</el-button>
      <div>温馨提示：<span style="color: red">账号无法登录的时候，请点击【还原数据】按钮</span></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { queryCode, queryLogin } from '../request/index';
import {ElMessage} from 'element-plus';

const route = useRoute();
const router = useRouter();
const form = reactive({
  username: 'admin',
  password: '1234',
  code: '',
});
const imgText = ref('');
onMounted(() => {
  getImg();
});
const getImg = () => {
  queryCode()
    .then((res: any) => {
      return 'data:image/png;base64,' + btoa(new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    })
    .then((res: any) => {
      console.log(res);
      imgText.value = res;
    });
};
const changeImg = () => {
  getImg();
};
const login = async () => {
  const res: any = await queryLogin(form);
  console.log(res);
  if (res.data.code == 200) {
    localStorage.setItem('token', res.data.token);
    router.push('/');
  } else {
    ElMessage.error('登录失败.');
  }
};
const remove = () => {
  ElMessageBox.confirm('确定还原数据吗?', '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      (form.username = 'admin'), (form.password = '1234'), (form.code = '');
      ElMessage({
        type: 'success',
        message: '数据库还原成功',
      });
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消还原数据',
      });
    });
};
</script>

<style lang="scss" scoped>
.loginbox {
  min-width: 1024px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .login {
    width: 540px;
    height: 300px;
    border-radius: 6px;
    padding: 20px;
    margin: 230px auto;
    box-shadow: 1px 1px 10px -3px #333;
    h2 {
      text-align: center;
    }
  }
}
::v-deep(.el-form-item__content) {
  display: flex;
  justify-content: space-between;
}
</style>
