<template>
	<view class="page">
		<qsTab ref="tabs" :tabs="tabs" animationMode="line1" :current="current" @change="tabChange"></qsTab>

		<swiper class="swiper" :current="current" @change="swiperChange" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" @transition="transition" v-for="(item, index) in tabs" :key="index">
				<!-- <indexList :i="index" :type="current"></indexList> -->
				<view v-show="current === 0"><indexList :i="index" :type="current"></indexList></view>
				<view v-show="current === 1"><indexListVacation></indexListVacation></view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import indexList from '../../pages/record/list.vue';
import indexListVacation from '../../pages/record/list_vacation.vue';
import qsTab from '../../components/QS-tabs/QS-tabs.vue';

export default {
	components: {
		qsTab,
		indexList,
		indexListVacation
	},
	data() {
		return {
			current: 0,
			tabs: [{ name: '加班申请记录' }, { name: 'PM承认记录' }, { name: 'DM承认记录' }]
		};
	},
	methods: {
		swiperChange(e) {
			this.current = e.detail.current;
		},

		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			// this.swiperCurrent = current;
			this.current = current;
		},
		/**
		 * 选显卡切换
		 * */
		tabChange(index) {
			this.current = index;
		}
	}
};
</script>

<style scoped>
.page {
	width: 100%;
	height: 100%;
}
.swiper {
	position: absolute;
	width: 100%;
	height: 100%;
}
.swiper-item {
	width: 100%;
	height: 100%;
}
</style>
