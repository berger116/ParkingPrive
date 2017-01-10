import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, App, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControlName, FormControl } from '@angular/forms';
import { Routes } from '../../app/app.routes';
import { ToastMsg } from '../../components/toast-msg/toast-msg';

/*
  Generated class for the Recherche page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html'
})
export class RecherchePage implements OnInit {
  private uidAuth: string;
  private dateRech: string;
  private toastMsg: ToastMsg;
  private myForm:any;

  constructor(public navCtrl: NavController,        
              public navparams: NavParams,
              public appCtrl: App,
              public viewCtrl: ViewController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController ) {

      this.uidAuth = this.navparams.get("uid");
      this.dateRech = this.navparams.get("dateRech");
      console.log("RecherchePage Cstr UID: ", this.uidAuth);

      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);
  }

  ngOnInit() {
      //console.log("Dispotobook OnInit queryObs: ", this.queryObs)
    
      this.myForm = new FormGroup({
           dateRecherche: new FormControl('', Validators.required),  // [ Validators.required, validateEmail]) plusieurs validateur
       });
   }

   onSubmit(): void {
    //tmp console.log(this.myForm.value, "inval form: ", this.myForm.valid);  
    // event.preventDefault(); //??
   }

   ionViewDidLoad() {
     console.log('Hello RecherchePage Page');
   }

   public ionViewCanLeave() {   //code utile ??
    console.log("Placetobook CanLeave");  
   // here we can either return true or false
   // depending on if we want to leave this view
    //if(isValid(randomValue)){
        return true;
  }

   goRecherche() {
       console.log("---- Go recherche")
       if (this.myForm.valid ){
          console.log("---- Go recherche if")
       //  this.appCtrl.getRootNav().push(Routes.getPage(Routes.AROUNDPLACE), {uid : this.uidAuth, dateRech: this.dateRech});
          this.navCtrl.setRoot(Routes.getPage(Routes.AROUNDPLACE), {uid : this.uidAuth, dateRech: this.dateRech});
       } else
          this.toastMsg._presentToast("vous devez saisir une date de recherche"); 
   }

}
