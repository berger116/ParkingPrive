import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Validators,  FormGroup, FormControlName, FormControl } from '@angular/forms';
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
  private loader:any;

  private uidAuth: string;
  private placeKey: string;
  private fireKey:string;
 
  // dispos:Array<FirebaseListObservable<DispoParking>>;
  private dispos:Array<DispoParking> = [];
  private toastMsg: ToastMsg;
  private myForm:any;
  private newDebDispo:any;
  private newFinDispo:any;

  constructor(private navCtrl: NavController,
              private navparams: NavParams,
              private af: AngularFire,
              private fireSVC: FireService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
        content: "Chargement..."
      });
      this.loader.present();

      this.uidAuth = this.navparams.get("uid");
      this.placeKey = this.navparams.get("placeKey"); //clé secondaire 
      console.log("Dispotobook Cstr UID: ", this.uidAuth, " placeKey: ", this.placeKey);

      //.subscribe( item => { item.filter(.userKey == this.uid}) //.filter(item => { return item[0].userKey == this.uid })    
      //tmp  this.dispos = new DispoParking();    
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      if (this.fireSVC.authenticated && this.uidAuth)  { 
          this.uidSubject = new Subject();
          this.queryObs = fireSVC.getQueryDispo(this.uidAuth,  this.uidSubject );

          console.log("Dispotobook queryObs: ", this.queryObs," Null: ", this.queryObs==null )
          if (this.queryObs) {
              this.queryObs.subscribe (itms => { 
                if (itms)
                  this.dispos = itms;
              })

          //   let max= 0;
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

          //  }); 
        // })
          }

          if (this.uidAuth)
              this.uidSubject.next(this.uidAuth)
      }
   }

   ngOnInit() {
      console.log("Dispotobook OnInit queryObs: ", this.queryObs)
    
      this.myForm = new FormGroup({
           dateDebut: new FormControl('', Validators.required),  // [ Validators.required, Validators.minLength(10)]) si plusieurs validateur
           dateFin : new FormControl('', Validators.required),       
      });

      if (this.loader)
          this.hideLoading();
   }

   onSubmit(): void {
    //tmp console.log(this.myForm.value, "inval form: ", this.myForm.valid);  
     event.preventDefault(); //??
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

   insertDispo() {   
     console.log("authenticated key: ", this.fireSVC.authenticated) 
     if (this.fireSVC.authenticated && this.uidAuth)  {  
       console.log("Dispotobook update authUID: ", this.uidAuth);

       if (this.myForm.valid ){
          if (this.ctrlDateOk(this.newDebDispo, this.newFinDispo)) {
            //this.fireKey = null;  //pour ajouter un nouvel enregistrement 
            //console.log("fireKey: " + this.fireKey)
      
            //affectation de tous les champs
            let item = this.updateField (this.newDebDispo, this.newFinDispo)  
            console.log("item:", item)
            if (this.fireKey) {    //fireKey est null -> que ajout pour l'instant 
                console.log("update Dispo");
                // item UPDATE
                this.succs = this.queryObs.update(this.fireKey, item); 
            } else { 
                console.log("insert Dispo");
                //item INSERT
                this.succs = this.queryObs.push(item);
            }

            this.succs  //promise
            .then(_ => { 
              console.log("success insert key: ",  this.fireKey)
              this.toastMsg._presentToast("Données sauvegardées"); 
              this.myForm.reset();
          
            }).catch(
              err => console.log(err, 'Dispotobook error in succs promisse!'));
          }  // end if CtrlDateOk 
       } else 
             this.toastMsg._presentToast("Données non sauvegardées (incomplètes)");  // end if this.uid
    } 
  }

  updateField (dateDeb, dateFin) { //(uid, dispo){
    //dateDeb = new Date(dateDeb).toISOString();
    //dateFin = new Date(dateFin).toISOString();
    return {
       userKey: this.uidAuth,
       placeKey: this.placeKey,
       dateDebDispo: dateDeb,
       dateFinDispo: dateFin, 
       resNoplaque: ""  
    }
  }

  ctrlDateOk(dateDeb, dateFin) {
      if (dateDeb < dateFin) {
          return true;
      } else {
          this.toastMsg._presentToast("Date de début supérieur ou égal à date de fin");
          return false;
      }
  }

  dateRefresh2() {
     // console.log("refresh");
      this.newDebDispo = "";
      this.newFinDispo = "";
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

  private hideLoading(){
       this.loader.dismiss();
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
   // this.navCtrl.last()   // marche pas
   // this.navCtrl.push( this.navCtrl.last())
   //  console.log("previous", this.navCtrl.push( this.navCtrl.last())) // getPrevious())

    this.navCtrl.pop() 
   //tmp  this.navCtrl.setRoot(Routes.getPage(Routes.PLACETOBOOK), {uid : this.uidAuth}); 
  }
  
}
