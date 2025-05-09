// import type {RouteRecordRaw} from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
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
            path: '',
            component: () => import('../views/content/index.vue'),
            name: 'ContentList',
          },
          {
            path: 'detail',
            component: () => import('../views/content/detail.vue'),
            name: 'ContentDetail',
          },
        ],
      },
      {
        path: 'message',
        component: () => import('../views/message/index.vue'),
        name: 'Message',
      },
      {
        path: 'self',
        component: () => import('../views/self/index.vue'),
        name: 'Self',
      },
      {
        path: 'about',
        component: () => import('../views/about/index.vue'),
        name: 'About',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
