<template>
	<view>
		<view class="detail" v-if="info.miniProgramGoods && info.miniProgramGoodsParams">
			<image :src="info.miniProgramGoods.goodsImg" mode="widthFix"></image>
			<view class="detail-item">
				<view>品名:</view>
				<view>{{info.miniProgramGoods.goodsName}}</view>
			</view>
			<view class="detail-item">
				<view>货号:</view>
				<view>{{info.miniProgramGoods.goodsNo}}</view>
			</view>
			<view class="detail-item">
				<view>颜色:</view>
				<view>{{info.miniProgramGoods.color}}</view>
			</view>
			
			<view  v-for="(item,key) in info.miniProgramGoodsParams" :key="key" :class="item.name === '地址' ? 'detail-item address' : 'detail-item'">
				<view>{{item.name}}:</view>
				<view>{{item.value}}</view>
			</view>
	
		</view>
		<!--  -->
		<view class="footer-fixed">
			<view class="footer-item" @click="goPage('/pages/rules/rules?type=ZB')">
				<image src="../../static/images/detail-footer_1.png"></image>
				<view>质保说明</view>
			</view>
			<view class="footer-item" @click="goPage('/pages/rules/rules?type=BY')">
				<image src="../../static/images/detail-footer_2.png"></image>
				<view>保养说明</view>
			</view>
			<view class="footer-item" @click="goRepair('/pages/repair/repair?product='+JSON.stringify(info.miniProgramGoods)+'&id='+info.id,info.repairsType)">
				<image src="../../static/images/detail-footer_3.png"></image>
				<view>{{btnText}}</view>
			</view>
		</view>
		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-modal ref="modal" :msgText="msgText" confirmText="确认" @confirmAction="cancel"></my-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgText:'',
				toastTitle:'',
				id:'',
				info:{},
				btnText:''
			};
		},
		methods:{
			getInfo(){
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/gmt/api/good/findInfoById',{data:{id:this.id}}).then(res => {
					this.$refs.loading.hideLoading() // 显示
					if(res.data.code === 0){
						this.info = res.data.data;
						if(this.info.repairsType === 5){
							this.btnText = '报修登记';
						}else{
							this.btnText = '取消报修';
						}
					}else{
						this.toastType = "error";
						this.toastTitle = "获取失败"+res.data.code;
						this.$refs.toast.showLoading() // 显示
					}
				})
			},
			// 取消上报
			cancel(){
				let data = {
					id:this.info.id,
				}
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/miniProgram/api/repairs/del',{data:data}).then(res => {
					this.$refs.loading.hideLoading()
					if(res.data.status === 0){
						this.toastType = "ring";
						this.toastTitle = "取消成功";
						this.$refs.toast.showLoading() // 显示
						this.getInfo();  //改变一个产品状态后重新获取下产品列表
					
					}else{
						this.toastType = "error";
						this.toastTitle = "取消失败";
						this.$refs.toast.showLoading() // 显示
					}
				})
			},
			goPage(url){
				wx.navigateTo({
					url
				})
			},
			goRepair(url,type){
				if(type === 5){
					wx.navigateTo({
						url
					})
				}else{
					this.msgText = `<div style="text-align:center">确定取消上报嘛？</div>`
					this.$refs.modal.toggleModal();
				}
				
			}
		},
		onLoad(query) {
			this.id = query.id;
			this.getInfo();
		}
	}
</script>

<style lang="less">
.detail{
	display: flex;
	flex-direction: column;
	padding: 50upx 100upx 200upx;
	image{
		width: 300upx;
		margin: 0 auto 60upx;
	}
	.address{
		margin-bottom: 56upx !important;
	}
	.detail-item{
		font-size: 24upx;
		margin-bottom: 30upx;
		display: flex;
		view{
			&:first-child{
				width: 180upx;
				padding-right: 20upx;
				text-align: right;
				flex-shrink: 0;
			}
			&:last-child{
				color: #666;
			}
		}
	}
}
.footer-fixed{
	position: fixed;
	left: 52upx;
	right: 52upx;
	height: 158upx;
	bottom: 0;
	background: #fff;
	z-index: 2;
	border-top: 1px solid rgb(229,229,229);
	display: flex;
	justify-content: space-around;
	.footer-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 24upx;
		font-size: 20upx;
		image{
			width: 64upx;
			height: 64upx;
			margin-bottom: 6upx;
		}
	}
}
</style>
