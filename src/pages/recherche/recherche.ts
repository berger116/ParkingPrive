import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
  private toastMsg: ToastMsg;
  private myForm:any;
  private dateRecherche:any;

  constructor(public navCtrl: NavController,        
              public navparams: NavParams,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController ) {

      this.uidAuth = this.navparams.get("uid");
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
    //tmp console.log(this.myForm.value, "inval dateDispo: ", this.myForm.controls.dateDispo.invalid );  // {first: 'Nancy', last: 'Drew'}
    //tmp console.log(this.myForm.value, "inval form: ", this.myForm.valid);  
     event.preventDefault(); //??
   }

   ionViewDidLoad() {
    console.log('Hello RecherchePage Page');
   }

   goRecherche() {
   // if (this.fireKey)  //clé de l'enregistrement place -> doit exister pour saisir des dispo
   //  if (this.myForm.valid )
       this.navCtrl.setRoot(Routes.getPage(Routes.AROUNDPLACE), {uid : this.uidAuth, recherche: this.dateRecherche});
   //  else
   //    this.toastMsg._presentToast("vous devez saisir une date de recherche"); 
   }

}
