import type { PermissionEnum } from "@/config/permission.config";
import { MENU_ROUTE_NAME, routes } from "@/router";
import { defineStore } from "pinia";
import type { RouteRecordRaw } from "vue-router";

type PermissionState = {
  routes: Array<RouteRecordRaw>
}

const filterRouters = (routes: Array<RouteRecordRaw>, permissions: Array<PermissionEnum>) => {
  return routes.filter(route => {
    if (route.children) {
      route.children = filterRouters(route.children, permissions)
    }
    return (
      !route.meta ||
      (route.meta &&
        (!route.meta.permission ||
          (route.meta.permission &&
            permissions.includes(route.meta.permission)))))
  })
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => {
    return {
      routes: []
    }
  },
  actions: {
    generateRoute(permissions: Array<PermissionEnum>, admin = false) {
      this.routes = admin ? routes : filterRouters(routes, permissions)
    }
  },
  getters: {
    menuRoutes():Array<RouteRecordRaw> | undefined {
      return this.routes.find(route=>route.name === MENU_ROUTE_NAME)?.children
    }
  },
  persist: true
})
