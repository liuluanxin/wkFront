<template>
	<view class="content">
		<view style="width: 90%; margin: 50rpx auto;">
			<uni-forms ref="form" :modelValue="form" :rules="rules">
				<view class="uni-title">加班日期</view>
				<uni-forms-item name="targetDate"><uni-datetime-picker type="date" v-model="form.targetDate" /></uni-forms-item>
				<view class="uni-title">财务ID</view>
				<uni-forms-item name="projectId"><uni-data-select v-model="form.projectId" :localdata="range" /></uni-forms-item>
				<view class="uni-title">加班时长</view>
				<uni-forms-item name="time"><uni-easyinput type="number" v-model="form.time" /></uni-forms-item>
				<view class="uni-title">审批提出</view>
				<uni-forms-item name="statusApplyBool"><switch v-model="form.statusApplyBool" @change="swithChange" /></uni-forms-item>
				<view class="uni-title">加班理由</view>
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
			range: [{ value: 0, text: 'NW 李' }, { value: 1, text: '社员 林' }, { value: 2, text: 'yamato 张' }],
			form: { targetDate: new Date().fullDate, projectId: 0 },
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
		swithChange(e) {
			if (e.detail.value) {
				this.statusApplyBool = true;
			} else {
				this.statusApplyBool = false;
			}
		},
		apply() {
			const BASE_URL = 'http://localhost:8080';
			this.$refs.form.validate().then(res => {
				uni.request({
					url: BASE_URL + '/user-extra-worktime',
					method: 'POST',
					data: {
						...res,
						statusApplyBool: this.statusApplyBool
					},
					success: res => {
						console.log('1111', res.statusCode == '200');
						if (res.statusCode == '200') {
							console.log('1111');
							uni.redirectTo({
								url: '/pages/calendar/calendar'
							});
						}
						console.log('2', res);
					}
				});
			});
		}
	}
};
</script>

<style></style>
