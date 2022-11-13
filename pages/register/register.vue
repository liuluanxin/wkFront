<template>
	<view>
		<view style="width: 90%; margin: 200rpx auto;">
			<!-- 200rpx  == 100px -->
			<view style=" margin-bottom: 70rpx; font-size: 60rpx; color: orange; text-align: center;">注 册</view>
			<uni-forms ref="form" :modelValue="form" :rules="rules">
				<uni-forms-item name="userName"><uni-easyinput v-model="form.userName" prefixIcon="person" placeholder="请输入用户名"></uni-easyinput></uni-forms-item>

				<uni-forms-item name="passWord">
					<uni-easyinput type="password" v-model="form.passWord" prefixIcon="locked" placeholder="请输入密码"></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item name="confirm"><uni-easyinput type="password" v-model="form.confirm" prefixIcon="locked" placeholder="请确认密码"></uni-easyinput></uni-forms-item>
			</uni-forms>

			<view><button type="default" @click="register">注 册</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: { userName: '', passWord: '' },
			rules: {
				userName: {
					rules: [{ required: true, errorMessage: '请输入用户名' }],
					validateTrigger: 'submit'
				},
				passWord: {
					rules: [{ required: true, errorMessage: '请输入密码' }],
					validateTrigger: 'submit'
				},
				confirm: {
					rules: [{ required: true, errorMessage: '请确认密码' }],
					validateTrigger: 'submit'
				}
			}
		};
	},
	methods: {
		register() {
			this.$refs.form
				.validate()
				.then(res => {
					if (this.form.passWord !== this.form.confirm) {
						uni.showToast({
							icon: 'none',
							title: '两次密码输入不一致'
						});
						return;
					}
					this.request({
						url: '/user/register',
						method: 'POST',
						data: this.form
					}).then(res => {
						if (res.statusCode === 200) {
							uni.navigateTo({
								url: '/pages/login/login'
							});
							uni.showToast({
								title: '注册成功'
							});
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
