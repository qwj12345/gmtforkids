(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0a49":function(t,e,a){"use strict";var i=a("97db"),o=a.n(i);o.a},"11f3":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i,o=l(a("7144")),n=l(a("d946")),s=a("3cfc");function l(t){return t&&t.__esModule?t:{default:t}}var r={data:function(){return{invitationCode:"",msgText:"",toastTitle:"",toastType:"ring",showChoose:!1,menus:[{icon:a("a0f2"),name:"书包登记",url:"/pages/register/register"},{icon:a("f786"),name:"幸运抽奖",url:"/pages/lottery/lottery"},{icon:a("de4d"),name:"赚奖学金",url:"/pages/integral/integral"},{icon:a("0262"),name:"我的书包",url:"/pages/bags/bags"},{icon:a("a544"),name:"最新消息",url:"/pages/message/message?type=0"},{icon:a("684b"),name:"添加关注",url:"/pages/follow/follow"}],swiperIndex:0,cWidth3:"",cHeight3:"",arcbarWidth:"",pixelRatio:1,list:["canvasArcbar1","canvasArcbar2"],studyColors:["background:rgb(199,234,251)","background:rgb(232,243,210)","background:rgb(250,204,229)","background:rgb(253,235,209)"],weeks:["周日","周一","周二","周三","周四","周五","周六"],nowDay:{month:"5月2020",day:"20",week:3},weather:"--",temphigh:"--",templow:"--",weatherImg:"http://level8cases.oss-cn-hangzhou.aliyuncs.com/weathercn02/29.png",children:[],avatarImg:[a("100a"),a("45b0")],showChild:{},products:[],amSubjects:[],pmSubjects:[],showChildId:0}},computed:{isLogin:function(){return this.$store.state.login},isGmtInviteUser:function(){return this.$store.state.person.isGmtInviteUser||0}},watch:{isLogin:function(){this.isLogin&&(""!==this.invitationCode&&(this.$refs.modal.visible=!0),this.getChildren())},showChild:{handler:function(t,e){this.getSubject()},immediate:!0}},methods:{showSQ:function(){this.$refs.sq.toggle()},showPhone:function(){this.$refs.phone.toggleModal()},goPage:function(e){this.isLogin?(console.log(),-1!==e.search("editTable")&&0===this.children.length?(this.toastTitle="请先添加小孩",this.toastType="none",this.$refs.toast.showLoading()):t.navigateTo({url:e})):this.showSQ()},toggleChoose:function(){this.showChoose?this.showChoose=!1:this.showChoose=!0},agreeFollow:function(){var t=this;if(this.isLogin){var e={code:this.invitationCode};console.log(111,e),this.$refs.loading.showLoading(),this.myRequest("/gmt/api/userFollow/bundling",{data:e}).then((function(e){console.log(e),t.$refs.loading.hideLoading(),0===e.data.code?(t.getChildren(),t.toastTitle="关注成功",t.toastType="ring",t.$refs.toast.showLoading()):(t.toastTitle="关注失败",t.toastType="error",t.$refs.toast.showLoading())}))}else this.showSQ()},changeSwiper:function(t){this.swiperIndex=t.mp.detail.current},chooseChild:function(t){this.showChild.id!==t.id&&(this.showChildId=t.id,this.toggleChoose(),this.getChildDetail())},getChildren:function(){var t=this;this.myRequest("gmt/api/gmtChild/child/gmtChildList",{data:{},contentType:"application/json"}).then((function(e){0===e.data.code&&0!==e.data.data.length&&(t.children=e.data.data,t.showChildId=e.data.data[0].id,t.getChildDetail())}))},getChildDetail:function(){var t=this,e={id:this.showChildId,isWeightCalculation:!0};this.$refs.loading.showLoading(),this.myRequest("gmt/api/gmtChild/child/gmtChildDetail",{data:e}).then((function(e){t.$refs.loading.hideLoading(),0===e.data.code?(t.showChild=e.data.data,t.list=[],t.showChild.childBags.forEach((function(e,a){e.weight=(e.goodsWeight+t.showChild.weightCalculation.actualWeight).toFixed(1),e.canvasId="canvas"+a;var i=e.weight/(t.showChild.weightCalculation.maxWeight+t.showChild.weightCalculation.standardWeight);e.text=i>=1?"已超重":"重量正常";var o={series:[{data:i>=1?1:i,color:i>=1?"rgb(232,56,58)":"rgb(255,255,255)"}]};t.showArcbar("canvas"+a,o)})),t.products=JSON.parse(JSON.stringify(t.showChild.childBags))):(t.toastType="error",t.toastTitle="请求错误",t.$refs.toast.showLoading())}))},getDate:function(){this.nowDay=(0,s.timeFormat1)(new Date,0),this.getSubject()},getWeather:function(e){var a=new o.default.AMapWX({key:e});a.getRegeo({success:function(e){var a=e[0].regeocodeData.addressComponent.streetNumber.location.split(",").reverse().join(",");t.request({url:"https://jisutqybmf.market.alicloudapi.com/weather/query?city='".concat(e[0].regeocodeData.addressComponent.district,"'&location=\"").concat(a,'"'),method:"GET",header:{Authorization:"APPCODE cbd4d9a3b71d4b078ab4e8cae480f29c","content-type":"application/x-www-form-urlencoded; charset=UTF-8"},success:function(t){console.log(t.data.result),i.weather=t.data.result.weather,i.temphigh=t.data.result.temphigh,i.templow=t.data.result.templow,i.weatherImg="http://level8cases.oss-cn-hangzhou.aliyuncs.com/weathercn02/"+t.data.result.img+".png"}})},fail:function(t){console.log(t)}})},showArcbar:function(t,e){new n.default({$this:i,canvasId:t,type:"arcbar",fontSize:11,legend:{show:!1},duration:2500,pixelRatio:i.pixelRatio,series:e.series,animation:!0,width:i.cWidth3*i.pixelRatio,height:i.cHeight3*i.pixelRatio,dataLabel:!0,extra:{arcbar:{type:"circle",width:i.arcbarWidth*i.pixelRatio,ringWidth:3,labelWidth:20,startAngle:.5}}})},getSubject:function(){var t=this;if(this.showChild.id){var e={childId:this.showChild.id,weekIndex:0===this.nowDay.week?7:this.nowDay.week};this.myRequest("gmt/api/gmtChild/gmtChildClassCard/getGroupInfo",{data:e}).then((function(e){if(0===e.data.code){var a=e.data.data;t.amSubjects=[],t.pmSubjects=[];for(var i=1;i<=4;i++)a[t.nowDay.week+"_"+i]&&t.amSubjects.push(a[t.nowDay.week+"_"+i].classCardName);for(var o=5;o<=8;o++)a[t.nowDay.week+"_"+o]&&t.pmSubjects.push(a[t.nowDay.week+"_"+o].classCardName)}else t.toastType="error",t.toastTitle="课表请求错误",t.$refs.toast.showLoading()}))}}},onShow:function(){1===getApp().globalData.subjectFlag&&(getApp().globalData.subjectFlag=0,this.getChildDetail()),1===getApp().globalData.bagFlag&&(getApp().globalData.bagFlag=0,this.getChildDetail()),1===getApp().globalData.homeChildFlag&&(getApp().globalData.homeChildFlag=0,this.getChildren())},onLoad:function(e){e.code&&(this.invitationCode=e.code,this.msgText="<div style='text-align:center'>你是否同被邀请成为共同关注人？</div>",this.$refs.modal.toggleModal()),i=this,this.cWidth3=t.upx2px(316),this.cHeight3=t.upx2px(316),this.arcbarWidth=t.upx2px(34),this.getWeather("fd775be10a2b2f19a552105a2747c07f"),this.getDate()}};e.default=r}).call(this,a("543d")["default"])},"63c1":function(t,e,a){"use strict";a.r(e);var i=a("11f3"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},"6a88":function(t,e,a){"use strict";a.r(e);var i=a("af4b");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);var n,s,l,r,d=a("f0c5"),h=Object(d["a"])(i["default"],n,s,!1,null,null,null,!1,l,r);e["default"]=h.exports},7037:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={ip:"http://erp.level8cases.com:9000/"};e.default=i},"97db":function(t,e,a){},af4b:function(t,e,a){"use strict";a.r(e);var i=a("7037"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},c347:function(t,e,a){"use strict";a.r(e);var i=a("df84"),o=a("63c1");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("0a49");var s,l=a("f0c5"),r=Object(l["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=r.exports},de0a:function(t,e,a){"use strict";(function(t){a("f931"),a("921b");i(a("66fd"));var e=i(a("c347"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},df84:function(t,e,a){"use strict";var i={wybLoading:function(){return a.e("components/wyb-loading/wyb-loading").then(a.bind(null,"661a"))},myToast:function(){return a.e("components/my-toast/my-toast").then(a.bind(null,"c700"))},myModal:function(){return a.e("components/my-modal/my-modal").then(a.bind(null,"a84f"))},phoneModal:function(){return Promise.all([a.e("common/vendor"),a.e("components/phone-modal/phone-modal")]).then(a.bind(null,"9f2f"))},sqModal:function(){return a.e("components/sq-modal/sq-modal").then(a.bind(null,"d65e"))}},o=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}))}},[["de0a","common/runtime","common/vendor"]]]);