import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Routes } from '../../app/app.routes';
import { AngularFire, AuthProviders, AuthMethods} from 'angularfire2';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email:string = "t@t.ch";
  password:string = "tttttt";
  error:string;
  loader:any;
  loginOk:boolean = false;

  constructor(public navCtrl: NavController,
              private af: AngularFire,
              public loadingCtrl: LoadingController) {
    //this.af.auth.subscribe(auth => console.log("XXX Login auth:" + auth)); 
      //console.log(this.af.auth )

      // this.af.auth.subscribe(auth => {   //(this.af.auth.getAuth().provider) {  //méthode dépréciée
      // },
  }

  login() {
      console.log('login Page')

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
         content: "Chargement..."
      });
      this.loader.present();

      // this.af.auth.login();  // log avec google

      // login credential 
      this.af.auth.login({ email: this.email, password: this.password },
        { provider: AuthProviders.Password,
          method: AuthMethods.Password
        }).then ((res) => {
           console.log("Login res.uid", res.uid)
           this.goTabs(res.uid);
           }, (error) => {
               console.log("Login error", error)
              //this.error = error._body;
        }).catch(err =>{
            console.log("Login catch error", err)
            this.navCtrl.setRoot(Routes.getRootPage(false));
        });

        if (this.loader)
            this.hideLoading();

       // this.af.auth.subscribe(auth => {   //(this.af.auth.getAuth().provider) {  //méthode dépréciée
       //    console.log("Subscribe af.auth: " + auth )
       // });
    }

   // overrideLogin() {
   //   this.af.auth.login({
   //     provider: AuthProviders.Anonymous,
   //     method: AuthMethods.Anonymous,
   //   }); 
   //   this.goTabs();   
   // }

   goTabs(uid){
      console.log ("go tabs", uid);
      this.loginOk = true;
      this.navCtrl.push(Routes.getPage(Routes.TABS), {uid: uid});  
   }

   private hideLoading(){
       this.loader.dismiss();
   }

}
