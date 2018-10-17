import request from '@/utils/request'

export function loginByUsername(userName, password, type) {
  const data = {
    userName,
    password,
    type
  }
  return request({
    url: '/api/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/api/login/info',
    method: 'post'
  })
}

