import{a as se}from"./chunk-5K454CJT.js";import{a as N,c as R,d as B,g as Z}from"./chunk-VFKILHBG.js";import{b as U,c as C}from"./chunk-6SLE7AYE.js";import{j as G,k as q,l as j}from"./chunk-A2AW2SYP.js";import{C as ne,J as ae,j as $,k as g,l as z,m as H,n as J,o as S,p as K,q as Q,r as W,s as X,t as Y,u as ee,v as te,w as ie,x as re,y as oe}from"./chunk-WSYZKVRC.js";import{X as V,Y as A,Z as D,t as O}from"./chunk-ANMYY5ZS.js";import{Ab as u,Bb as L,Cb as d,Ea as P,Fa as F,Hb as f,Lb as t,Mb as e,Nb as p,Oc as T,Pb as E,Sb as v,Ub as b,ac as s,bc as k,fc as I,gc as w,hb as r,ib as c,qb as M,ua as y,ub as _,v as h}from"./chunk-CFLUTWLG.js";var le=()=>["/forgot-password"],de=()=>["/register-user"];function ce(i,o){i&1&&p(0,"mat-spinner",5)}function pe(i,o){i&1&&(t(0,"mat-error",9),s(1,"Username is required"),e())}function ue(i,o){i&1&&(t(0,"mat-error",13),s(1,"Password is required"),e())}function fe(i,o){if(i&1){let n=E();t(0,"div",6)(1,"mat-form-field")(2,"mat-label",7),s(3,"Username"),e(),p(4,"input",8),u(5,pe,2,0,"mat-error",9),e()(),t(6,"div",6)(7,"mat-form-field")(8,"mat-label",10),s(9,"Password"),e(),p(10,"input",11),t(11,"button",12),v("click",function(a){P(n);let l=b();return F(l.onShowPassword(a))}),t(12,"mat-icon"),s(13),e()(),u(14,ue,2,0,"mat-error",13),e()(),t(15,"a",14),s(16," Forgot Password? "),e(),t(17,"a",15),s(18," Create Account "),e(),t(19,"button",16),s(20," Login "),e()}if(i&2){let n=b();r(4),d("formControl",n.username),r(),f(5,n.username.hasError("required")?5:-1),r(5),d("type",n.hidePassword()?"password":"text")("formControl",n.password),r(),L("aria-label","Hide password")("aria-pressed",n.hidePassword()),r(2),k(n.hidePassword()?"visibility_off":"visibility"),r(),f(14,n.password.hasError("required")?14:-1),r(),d("routerLink",w(11,le)),r(2),d("routerLink",w(12,de)),r(2),d("disabled",!n.formGroup.valid)}}var je=(()=>{let o=class o{constructor(m,a,l,x,me){this.actions$=m,this.store=a,this.snackbarService=l,this.router=x,this.ngZone=me,this.password=new S("",[g.required,g.pattern(se)]),this.username=new S("",g.required),this.formGroup=new J({password:this.password,username:this.username}),this.isLoading=_(!1),this.hidePassword=_(!0)}ngOnInit(){this.handleLoginError().subscribe(),this.handleLoginSuccess().subscribe()}onSubmit(){this.formGroup.valid&&(this.isLoading.update(()=>!0),this.store.dispatch(G({username:this.username.value,password:this.password.value})))}onShowPassword(m){this.hidePassword.update(a=>!a),m.stopPropagation()}handleLoginError(){return this.actions$.pipe(C(j),h(m=>{this.isLoading.update(()=>!1),this.snackbarService.openSnackBar(m.error.message)}))}handleLoginSuccess(){return this.actions$.pipe(C(q),h(()=>{this.navigateToPostsPage()}))}navigateToPostsPage(){this.ngZone.run(()=>{setTimeout(()=>{this.isLoading.update(()=>!1),this.router.navigate(["/feed/posts"])},2e3)})}};o.\u0275fac=function(a){return new(a||o)(c(U),c(O),c(N),c(R),c(M))},o.\u0275cmp=y({type:o,selectors:[["app-login-form"]],standalone:!0,features:[I],decls:9,vars:2,consts:[["data-login-page-container","",1,"container"],[1,"logo-container"],["src","assets/social_face_logo.svg","alt","social_face_logo"],["aria-label","Social Face Login Page",1,"title"],[1,"form",3,"ngSubmit","formGroup"],["data-spinner",""],[1,"form-group"],["aria-label","Username field"],["matInput","","aria-placeholder","Enter your username","aria-required","true","placeholder","Enter your username","id","usernameField","data-username-field","",3,"formControl"],["aria-errormessage","usernameField"],["aria-label","Password label"],["matInput","","aria-placeholder","Enter your password","aria-required","true","placeholder","Enter your password","id","passwordField","data-password-field","",3,"type","formControl"],["mat-icon-button","","matSuffix","",3,"click"],["aria-errormessage","passwordField"],["mat-button","","aria-label","Forgot password button","color","primary","data-forgot-password-btn","",3,"routerLink"],["mat-button","","aria-label","Create Account button","color","primary","data-create-account-btn","",3,"routerLink"],["aria-label","Login button","mat-flat-button","","color","primary","type","submit","data-login-btn","",3,"disabled"]],template:function(a,l){a&1&&(t(0,"div",0)(1,"div",1),p(2,"img",2),e(),t(3,"div")(4,"h1",3),s(5,"Social Face"),e(),t(6,"form",4),v("ngSubmit",function(){return l.onSubmit()}),u(7,ce,1,0,"mat-spinner",5)(8,fe,21,13),e()()()),a&2&&(r(6),d("formGroup",l.formGroup),r(),f(7,l.isLoading()?7:8))},dependencies:[T,X,K,$,z,H,Q,W,ae,ie,Y,ee,te,oe,A,V,D,re,ne,Z,B],styles:[".container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh}.container[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:2rem;margin:2rem 0;text-align:center}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:1rem}.container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]   div.form-group[_ngcontent-%COMP%]:first-child   .mat-mdc-form-field[_ngcontent-%COMP%]{width:248px}"]});let i=o;return i})();export{je as LoginFormComponent};
