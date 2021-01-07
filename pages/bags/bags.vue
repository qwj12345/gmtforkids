<template>
	<view id="bags">
		<page-top></page-top>
		<!-- 有绑定产品时 -->
		<view class="product-list" v-if="products.length !== 0">
			<view v-for="(item,key) in products" :key="key" class="product-item" :class="{'padb':!item.open}">
				<view class="flex-row" :class="{'border-bottom':item.open}"  @click="goDetail(item.id)">
					<view class="product-info"> 
						<!--  -->
						<view class="product-img">
							<img :src="item.goodsImg"/>
						</view>
						<!--  -->
						<view class="product-text">
							<view class="product-title">
								{{item.encode}} 
							</view>
							<view class="product-status">
								质保：{{item.isWarranty===1?'质保期内':'超过质保期'}}
							</view>
							<view class="product-status">
								状态：{{status[item.repairsType]}}
							</view>
							<view class="product-time">
								购买时间：{{item.goodsAddTime}}
							</view>
						</view>
					</view>
					<view class="face-right">
						<img src="/static/images/face-right-9.png"/>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 没有绑定产品时 -->
		<view v-if="products.length === 0" class="no-product">
			<image class="no-product-img" src="../../static/images/no_product.png"/>
			<view class="no-product-text">
				您还没绑定产品~
			</view>
			<navigator  url="/pages/register/register" open-type="navigate"  class="no-product-btn">
				前往绑定
			</navigator>
		</view>

		<!-- 提示框 -->
		<wyb-loading title="请稍后" ref="loading" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-toast :title="toastTitle" ref="toast" :loadingType="toastType" type="rectangle" bg-color="#ffffff" ft-color="#666666"/>
		<my-modal ref="modal" :msgText="msgText" confirmText="确认" @confirmAction="confirmReport"></my-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msgText:"",
				toastTitle:"出错啦",
				toastType:"error",
				totalPage:0,
				page:0,
				products:[],
				productId:'',
				productCode:'',
				modalType:-1,
				status:['未处理','联系中','维修中','已寄回','异常','正常']
				// products:[{open:false,goodsImg:"https://level8cases.oss-cn-hangzhou.aliyuncs.com/矩形5拷贝-9d8d1b40-7ca3-41c0-a2cd-4cae3d1378ef.png",statusName:"正常",goodsAddTime:"2020/05/20",encode:"LA-1688-02T00",repairsType:5}]
			};
		},
		methods:{
			goDetail(id){
				uni.navigateTo({
					url:'/pages/productDetail/productDetail?id='+id
				})
			},
			// 弹框事件
			confirmReport(){
				if(this.modalType===1){//取消上报
					let data = {
						id:this.productId,
					}
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/miniProgram/api/repairs/del',{data:data}).then(res => {
						this.$refs.loading.hideLoading()
						if(res.data.status === 0){
							this.toastType = "ring";
							this.toastTitle = "取消成功";
							this.$refs.toast.showLoading() // 显示
							this.products = [];
							this.page = 0;
							this.getProducts();  //改变一个产品状态后重新获取下产品列表
						
						}else{
							this.toastType = "error";
							this.toastTitle = "取消失败";
							this.$refs.toast.showLoading() // 显示
						}
					})
				}else if(this.modalType===2){//挂失登记
					let data = {
						goodsCode:this.productCode,
					}
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/miniProgram/api/goods/verlustanzeige',{data:data}).then(res => {
						this.$refs.loading.hideLoading() 
						if(res.data.status === 0){
							this.toastType = "ring";
							this.toastTitle = "挂失成功";
							this.$refs.toast.showLoading() // 显示
							this.products = [];
							this.page = 0;
							this.getProducts();  //改变一个产品状态后重新获取下产品列表
							
						}else{
						   this.msgText = "<div style='text-align:center'>挂失失败，如未填写个人信息请先填写</div>";
						   this.$refs.modal.toggleModal(); // 显示
						}
						
					})
				}else if(this.modalType===3){//取消挂失登记
					let data = {
						goodsCode:this.productCode
					}
					this.$refs.loading.showLoading() // 显示
					this.myRequest('/miniProgram/api/goods/restore/status',{data:data}).then(res => {
						this.$refs.loading.hideLoading() 
						if(res.data.status === 0){
							this.toastType = "ring";
							this.toastTitle = "取消挂失成功";
							this.$refs.toast.showLoading() // 显示
							this.products = [];
							this.page = 0;
							this.getProducts();  //改变一个产品状态后重新获取下产品列表 
						}else{
							this.toastType = "error";
							this.toastTitle = "取消失败";
							this.$refs.toast.showLoading(); // 显示
						}
					})
				}

			},

			// 获取产品列表
			getProducts(){
				let data = {
					page:0,
					size:10
				}
				this.$refs.loading.showLoading() // 显示
				this.myRequest('/miniProgram/api/goods/list',{data:data}).then(res => {
					this.$refs.loading.hideLoading() // 显示
					let products = this.products.concat(res.data.data);
					this.totalPage = Math.ceil(res.data.total/this.size);
					products.forEach(item => {
						item.open = false;  //设置产品为未打开的样子
						item.childName ? item.childName = item.childName : item.childName = "未绑定";
					})
					this.products = products;
				})
			
			},
		},
		onShow() {
			this.products = [];
			this.getProducts();
		}
	}
