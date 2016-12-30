import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators,  FormGroup, FormControlName, FormControl } from '@angular/forms';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2'; 
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { Routes } from '../../app/app.routes';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import { DatePicker } from 'ionic-native';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

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
  private queryObs: FirebaseListObservable<any>;
  private uidSubject: Subject<any>;
  private succs:any;

  //champ placetobook
  private uid: string;
  private placeKey: string;
  private fireKey:string;
 
 // dispos: any; // DispoParking;
  dispos:Array<DispoParking> = [];
  toastMsg: ToastMsg;
  myForm:any;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public af: AngularFire,
              public fireSVC: FireService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      this.uid = this.navparams.get("uid") 
      this.placeKey = this.navparams.get("placeKey") 
      console.log("Dispotobook Cstr UID: ", this.uid, " placeKey: ", this.placeKey);

      //const promise = af.database.list('/items').remove();   //code utile
      //promise
      //  .then(_ => console.log('success'))
      //  .catch(err => console.log(err, 'You do not have access!'));

      //.subscribe( item => { item.filter(.userKey == this.uid}) //.filter(item => { return item[0].userKey == this.uid })    //.$ref // '/dispo'

     //tmp  this.dispos = new DispoParking();
     
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      this.uidSubject = new Subject();
      this.queryObs = fireSVC.getQueryDispo(this.uid,  this.uidSubject );

      console.log("Dispotobook queryObs: ", this.queryObs," Null: ", this.queryObs==null )
      if (this.queryObs)
          this.queryObs.subscribe (itms => { 
            // console.log("itms: ", itms ==null)
             if (itms)
               this.dispos = itms // as Array<DispoParking>;

             itms.forEach( itm => {
               console.log("itm: ", itm.heureDispo)
             })
             this.dispos.forEach( itm => {
              console.log("dispos: ", itm.placeKey)
             })

         //   if (itms[0]) {
         //     console.log("Dispotobook itm: ", itms[0].$key)
         //     this.fireKey = itms[0].$key    
         //     this.dispos.userKey = itms[0].userkey 
         //     this.dispos.placeKey = itms[0].placeKey 
         //     this.dispos.dateDispo = itms[0].dateDispo 
         //     this.dispos.heureDispo = itms[0].heureDispo
         //     this.dispos.resNoplaque = itms[0].resNoplaque
         //   } else
         //      {
         //        console.log("Dispotobook itm: init ")
         //        this.dispos.userKey = "" 
         //        this.dispos.placeKey = ""
         //        this.dispos.dateDispo = ""
         //        this.dispos.heureDispo = ""
         //        this.dispos.resNoplaque = ""
         //      }
      }); 

      if (this.uid)
          this.uidSubject.next(this.uid)
    
      //this.items.map( item => { item.userKey == this.uid })
      //?? console.log("MARCHE filter: " ,this.queryObs.filter( item => { return item.userKey == this.uid }))
   }

   ngOnInit() {
      console.log("Dispotobook OnInit queryObs: ", this.queryObs)
    
   //tmp   this.myForm = new FormGroup({
   //tmp     dateDispo: new FormControl('', Validators.required),   // [ Validators.required, validateEmail]) plusieur validateur
   //tmp     heureDispo : new FormControl('', Validators.required), // , Validators.minLength(10)),
   //tmp     resNoplaque : new FormControl('', Validators.required), // , Validators.minLength(10)),    
        //adresse: new FormControlName(this.myForm, [<any>Validators.required, <any>Validators.minLength(5)])          
   //tmp   });
   }

 // get adresse(): any { return this.myForm.get('adresse'); }
 // get ville(): any { return this.myForm.get('ville'); }
 // get noPostal(): any { return this.myForm.get('noPostal'); }
 // get latitude(): any { return this.myForm.get('latitude'); }
 // get longitude(): any { return this.myForm.get('longitude'); }

   onSubmit(): void {
    //tmp console.log(this.myForm.value, "inval dateDispo: ", this.myForm.controls.dateDispo.invalid );  // {first: 'Nancy', last: 'Drew'}
    //tmp console.log(this.myForm.value, "inval form: ", this.myForm.valid);  
     event.preventDefault(); //??
   }


  //https://github.com/angular/angularfire2/issues/104
  // @Inject(FirebaseRef) private ref:Firebase

  //  let subscription = this.af.database.object('someLocation').subscribe(data=> {
    ////do something with your data
  //})
  //Which is essentially the same as:
  // firebase.database().ref('someLocation').on('value', snapshot=>{
  ////do something with your data
  //})

   filterBy(userKey: any) {
     this.uidSubject.next(userKey); 
   }
 
   dispoUpdate() { 
    //console.log("authenticated key: ", this.fireSVC.authenticated, this.fireKey)
      if (this.fireSVC.authenticated && this.uid)  {  
        console.log("Dispotobook update authUID: ", this.uid);

        //tmp if (this.myForm.valid){
            //if (this.uid != this.dispo.userKey)
            //    console.log("Placetobook userid error !!!!",this.uid ," / ",this.dispo.userKey)

            //this.fireKey = null;  //pour ajouter un nouvel enregistrement 
            //console.log("fireKey: " + this.fireKey)

            //affectation de tous les champs
      //      let item = this.updateField () //(this.uid, this.dispo)
            //console.log("item:", item)
            if (this.fireKey) {  // item UPDATE
                console.log("update Dispo");
      //          this.succs = this.queryObs.update(this.fireKey, item); 

            } else {  //item INSERT
                console.log("insert Dispo");
      //          this.succs = this.queryObs.push(item);
            }

            this.succs  //promisse
            .then(_ => { 
              console.log("success insert/update key: ",  this.fireKey)
              this.toastMsg._presentToast("Données sauvegardées");  
              //this.presentToast("Données sauvegardées")  
            }).catch(
              err => console.log(err, 'Dispotobook error in succs promisse!'));
      //tmp  } else 
      //tmp      this.toastMsg._presentToast("Données non sauvegardées (incomplètes)");  // end if this.uid
      } 
   }

   insertDispo(date, heure) { 
    //console.log("authenticated key: ", this.fireSVC.authenticated, this.fireKey)
    if (this.fireSVC.authenticated && this.uid)  {  
       console.log("Dispotobook update authUID: ", this.uid);

          //this.fireKey = null;  //pour ajouter un nouvel enregistrement 
          //console.log("fireKey: " + this.fireKey)

          //affectation de tous les champs
          let item = this.updateField (date, heure) //(this.uid, this.dispo)
          //console.log("item:", item)
          if (this.fireKey) {  // item UPDATE
              console.log("update Dispo");
              this.succs = this.queryObs.update(this.fireKey, item); 

          } else {  //item INSERT
              console.log("insert Dispo");
              this.succs = this.queryObs.push(item);
          }

          this.succs  //promisse
          .then(_ => { 
             console.log("success insert key: ",  this.fireKey)
             this.toastMsg._presentToast("Données sauvegardées");  
             //this.presentToast("Données sauvegardées")  
          }).catch(
             err => console.log(err, 'Dispotobook error in succs promisse!'));
    //tmp  } else 
    //tmp      this.toastMsg._presentToast("Données non sauvegardées (incomplètes)");  // end if this.uid
    } 
  }

  updateField (date, heure) { //(uid, dispo){
    return {
       userKey: this.uid,
       placeKey: this.placeKey,
       dateDispo: date, //this.dispos.dateDispo, 
       heureDispo: heure, //this.dispos.heureDispo,
       resNoplaque: ""  //this.dispos.resNoplaque,
    }
  }

  datePick() {
      DatePicker.show({
      date: new Date(),
      mode: 'date'
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  deleteItem(key: string) { 
  //  this.items.remove(key); 
   // this.items.remove(); //deleteEverything()
  }

 // ManageDispo() {
 //    this.navCtrl.setRoot(Routes.getPage(Routes.DISPOTOBOOK));
 // }

  ionViewDidLoad() {
     console.log("DidLoad authUID: ", this.uid);
    
     //this.uid = this.getUserUID ();
     //if (this.uid){
       // this.items.map( item => { item.userKey == this.uid })
       // console.log("apres", this.items)
     //}
    console.log('Hello DispotobookPage');
  }

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
    this.navCtrl.push( this.navCtrl.last())
//    console.log("previous", this.navCtrl.push( this.navCtrl.last())) // getPrevious())
  }
  
}
