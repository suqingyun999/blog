// import type {RouteRecordRaw} from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
    name: 'Login',
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('../views/home/index.vue'),
        name: 'Home',
      },
      {
        path: 'content',
        // component: () => import('../views/content/index.vue'),
        name: 'Content',
        children: [
          {
            path: 'index',
            component: () => import('../views/content/index.vue'),
            name: 'ContentList',
          },
          {
            path: 'create',
            component: () => import('../views/content/create.vue'),
            name: 'ContentCreate',
          },
          {
            path: 'update',
            component: () => import('../views/content/update.vue'),
            name: 'ContentUpdate',
          },
        ],
      },
      {
        path: 'message',
        // component: () => import('../views/message/index.vue'),
        name: 'Message',
        children: [
          {
            path: 'index',
            component: () => import('../views/message/index.vue'),
            name: 'MessageList',
          },
          {
            path: 'create',
            component: () => import('../views/message/create.vue'),
            name: 'MessageCreate',
          },
          {
            path: 'update',
            component: () => import('../views/message/update.vue'),
            name: 'MessageUpdate',
          },
        ],
      },
      {
        path: 'about',
        component: () => import('../views/about/index.vue'),
        name: 'About',
      },
      {
        path: 'info',
        component: () => import('../views/info/index.vue'),
        name: 'Info',
      },
      {
        path: 'self',
        component: () => import('../views/self/index.vue'),
        name: 'Self',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
