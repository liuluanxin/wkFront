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
			range: [],
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
		// 审批提出
		swithChange(e) {
			if (e.detail.value) {
				this.statusApplyBool = true;
			} else {
				this.statusApplyBool = false;
			}
		},
		// 财务ID从DB中取得
		onShow() {
			uni.$emit('');
			const res = this.request({
				url: '/project',
				method: 'GET'
			}).then(res => {
				if (res.statusCode == '200') {
					const all = res.data.list;
					const myrange = [];
					all.map(res => {
						myrange.push({ value: res.id, text: res.projectName });
					});
					this.range = myrange;
					// 第一个财务ID显示
					if (this.range == '') {
						this.form.projectId = null;
					} else {
						this.form.projectId = this.range[0].value;
					}
					this.show = true;
				}
			});
		},
		// 申请
		apply() {
			this.$refs.form.validate().then(res => {
				this.request({
					url: '/user-extra-worktime',
					method: 'POST',
					data: {
						...res,
						statusApplyBool: this.statusApplyBool
					}
				}).then(res => {
					if (res.statusCode == '200') {
						uni.redirectTo({
							url: '/pages/calendar/calendar'
						});
						uni.showToast({
							title: '申请成功'
						});
					} else {
						uni.showModal({
							title: '当前日期和财务ID的申请记录已经存在，请确认日期和财务ID的内容是否正确。',
							showCancel: false
						});
					}
				});
			});
		}
	}
};
</script>

<style></style>
