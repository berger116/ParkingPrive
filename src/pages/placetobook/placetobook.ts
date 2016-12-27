import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';  //AuthProviders, AuthMethods
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { Routes } from '../../app/app.routes';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import { } from "@types/google-maps"; // ??
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { PlaceParking } from './placeparking';

//import {Observable} from 'rxjs/Observable';
//import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

/*
  Generated class for the Addplaceparking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-placetobook',
  templateUrl: 'placetobook.html'
})
export class PlacetobookPage { //implements IPlaceParking {
  queryObs: FirebaseListObservable<any>;
  //items: Observable<any>; //FirebaseListObservable<any>;
  uidSubject: Subject<any>;
  scsUpd:any;

//champ placetobook
  uid: string;
  fireKey:string;
  //userKey:string
  //adresse: string;
  //ville: string;
  //noPostal: string;
  //latitude: string;
  //longitude: string;
  place: PlaceParking;

  geocoder: google.maps.Geocoder;
 // geocoderOptions = {
 //	    'address' : 'Bois de la Chapelle 71, 1213 Onex',
 //	    'region' : 'CH'
 //	}

  @ViewChild(ToastMsg)
  private toastMsg: ToastMsg;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public af: AngularFire,
              public fireSVC: FireService,
              private toastCtrl: ToastController) {
     //this.items = af.database.list('/items', { preserveSnapshot: true });
     //this.items.subscribe(snapshots => {
       // snapshots.forEach(snapshot => {
        //console.log("snap key:" + snapshot.key)
        //console.log("snap val:" + snapshot.val().name)
      // });
     //});
     //// this.item.set({ size: 'name 4'});  a eviter

    this.uid = this.navparams.get("uid") // this.getUserUID ()
    console.log("placetobook UID: ", this.uid);

    //const promise = af.database.list('/items').remove();   //code utile
    //promise
    //  .then(_ => console.log('success'))
    //  .catch(err => console.log(err, 'You do not have access!'));

    //.subscribe( item => { item.filter(.userKey == this.uid}) //.filter(item => { return item[0].userKey == this.uid })    //.$ref // '/dispo'
    this.place = new PlaceParking();

    this.uidSubject = new Subject();
    this.queryObs = fireSVC.getQueryPlace(this.uid,  this.uidSubject );
   
    console.log("placetobook queryObs: ", this.queryObs)
    if (this.queryObs)
      this.queryObs.subscribe (itm => { 
          if (itm[0]) {
            //console.log("itm: ", itm[0].$key)
            this.fireKey = itm[0].$key
            //this.fireKey =  "-KZ7adwUf4BUQXKGsZ97"    //mis en dure  !!!! 

            this.place.userKey = itm[0].userkey 
            this.place.adresse = itm[0].adresse 
            this.place.ville = itm[0].ville
            this.place.noPostal= itm[0].noPostal
            this.place.latitude= itm[0].latitude
            this.place.longitude= itm[0].longitude
          }
      }); 

     if (this.uid)
         this.uidSubject.next(this.uid)

     //.subscribe(itm => { console.log(itm)} );

     //this.items.map( item => { item.userKey == this.uid })
     //?? console.log("MARCHE filter: " ,this.queryObs.filter( item => { return item.userKey == this.uid }))

     // this.items.subscribe( itm => {
     // this.adresse = this.items[0].adresse;
     // this.ville = this.items.ville;
     // this.noPostal =this.items.noPostal;
     // })
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
 
  placeUpdate() { 
    //console.log("authenticated key: ", this.fireSVC.authenticated, this.fireKey)
    if (this.fireSVC.authenticated)
    {  
          //let authObj = this.authSVC.getAuthObj();
         // this.uid = this.getUserUID ();
         console.log(" placetobook authUID: ", this.uid);

         if (this.uid){
            if (this.uid != this.place.userKey) console.log("Placetobook userid error !!!!",this.uid ," / ",this.place.userKey)

            // this.fireKey = null;  //pour ajouter un nouvel enregistrement 
            //console.log("fireKey: " + this.fireKey)
            if (this.fireKey) {  // item update
                console.log("update test");
                this.scsUpd = this.queryObs.update(this.fireKey, { // this.$key
                userKey: this.uid,

                adresse: this.place.adresse, 
                ville: this.place.ville,
                noPostal: this.place.noPostal,
                latitude: this.place.latitude,
                longitude: this.place.longitude,
              });
            } else {  //item insert
              this.scsUpd = this.queryObs.push({ 
                  userKey: this.uid,

                  adresse: this.place.adresse, 
                  ville: this.place.ville,
                  noPostal: this.place.noPostal,
                  latitude: this.place.latitude,
                  longitude: this.place.longitude,
                });
            }
          
            this.scsUpd  //promisse
            .then(_ => { 
                console.log("success insert/update key: ",  this.fireKey)
                // this.toastMsg.presentToast();  NE MARCHE PAS !!!
                this.presentToast("Données sauvegardées")   //Element was added/modified successfully
            })
            .catch(err => console.log(err, 'You do not have access!'));
        } // end if this.uid
    } 
  }

  deleteItem(key: string) { 
  //  this.items.remove(key); 
   // this.items.remove(); //deleteEverything()
  }

  ManageDispo() {
     this.navCtrl.setRoot(Routes.getPage(Routes.DISPOTOBOOK));
  }

  ionViewDidLoad() {
     console.log("DidLoad authUID: ", this.uid);
    
     //this.uid = this.getUserUID ();
     //if (this.uid){
       // this.items.map( item => { item.userKey == this.uid })
       // console.log("apres", this.items)
     //}
    console.log('Hello AddplaceparkingPage Page');
  }

  getGeocode() {
    // let latlng = { lat: this.place.latitude, lng: this.place.longitude };
    // console.log("latlng", latlng);
    let adrGeocode = this.place.adresse + " " +  this.place.noPostal + " " +  this.place.ville;
    let geocodeAdresseOpt = {
	    'address' : adrGeocode,   
	    'region' : 'CH'
	  }

    this.geocoder = new google.maps.Geocoder;
    this.geocoder.geocode( geocodeAdresseOpt, (results, status) => {
      if( status == google.maps.GeocoderStatus.OK ) {
        console.log("geocode result: ", results[0].geometry.location.lat());
        this.place.latitude = results[0].geometry.location.lat(); //.toString();
        this.place.longitude = results[0].geometry.location.lng(); //.toString();
        this.presentToast("points GPS codés selon l'adresse fournie");
      }
      else  this.presentToast("Adresse non decodée");
    });
    
   // this.geocoder.geocode( this.geocoderOptions, this.geocodingResult );  // perte de contexte ?
  }

  geocodingResult(results, status)
	{
	  // Si la recherche a fonctionné
	  if( status == google.maps.GeocoderStatus.OK ) {
      console.log("geocode result: ", results[0].geometry.location.lat());
      console.log("place.latitude: ", this.place.latitude);
      this.place.latitude = results[0].geometry.location.lat().toString();
      this.place.longitude = results[0].geometry.location.lng().toString();
    }
  }

  //Affichage message de confirmation
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg, //'Element was added/modified successfully',
      duration: 3000,
      position: 'top',
    //  color: 'red'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


   // ionViewCanLeave(): boolean{   //code utile ??
   // here we can either return true or false
   // depending on if we want to leave this view
   //if(isValid(randomValue)){
   //   return true;
   // } else {
   //   return false;
   // }
  //}

}