</script>

<style lang="less">
@import url("../../common/common.less");
#bags{
	.product-list{
	  position: relative;
	  width: 682upx;
	  margin: 0 auto;
	  margin-top: -140upx;
	  z-index: 5;
	}

	.product-item{
	    background: #fff;
	    border-radius: 16upx;
	    padding: 40upx 30upx 0 20upx;
	    margin-bottom: 30upx;
	}
	.padb{
	    padding-bottom: 40upx !important;
	}
	.flex-row{
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	}
	
	.border-bottom{
	    border-bottom: 2upx solid #efeff4;
	    padding-bottom: 20upx;
	}
	.product-info{
	    display: flex;
	    justify-content: space-between;
	}
	.product-img{
	    width: 180upx;
	    height:180upx;
		border-radius: 12upx;
		overflow: hidden;
	}
	.product-text{
	    display: flex;
	    justify-content: space-around;
	    flex-direction: column;
		
	}
	.product-title{
	    font-size: 32upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 370upx;
	}

	.product-status{
	    color: #ff7836;
	    font-size: 24upx;
	}
	.product-time{
	    color: #999;
	    font-size: 24upx;
	}
	.product-option{
	    display: flex;
	    justify-content: space-between;
	    padding: 20upx 10upx 24upx;
	
	}
	.option-item{
	    display: flex;
	    flex-flow: column;
	    align-items: center;
	    color: #333;
	}
	.option-img{
	    width: 64upx;
	    height: 64upx;
	    margin-bottom: 20upx;
	}
	.option-text{
	    font-size: 20upx;
	}
	.face-right{
	    width: 42upx;
	    height: 42upx;
	    transition: all 0.3 linear;
	}
	
	.face-bottom{
	    transform: rotate(90deg);
	}
	.colorR{
	    color: red;
	}
	.colorFF7{
	    color: #ff7836;
	}
	.no-product{
	    margin-top: 120upx;
	    display: flex;
	    flex-direction: column;
	    align-items: center;
	}
	.no-product-img{
	    width: 360upx;
		height: 360upx;
	}
	.no-product-text{
	    color: @mainColor;
	    margin-top: 20upx;
	    margin-bottom: 40upx;
	    font-size: 28upx;
		letter-spacing: 2upx;
	}
	.no-product-btn{
	    background: linear-gradient(left,rgb(255,169,41),rgb(255,131,31));
	    width: 360upx;
	    margin: 40upx auto;
	    box-sizing: border-box;
	    height: 96upx;
	    border-radius: 48upx;
	    color: #fff;
	    font-size: 32upx;
	    letter-spacing: 2upx;
	    text-align: center;
	    line-height: 96upx;
	    box-shadow: 0 4upx 16upx 0upx rgb(255,155,31);
	} 
}
</style>
