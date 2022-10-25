<template>
	<view style="width: 90%; margin: 50rpx auto;">
		<uni-forms ref="form" :modelValue="form" :rules="rules">
			<view class="uni-title">加班日期</view>
			<uni-forms-item name="targetDate"><uni-datetime-picker type="date" v-model="form.targetDate" /></uni-forms-item>
			<view class="uni-title">财务ID</view>
			<uni-forms-item name="projectId"><uni-data-select v-model="form.projectId" :localdata="range" /></uni-forms-item>
			<view class="uni-title">加班时长</view>
			<uni-forms-item name="time"><uni-easyinput type="number" v-model="form.time" /></uni-forms-item>
			<view class="uni-title">审批提出</view>
			<uni-forms-item name="statusApplyBool"><switch v-model="form.statusApplyBool" :checked="form.statusApplyBool" @change="swithChange" /></uni-forms-item>
			<view class="uni-title">加班理由</view>
			<uni-forms-item name="comment"><uni-easyinput type="textarea" v-model="form.comment" /></uni-forms-item>
			<button type="primary" @click="apply" class="button_size">申请</button>
		</uni-forms>
	</view>
</template>

<script>
export default {
	data() {
		return {
			range: [],
			form: { targetDate: '', projectId: '', time: '', comment: '' },
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
	onLoad: function(options) {
		let list = JSON.parse(options.data);
		// id
		this.id = list.id;
		// 加班时间
		this.form.targetDate = list.targetDate;
		// 财务ID
		this.form.projectId = list.projectId;
		// 加班时长
		this.form.time = list.time;
		// 审批提出
		this.form.statusApplyBool = list.statusApply;
		// 加班理由
		this.form.comment = list.comment;
		const BASE_URL = 'http://10.0.193.60:8080';
		const res = uni.request({
			url: BASE_URL + '/project/' + this.form.projectId,
			method: 'GET',
			success: res => {
				if (res.statusCode == '200') {
					const all = res.data;
					const myrange = [];
					myrange.push({ value: all.id, text: all.projectName });
					this.range = myrange;
					//财务ID显示
					this.form.projectId = this.range[0].value;
					this.show = true;
				}
			}
		});
	},
	methods: {
		// 审批提出
		swithChange(e) {
			if (e.detail.value) {
				this.form.statusApplyBool = true;
			} else {
				this.form.statusApplyBool = false;
			}
		},
		// 申请
		apply() {
			const BASE_URL = 'http://10.0.193.60:8080';
			this.$refs.form.validate().then(res => {
				uni.request({
					url: BASE_URL + '/user-extra-worktime/' + this.id,
					method: 'PUT',
					data: {
						...res,
						id: this.id,
						statusApplyBool: this.form.statusApplyBool
					},
					success: res => {
						if (res.statusCode == '200') {
							uni.redirectTo({
								url: '/pages/worktime/worktimeList'
							});
							uni.showToast({
								title: '申请成功'
							});
						}
					}
				});
			});
		}
	}
};
</script>

<style>
.button_size {
	margin: 10px;
}
</style>
