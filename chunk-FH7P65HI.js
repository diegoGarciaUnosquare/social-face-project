import{a as ue}from"./chunk-5K454CJT.js";import{a as B,b as A,c as G,m as Z}from"./chunk-YAA4BFPX.js";import{b as $,c as z,f as H}from"./chunk-CLNOKXZC.js";import{b as R,c as S}from"./chunk-QNR4T3HR.js";import{n as L}from"./chunk-VGYDPLI3.js";import{C as le,D as se,E as me,G as de,H as ce,J as pe,j as J,k as d,l as K,m as W,n as X,o as f,p as Y,q as ee,r as te,s as re,t as ie,u as ae,w as ne,y as oe}from"./chunk-IRB5KGML.js";import{E as j,F as Q,o as V}from"./chunk-YKIFQ2TL.js";import{$b as a,Bb as s,Ea as _,Fa as v,Gb as c,Jc as T,K as b,Kb as i,Kc as I,Lb as e,Mb as u,Ob as E,Rb as w,Tb as N,Xb as F,Yb as P,Zb as U,dc as q,ec as O,gb as n,hb as h,hc as k,ic as D,pb as M,ua as x,v as g,zb as p}from"./chunk-3MIHH2IE.js";var Ce=["createUserStepper"],ge=()=>["/login"];function be(t,o){t&1&&(i(0,"mat-error",8),a(1," Username is required "),e())}function _e(t,o){t&1&&(i(0,"mat-error",11),a(1," Password is required "),e())}function ve(t,o){t&1&&(i(0,"mat-error",12),a(1," Password must be at least 8 characters "),e())}function Ee(t,o){t&1&&(i(0,"mat-error",12),a(1," Password must contain at least one number and one uppercase letter "),e())}function we(t,o){t&1&&(i(0,"mat-error",15),a(1," Email is required "),e())}function Se(t,o){t&1&&(i(0,"mat-error",33),a(1," Email is invalid "),e())}function ye(t,o){t&1&&(i(0,"mat-error",18),a(1," First Name is required "),e())}function xe(t,o){t&1&&(i(0,"mat-error",21),a(1," Last Name is required "),e())}function Me(t,o){t&1&&(i(0,"mat-error",24),a(1," Date of Birth is required "),e())}function Ne(t,o){t&1&&u(0,"mat-spinner",29)}function Fe(t,o){if(t&1){let fe=E();i(0,"button",34),a(1," Next "),e(),i(2,"button",35),w("click",function(){_(fe);let l=N();return v(l.navigateToLogin())}),a(3," Return to Login "),e()}}var Ke=(()=>{let o=class o{constructor(m,l,r,C,y,he){this.breakpointObserver=m,this.actions$=l,this.snackbarService=r,this.store=C,this.ngZone=y,this.router=he,this.email=new f("",[d.required,d.email]),this.firstName=new f("",d.required),this.lastName=new f("",d.required),this.password=new f("",[d.required,d.minLength(8),d.pattern(ue)]),this.username=new f("",d.required),this.birthDate=new f("",d.required),this.notificationPreference=new f("1"),this.isLoading=!1,this.createAccountFormGroup=new X({email:this.email,firstName:this.firstName,lastName:this.lastName,password:this.password,username:this.username,birthDate:this.birthDate,notificationPreference:this.notificationPreference})}ngOnInit(){this.handleUserCreationError().subscribe(),this.handleUserCreationSuccess().subscribe()}onSubmit(){if(this.createAccountFormGroup.valid){let m={email:this.email.value,firstName:this.firstName.value,lastName:this.lastName.value,password:this.password.value,username:this.username.value,birthDate:this.birthDate.value,notificationPreference:this.notificationPreference.value};this.store.dispatch(B({userData:m}))}}stepperOrientation(){return this.breakpointObserver.observe("(min-width: 800px)").pipe(g(({matches:m})=>m?"horizontal":"vertical"))}navigateToLogin(){this.ngZone.run(()=>{this.router.navigate(["/login"])})}handleUserCreationError(){return this.actions$.pipe(S(G),b(1),g(m=>{let{error:l}=m;this.snackbarService.openSnackBar(l.message)}))}handleUserCreationSuccess(){return this.actions$.pipe(S(A),b(1),g(()=>{this.createUserStepper&&this.createUserStepper.next()}))}};o.\u0275fac=function(l){return new(l||o)(h(V),h(R),h(Z),h(L),h(M),h($))},o.\u0275cmp=x({type:o,selectors:[["app-create-user"]],viewQuery:function(l,r){if(l&1&&F(Ce,5),l&2){let C;P(C=U())&&(r.createUserStepper=C.first)}},standalone:!0,features:[q],decls:53,vars:22,consts:[["createUserStepper",""],["data-create-user-container","",1,"create-user-container"],["linear","","data-create-user-stepper","",1,"user-creation-stepper",3,"orientation"],["aria-label","Account creation Form","label","Fill information for account creation",3,"stepControl"],["data-create-user-form","",3,"ngSubmit","formGroup"],[1,"form-group-container"],["aria-label","Enter username"],["type","text","matInput","","aria-placeholder","Enter Username","placeholder","Enter your username","aria-required","true","id","usernameField","data-username-field","",3,"formControl"],["aria-errormessage","usernameField","data-username-error-field",""],["aria-label","Enter password"],["type","password","matInput","","aria-placeholder","Enter your Password","placeholder","Enter your password","id","passwordField","aria-required","true","data-password-field","",3,"formControl"],["aria-errormessage","passwordField","data-password-error-field",""],["aria-invalid","true","aria-errormessage","passwordField","data-password-error-field",""],["aria-label","Email"],["type","email","matInput","","aria-placeholder","Enter your Email","placeholder","Enter your email","id","emailField","aria-required","true","data-email-field","",3,"formControl"],["aria-errormessage","emailField","data-email-error-field",""],["aria-label","Enter first name"],["type","text","matInput","","aria-placeholder","Enter first name","placeholder","Enter your first name","aria-required","true","id","firstNameField","aria-required","true","data-first-name-field","",3,"formControl"],["aria-errormessage","firstNameField","data-first-name-error",""],["aria-label","Enter last name"],["type","text","matInput","","aria-placeholder","Enter Last Name","placeholder","Enter your last name","id","lastNameField","aria-required","true","data-last-name-field","",3,"formControl"],["aria-errormessage","lastNameField","data-last-name-error-field",""],["aria-label","Enter date of birth"],["type","date","matInput","","aria-placeholder","Enter Date of Birth","placeholder","Enter your date of birth","id","dateOfBirthField","aria-required","true","data-birth-date-field","",3,"formControl"],["aria-errormessage","dateOfBirthField","data-birth-date-error-field",""],["aria-label","Select notification preference",3,"formControl"],["aria-label","Email Notifications","aria-checked","true","data-notification-email-field","","value","1"],["aria-label","Browser Notifications","aria-checked","false","data-notification-browser-field","","value","2"],[1,"create-user-stepper-buttons-container"],["aria-label","Loading...","data-spinner",""],["aria-label","Account Creation - Done Step","label","Done!"],["data-account-created-title","",1,"account-created-title"],["aria-label","Go to login page button","mat-button","","data-navigate-login-button","",3,"routerLink"],["aria-errormessage","emailField","aria-invalid","true","data-email-error-field",""],["aria-label","Navigate to next step","type","submit","mat-flat-button","","color","primary","data-next-button",""],["aria-label","Return to login button","mat-flat-button","","type","button","data-return-to-login-btn","",1,"return-to-login-btn",3,"click"]],template:function(l,r){if(l&1){let C=E();i(0,"section",1)(1,"mat-stepper",2,0),k(3,"async"),i(4,"mat-step",3)(5,"form",4),w("ngSubmit",function(){return _(C),v(r.onSubmit())}),i(6,"div",5)(7,"mat-form-field")(8,"mat-label",6),a(9,"Username"),e(),u(10,"input",7),p(11,be,2,0,"mat-error",8),e(),i(12,"mat-form-field")(13,"mat-label",9),a(14,"Password"),e(),u(15,"input",10),p(16,_e,2,0,"mat-error",11)(17,ve,2,0,"mat-error",12)(18,Ee,2,0),e(),i(19,"mat-form-field")(20,"mat-label",13),a(21,"Email"),e(),u(22,"input",14),p(23,we,2,0,"mat-error",15)(24,Se,2,0),e(),i(25,"mat-form-field")(26,"mat-label",16),a(27,"First Name"),e(),u(28,"input",17),p(29,ye,2,0,"mat-error",18),e(),i(30,"mat-form-field")(31,"mat-label",19),a(32,"Last Name"),e(),u(33,"input",20),p(34,xe,2,0,"mat-error",21),e(),i(35,"mat-form-field")(36,"mat-label",22),a(37,"Date of Birth"),e(),u(38,"input",23),p(39,Me,2,0,"mat-error",24),e(),i(40,"mat-radio-group",25)(41,"mat-radio-button",26),a(42," Email Notifications "),e(),i(43,"mat-radio-button",27),a(44," Browser Notifications "),e()()(),i(45,"div",28),p(46,Ne,1,0,"mat-spinner",29)(47,Fe,4,0),e()()(),i(48,"mat-step",30)(49,"h2",31),a(50," Account Created! "),e(),i(51,"a",32),a(52," Click here to navigate back to login screen. "),e()()()()}l&2&&(n(),s("orientation",D(3,19,r.stepperOrientation())),n(3),s("stepControl",r.createAccountFormGroup),n(),s("formGroup",r.createAccountFormGroup),n(5),s("formControl",r.username),n(),c(11,r.username.hasError("required")?11:-1),n(4),s("formControl",r.password),n(),c(16,r.password.hasError("required")?16:-1),n(),c(17,r.password.hasError("minlength")?17:r.password.hasError("pattern")?18:-1),n(5),s("formControl",r.email),n(),c(23,r.email.hasError("required")?23:r.email.hasError("pattern")?24:-1),n(5),s("formControl",r.firstName),n(),c(29,r.firstName.hasError("required")?29:-1),n(4),s("formControl",r.lastName),n(),c(34,r.lastName.hasError("required")?34:-1),n(4),s("formControl",r.birthDate),n(),c(39,r.birthDate.hasError("required")?39:-1),n(),s("formControl",r.notificationPreference),n(6),c(46,r.isLoading?46:47),n(5),s("routerLink",O(21,ge)))},dependencies:[re,Y,J,K,W,ee,te,pe,ne,ie,ae,oe,Q,j,de,ce,le,se,me,T,H,z,I],styles:[".create-user-container[_ngcontent-%COMP%]{align-items:center;display:flex;height:100vh;justify-content:center;width:100vw;flex-direction:column}.create-user-container[_ngcontent-%COMP%]   .user-creation-stepper[_ngcontent-%COMP%]{width:60%}.create-user-container[_ngcontent-%COMP%]   .form-group-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;flex-wrap:wrap;gap:20px;justify-content:space-around}.create-user-container[_ngcontent-%COMP%]   .account-created-title[_ngcontent-%COMP%]{color:#fff;margin-left:9px}.create-user-container[_ngcontent-%COMP%]   .return-to-login-btn[_ngcontent-%COMP%]{margin-left:10px}@media screen and (max-width: 768px){.create-user-container[_ngcontent-%COMP%]   .user-creation-stepper[_ngcontent-%COMP%]{width:90%}.create-user-container[_ngcontent-%COMP%]   .form-group-container[_ngcontent-%COMP%]{gap:20px}.create-user-container[_ngcontent-%COMP%]   .mat-mdc-form-field[_ngcontent-%COMP%]{width:80%}.create-user-container[_ngcontent-%COMP%]   .create-user-stepper-buttons-container[_ngcontent-%COMP%]{margin-top:15px}}"]});let t=o;return t})();export{Ke as CreateUserComponent};