import URL from './url.js';
const BASE_URL = URL.getUrl();

function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    // 发起网络请求
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      success: ({ data }) => {
        // 响应成功，获取数据，解析数据
        if (data.success) {
          resolve(data);
        } else {
		   if(data.code == 404){
			   uni.showToast({
			     title: '身份验证已失效,请重新登录',
			     icon: 'error',
			     mask: false,
			     duration: 3000,
			   });
		   }else{
			   // 响应失败，给用户提示
			   uni.showToast({
			     title: data.message,
			     icon: 'none',
			     mask: false,
			     duration: 3000,
			   });
			   reject(data.message);
		   }
        }
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        // 关闭加载
        uni.hideLoading();
      },
    });
  });
}

export default request;
