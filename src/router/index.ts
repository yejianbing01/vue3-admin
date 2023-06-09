import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import DashboardView from '@/views/dashboard/index.vue'
import LoginView from '@/views/login/index.vue'
import LayoutView from '@/views/common/layout.vue'
import PageLayoutView from '@/views/common/pageLayout.vue'
import { useAppStore } from '@/store'
import { PermissionEnum } from '@/config/permission.config'


declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    permission?: PermissionEnum
  }
}

export const MENU_ROUTE_NAME = 'MENU_ROUTE_NAME'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'login', component: LoginView },
  {
    path: '/',
    name: MENU_ROUTE_NAME,
    component: LayoutView,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: {
          title: '仪表盘',
          icon: 'dashboard',
          permission: PermissionEnum.DASHBOARD
        }
      },
      {
        path: 'user',
        name: 'user',
        component: PageLayoutView,
        redirect: {name: 'user-list'},
        meta: {
          title: '用户',
          icon: 'usergroup',
          permission: PermissionEnum.USER
        },
        children: [
          {
            name: 'user-list',
            path: 'list',
            component: () => import('@/views/user/index.vue'),
            meta: {
              title: '用户管理',
              icon: 'user',
              permission: PermissionEnum.USER_LIST
            }
          }
        ]
      }
    ],
  },
]

const whiteList = ['/login']

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  strict: true,
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()

  if (!appStore.state.token) {
    whiteList.includes(to.path) ? next() : next(`/login?redirect=${from.path}`)
  }

  if (appStore.state.token && to.path === '/login') { next('/dashboard') }

  next()
})