import { asyncRouterMap, constantRouterMap } from '@/router'
// import store from '../index'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
/* function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/!**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 *!/
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}*/

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { menuspath } = data
        /* let accessedRouters
         if (roles.indexOf('admin') >= 0) {
           accessedRouters = asyncRouterMap
         } else {*/
        const accessedRouters = filterRiuters(asyncRouterMap, menuspath)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

function filterRiuters(asyncRouterMap, menuspath) {
  const accessedRouters = asyncRouterMap.filter(route => {
    menuspath.forEach((v) => {
      if (v.path === route.path) {
        if (v.children && v.children.length) {
          route.children = filterRiuters(route.children, v.children)
        }
        return true
      }
    })
    return false
  })
  return accessedRouters
}
export default permission
