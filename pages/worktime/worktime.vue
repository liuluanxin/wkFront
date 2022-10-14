<template>
	<view class="content">
		<view style="width: 90%; margin: 50rpx auto;">
			<uni-forms ref="form" :modelValue="form" :rules="rules">
				<text>加班日期</text>
				<uni-forms-item name="targetDate"><uni-datetime-picker type="date" v-model="form.applyDate" /></uni-forms-item>
				<text>财务ID</text>
				<uni-forms-item name="projectId"><uni-data-select v-model="form.projectId" :localdata="range" @change="change" /></uni-forms-item>
				<text>加班时长</text>
				<uni-forms-item name="time"><uni-easyinput type="number" v-model="form.time" /></uni-forms-item>
				<text>加班理由</text>
				<uni-forms-item name="comment"><uni-easyinput type="textarea" v-model="form.comment" /></uni-forms-item>
				<view><button type="primary" @click="apply">申请</button></view>
			</uni-forms>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: { targetDate: new Date().fullDate, projectId: 0, time: '', comment: '' },
			range: [{ value: 0, text: 'NW 李' }, { value: 1, text: '社员 林' }, { value: 2, text: 'yamato 张' }],
			rules: {
				targetDate: {
					rules: [{ required: true, errorMessage: '请输入加班日期' }],
					validateTrigger: 'submit'
				},
				projectId: {
					rules: [{ required: true, errorMessage: '请输入财务ID' }],
					validateTrigger: 'submit'
				},
				time: {
					rules: [{ required: true, errorMessage: '请输入加班时长' }],
					validateTrigger: 'submit'
				},
				comment: {
					rules: [{ required: true, errorMessage: '请输入加班理由' }],
					validateTrigger: 'submit'
				}
			}
		};
	},
	methods: {
		apply() {
			const BASE_URL = 'http://localhost:8080';
			this.$refs.form.validate().then(res => {
				console.log('111', res);
				uni.request({
					url: BASE_URL + '/user-extra-worktime',
					method: 'POST',
					data: this.form,
					success: res => {
						console.log('2', res);
					}
				});
			});
		},
		change(e) {
			console.log('change 返回:', e);
		}
	}
};
</script>

<style>
.login-type {
	display: flex;
	justify-content: center;
}
.login-type-btn {
	line-height: 30px;
	margin: 0px 15px;
}
.login-type-btn.act {
	color: #0faeff;
	border-bottom: solid 1px #0faeff;
}
.send-code-btn {
	width: 120px;
	text-align: center;
	background-color: #0faeff;
	color: #ffffff;
}
.action-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
.action-row navigator {
	color: #007aff;
	padding: 0 10px;
}
.oauth-row {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	flex-wrap: wrap;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}
.oauth-image {
	position: relative;
	width: 50px;
	height: 50px;
	border: 1px solid #dddddd;
	border-radius: 50px;
	background-color: #ffffff;
}
.oauth-image image {
	width: 30px;
	height: 30px;
	margin: 10px;
}
.oauth-image button {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.captcha-view {
	line-height: 0;
	justify-content: center;
	align-items: center;
	display: flex;
	position: relative;
	background-color: #f3f3f3;
}
</style>
