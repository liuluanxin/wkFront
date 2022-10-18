<template>
	<view>
		<view style="width: 90%; margin: 200rpx auto;">
			<!-- 200rpx  == 100px -->
			<view style=" margin-bottom: 70rpx; font-size: 60rpx; color: royalblue; text-align: center;">登 录</view>
			<uni-forms ref="form" :modelValue="form" :rules="rules">
				<uni-forms-item name="userName"><uni-easyinput v-model="form.userName" prefixIcon="person" placeholder="请输入登录用户名"></uni-easyinput></uni-forms-item>
				<uni-forms-item name="passWord"><uni-easyinput type="password" v-model="form.passWord" prefixIcon="locked" placeholder="请输入登录密码"></uni-easyinput></uni-forms-item>
			</uni-forms>

			<view><button type="primary" @click="login">登 录</button></view>
			<navigator url="/pages/register/register" style="margin: 40rpx 0; color: deepskyblue;">前往注册</navigator>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: { userName: 'admin', passWord: 'admin' },
			rules: {
				userName: {
					rules: [{ required: true, errorMessage: '请输入用户名' }],
					validateTrigger: 'submit'
				},
				passWord: {
					rules: [{ required: true, errorMessage: '请输入密码' }],
					validateTrigger: 'submit'
				}
			}
		};
	},
	methods: {
		login() {
			const BASE_URL = 'http://localhost:8080';
			this.$refs.form
				.validate()
				.then(res => {
					uni.request({
						url: BASE_URL + '/user/login',
						method: 'POST',
						data: this.form,
						success: res => {
							console.log('1222', res);
							if (res.data !== '') {
								// 跳转页面
								uni.redirectTo({
									url: '/pages/calendar/calendar'
								});
								uni.showToast({
									title: '登录成功'
								});
								// 存储用户的数据到 storage
								uni.setStorageSync('user', res.data);
							} else {
								uni.showTabBarRedDot({
									title: '用户或密码输入不正'
								});
							}
						}
					});
				})
				.catch(err => {
					console.log('表单错误信息：', err);
				});
		}
	}
};
</script>

<style></style>
