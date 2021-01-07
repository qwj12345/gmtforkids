<template>
	<view id="verify">
		<image class="verify-top" src="../../static/images/bg_img.png"></image>
		<view class="verify-content" v-if="result">
			<view class="result">
				<view class="content" v-if="result.queryNum <= 5">
					<image src="../../static/images/result_right.png"></image>
					<view>您好！您所查询的产品为GMT for Kids正品，3年质保已激活，注册会员后即享质保服务。</view>
				</view>
				<view class="content" v-else>
					<image src="../../static/images/result_error.png"></image>
					<view>您好！该防伪码已被多次查验，您购买的可能不是正品，有任何疑问可致电400-809-6708。</view>
				</view>
				<view class="verify-num">此产品被查询{{result.queryNum}}次</view>
			</view>
			<!-- product -->
			<view class="product" v-if="result.miniProgramGoods">
				<image :src="result.miniProgramGoods.goodsImg" mode="widthFix"></image>
				<view class="info">
					<view>品名：{{result.miniProgramGoods.goodsName}}</view>
					<view>颜色：{{result.miniProgramGoods.color}}</view>
				</view>
			</view>
			<view class="bind">  
				<view class="title">绑定享质保</view>
				<view class="info">
					<view>ID序列号：{{result.encode}}</view>
					<view>激活时间：{{result.queryFirstTime}}</view>
				</view>
				<view class="btn back-btn-color" @click="bind">注册绑定</view>
			</view>
			<!-- 底部广告位  -->
			<view class="bottom-banner" @click="goPage('/pages/articleDetail/articleDetail?url='+encodeURIComponent('https://mp.weixin.qq.com/s/vHC1tpB29QEtmUbrLEhAHA')+'&id=5')">
				<image src="https://level8cases.oss-cn-hangzhou.aliyuncs.com/footer-7d6fbc22-8527-4f25-83be-53b809698937.jpg" mode="widthFix"></image>
			</view>

		</view>
		<!-- 提示框 -->
		<wyb-loading :title="loadingTitle" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-modal ref="modal" :msgText="msgText" :showCancel="false"  confirmText="确定"></my-modal>
		
		<!-- 手机号授权 -->
		<phone-modal ref="phone"></phone-modal>
		<!-- 小程序授权 -->
		<sq-modal ref="sq" @confirm="showPhone"></sq-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgText:'',
				toastTitle:'',
				loadingTitle:'验证中',
				result:null,
				uid:0
			};
		},
		computed:{
			isLogin() {
			  return this.$store.state.login;
			},
		},
		methods:{
			showPhone(){
				this.$refs.phone.toggleModal();
			},
			// 显示授权提示弹框  
			showSQ(){
				this.$refs.sq.toggle();
			},
			// 
			goPage(url){
				uni.navigateTo({
					url
				})
			},
			// 验证
			verify(id){
				
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/gmt/api/good/findAntiCounterfeitingInfo',{data:{encode:id}}).then(res => {
					this.$refs.loading.hideLoading()
					if(res.data.code === 0){
						res.data.data.queryFirstTime = res.data.data.queryFirstTime.split(' ')[0];
						this.result = res.data.data;
					}else{
						this.toastType = "error";
						this.toastTitle = "系统出错"+res.data.code;
						this.$refs.toast.showLoading() // 显示
					}
				})
			},
			// 绑定
			bind(){
				if(this.isLogin){
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/gmt/api/good/binding',{data:{encode:this.uid}}).then(res => {
						this.$refs.loading.hideLoading()
						if(res.data.code === 0){
							this.msgText = `<div style='text-align:center'>绑定成功！您可开始享受质保服务。</div>`;
							this.$refs.modal.toggleModal();
						}else if(res.data.code === 601){
							this.msgText = `<div style='text-align:center'>绑定失败！该序列码不存在！</div>`;
							this.$refs.modal.toggleModal();
						}else if(res.data.code === 602){
							this.msgText = `<div style='text-align:center'>经查验，是您的绑定产品，正在享受质保服务。</div>`;
							this.$refs.modal.toggleModal();
						}else if(res.data.code === 603){
							this.msgText = `<div style='text-align:center'>经查验，是您的绑定产品，但已超过质保服务期。</div>`;
							this.$refs.modal.toggleModal();
						}else if(res.data.code === 604){
							this.msgText = `<div style='text-align:center'>经查验，当前产品已被其他账号绑定</div>`;
							this.$refs.modal.toggleModal();
						}else{
							this.toastType = "error";
							this.toastTitle = "系统出错"+res.data.code;
							this.$refs.toast.showLoading() // 显示
						}
					})
				}else{
					this.showSQ();
				}
			}
		},
		onLoad(query) {
			this.uid = query.scene;
			this.result = null;
			this.verify(query.scene)
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");
#verify{
	.verify-top{
		position: relative;
		width: 100vw;
		height: 302upx;
		z-index: 0;
	}
	.verify-content{
		padding: 0 34upx 50upx;
		.result{
			height: 566upx;
			background: url(https://level8cases.oss-cn-hangzhou.aliyuncs.com/verify-a61f61fb-1b4f-43e3-ae68-4ce29a9d13d5.png);
			background-size: cover;
			margin: -38vw auto 0;
			position: relative;
			z-index: 2;
			padding-top: 20upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			.content{
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 48upx;
				image{
					width: 118upx;
					height: 118upx;
					margin-bottom: 60upx;
				}
				view{
					width: 532upx;
					font-size: 28upx;
					line-height: 36upx;
					text-align: center;
				}
			}
			.verify-num{
				font-size: 24upx;
				color: #666;
			}
		}
		.product{
			display: flex;
			align-items: center;
			background: #fff;
			border-radius: 24upx;
			margin-top: 36upx;
			padding: 40upx;
			image{
				width: 150upx;
				margin-right: 36upx;
			}
			.info{
				font-size: 22upx; 
				view{
					line-height: 34upx;
				}
			}
		}
		.bind{
			background: #fff;
			border-radius: 24upx;
			margin-top: 36upx;
			padding: 50upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 40upx;
			.title{
				font-weight: bold;
				font-size: 32upx;
				letter-spacing: 2upx;
			}
			.info{
				margin: 38upx auto 46upx;
				font-size: 26upx;
				color: #666;
				text-align: center;
				view{
					line-height: 44upx;
				}
			}
			.btn{
				width: 312upx;
				height: 74upx;
				line-height: 74upx;
				color: #fff;
				letter-spacing: 2upx;
				font-size: 32upx;
				border-radius: 36upx;
				text-align: center;
			}
		}
	}

}
</style>
