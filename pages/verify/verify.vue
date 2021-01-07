<template>
	<view id="verify">
	  <img src="/static/images/scan.png" @click="scanCode"/> 
	  <view class="scan-text">扫描商品防伪码<br/>验正品</view>
	  
	  <!-- 提示框 -->
	  <my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				toastTitle:"出错啦",
				toastType:"error",
			};
		},
		methods:{
			// 扫描二维码的方法
			scanCode(){
				let that = this;
				uni.scanCode({
					success (res) {
						console.log(res)
						if(res.path!==undefined){
							let uid = res.path.split('=')[1];//截取产品序列号
							uni.navigateTo({
								url:"../register/register?scene="+uid
							})
						} else{ 
							that.toastType = "none";
							that.toastTitle = "请扫描正确防伪码";
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
			}
		}
	}
</script>

<style lang="less">
#verify{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80vh;
	img{
		width: 40vw;
		height: 40vw;
	}
	
	.scan-text{
		font-size: 30upx;
		line-height: 40upx;
		color: rgb(244,157,26);
		letter-spacing: 2upx;
		text-align: center;
	}
}
</style>
