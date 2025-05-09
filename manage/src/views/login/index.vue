<template>
  <section class="login">
    <div class="login-form">
      <h2>后台管理系统</h2>
      <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        :style="{
          maxWidth: '640px',
        }"
      >
        <n-form-item path="username">
          <n-input v-model:value="model.username" placeholder="账号" />
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="model.password"
            type="password"
            show-password-on="mousedown"
            placeholder="密码"
          />
        </n-form-item>
        <div style="display: flex; justify-content: flex-end; gap: 24px">
          <n-button @click="onReset">重置</n-button>
          <n-button type="primary" @click="onLogin">登录</n-button>
        </div>
      </n-form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { login } from '../../api/index.js'
const $router = useRouter()
const message = useMessage()
// 账号、密码
const model = ref({
  username: '',
  password: '',
})

const formRef = ref(null)

const rules = {
  username: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入账号',
  },
  password: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入密码',
  },
}

// 登录
const onLogin = () => {
  // $router.push('/')

  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        const res = await login({
          username: model.value.username,
          password: model.value.password,
        })
        if (res.status == '1') {
          // 登录成功 存储 token 到本地
          localStorage.setItem('BLOG_TOKEN', res.data.token)
          // 登录成功 跳转到首页
          $router.push('/')
        } else {
          message.warning("账号或密码错误！")
        }
      } catch (error) {
        console.log(error);
        message.error(error.message)
      }
    }
  })
}

// 重置
const onReset = () => {
  model.value = {
    username: '',
    password: '',
  }
}
</script>



<style lang="less" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 400px;
    height: 240px;
    background-color: #fff;
    padding: 24px;
    border-radius: 12px;

    h2 {
      text-align: center;
      margin-bottom: 24px;
    }
  }
}
</style>
