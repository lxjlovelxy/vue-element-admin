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
}*/

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
/* function filterAsyncRouter(asyncRouterMap, roles) {
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
        const accessedRouters = filterRouters(asyncRouterMap, menuspath)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param menus
 * @returns {*}
 */
function filterRouters(asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    var data = isPermission(route, menus)
    if (data[0] === true) {
      if (data[1].children && data[1].children.length && data[2].children && data[2].children.length) {
        route.children = filterRouters(data[1].children, data[2].children)
      }
      return true
    }
    return false
  })

  return accessedRouters
}

/**
 * 将返回的用户在特定角色所拥有的菜单路由与动态路由表匹配、过滤
 * @param route
 * @param menus
 * @returns {*[]}
 */
function isPermission(route, menus) {
  let flag = false
  var routeR = []
  var menuR = []
  // for (var i = 0; i < menus.length; i++) {
  menus.forEach((v) => {
    if (route.path === v.path) {
      flag = true
      routeR = route
      menuR = v
    }
  })
  var data = [flag, routeR, menuR]
  return data
}
export default permission
