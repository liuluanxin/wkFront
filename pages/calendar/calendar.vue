<template>
	<view class="calendar-content">
		<view class="center_title">当前月加班时间日历</view>
		<view class="">当月加班时间合计：{{ allTime }}小时</view>
		<view><uni-calendar :selected="info.selected" @monthSwitch="monthSwitch" /></view>
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
			},
			allData: '',
			allTime: ''
		};
	},
	onShow() {
		const BASE_URL = 'http://10.0.193.60:8080';
		const res = uni.request({
			url: BASE_URL + '/user-worktime',
			method: 'GET',
			data: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
			success: res => {
				if (res.statusCode == '200') {
					const all = res.data.list;
					const myrange = [];
					const time = [];
					all.map(res => {
						myrange.push({ date: getDate(res.targetDate).fullDate, info: res.time + '小时' });
						time.push({ info: res.time });
					});
					setTimeout(() => {
						this.info.selected = myrange;
						this.allTime = time.reduce((sum, current) => sum + current.info, 0);
					}, 200);
					this.allData = all;
					this.show = true;
				}
			}
		});
	},
	methods: {
		monthSwitch(e) {
			const BASE_URL = 'http://10.0.193.60:8080';
			const res = uni.request({
				url: BASE_URL + '/user-worktime',
				method: 'GET',
				data: { year: e.year, month: e.month },
				success: res => {
					if (res.statusCode == '200') {
						const all = res.data.list;
						const myrange = [];
						const time = [];
						all.map(res => {
							myrange.push({ date: getDate(res.targetDate).fullDate, info: res.time + '小时' });
							time.push({ info: res.time });
						});
						setTimeout(() => {
							this.info.selected = myrange;
							this.allTime = time.reduce((sum, current) => sum + current.info, 0);
						}, 200);
						this.allData = all;
						this.show = true;
					}
				}
			});
		}
	}
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
