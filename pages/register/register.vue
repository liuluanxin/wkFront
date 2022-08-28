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
			form: { userName: '', passWord: '' }
		};
	},
	methods: {
		register() {
			console.log(this.form);
			const BASE_URL = 'http://localhost:8080';
			uni.request({
				url: BASE_URL + '/user/register',
				method: 'POST',
				data: this.form
			}).then(res =>{
				console(res)
			});
		}
	}
};
</script>

<style></style>
