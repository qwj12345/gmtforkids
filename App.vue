<script>
import {myRequest,getToken,saveUser} from "./common/common.js"
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		let that = this;
		uni.login({
		      success (res) {
		        if (res.code) {
					getApp().globalData.login = 1;
					uni.getUserInfo({
							success: function(e) {//用户已授权
								getApp().globalData.login = 1;
								  // -----------------判断是否绑定手机号------------------
								  getToken(e.encryptedData,e.iv).then(res => {
									  if(res.data.status === 0){
										// 获取用户信息
										myRequest('miniProgram/api/user/info').then(res => {
											if(res.data.status===0){
												that.$store.dispatch('changePersonAction',res.data.data);
											}
											// 保存用户信息
											saveUser(e.userInfo.nickName,e.userInfo.avatarUrl,e.userInfo.gender);
										})		
									  }
								  })
								  // ------------------------------
							},
							fail(err){ //用户未授权
							  getApp().globalData.login = 0;
							  getApp().globalData.hasAgree = false;
							}
					})
							
				}
			}
		})
		
		    
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">

</style>
