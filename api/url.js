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
  return 'http://'+url+':8000';
}

module.exports = {
	getUrl : getUrl,
	getImageUrl:getImageUrl,
	getImagePassword:getImagePassword
}