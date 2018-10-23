import { getMenu } from '@/api/menu'

const menu = {
  state: {
    menus: []
  },
  mutations: {
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    GetMenus({ commit }) {
      return new Promise(resolve => {
        getMenu().then(response => {
          const menus = response.data.data
          commit('SET_MENUS', menus)
          resolve()
        })
      })
    }
  }
}
export default menu
