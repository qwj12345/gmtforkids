(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/message/message"],{"3e29":function(t,e,a){"use strict";a.r(e);var n=a("eea6"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},5629:function(t,e,a){"use strict";var n=a("ddac"),i=a.n(n);i.a},"6a88":function(t,e,a){"use strict";a.r(e);var n=a("af4b");for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);var o,r,s,c,l=a("f0c5"),u=Object(l["a"])(n["default"],o,r,!1,null,null,null,!1,s,c);e["default"]=u.exports},7037:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={ip:"http://erp.level8cases.com:9000/"};e.default=n},a6c1:function(t,e,a){"use strict";(function(t){a("f931"),a("921b");n(a("66fd"));var e=n(a("e0cd"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},af4b:function(t,e,a){"use strict";a.r(e);var n=a("7037"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},d954:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={wybLoading:function(){return a.e("components/wyb-loading/wyb-loading").then(a.bind(null,"661a"))},myToast:function(){return a.e("components/my-toast/my-toast").then(a.bind(null,"c700"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},ddac:function(t,e,a){},e0cd:function(t,e,a){"use strict";a.r(e);var n=a("d954"),i=a("3e29");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("5629");var r,s=a("f0c5"),c=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=c.exports},eea6:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a("3cfc"),i={data:function(){return{toastTitle:"出错啦",toastType:"error",size:10,page:0,totalPage:0,url:"",messages:[{forwardFlag:0,releaseTime:"10:56",articleType:0,title:"haha",integralNum:10,describes:"我们FIFO华东师范本年度发布会山东矿机发动机佛山大部分十多年来范德萨发红包的搜救",articleImg:"https://level8cases.oss-cn-hangzhou.aliyuncs.com/lADPBGnDZ0PGI6zNAYfNA4Q_900_391-eee11ea1-9fdb-4a3f-a51a-c4f9985d83de.jpg"}],types:["独家精选","通知","通知","独家精选","通知"]}},methods:{goDetail:function(e){var a=encodeURIComponent(e.wxUrl),n=encodeURIComponent(e.content);0!==e.articleType&&3!==e.articleType||(""!==e.wxUrl&&void 0!==e.wxUrl?t.navigateTo({url:"/pages/articleDetail/articleDetail?url="+a+"&id="+e.id}):t.navigateTo({url:"/pages/articleDetail/articleDetail?article="+n+"&id="+e.id}))},getList:function(){var t=this,e={page:this.page,size:this.size};this.$refs.loading.showLoading(),this.myRequest(this.url,{data:e,method:"GET",contentType:"application/json"}).then((function(e){t.$refs.loading.hideLoading(),e.data.data.content.forEach((function(t){t.releaseTime=(0,n.timeFormat1)(t.releaseTime)})),t.messages=t.messages.concat(e.data.data.content),t.totalPage=e.data.data.totalPages}))}},onReachBottom:function(){this.page===this.totalPage-1?(this.toastType="none",this.toastTitle="已经到底啦！",this.$refs.toast.showLoading()):(this.page++,this.getList())},onLoad:function(e){this.page=0,this.messages=[],console.log(e),"0"===e.type?this.url="/miniProgram/api/notification/info":(this.url="/miniProgram/api/notification/article/info",t.setNavigationBarTitle({title:"独家精选"})),this.getList()}};e.default=i}).call(this,a("543d")["default"])}},[["a6c1","common/runtime","common/vendor"]]]);