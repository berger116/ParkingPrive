import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FirebaseListObservable} from 'angularfire2'; 
import { Subject } from 'rxjs/Subject';
import { FireService } from '../../providers/fireservice';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import 'rxjs/add/operator/map';

import { User } from '../userprofile/user';
//import { PlaceParking } from '../../placetobook/placeparking';
//import { DispoParking } from '../../dispotobook/dispoparking';

@Component({
  selector: 'page-place-info-pop',
  templateUrl: 'place-info-pop.html'
})
export class PlaceInfoPopPage {
  private queryObs: FirebaseListObservable<any>
  //private queryObs: FirebaseListObservable<DispoParking>;
  private uidSubject: Subject<any>;
  private queryUserObs: FirebaseListObservable<any>
  private uidSubjectUser: Subject<any>;
  private succs:any;
  private toastMsg: ToastMsg;

  private uidAuth: string;
  private myForm:any;
  private place:any;  
  private dispo:any; 
  private plaqueMin: string;
  private user:any;
  
  constructor(private navCtrl: NavController,
              private navparams: NavParams,
              private viewCtrl: ViewController,
              private fireSVC: FireService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      this.place = this.navparams.get("place");
      console.log("PlaceInfoPopPage place.userKey: ", this.place.userKey);  // != uidAuth

      this.dispo = this.navparams.get("dispo");
      console.log("PlaceInfoPopPage dispo.userKey: ", this.dispo.userKey);  // != uidAuth
     
      this.uidAuth = this.navparams.get("uid");
      console.log("PlaceInfoPopPage dispo.userKey: ", this.uidAuth);

      this.user = new User(); 
      this.plaqueMin = this.dispo.resNoplaque;   
      //myDate: String = new Date().toISOString();   utile ??
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      if (this.fireSVC.authenticated && this.uidAuth)  { 
          this.uidSubject = new Subject();
          this.queryObs = fireSVC.getQueryDispo(this.uidAuth,  this.uidSubjectUser );
          this.uidSubjectUser = new Subject();
          this.queryUserObs = this.fireSVC.getQueryUser(this.uidAuth,  this.uidSubjectUser );

          //recherche du user correspondant
          this.getTabUsers();

          // pas de subscribe !
          //if (this.queryObs) {
          //    this.queryObs
          //    .subscribe (itms => { 
          //        if (itms)
          //          this.dispo = itms;
          //    }) 
          // }

          // if (this.uidAuth)    // inutile
          //    this.uidSubject.next(this.uidAuth)
      }  
  }  //end Cstr 

  ngOnInit() {
      this.myForm = new FormGroup({
           plaqueMin: new FormControl('', Validators.required),  // [ Validators.required, validateEmail]) plusieurs validateur
       });
  }

  onSubmit(): void {
    // console.log(this.myForm.value, "inval form: ", this.myForm.valid);  
    // event.preventDefault(); //??
  }

  // Stockage de toutes les users  
  getTabUsers () {    
   //   this.uidSubjectUser = new Subject();
   //   this.queryUserObs = this.fireSVC.getQueryUser(this.uidAuth,  this.uidSubjectUser );

      if (this.queryUserObs) {     
          this.queryUserObs   //.toPromise().then ( places =>{
         // .debounceTime(1000)
            .distinctUntilChanged()
            .map(res =>{         
                    let filter= []
                    res.forEach( resx => {
                     // console.log ("userKey: ", resx.userKey)         
                      let obj = (resx.userKey == this.uidAuth) ? resx: null;            
                      if (obj)
                          filter.push (obj) ;              
                    }) 
                    //console.log("filter: ", filter)
                    return filter        
             })
          //  .map(user => { console.log("userkey:",user.userKey); return (user.userKey == this.uidAuth) ? user:null })
            .take(1).subscribe( user => {  
                //console.log("completeAddMarker subscribe places", places)
                this.user = user[0];  
                console.log("--> user:", this.user);
          }) 

          if (this.uidAuth) {
             this.uidSubjectUser.next(null);  //on veut toutes les users
          } 
       }  //end if 
   }   // end getTabPlaces


  placeReserve(){
     console.log("authenticated key: ", this.fireSVC.authenticated) 
     if (this.fireSVC.authenticated && this.uidAuth)  { 
       console.log("placeInfopop update authUID: ", this.uidAuth);

       if (this.myForm.valid && this.plaqueMin != ""){
          if (this.ctrlPlaqueOk(this.plaqueMin)) {
         
            //affectation de tous les champs
            let item = this.updateField (this.plaqueMin)  
            console.log("placeInfopop item:", item)
       //     if (this.fireKey) {    //fireKey est null -> que ajout pour l'instant 
                console.log("placeInfopop update Dispo");
                // item UPDATE
                this.succs = this.queryObs.update(this.dispo.$key, item);   

            this.succs  //promise
            .then(_ => { 
                console.log("success update plaqueMin key: ", this.dispo.$key);
                this.toastMsg._presentToast("Réservation effectuée"); 

                // mise a jour de l'object  --> userbookKey est mis a jour ds la DB !!
                this.dispo.resNoplaque = this.plaqueMin;
                console.log("success update appres"); 
                
                setTimeout( this.viewCtrl.dismiss(), 3000);
               // setTimeout(this.navCtrl.setRoot(Routes.getPage(Routes.DISPLAYBOOKING), {uid : this.uidAuth}), 3000);
                // this.myForm.reset();
            }).catch(
                err => console.log(err, 'placeInfopop error in succs promisse!'));
          }  // end if ctrlPlaqueOk 
       } else 
          this.toastMsg._presentToast("Données non sauvegardées (Plaque non saisie)");  // end if this.uid
    } 
  }

  updateField (plaqueMin) { 
    return {
       userKey: this.dispo.userKey,
       placeKey: this.dispo.placeKey,
       dateDebDispo: this.dispo.dateDebDispo,
       dateFinDispo: this.dispo.dateFinDispo, 
       resNoplaque: plaqueMin,
       userbookKey: this.uidAuth
    } 
  }

  ctrlPlaqueOk(plaqueMin) {
      if (this.dispo.resNoplaque == "")
          return true;
      else {
          this.toastMsg._presentToast("Réservation déjà effectuée");
          return false;
      }
  }

  close() {
    this.viewCtrl.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('Hello PlaceInfoPopPage Page');
  }

}
