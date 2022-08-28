import request from './request.js';

/**
 *   登录 获取token
 */
export function login(data) {
  return request({
    url: '/loginPost',
    method: 'POST',
    data,
  });
}

/**
 * 获取用户基本信息
 */
export function getUserInfo(data) {
  return request({
    url: '/getUserInfo',
    method: 'POST',
    data,
  });
}

/**
 * 更新用户文字基本信息
 */
export function updateUserInfo(data) {
  return request({
    url: '/updateUserInfo',
    method: 'POST',
    data,
  });
}

/**
 * 更新用户文字基本信息
 */
export function getFriendList(data) {
  return request({
    url: '/getFriendList',
    method: 'POST',
    data,
  });
}

/**
 * 注册新用户
 */
export function register(data) {
  return request({
    url: '/register',
    method: 'POST',
    data,
  });
}


/**
 * 查找用户
 */
export function findPeople(data) {
  return request({
    url: '/findPeople',
    method: 'POST',
    data,
  });
}

/**
 * 根据用户id查找用户具体信息
 */
export function findPerson(data) {
  return request({
    url: '/findPerson',
    method: 'POST',
    data,
  });
}

/**
 *搜群
 */
export function findGroup(data) {
  return request({
    url: '/findGroup',
    method: 'POST',
    data,
  });
}
/**
 * 根据创建群聊
 */
export function createGroup(data) {
  return request({
    url: '/createGroup',
    method: 'POST',
    data,
  });
}

/**
 * 根据用户查找群聊
 */
export function getGroup(data) {
  return request({
    url: '/getGroup',
    method: 'POST',
    data,
  });
}


/**
 * 查找群用户
 */
export function getMember(data) {
  return request({
    url: '/getMember',
    method: 'POST',
    data,
  });
}

/**
 * 更新群信息
 */
export function updateGroup(data){
	return request({
	  url: '/updateGroup',
	  method: 'POST',
	  data,
	});
}

/**
 * 上传说说
 */
export function postBlog(data){
	return request({
	  url: '/blog/deliver',
	  method: 'POST',
	  data,
	});
}

/**
 * 获取说说
 */
export function getBlog(data){
	return request({
	  url: '/blog/get',
	  method: 'POST',
	  data,
	});
}
/**
 * 获取说说
 */
export function getBlogById(data){
	return request({
	  url: '/blog/getOne',
	  method: 'POST',
	  data,
	});
}
//给说说点赞
export function likeBlog(data){
	return request({
	  url: '/blog/like',
	  method: 'POST',
	  data,
	});
}

//获取说说的点赞详情
export function getLikes(data){
	return request({
	  url: '/blog/getLikes',
	  method: 'POST',
	  data,
	});
}
//给说说评论
export function commentBlog(data){
	return request({
	  url: '/blog/comment',
	  method: 'POST',
	  data,
	});
}

//获取说说的评论
export function getComments(data){
	return request({
	  url: '/blog/getComments',
	  method: 'POST',
	  data,
	});
}

//删除说说
export function deleteBlog(data){
	return request({
	  url: '/blog/delete',
	  method: 'POST',
	  data,
	});
}

//删除评论
export function deleteComment(data){
	return request({
	  url: '/blog/deleteComment',
	  method: 'POST',
	  data,
	});
}

//获取说说详情

export function getDetail(data){
	return request({
	  url: '/blog/getDetail',
	  method: 'POST',
	  data,
	});
}
