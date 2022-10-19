<template>
	<view class="calendar-content">
		<view class="center_title">当前月加班时间日历</view>
		<view><uni-calendar :selected="info.selected" :showMonth="false" /></view>
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
		const BASE_URL = 'http://localhost:8080';
		const res = uni.request({
			url: BASE_URL + '/user-worktime',
			method: 'GET',
			success: res => {
				if (res.statusCode == '200') {
					const all = res.data.list;
					const myrange = [];
					all.map(res => {
						myrange.push({ date: getDate(res.targetDate).fullDate, info: res.time + '小时' });
					});
					console.log('12222', myrange);
					setTimeout(() => {
						this.info.selected = myrange;
					}, 2000);
					this.show = true;
				}
			}
		});
		// TODO 模拟请求异步同步数据
	},
	methods: {}
};
</script>

<style>
.center_title {
	width: 100%;
	display: inline-block;
	margin-bottom: 20upx;
	text-align: center;
	font-size: 34upx;
}
</style>
