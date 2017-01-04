import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators,  FormGroup, FormControlName, FormControl } from '@angular/forms';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2'; 
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { Routes } from '../../app/app.routes';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import { DatePicker } from 'ionic-native';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';

import { DispoParking } from './dispoparking';

//import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

/*
  Generated class for the Addplaceparking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-placetobook',
  templateUrl: 'dispotobook.html'
})
export class DispotobookPage implements OnInit { 
  private queryObs: FirebaseListObservable<any>
  //private queryObs: FirebaseListObservable<DispoParking>;
  private uidSubject: Subject<any>;
  private succs:any;

  //champ placetobook
  private uidAuth: string;
  private placeKey: string;
  private fireKey:string;
 
  //// dispos: any; // DispoParking;
  // dispos:Array<FirebaseListObservable<DispoParking>>;
  private dispos:Array<DispoParking> = [];
  private toastMsg: ToastMsg;
  private myForm:any;
  private newDebDispo:any;
  private newFinDispo:any;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public af: AngularFire,
              public fireSVC: FireService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      this.uidAuth = this.navparams.get("uid");
      this.placeKey = this.navparams.get("placeKey"); //clé secondaire 
      console.log("Dispotobook Cstr UID: ", this.uidAuth, " placeKey: ", this.placeKey);

      //.subscribe( item => { item.filter(.userKey == this.uid}) //.filter(item => { return item[0].userKey == this.uid })    
      //tmp  this.dispos = new DispoParking();
     
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);
      this.uidSubject = new Subject();
      this.queryObs = fireSVC.getQueryDispo(this.uidAuth,  this.uidSubject );

      //myDate: String = new Date().toISOString();   utile ??
      console.log("XXX Dispotobook queryObs: ", this.queryObs," Null: ", this.queryObs==null )
      if (this.queryObs) {
          this.queryObs.subscribe (itms => { 
            if (itms)
               this.dispos = itms // as Array<DispoParking>;
          })

         //itms.forEach( itm => {
         //      console.log("XXXX itm.dateDebDispo: ", itm.dateDebDispo)   
         // })

          let max= 0;
       //   this.queryObs   //.subscribe (itms => itms.json()) 
       //   .reduce((previous, current) => {
       //      console.log("XXX math:", previous, current) // previous.dateDebDispo > current.dateDebDispo);
       //      console.log("XXX math:", previous[0].dateDebDispo, current[0].dateDebDispo, previous[0].dateDebDispo > current[0].dateDebDispo);
             //return current.dateDebDispo; // Math.max(previous.dateDebDispo, current.dateDebDispo);   //current;
       //      return (previous.dateDebDispo > current.dateDebDispo) ? previous: current;
       //   }).subscribe (itms => { 
       //      if (itms)
       //        console.log("if max:", itms ) // max = itms;
       //      else
       //        console.log("else max:", itms ) // max = 50;
    
              // console.log("max:", max )
              //    this.dispos.forEach( itm => {
              //       console.log("dispos: ", itm.dateDebDispo)
              //    })

      //  }); 
     // })
      }

      if (this.uidAuth)
          this.uidSubject.next(this.uidAuth)

 //  this.queryObs.subscribe( itms => {
    //      itms.forEach( itm => {
    //      console.log("itm.latitude: ", itm.latitude)   
        // let mark = this.map.addMarker(this.myLatLng.lat, this.myLatLng.lng);
       // this.addMarkerlistener(marker);
    //      })
    //  })
 
      //this.items.map( item => { item.userKey == this.uid })
      //?? console.log("MARCHE filter: " ,this.queryObs.filter( item => { return item.userKey == this.uid }))
   }

   ngOnInit() {
      console.log("Dispotobook OnInit queryObs: ", this.queryObs)
    
      this.myForm = new FormGroup({
           dateDebut: new FormControl('', Validators.required),   // [ Validators.required, validateEmail]) plusieur validateur
           dateFin : new FormControl('', Validators.required), // , Validators.minLength(10)),      
       });
   }

   onSubmit(): void {
    //tmp console.log(this.myForm.value, "inval dateDispo: ", this.myForm.controls.dateDispo.invalid );  // {first: 'Nancy', last: 'Drew'}
    //tmp console.log(this.myForm.value, "inval form: ", this.myForm.valid);  
    // event.preventDefault(); //??
   }

   filterBy(userKey: any) {
     this.uidSubject.next(userKey); 
   }

   deleteDispo(key){
     console.log("delete Key:", key);
     this.queryObs.remove(key) 
     .then(_=> { this.toastMsg._presentToast("Données effacées")})
     .catch(err => { this.toastMsg._presentToast('error opération non effectuée' + err)})
     //  event.preventDefault(); 
   }

   dateRefresh() {
      console.log("refresh");
      this.newDebDispo = "";
      this.newFinDispo = "";
   }

   insertDispo() {   //dateDebut, dateFin) { 
     console.log("authenticated key: ", this.fireSVC.authenticated) //," Deb: ", dateDebut, " Fin: ", dateFin)
     if (this.fireSVC.authenticated && this.uidAuth)  {  
       console.log("Dispotobook update authUID: ", this.uidAuth);

       if (this.myForm.valid){
          //this.fireKey = null;  //pour ajouter un nouvel enregistrement 
          //console.log("fireKey: " + this.fireKey)
     
          //affectation de tous les champs
          let item = this.updateField (this.newDebDispo, this.newFinDispo) //(dateDebut, dateFin) 
          console.log("item:", item)
          if (this.fireKey) {  // item UPDATE
              console.log("update Dispo");
              this.succs = this.queryObs.update(this.fireKey, item); 
          } else {  //item INSERT
              console.log("insert Dispo");
              this.succs = this.queryObs.push(item);
          }

          this.succs  //promise
          .then(_ => { 
             console.log("success insert key: ",  this.fireKey)
             this.toastMsg._presentToast("Données sauvegardées"); 
             this.newDebDispo = "";
             this.newFinDispo = "";
             //this.presentToast("Données sauvegardées")  
          }).catch(
             err => console.log(err, 'Dispotobook error in succs promisse!'));
       } else 
             this.toastMsg._presentToast("Données non sauvegardées (incomplètes)");  // end if this.uid
    } 
  }

  updateField (dateDeb, dateFin) { //(uid, dispo){
    return {
       userKey: this.uidAuth,
       placeKey: this.placeKey,
       dateDebDispo: dateDeb,
       dateFinDispo: dateFin, 
       resNoplaque: ""  //this.dispos.resNoplaque,
    }
  }

  datePick(ev) {
      console.log("date picker !!! event:", ev);
      //search(searchEvent) {  code utile  ??
      //let term = searchEvent.target.value

      DatePicker.show({
         date: new Date(),
         mode: 'date'
       }).then(
         date => console.log('Got date: ', date),
         err => console.log('Error occurred while getting date: ', err)
      );
     //ev.preventDefault();   //n'affiche plus le champ saisi avec le datePick
  }

 // ionViewDidLoad() {
 //   console.log("DidLoad authUID: ", this.uidAuth);
 // }

  public ionViewCanLeave() {   //code utile ??
    console.log("Dispotobook CanLeave");
   //  console.log("previous", this.navCtrl.last())
   // here we can either return true or false
   // depending on if we want to leave this view
    //if(isValid(randomValue)){
    //    return true;
    //  } else {
        return true;
    //  }
  }

  onClickBack(){
   // this.navCtrl.last()   // marche pas
   // this.navCtrl.push( this.navCtrl.last())
        //  console.log("previous", this.navCtrl.push( this.navCtrl.last())) // getPrevious())

    this.navCtrl.setRoot(Routes.getPage(Routes.PLACETOBOOK), {uid : this.uidAuth, placeKey: this.fireKey});
  }
  
}
