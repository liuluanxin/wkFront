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
			<uni-forms-item name="statusApplyBool">
				<switch v-model="form.statusApplyBool" :checked="form.statusApplyBool" @change="swithChange" />
			</uni-forms-item>
			<view class="uni-title">加班理由</view>
			<uni-forms-item name="comment"><uni-easyinput type="textarea" v-model="form.comment" /></uni-forms-item>
			<view style="display: flex;">
				<view style="width: 100%; margin-left: 10rpx;margin-right: 10rpx;" v-if="id.length !== 0">
					<button type="default" @click="apply">删除</button>
				</view>
				<view style="width: 100%; margin-left: 10rpx;margin-right: 10rpx;"><button type="primary" @click="apply">申请</button></view>
			</view>
		</uni-forms>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: [],
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
		if (options.data) {
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
			const res = this.request({
				url: '/project/' + this.form.projectId,
				method: 'GET'
			}).then(res => {
				if (res.statusCode == '200') {
					const all = res.data;
					const myrange = [];
					myrange.push({ value: all.id, text: all.projectName });
					this.range = myrange;
					//财务ID显示
					this.form.projectId = this.range[0].value;
					this.show = true;
				}
			});
		}
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
		// 财务ID从DB中取得
		onShow() {
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
			console.log('33333', this.id);
		},
		// 申请
		apply() {
			this.$refs.form.validate().then(res => {
				if (this.id) {
					this.request({
						url: '/user-extra-worktime/' + this.id,
						method: 'PUT',
						data: {
							...res,
							id: this.id,
							statusApplyBool: this.form.statusApplyBool
						}
					}).then(res => {
						if (res.statusCode == '200') {
							uni.redirectTo({
								url: '/pages/demo/demo'
							});
							uni.showToast({
								title: '申请成功'
							});
						}
					});
				} else {
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
								url: '/pages/demo/demo'
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
				}
			});
		}
	}
};
</script>

<style>
.button_size {
	margin: 10px;
	width: 100%;
}
</style>
