//127.0.0.1
//
const url = ''

//图片上传接口
function getImageUrl() {
  return 'http://'+url+':8111';
}
//图片接口密码
function getImagePassword() {
  return '***';
}

function getUrl() {
  return 'http://'+url+':8000/dchat';
}

function getWebsokcetUrl() {
  return url+':8000/dchat/';
}


module.exports = {
	getUrl : getUrl,
	getWebsokcetUrl:getWebsokcetUrl,
	getImageUrl:getImageUrl,
	getImagePassword:getImagePassword
}