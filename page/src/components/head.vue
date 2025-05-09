<template>
  <div class="head">
    <ul class="menu menu-s">
      <li v-for="item in menu" :key="item.path">
        <router-link :to="item.path" class="link" activeClass="activeClass">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
const $route = useRoute()

const menu = ref([
  {
    path: '/home',
    label: '首页',
  },
  {
    path: '/content',
    label: '内容',
  },
  {
    path: '/message',
    label: '留言',
  },
  {
    path: '/self',
    label: '自己',
  },
  {
    path: '/about',
    label: '关于',
  },
])
</script>

<style scoped lang="less">
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 56px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  .menu {
    display: flex;
    gap: 32px;
    .link {
      text-decoration: none;
      font-size: 16px;
      color: rgb(54, 54, 54);
      &:hover {
        color: #18a058;
      }
    }
    .activeClass {
      color: #18a058;
    }
  }
  .head-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0.01;
  }
}
@media screen and (min-width: 768px) {
  .head {
    .menu-s {
      gap: 48px;
      .link {
        font-size: 20px;
      }
    }
  }
}
</style>

