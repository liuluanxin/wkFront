<template>
	<view>
		<scroll-view id="tab" scroll-x="true">
			<view v-for="(item, index) in barNameList" :key="item.id" class="tabName" :data-current="index" @click="ontabtap">
				<text class="tabName_text" :class="tabIndex == index ? 'active_text' : ''">{{ item.name }}</text>
			</view>
		</scroll-view>
		<swiper id="tabContent" :current="tabIndex" @change="tabChange">
			<swiper-item v-for="(item, index) in barContentList" :key="index" style="height: 100%;width: 100%;">
				<view v-show="tabIndex === 0"><calendar :i="index" :type="current"></calendar></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import calendar from 'pages/calendar/calendar.vue';
export default {
	components: {
		calendar
	},
	data() {
		return {
			tabIndex: 0,
			barNameList: [
				{
					name: '加班时间记录',
					id: '0'
				},
				{
					name: 'PM审核记录',
					id: '1'
				},
				{
					name: 'DM审核记录',
					id: '2'
				}
			],
			barContentList: []
		};
	},
	methods: {
		onLoad() {
			setTimeout(() => {
				this.barNameList.forEach(tabBar => {
					this.barContentList.push({
						data: [],
						isLoading: false,
						refreshText: '',
						loadingText: '加载更多...'
					});
				});
				this.getList(0); // 默认初始获取第一个选项对应的数据
			}, 350);
		},
		fabClick() {
			uni.showToast({
				title: '点击了悬浮按钮',
				icon: 'none'
			});
		},
		// 获取列表数据
		getList(index) {
			let activeTab = this.barContentList[index];
			let list = [];
			// ......
			// 这里请求接口--> 获取数据返回值data--> list.push(data);
			// ......
			activeTab.data = activeTab.data.concat(list);
		},
		// swiper滑动时改变下标
		tabChange(e) {
			let index = e.target.current || e.detail.current; // 获取到当前移动到第几个
			this.switchTab(index);
		},
		// scroll-view 点击 tab 时 改变下标
		ontabtap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			this.switchTab(index);
		},
		switchTab(index) {
			if (this.tabIndex == index) {
				return;
			}
			// 先清空前面访问的swiper的缓存，要不再次切换到之前访问过的tab的时候内容会显示多次
			this.barContentList[this.tabIndex].data = [];
			// 后赋值
			this.getList(index);
			this.tabIndex = index;
		}
	}
};
</script>

<style>
#tab {
	width: 100%;
	display: flex;
}
.tabName {
	text-align: center;
	width: 33%;
	display: inline-block;
	height: 60rpx;
	line-height: 60rpx;
	white-space: nowrap;
}
.tabName_text {
	display: inline-block;
	width: 100%;
	height: 100%;
}
.active_text {
	background-color: #fddd9b;
	color: #ffffff;
}
#tabContent {
	position: absolute;
	width: 100%;
	height: 93%;
}
</style>
