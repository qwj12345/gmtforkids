<template>
	<view>
		<view class="fix-img">
		</view>
		<view class="header-user">
			<view class="user-info">
				<view class="user-avatar">
					<open-data v-if="isLogin" type="userAvatarUrl"></open-data>
					<img v-if="!isLogin" src="/static/images/d-user.png" @click="Login"/>
				</view>
				<view class="user-text">
					<view v-if="isLogin" class="user-name">
						Hi~,<open-data type="userNickName"></open-data>
					</view>
					<view v-if="!isLogin" class="user-name" @click="Login">
						点击登录 
					</view>
					<view class="user-integral" v-if="isLogin"><view>奖学金</view> {{integral}}</view>
				</view>
			</view>
			<view class="user-btn" @click="goDetail">签到</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		computed: {
		  integral() {
		    return this.$store.state.person.gmtIntegralNum||0;
		  },
		  // 也可以直接监听person
		  // person() {
		  //   return this.$store.state.person; 
		  // },
			isLogin() {
			  return this.$store.state.login;
			},
		},
		 methods:{
			 Login(){
				 this.$emit("login")
			 },
			 goDetail(){
				 if(this.isLogin){ 
					 uni.navigateTo({
					 	url:"/pages/integral/integral"
					 })
				 }else{
					 this.$emit("login")
				 }
				 
			 }
		 }
	}
</script>

<style lang="less">
img,image{
	width: 100%;
	display: block;
}
.fix-img{
	background: url('https://level8cases.oss-cn-hangzhou.aliyuncs.com/top-5917d0a2-c0ba-4e3d-9fea-c3c584757350.jpg');//https://level8cases.oss-cn-hangzhou.aliyuncs.com/bg-155ef94c-9727-4d44-ae17-d3dbc00ad8ad.png
	height: 536upx;
	background-size: cover;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	z-index: 0;
}
.header-user{
	background: #fff;
	border-top-left-radius: 30upx;
	border-top-right-radius: 30upx; 
	height: 160upx;
	position: relative;
	z-index: 2;
	margin-top: 510upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 32upx;
	.user-info{
		display: flex;
		align-items: center;
		.user-avatar{
			width: 112upx;
			height: 112upx;
			box-shadow: 0 0 20upx 10upx #dedede;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 20upx;
		}
		.user-text{
			.user-name{
				font-size: 36upx;
				margin-bottom: 4upx;
			}
			.user-integral{
				color: #ff581e;
				font-size: 30upx;
				display: flex;
				view{
					font-size: 20upx;
					align-self: flex-end;
					padding-bottom: 4upx;
					margin-right: 4upx;
				}
			}
		}
	}
	.user-btn{
		color: #fff;
		font-size: 30upx;
		background: linear-gradient(left,rgb(255,169,41),rgb(255,131,31));
		width: 134upx;
		height: 66upx;
		line-height: 66upx;
		border-radius: 32upx;
		text-align: center;
		letter-spacing: 2upx;
	}
}


</style>
