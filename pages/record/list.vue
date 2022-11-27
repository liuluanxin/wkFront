<template>
	<view class="basement">
		<view class="top">
			<view class="list">
				<view class="name_nav">
					<text class="name_r">N</text>
					<text class="name">Navy</text>
					考勤组：{{ kqz }}
				</view>
				<view class="time">{{ time }} 更新</view>
			</view>
		</view>
		<view class="center">
			<text class="center_title">当月绩效工资计算日历</text>
			<view class="history_serch" @click="chooseDay">往期绩效查询</view>
			<view class="">
				<text class="red_icon">*</text>
				计算周期：
				<text>{{ zhouqi1 }} 至 {{ zhouqi2 }}</text>
			</view>
			<view class="">
				<text class="red_icon">*</text>
				图例说明：
				<text>{{ tuli }}工作日</text>
			</view>
			<w-picker
				:visible.sync="visible"
				mode="range"
				startYear="2017"
				endYear="2030"
				:value="rangeVal"
				:current="false"
				@confirm="onConfirm($event, 'range')"
				@cancel="onCancel"
				ref="range"
			></w-picker>
			<view class="calendar_charts">
				<reserve-date
					@changeDay="changeDay"
					@changeMonth="changeMonth"
					:startDate="startDate"
					:price="price"
					:isNowDate="isNowDate"
					:disableBefore="disableBefore"
					:endDate="endDate"
					:singleElection="true"
					:date="date"
				/>
			</view>
		</view>
	</view>
</template>

<script>
import { formatStringTime, formateDates, formateDate, getCurrentMonthFirst, getCurrentMonthLast } from '@/common/util.js';
import reserveDate from '@/components/reserve-date/reserve-date.vue';
import wPicker from '@/components/w-picker/w-picker.vue';
export default {
	components: {
		reserveDate,
		wPicker
	},
	data() {
		return {
			rangeVal: '',
			kqz: 'NW',
			visible: false,
			order: {
				moneyNum: '188.88',
				indexNum: '11'
			},
			time: formateDate(new Date(), 'Y-M-D'),
			zhouqi1: getCurrentMonthFirst(),
			zhouqi2: getCurrentMonthLast(),
			tuli: '22',

			date: formateDates(new Date(), 'Y-M-D'),
			price: {
				type: true,
				data: []
			},
			isNowDate: true,
			disableBefore: false,
			endDate: '',
			startDate: '',
			singleElection: false
		};
	},
	mounted() {
		var myDate = new Date();
		let a = myDate.getDate();
		this.changeMonth(['', '', a]);
	},
	methods: {
		// 日期改变
		changeDay(date) {
			//console.log(date)
			///alert(1)
			// uni.navigateTo({
			// 			 url:'./dailyEffect?data='+JSON.stringify(date)
			//  });
		},
		// 月改变
		changeMonth(data) {
			if (!this.price.type) return false;
			uni.showLoading({
				title: '加载中',
				mask: true
			});
			let price = [];
			setTimeout(() => {
				this.price.data = [];
				for (let i = 0; i < data[2]; i++) {
					price.push(parseInt(Math.random() * 1000));
				}
				this.price.data = price;
				uni.hideLoading();
			}, 1500);
		},

		chooseDay() {
			this.visible = true;
		},
		onConfirm(e) {
			this.zhouqi1 = formatStringTime(e.value[0]);
			this.zhouqi2 = formatStringTime(e.value[1]);
		},
		onCancel() {
			this.visible = false;
		}
	}
};
</script>

<style scoped>
.basement {
	padding: 3px;
	background-color: #eee;
}
.top {
	width: 100%;
	margin-bottom: 10px;
	background-color: #fff;
}
.list {
	position: relative;
	display: flex;
	width: 100%;
	height: 200upx;
	color: #fff;
	padding: 0 40upx;
	margin: 10px 0;
	border-radius: 8px;
	box-sizing: border-box;
	box-shadow: 0 5px 4px #ccc;
	background-color: #0088ce;
}
.list_right {
}
.msg {
	flex: 1;
	display: flex;
	justify-content: space-around;
}
.list_center,
.list_left {
	text-align: center;
}
.list_center_title,
.list_center_num {
	font-size: 34upx;
}
.time {
	position: absolute;
	bottom: 3px;
	left: 50%;
	transform: translate(-50%);
}
.history_serch {
	/* position: absolute; */
	/* top: 0; */
	display: flex;
	justify-content: flex-end;
	right: 3px;
	color: #009ddf;
}

.center {
	background-color: #fff;
}
.center_title {
	width: 100%;
	display: inline-block;
	margin-bottom: 20upx;
	text-align: center;
	font-size: 34upx;
}
.red_icon {
	margin: 4upx;
	color: #f11;
}
.calendar_charts {
	height: 300px;
}
.name_nav {
	color: #999;
}
.name {
	color: #000000;
	margin: 0 30upx;
}
.name_r {
	display: inline-block;
	width: 80upx;
	height: 80upx;
	color: #fff;
	font-size: 36upx;
	text-align: center;
	line-height: 80upx;
	background-color: #33a0d8;
	border-radius: 50%;
	margin-top: 24upx;
}
.data_msg {
	background-color: #fff;
	display: flex;
	color: #000000;
	font-size: 30upx;
	justify-content: space-around;
}
</style>
