<template>
	<view id="rule">
		<view v-html="contentText"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contentText:''
			};
		},
		methods:{
			prevImg(){
				uni.previewImage({
					//当前显示图片
					urls: [this.uploadImgUrl]
				})
			},
		},
		onLoad(query) { 
			let data = {
				type:query.type,
				company:"GMT"
			}
			this.myRequest('miniProgram/api/sys/getExplain',{data}).then(res => {
				this.contentText = `<div style="font-size:12px;line-height:20px">${res.data.data.content}</div>`;
			})
		}
	}
</script>

<style lang="less">
	@import url("../../common/common.less");
	page{
		background: rgb(251,251,251);
	}
	#rule{
		padding: 30upx 24upx;
		img,image{
			max-width: 726upx;
		}
	}
</style>
