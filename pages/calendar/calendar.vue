<template>
	<view class="calendar-content">
		<view><uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @monthSwitch="monthSwitch" /></view>
	</view>
</template>

<script>
/**
 * 获取任意时间
 */
function getDate(date, AddDayCount = 0) {
	if (!date) {
		date = new Date();
	}
	if (typeof date !== 'object') {
		date = date.replace(/-/g, '/');
	}
	const dd = new Date(date);

	dd.setDate(dd.getDate() + AddDayCount); // 获取AddDayCount天后的日期

	const y = dd.getFullYear();
	const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1; // 获取当前月份的日期，不足10补0
	const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
	return {
		fullDate: y + '-' + m + '-' + d,
		year: y,
		month: m,
		date: d,
		day: dd.getDay()
	};
}
export default {
	components: {},
	data() {
		return {
			info: {
				lunar: true,
				range: true,
				insert: false,
				selected: []
			}
		};
	},
	onReady() {
		this.$nextTick(() => {
			this.showCalendar = true;
		});
		// TODO 模拟请求异步同步数据
		setTimeout(() => {
			this.info.selected = [
				{
					date: getDate(new Date(), -3).fullDate,
					info: '打卡'
				},
				{
					date: getDate(new Date(), -2).fullDate,
					info: '签到'
				},
				{
					date: getDate(new Date(), -1).fullDate,
					info: '已打卡'
				}
			];
		}, 2000);
	},
	methods: {
		monthSwitch(e) {
			console.log('monthSwitchs 返回:', e);
		}
	}
};
</script>

<style lang="scss">
.example-body {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
}

.calendar-button {
	flex: 2;
	font-weight: bold;
	font-size: 32rpx;
}
</style>
