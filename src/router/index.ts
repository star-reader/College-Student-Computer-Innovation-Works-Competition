import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '智能教学辅助引擎' }
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import('../views/Demo.vue'),
    meta: { title: '轻量化教学智能辅助引擎 - 演示' },
    redirect: '/demo/voice',
    children: [
      {
        path: 'voice',
        name: 'VoiceDemo',
        component: () => import('../views/demo/VoiceDemo.vue'),
        meta: { title: '语音识别与分析 - 演示' }
      },
      {
        path: 'image',
        name: 'ImageDemo',
        component: () => import('../views/demo/ImageDemo.vue'),
        meta: { title: '图像识别与分析 - 演示' }
      },
      {
        path: 'structure',
        name: 'StructureDemo',
        component: () => import('../views/demo/StructureDemo.vue'),
        meta: { title: '内容结构化 - 演示' }
      },
      {
        path: 'cross',
        name: 'CrossDemo',
        component: () => import('../views/demo/CrossDemo.vue'),
        meta: { title: '跨课堂数据关联 - 演示' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: '页面未找到 - 智能教学辅助引擎' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || '智能教学辅助引擎'
  next()
})

export default router 