import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators,  FormGroup, FormControlName, FormControl } from '@angular/forms';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
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
export class PlacetobookPage implements OnInit { 
  queryObs: FirebaseListObservable<any>;
  uidSubject: Subject<any>;
  succs:any;

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
  toastMsg: ToastMsg;
  myForm:any;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public af: AngularFire,
              public fireSVC: FireService,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

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
    this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

    this.uidSubject = new Subject();
    this.queryObs = fireSVC.getQueryPlace(this.uid,  this.uidSubject );
   
    console.log("placetobook queryObs: ", this.queryObs)
    if (this.queryObs)
      this.queryObs.subscribe (itm => { 
          if (itm[0]) {
            //console.log("itm: ", itm[0].$key)
            this.fireKey = itm[0].$key    //this.fireKey =  "-KZ7adwUf4BUQXKGsZ97"    //mis en dure  !!!! 
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

       // // adresse: new FormControlName(this.myForm, [<any>Validators.required, <any>Validators.minLength(5)])
     // });
   
     //this.items.map( item => { item.userKey == this.uid })
     //?? console.log("MARCHE filter: " ,this.queryObs.filter( item => { return item.userKey == this.uid }))
  }

  ngOnInit() {
      console.log("oninit")
      this.myForm = new FormGroup({
        adresse: new FormControl('', Validators.required), // , Validators.minLength(10)),
        ville : new FormControl('', Validators.required), // , Validators.minLength(10)),
        noPostal : new FormControl('', Validators.required), // , Validators.minLength(10)),
        latitude : new FormControl('', Validators.required), // , Validators.minLength(10)),
        longitude : new FormControl('', Validators.required), // , Validators.minLength(10)),
                    // [ Validators.required, validateEmail]) plusieur validateur
      });

    //this.eNumberForm = this._formBuilder.group({
    //  adresse: ['', Validators.required]
    //});
  }

 // get adresse(): any { return this.myForm.get('adresse'); }
 // get ville(): any { return this.myForm.get('ville'); }
 // get noPostal(): any { return this.myForm.get('noPostal'); }
 // get latitude(): any { return this.myForm.get('latitude'); }
 // get longitude(): any { return this.myForm.get('longitude'); }

  onSubmit(): void {
    console.log(this.myForm.value, "inval adresse: ", this.myForm.controls.adresse.invalid );  // {first: 'Nancy', last: 'Drew'}
    console.log(this.myForm.value, "inval postal: ", this.myForm.valid);  
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
    if (this.fireSVC.authenticated && this.uid)  {  
       //console.log(" placetobook authUID: ", this.uid);

       if (this.myForm.valid){
          if (this.uid != this.place.userKey)
             console.log("Placetobook userid error !!!!",this.uid ," / ",this.place.userKey)

          //this.fireKey = null;  //pour ajouter un nouvel enregistrement 
          //console.log("fireKey: " + this.fireKey)

          //affectation des tout les champs
          let item = this.updateField (this.uid, this.place)
          //console.log("item:", item)
          if (this.fireKey) {  // item UPDATE
              console.log("update test");
              this.succs = this.queryObs.update(this.fireKey, item); 

          } else  //item INSERT
              this.succs = this.queryObs.push(item);

          this.succs  //promisse
          .then(_ => { 
             console.log("success insert/update key: ",  this.fireKey)
             this.toastMsg._presentToast("Données sauvegardées");  
             //this.presentToast("Données sauvegardées")  
          })
          .catch(err => console.log(err, 'placetobook error in succs promisse!'));
      } else 
          this.toastMsg._presentToast("Données non sauvegardées (incomplètes)");  // end if this.uid
    } 
  }

  updateField (uid, place){
     return {
       userKey: this.uid,
       adresse: this.place.adresse, 
       ville: this.place.ville,
       noPostal: this.place.noPostal,
       latitude: this.place.latitude,
       longitude: this.place.longitude
      }
  }

  deleteItem(key: string) { 
  //  this.items.remove(key); 
   // this.items.remove(); //deleteEverything()
  }

  ManageDispo() {
     this.navCtrl.setRoot(Routes.getPage(Routes.DISPOTOBOOK));
  }

  private getGeocode() {
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
        //console.log("geocode result: ", results[0].geometry.location.lat());
        this.place.latitude = results[0].geometry.location.lat(); //.toString();
        this.place.longitude = results[0].geometry.location.lng(); //.toString();
        console.log("geocode result: ", results[0].geometry.location.lat()," place.lat: ",  this.place.latitude);

        this.toastMsg._presentToast("Points GPS codés selon l'adresse fournie");
        //this.toastMsg._showAlert( `Points GPS codés selon l'adresse fournie`)
      }
      else
        // this.toastMsg._presentToast("Adresse non decodée");
         this.toastMsg._showAlert("Adresse non decodée");
    });
    
   // this.geocoder.geocode( this.geocoderOptions, this.geocodingResult );  // perte de contexte ?
  }

  //private geocodingResult(results, status)
	//{
	  // Si la recherche a fonctionné
	//  if( status == google.maps.GeocoderStatus.OK ) {
  //    console.log("geocode result: ", results[0].geometry.location.lat());
  //    console.log("place.latitude: ", this.place.latitude);
  //    this.place.latitude = results[0].geometry.location.lat().toString();
  //    this.place.longitude = results[0].geometry.location.lng().toString();
  //  }
  //}

  ionViewDidLoad() {
     console.log("DidLoad authUID: ", this.uid);
    
     //this.uid = this.getUserUID ();
     //if (this.uid){
       // this.items.map( item => { item.userKey == this.uid })
       // console.log("apres", this.items)
     //}
    console.log('Hello AddplaceparkingPage Page');
  }

  ionViewCanLeave():boolean {   //code utile ??
    console.log("CanLeave");
    
   // here we can either return true or false
   // depending on if we want to leave this view
    //if(isValid(randomValue)){
    //    return true;
    //  } else {
        return false;
    //  }
  }

}
