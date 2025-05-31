import request from '../request'

// 首页
export function getHome() {
  return request({
    url: `/page/homeDetail`,
    method: 'get',
  })
}

// 关于
export function getAbout() {
  return request({
    url: `/page/aboutDetail`,
    method: 'get',
  })
}

// 获取文章内容列表
export function getContentList(data) {
  return request({
    url: `/page/contentList`,
    method: 'post',
    data,
  })
}

// 获取文章内容详情
export function getContentDetail(id) {
  return request({
    url: `/page/contentDetail?id=${id}`,
    method: 'get',
  })
}

// 获取留言列表
export function getMessageList(data) {
  return request({
    url: `/page/messageList`,
    method: 'post',
    data,
  })
}

// 新增留言
export function addMessage(data) {
  return request({
    url: `/page/messageAdd`,
    method: 'post',
    data,
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: `/users/userInfo`,
    method: 'get',
  })
}

// 获取朋友圈
export function getSelf(data) {
  return request({
    url: `/self/selfData`,
    method: 'post',
    data,
  })
}

// 新增朋友圈
export function addSelf(data) {
  return request({
    url: `/self/selfAdd`,
    method: 'post',
    data,
  })
}

// 新增评论
export function commentadd(data) {
  return request({
    url: `/self/commentadd`,
    method: 'post',
    data,
  })
}

// 删除朋友圈
export function selfDel(id) {
  return request({
    url: `/self/selfDel?id=` + id,
    method: 'get',
  })
}

// 删除评论
export function commentDel(id) {
  return request({
    url: `/self/commentDel?id=` + id,
    method: 'get',
  })
}


// 获取指定朋友圈评论
export function getCommentById(id) {
  return request({
    url: `/self/getCommentById?id=` + id,
    method: 'get',
  })
}
