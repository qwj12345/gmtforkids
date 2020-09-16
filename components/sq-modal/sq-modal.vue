<template>
	<view>
		<e-modal :visible.sync="visible">
		  <view class="modal-content">
			  <view style="text-align: center;line-height: 50rpx;">微信登录需要获取您的用户信息，请前往授权</view>
		  </view>
		  <view class="modal-btns" >
			  <view class="cancel" @click="toggle">取消</view>
			  <button open-type="getUserInfo" @getuserinfo="getUserInfo" class="confirm">授权</button>
		  </view>
		</e-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				visible:false
			};
		},
		methods:{
			// 弹出授权框
			toggle(){
				this.visible ? this.visible = false : this.visible = true;
			},
			getUserInfo(e){
				if (e.mp.detail.rawData){
					this.toggle();
					this.$emit('confirm')
				  } else {  
					console.log('用户按了拒绝按钮')
				  }
			}
		}
	}
</script>

<style lang="less">
@btnH:80upx;
	.modal-content{
		padding: 32upx 40upx;
	}
	.modal-btns{
		display: flex;
		font-size: 28upx;
		letter-spacing: 2upx;
		border-top: 2upx solid #efefef;
		.cancel{
			color: #bbb;
			width: 50%;
			box-sizing: border-box;
			height: @btnH;
			line-height: @btnH;
			border-right: 2upx solid #efefef;
			text-align: center;
		}
		.confirm{
			width: 50%;
			box-sizing: border-box;
			height: @btnH;
			line-height: @btnH;
			color: rgb(244,157,26);
			text-align: center;
		}
		button{
			background: none !important;
			font-size: 28upx;
		}
		button::after {
			border: none !important;
		}
	}
</style>
