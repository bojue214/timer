webpackJsonp([1],{NHnr:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=t("/5sW"),a=t("zL8q"),s=t.n(a),l=(t("tvR6"),t("NYxO")),r={language:"zh"},u=t("bOdI"),c=t.n(u),g={SET_LANGUAGE:"SET_LANGUAGE",ACTION_LANGUAGE:"ACTION_LANGUAGE",GETTER_LANGUAGE:"GETTER_LANGUAGE",user:{SET_USER:"SET_USER",SET_USER_NAME:"SET_USER_NAME",SET_USER_SEX:"SET_USER_SEX",SET_USER_BIRTHDAY:"SET_USER_BIRTHDAY",SET_USER_ACCOUNT:"SET_USER_ACCOUNT",SET_USER_PASSWORD:"SET_USER_PASSWORD",SET_USER_TOKEN:"SET_USER_TOKEN",SET_USER_LANGUAGE:"SET_USER_LANGUAGE",GETTER_USER_LANGUAGE:"GETTER_USER_LANGUAGE",ACTION_USER_LANGUAGE:"ACTION_USER_LANGUAGE"}},d=c()({},g.ACTION_LANGUAGE,function(n,e){n.commit(g.SET_LANGUAGE,e)}),f=c()({},g.GETTER_LANGUAGE,function(n){if(n.language)return n.language;var e=window.localStorage.getItem("language");return void 0!==e&&"undefined"!==e?(this.$store.dispatch("ACTION_LANGUAGE",e),e):n.language}),p=t("TXmL"),E=t("urW8"),_=t.n(E),m=t("Dd8w"),S=t.n(m),w=t("wUZ8"),A=t.n(w),T=S()({Account:"Account",account:"account",Password:"Password",password:"password",Login:"Login",login:"login",select_language:"Language",$vali:{noAccount:"Please input your account.",noPassword:"Please input your password.",phone:"It's not a correct phone number"},message:{},languages:{zh:"简体中文",en:"English"}},A.a),U=t("Vi3T"),h=t.n(U),G={en:T,zh:S()({Account:"用户名",account:"用户名",Password:"密码",password:"密码",Login:"登录",login:"登录",select_language:"语言偏好",$vali:{noAccount:"请输入账号",noPassword:"请输入密码",phone:"手机号码格式不对"},languages:{zh:"简体中文",en:"English"},message:{}},h.a)};o.default.use(p.a);var R=new p.a({locale:"undefined"===localStorage.getItem("language")?"zh":localStorage.getItem("language"),messages:G});_.a.i18n(function(n,e){return R.t(n,e)});var v,N=R,L=c()({},g.SET_LANGUAGE,function(n,e){window.localStorage.removeItem("language"),window.localStorage.setItem("language",e),n.language=e,N.locale=n.language}),$={state:{name:"",birthday:"",account:"",password:"",token:"",language:""},mutations:(v={},c()(v,g.user.SET_USER,function(n,e){n.name=e.name,n.sex=e.sex,n.birthday=e.birthdayy,n.account=e.account,n.password=e.password,n.language=e.language,n.token=e.token}),c()(v,g.user.SET_USER_NAME,function(n,e){n.name=e}),c()(v,g.user.SET_USER_BIRTHDAY,function(n,e){n.birthday=e}),c()(v,g.user.SET_USER_ACCOUNT,function(n,e){n.account=e}),c()(v,g.user.SET_USER_PASSWORD,function(n,e){n.password=e}),c()(v,g.user.SET_USER_TOKEN,function(n,e){n.token=e}),c()(v,g.user.SET_USER_LANGUAGE,function(n,e){window.localStorage.removeItem("language"),window.localStorage.setItem("language",e),n.language=e,N.locale=n.language}),v),actions:c()({},g.user.ACTION_USER_LANGUAGE,function(n,e){n.commit("SET_USER_LANGUAGE",e)}),getters:c()({},g.user.GETTER_USER_LANGUAGE,function(n){return function(){return n.language}})};o.default.use(l.a);var x=new l.a.Store({state:r,actions:d,getters:f,mutations:L,modules:{user:$}}),I=t("/ocq"),y={data:function(){return{languages:[],lang:""}},mounted:function(){this.initLang()},methods:{initLang:function(){for(var n in G)this.languages.push({language:n,message:this.$i18n.t("languages."+n)})},onDropdownSelect:function(n){this.$store.dispatch("ACTION_USER_LANGUAGE",n)}}},P={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("el-dropdown",{on:{command:n.onDropdownSelect}},[t("span",{staticClass:"el-dropdown-link"},[n._v("\n    "+n._s(n.$i18n.t("select_language"))),t("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),n._v(" "),t("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},n._l(n.languages,function(e){return t("el-dropdown-item",{key:e.language,attrs:{command:e.language}},[n._v("\n      "+n._s(e.message)+"\n    ")])}))],1)},staticRenderFns:[]},C=t("VU/8")(y,P,!1,null,null,null).exports,O={components:{language:C},data:function(){return{loginModel:{account:"",password:""},rules:{account:[{required:!0,validator:this.$vali("notEmpty","$vali.noAccount"),trigger:"blur"}],password:[{required:!0,validator:this.$vali("notEmpty","$vali.noPassword"),trigger:"blur"}]},showPass:!1}},methods:{toggle:function(){this.showPass=!this.showPass},clear:function(n,e){this.loginModel[n]="",this.$refs[e].clearValidate([n])},login:function(n){this.$refs[n].validate(function(n){})}}},k={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("el-row",[t("el-col",{attrs:{xs:24,sm:{span:14,offset:5},md:{span:8,offset:8},lg:{span:6,offset:9},xl:{span:6,offset:9}}},[t("language")],1)],1),n._v(" "),t("el-row",[t("el-col",{attrs:{xs:24,sm:{span:14,offset:5},md:{span:8,offset:8},lg:{span:6,offset:9},xl:{span:6,offset:9}}},[t("el-form",{ref:"loginForm",attrs:{model:n.loginModel,"status-icon":"",rules:n.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{prop:"account"}},[t("el-input",{attrs:{placeholder:n.$t("account")},model:{value:n.loginModel.account,callback:function(e){n.$set(n.loginModel,"account",e)},expression:"loginModel.account"}},[t("i",{staticClass:"el-input__icon el-icon-delete",attrs:{slot:"suffix"},on:{click:function(e){e.stopPropagation(),n.clear("account","loginForm")}},slot:"suffix"})])],1),n._v(" "),n.showPass?n._e():t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{type:"password",autocomplete:"off",placeholder:n.$t("password")},model:{value:n.loginModel.password,callback:function(e){n.$set(n.loginModel,"password",e)},expression:"loginModel.password"}},[t("i",{staticClass:"el-input__icon el-icon-view",attrs:{slot:"suffix"},on:{click:function(e){return e.stopPropagation(),n.toggle(e)}},slot:"suffix"}),n._v(" "),t("i",{staticClass:"el-input__icon el-icon-delete",attrs:{slot:"suffix"},on:{click:function(e){e.stopPropagation(),n.clear("password","loginForm")}},slot:"suffix"})])],1),n._v(" "),n.showPass?t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{autocomplete:"off",placeholder:n.$t("password")},model:{value:n.loginModel.password,callback:function(e){n.$set(n.loginModel,"password",e)},expression:"loginModel.password"}},[t("i",{staticClass:"el-input__icon el-icon-more",attrs:{slot:"suffix"},on:{click:function(e){return e.stopPropagation(),n.toggle(e)}},slot:"suffix"}),n._v(" "),t("i",{staticClass:"el-input__icon el-icon-delete",attrs:{slot:"suffix"},on:{click:function(e){e.stopPropagation(),n.clear("password","loginForm")}},slot:"suffix"})])],1):n._e(),n._v(" "),t("el-form-item",[t("el-button",{attrs:{type:"success"},on:{click:function(e){n.login("loginForm")}}},[n._v(n._s(n.$t("Login")))])],1)],1)],1)],1)],1)},staticRenderFns:[]},M=t("VU/8")(O,k,!1,null,null,null).exports;o.default.use(I.a);var b=new I.a({routes:[{path:"/",redirect:{name:"login"}},{path:"/login",name:"login",component:M},{path:"/language",name:"language",component:C}]}),D={phone:/^1[3|4|5|7|8][0-9]\d{8}$/,notEmpty:/\r|\n|\\s/g},F={phone:function(n){return D.phone.test(n)},notEmpty:function(n){return""!==n.replace(D.empty,"")}},z=function(n,e){return function(t,o,a){F[n](o)?a():a(new Error(N.t(e)))}},H={install:function(n,e){n.prototype.$vali=z}},V=window.localStorage,W={set:function(n,e){V.setItem(n,e)},get:function(n){return V.getItem(n)},clear:function(){V.clear()},remove:function(n){V.removeItem(n)},keys:function(){for(var n=[],e=0;e<V.length;e++)n.push(V.key(e));return n},size:function(){return V.length},forEach:function(n){for(var e=0;e<V.length;e++)n.call(window.localStorage,V[V.key(i)],i)}},q={install:function(n,e){n.prototype.$storage=W}},Y={render:function(){var n=this.$createElement,e=this._self._c||n;return e("div",{staticStyle:{height:"100%"},attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},B=t("VU/8")({name:"App"},Y,!1,null,null,null).exports;o.default.config.productionTip=!1,o.default.use(s.a),o.default.use(H),o.default.use(q);new o.default({el:"#app",i18n:N,store:x,router:b,render:function(n){return n(B)}})},tvR6:function(n,e){}},["NHnr"]);
//# sourceMappingURL=app.2e286f9a456e002e3af7.js.map