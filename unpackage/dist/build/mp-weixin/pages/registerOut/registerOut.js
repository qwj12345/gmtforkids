(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/registerOut/registerOut"],{"0dac":function(t,e,n){"use strict";n.r(e);var o=n("7924"),a=n("da6e");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("7baf");var s,d=n("f0c5"),r=Object(d["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);e["default"]=r.exports},"33a9":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{bindFlag:!1,msgText:"",uid:"扫码自动输入",toastTitle:"出错啦",toastType:"error",currentDate:"默认第一次扫码时间"}},computed:{isLogin:function(){return this.$store.state.login}},methods:{showPhone:function(){this.$refs.phone.toggleModal()},bindSuccess:function(){this.bindFlag&&t.navigateTo({url:"/pages/bags/bags"})},confirmM:function(){},scanCode:function(){var e=this;t.scanCode({success:function(t){void 0!==t.path?(e.uid=t.path.split("=")[1],e.getFirstTime()):(e.toastType="none",e.toastTitle="请扫描带序列号二维码",e.$refs.toast.showLoading())},fail:function(t){e.toastType="error",e.toastTitle="扫码失败",e.$refs.toast.showLoading(),console.log("err",t)}})},bind:function(){var t=this;this.isLogin?(this.$refs.loading.showLoading(),this.myRequest("/gmt/api/good/binding",{data:{encode:this.uid}}).then((function(e){t.$refs.loading.hideLoading(),0===e.data.code?(t.msgText="<div style='text-align:center'>绑定成功！您可开始享受质保服务。</div>",t.$refs.modal.toggleModal()):601===e.data.code?(t.msgText="<div style='text-align:center'>绑定失败！该序列码不存在！</div>",t.$refs.modal.toggleModal()):602===e.data.code?(t.msgText="<div style='text-align:center'>经查验，是您的绑定产品，正在享受质保服务。</div>",t.$refs.modal.toggleModal()):603===e.data.code?(t.msgText="<div style='text-align:center'>经查验，是您的绑定产品，但已超过质保服务期。</div>",t.$refs.modal.toggleModal()):604===e.data.code?(t.msgText="<div style='text-align:center'>经查验，当前产品已被其他账号绑定。</div>",t.$refs.modal.toggleModal()):(t.toastType="error",t.toastTitle="系统出错"+e.data.code,t.$refs.toast.showLoading())}))):this.$refs.sq.toggle()},getFirstTime:function(){var t=this;this.myRequest("/gmt/api/good/findAntiCounterfeitingInfo",{data:{encode:this.uid}}).then((function(e){0===e.data.code?(t.toastType="ring",t.toastTitle="扫码成功",t.$refs.toast.showLoading(),t.currentDate=e.data.data.queryFirstTime.split(" ")[0]):(t.toastType="error",t.toastTitle="获取时间失败"+e.data.code,t.$refs.toast.showLoading())}))}}};e.default=n}).call(this,n("543d")["default"])},"6ab9":function(t,e,n){},7924:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={wybLoading:function(){return n.e("components/wyb-loading/wyb-loading").then(n.bind(null,"661a"))},myToast:function(){return n.e("components/my-toast/my-toast").then(n.bind(null,"c700"))},myModal:function(){return n.e("components/my-modal/my-modal").then(n.bind(null,"a84f"))},phoneModal:function(){return Promise.all([n.e("common/vendor"),n.e("components/phone-modal/phone-modal")]).then(n.bind(null,"9f2f"))},sqModal:function(){return n.e("components/sq-modal/sq-modal").then(n.bind(null,"d65e"))}},a=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"7baf":function(t,e,n){"use strict";var o=n("6ab9"),a=n.n(o);a.a},ba29:function(t,e,n){"use strict";(function(t){n("f931"),n("921b");o(n("66fd"));var e=o(n("0dac"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},da6e:function(t,e,n){"use strict";n.r(e);var o=n("33a9"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a}},[["ba29","common/runtime","common/vendor"]]]);