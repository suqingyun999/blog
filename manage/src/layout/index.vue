<template>
  <n-layout has-sider>
    <n-layout-sider width="200">
      <div class="title">后台管理</div>
      <n-menu :options="menuOptions" :value="menuValue" />
    </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <div class="head">
          <h2></h2>
          <n-button @click="logout">退出</n-button>
        </div>
      </n-layout-header>
      <n-layout-content style="height: calc(100vh - 56px);background-color: #f2f2f2;">
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>
<script setup>
import { ref, h } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
const menuValue = ref($route.path.split('/')[1])
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/home',
          },
          onClick() {
            menuValue.value = 'home'
          },
        },
        { default: () => '首页' },
      ),
    key: 'home',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/content/index',
          },
          onClick() {
            menuValue.value = 'content'
          },
        },
        { default: () => '内容' },
      ),
    key: 'content',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/message/index',
          },
          onClick() {
            menuValue.value = 'message'
          },
        },
        { default: () => '留言' },
      ),
    key: 'message',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/about',
          },
          onClick() {
            menuValue.value = 'about'
          },
        },

        { default: () => '关于' },
      ),
    key: 'about',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/info',
          },
          onClick() {
            menuValue.value = 'info'
          },
        },

        { default: () => '信息' },
      ),
    key: 'info',
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/self',
          },
          onClick() {
            menuValue.value = 'self'
          },
        },

        { default: () => '自己' },
      ),
    key: 'self',
  },
]

const logout = () => {
  // 跳转登录页
  $router.push('/login')
  // 清除本地 token
  localStorage.removeItem('BLOG_TOKEN')
}
</script>

<style scoped lang="less">
.head {
  height: 56px;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}

.n-layout-sider {
  border-right: 1px solid #ccc;
}

.title {
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
}
</style>