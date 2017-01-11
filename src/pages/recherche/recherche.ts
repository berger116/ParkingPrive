import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, App, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Routes } from '../../app/app.routes';
import { ToastMsg } from '../../components/toast-msg/toast-msg';

@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html'
})
export class RecherchePage implements OnInit {
  private uidAuth: string;
  private dateRech: string;
  private toastMsg: ToastMsg;
  private myForm:any;
  private now:any; 

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
      this.now = new Date().toISOString().substring(0, 13) + ":00:00";
      console.log("now:", this.now)
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
      //console.log("Go recherche")
      if (this.myForm.valid){
        if (this.ctrlDateOk(this.dateRech))
           this.appCtrl.getRootNav().push(Routes.getPage(Routes.AROUNDPLACE), {uid : this.uidAuth, dateRech: this.dateRech});
       //   this.navCtrl.setRoot(Routes.getPage(Routes.AROUNDPLACE), {uid : this.uidAuth, dateRech: this.dateRech});
      } else
          this.toastMsg._presentToast("vous devez saisir une date de recherche"); 
   }

   ctrlDateOk(dateRech) {
      let res = true;  
      let mess = "";
    
      if (dateRech < this.now){
          res = false;
          mess = "Date de recherche inférieur à date du jour" 
      }

      if (res==false )
          this.toastMsg._presentToast(mess);
      return res;
   }


}
