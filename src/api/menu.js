import request from '@/utils/request'

export function getMenu() {
  return request({
    url: '/api/menu/indexMenu',
    method: 'post'
  })
}
