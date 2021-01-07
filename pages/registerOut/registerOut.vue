<template>
	<view class="register">
	  <view class="question" >
		  <image src="/static/images/question.png"></image>
	  </view>
	  <!-- scan -->
	  <view class="scan-code">
		  <view class="scan-img">
			  <img src="/static/images/scan.png" @click="scanCode"/>
		  </view>
		  <view>扫描商品防伪码<br/>激活享质保</view>
	  </view> 
	  <!--输入序列号和日期 -->
	  <view class="form">
		<view class="form-item">
			<view>ID序列号：</view>
			<view>{{uid}}</view>
		</view>
		<view class="form-item">
			<view>购买日期：</view>
			<view>{{currentDate}}</view>
		</view>
	  </view> 
	  <!-- 下方两个按钮 -->
	  <view class="bootom-l-btn z-btn" @click="bind" >注册绑定</view>
		
		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-modal ref="modal" :msgText="msgText" :showCancel="false" @confirmAction="confirmM"  confirmText="确认"></my-modal>

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
				bindFlag:false,//为了判断是否绑定成功然后跳转到产品列表页  
				msgText:"",
				uid:"扫码自动输入",
				toastTitle:"出错啦",
				toastType:"error",
				currentDate:"默认第一次扫码时间"
			};
		},
		computed:{
			isLogin() {
			  return this.$store.state.login;
			},
		},
		methods:{
			// 授权框显示
			showPhone(){
				this.$refs.phone.toggleModal();
			},
			// 绑定成功后跳转
			bindSuccess(){
				if(this.bindFlag){
					uni.navigateTo({
						url:"/pages/bags/bags"
					})
				}
			},
			// 
			confirmM(){
			
			},
			// 扫描二维码的方法 
			scanCode(){
				let that = this;
				uni.scanCode({
					success (res) {
						if(res.path!==undefined){
							that.uid = res.path.split('=')[1];//截取产品序列号
							that.getFirstTime();
						} else{ 
							that.toastType = "none";
							that.toastTitle = "请扫描带序列号二维码";
							that.$refs.toast.showLoading() // 显示
						}
					},
					fail(err){
						that.toastType = "error";
						that.toastTitle = "扫码失败";
						that.$refs.toast.showLoading() // 显示
						console.log('err',err)
					}
				})
			},
			// 注册
	// 		regMethod(){
	// 			if(this.isLogin){
	// 				if(this.uid ==='扫码自动输入' ){
	// 					this.toastType = "none";
	// 					this.toastTitle = "请输入序列号";
	// 					this.$refs.toast.showLoading() // 显示
	// 				}else{
	
	// 				}
	// 			}else{
	// 				this.$refs.sq.toggle();
	// 			}
	// 		},
			// 绑定
			bind(){
				if(this.isLogin){
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/gmt/api/good/binding',{data:{encode:this.uid}}).then(res => {
						this.$refs.loading.hideLoading();
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
							this.msgText = `<div style='text-align:center'>经查验，当前产品已被其他账号绑定。</div>`;
							this.$refs.modal.toggleModal();
						}else{
							this.toastType = "error";
							this.toastTitle = "系统出错"+res.data.code;
							this.$refs.toast.showLoading() // 显示
						}	

					})
				}else{
					this.$refs.sq.toggle();
				}
			},
			// 查询时间
			getFirstTime(){
				this.myRequest('/gmt/api/good/findAntiCounterfeitingInfo',{data:{encode:this.uid}}).then(res => {
					if(res.data.code === 0){
						this.toastType = "ring";
						this.toastTitle = "扫码成功";
						this.$refs.toast.showLoading() // 显示
						this.currentDate = res.data.data.queryFirstTime.split(' ')[0];
					}else{
						this.toastType = "error";
						this.toastTitle = "获取时间失败"+res.data.code;
						this.$refs.toast.showLoading() // 显示
					}
				})
			}
		},
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	page{
		background: #fff;
	}
	.register{
		padding: 100upx 10vw 60upx;
		.question{
			position: fixed;
			top: 24upx;
			right: 40upx;
			width: 38upx;
			height: 38upx;
		}

		.scan-code{
			width: 280upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 30upx;
			color: @mainColor;
			letter-spacing: 2upx;
			margin: 0 auto;
			margin-bottom: 160upx;
			text-align: center;
		}
		.scan-img{
			width: 150px;
			height: 150px;
		}
		
		.form{
			display: flex;
			flex-direction: column;
			align-items: center;
			.form-item{
				display: flex;
				height: 50upx;
				view{
					&:first-child{
						font-weight: bold;
						font-size: 26upx;
						width: 150upx;
					}
					&:last-child{
						font-size: 26upx;
						color: #666;
						width: 320upx;
					}
				}
			}
		}

		.color6{
			color: #666;
		}
		.form-text{
			margin-top: 8px;
			padding-left: 10px;
			font-size: 10px;
			color: #b2b2b2;
		}

		.z-btn{
			margin-bottom: 40upx;
			margin-top: 100upx;
		}

	

	}
	.reg-text3{
		font-size: 28upx;
		letter-spacing: 2upx;
		text-align: center;
	}
	.check{
		width: 100%;
		padding: 50upx 14upx 0upx;
		box-sizing: border-box;
		.content{
			font-size: 32upx;
			text-align: center;
			margin-bottom: 40upx;
		}
		.btn{
			font-size: 28upx;
			letter-spacing: 2upx;
			color: #fff;
			height: 60upx;
			line-height: 60upx;
			width:180upx;
			text-align: center;
			border-radius: 36upx;
			background: linear-gradient(left,rgb(255,169,41),rgb(255,131,31));
			margin: 0 auto;
			margin-bottom: 30upx;
		}
		.c-btn{
			background: none;
			border: 2upx solid @mainColor;
			box-sizing: border-box;
			color: @mainColor;
		}
		.check-btns{
			display: flex;
			justify-content: space-between;
		}
	}
</style>
