<template>
	<view>
		<fix-header @login="showSQ"></fix-header>
		<!--  -->
		<view class="home-content">
			<view class="fun-block">
				<view class="fun-item" @click="goPage('/pages/verify/verify',1)">
					<image src="../../static/images/home_fun_1.png"/>
					<view>扫码验证品</view>
				</view>
				<view class="fun-item" @click="goPage('/pages/registerOut/registerOut',1)">
					<image src="../../static/images/home_fun_2.png"/>
					<view>激活享质保</view>
				</view>
			</view>
			<!-- 我的书包   -->
			<view class="my-bag-title">我的书包</view>
			<swiper v-if="products.length!==0" circular="true">
				<swiper-item v-for="(item,key) in products" :key="key" >
					<view class="my-bag">
						<view class="have-product"  @click="goPage('/pages/productDetail/productDetail?id='+item.id,0)">
							<view class="bag">
								<image :src="item.goodsImg" mode="widthFix"></image>
								<view class="bag-info">
									<view class="bag-code">{{item.encode}}</view>
									<view class="bag-text">质保：{{item.isWarranty===1?'质保期内':'超过质保期'}}</view>
									<view class="bag-text">状态：{{status[item.repairsType]}}</view>
									<view class="bag-text">购买时间：{{item.goodsAddTime}}</view>
								</view>
							</view>
							<image class="bag-btn" src="../../static/images/face-right-9.png"></image>
						</view>
					</view>
			
				</swiper-item>
			</swiper>
			<view v-else class="my-bag bag-top">
				<view class="no-product" @click="goPage('/pages/registerOut/registerOut',1)">
					<image src="../../static/images/no_product.png"></image>
					<view class="text">您还没有质保书包哦~</view>
					<view class="btn back-btn-color">去添加</view>
				</view>
			</view>
			<!-- 底部广告位  -->
			<view class="bottom-banner" @click="goPage('/pages/articleDetail/articleDetail?url='+encodeURIComponent('https://mp.weixin.qq.com/s/vHC1tpB29QEtmUbrLEhAHA')+'&id=5',0)">
				<image src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/footer-7d6fbc22-8527-4f25-83be-53b809698937.jpg" mode="widthFix"></image>
			</view>
		</view>

		<!-- 提示框 -->
		<wyb-loading  title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<!-- 手机号授权  -->
		<phone-modal ref="phone"></phone-modal>
		<!-- 小程序授权 -->
		<sq-modal ref="sq" @confirm="showPhone"></sq-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				invitationCode:"",//邀请码 
				toastTitle:"",
				toastType:"ring",
				products:[],
				status:['未处理','联系中','维修中','已寄回','异常','正常']
			}
		},
		computed:{
			isLogin() {
			  return this.$store.state.login;
			},
		},
		methods: {
			// 显示授权提示弹框 
			showSQ(){
				this.$refs.sq.toggle();
			},
			showPhone(){
				this.$refs.phone.toggleModal();
			},
			// 
			goPage(url,type){
				if(this.isLogin){
					if(type === 0){
						uni.navigateTo({
							url
						})
					}else{
						uni.switchTab({
							url
						})
					}
				}
				else{
					this.showSQ();
				}
			},
			getProduct(){
				let data = {
					page:0,
					size:10
				}
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/miniProgram/api/goods/list',{data:data}).then(res => {
					this.$refs.loading.hideLoading() // 显示
					this.products = res.data.data;
				})
							
			}
		},
		onShareAppMessage(res) {
			//转发时携带 shareTicket才能在回调中获取到shareTickets 
			uni.showShareMenu({
				withShareTicket: true
			})
		},
		onShow() {
			this.getProduct();
		},
	}
</script>

<style  lang="less">
	@import url("../../common/common.less");
	page{
		background: rgb(255,255,255);
	} 

	.home-content{
		padding: 30upx 0upx;
		background: #fff;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		swiper{
			width: 100vw;
			height: 360upx;
			box-sizing: border-box;
			padding: 0 16upx;
			swiper-item{
				padding: 30upx;
				box-sizing: border-box;
			}
		}
		.fun-block{
			display: flex;
			justify-content: space-between;
			width: 658upx;
			.fun-item{
				width: 312upx;
				height: 174upx;
				border-radius: 22upx;
				box-shadow: 0 0 24upx 8upx #EEEEEE;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24upx;
				image{
					width: 74upx;
					height: 74upx;
					margin-right: 26upx;
				}
			}
		}
		.my-bag-title{
			width: 658upx;
			font-size: 30upx;
			font-weight: bold;
			letter-spacing: 2upx;
			margin-top: 50upx;
			padding-left: 4upx;
		}
		.bag-top{
			margin-top: 30upx;
			margin-bottom: 40upx;
		}
		.my-bag{
			width: 658upx;
			border-radius: 24upx;
			box-shadow: 0 0 24upx 8upx #EEEEEE;
			padding: 38upx 36upx 38upx 10upx;
			box-sizing: border-box;
			.have-product{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.bag{
					display: flex;
					align-items: center;
					image{
						width: 200upx;
						margin-right: 10upx;
					}
					.bag-info{
						.bag-code{
							font-size: 30upx;
							font-weight: bold;
							margin-bottom: 6upx;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
							width: 340upx;
						}
						.bag-text{
							color: #666;
							font-size: 24upx;
							line-height: 36upx;
						}
					}
				}
				.bag-btn{
					width: 42upx;
					height: 42upx;
					flex-shrink: 0;
				}
			}
			.no-product{
				display: flex;
				flex-direction: column;
				align-items: center;
				image{
					width: 240upx;
					height: 240upx;
				}
				.text{
					color: @mainColor;
					font-size: 24upx;
					letter-spacing: 2upx;
					margin: 10upx 0 18upx;
				}
				.btn{
					color: #fff;
					letter-spacing: 2upx;
					font-size: 30upx;
					width: 164upx;
					height: 66upx;
					line-height: 66upx;
					border-radius: 32upx;
					text-align: center;
				}
			}
		}
		.bottom-banner{
			margin-top: 10upx;
			width: 658upx;
		}
	}
	
</style>
