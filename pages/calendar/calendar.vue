<template>
	<view class="calendar-content">
		<view class="list">
			<view style="flex: 1; display: flex;justify-content: space-around;">
				<view>当月累计加班时间：{{ allTime }}小时</view>
			</view>
		</view>
		<view><uni-fab ref="fab" horizontal="right" vertical="bottom" @fabClick="fabClick" /></view>
		<view style="margin: 30upx; border-radius: 20upx; box-shadow: 0 3rpx 32rpx 0rpx #ccc;">
			<uni-calendar :selected="info.selected" @monthSwitch="monthSwitch" @change="onchange" />
		</view>
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
	onReady() {
		const res = this.request({
			url: '/user-worktime',
			method: 'GET',
			data: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 }
		}).then(res => {
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
		});
	},
	methods: {
		monthSwitch(e) {
			const res = this.request({
				url: '/user-worktime',
				method: 'GET',
				data: { year: e.year, month: e.month }
			}).then(res => {
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
			});
		},
		fabClick() {
			uni.navigateTo({
				url: '/pages/worktime/worktimeEditDetail'
			});
		},
		onchange(e) {
			const time = this.allData.find(res => e.extraInfo.date === res.targetDate);
			if (time) {
				uni.navigateTo({
					url: '/pages/worktime/worktimeEditDetail?data=' + JSON.stringify(time)
				});
			} else {
				uni.showModal({
					content: '当天没有填写加班时间记录，请申请完加班时间后在点击',
					showCancel: false
				});
			}
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
	background-color: #e6e6e6;
}
.list {
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 55upx;
	color: #fff;
	padding: 0 40upx;
	margin: 10px 0;
	border-radius: 8px;
	box-sizing: border-box;
	box-shadow: 0 10px 8px #ccc;
	background-color: #0088ce;
}
</style>
