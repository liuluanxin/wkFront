<template>
	<view class="">
		<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无数据" @selection-change="selectionChange">
			<uni-tr>
				<uni-th width="90" align="center">日期</uni-th>
				<uni-th width="90" align="center">项目名称</uni-th>
				<uni-th width="50" align="center">加班时间</uni-th>
				<uni-th width="20" align="center">审批提出</uni-th>
				<uni-th width="20" align="center">PM承认</uni-th>
				<uni-th width="20" align="center">DM承认</uni-th>
				<uni-th width="70" align="center"></uni-th>
			</uni-tr>
			<uni-tr v-for="(item, index) in tableData" :key="index">
				<uni-td>{{ item.targetDate }}</uni-td>
				<uni-td align="center">{{ item.projectName }}</uni-td>
				<uni-td align="center">{{ item.time }}</uni-td>
				<uni-td align="center">{{ item.statusApply ? '√' : '×' }}</uni-td>
				<uni-td align="center">{{ item.statusPmApprove == null ? '' : item.statusPmApprove ? '√' : '×' }}</uni-td>
				<uni-td align="center">{{ item.statusDmApprove == null ? '' : item.statusDmApprove ? '√' : '×' }}</uni-td>
				<uni-td align="center"><button type="primary" style="line-height: initial;" @tap="editchange(item)">修改</button></uni-td>
			</uni-tr>
		</uni-table>
		<view v-if="timeId.length !== 0"><button type="warn" style="margin-left: 30px;margin-right: 30px;margin-top: 10px; margin-bottom: 10px;" @click="deleteData(timeId)">删除</button></view>
		<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tableData: [{}],
			timeId: []
		};
	},
	onShow() {
		this.getProjectId();
	},
	methods: {
		getProjectId() {
			this.selectedIndexs = [];
			const BASE_URL = 'http://10.0.193.60:8080';
			const res = uni.request({
				url: BASE_URL + '/user-worktime',
				method: 'GET',
				data: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
				success: res => {
					if (res.statusCode == '200') {
						this.tableData = res.data.list;
					}
				}
			});
		},
		editchange(e) {
			uni.navigateTo({
				url: '/pages/worktime/worktimeEditDetail?data=' + JSON.stringify(e)
			});
		},
		deleteData(e) {
			uni.showModal({
				title: '确定删除当前的加班时间吗？',
				success: function(res) {
					if (res.confirm) {
						const BASE_URL = 'http://10.0.193.60:8080';
						uni.request({
							url: BASE_URL + '/user-worktime',
							method: 'DELETE',
							data: e,
							success: res => {
								if (res.statusCode == '200') {
									uni.redirectTo({
										url: '/pages/worktime/worktimeList'
									});
									uni.showToast({
										title: '删除成功'
									});
								}
							}
						});
					} else if (res.cancel) {
						console.log('取消删除当前的加班时间');
					}
				}
			});
		},
		// 多选
		selectionChange(e) {
			this.selectedIndexs = e.detail.index;
			this.timeId = this.selectedIndexs.map(i => this.tableData[i].id);
		}
	}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>
