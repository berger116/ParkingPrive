import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, App, LoadingController, PopoverController, ModalController, ToastController, AlertController } from 'ionic-angular';
import { Validators,  FormGroup, FormControl } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';  //AuthProviders, AuthMethods
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { Routes } from '../../app/app.routes';
import { Camera } from 'ionic-native';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import { Map } from '../../components/map/map';
import { } from "@types/google-maps"; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { PlaceParking } from './placeparking';
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
  private queryObs: FirebaseListObservable<any>;
  private uidSubject: Subject<any>;
  private succs:any;
  private loader:any;

  private uidAuth: string;
  private fireKey:string;

  private place: PlaceParking;  //new PlaceParking()  //une seul place
  private geocoder: google.maps.Geocoder;
  private toastMsg: ToastMsg;
  private myForm:any;
  public base64Image: string;


  @ViewChild(Map)
  private map: Map;

  constructor(private navCtrl: NavController,
              private navparams: NavParams,
              private af: AngularFire,
              private fireSVC: FireService,
              private popoverCtrl: PopoverController,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private appCtrl: App,
              private viewCtrl: ViewController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      //this.items = af.database.list('/items', { preserveSnapshot: true })

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
        content: "Chargement..."
      });
      this.loader.present();

      this.uidAuth = this.navparams.get("uid") 
      console.log("placetobook Cstr UID: ", this.uidAuth);

      this.place = new PlaceParking();     
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      if (this.fireSVC.authenticated && this.uidAuth)  { 
          this.uidSubject = new Subject();
          this.queryObs = fireSVC.getQueryPlace(this.uidAuth, this.uidSubject);

          console.log("placetobook queryObs: ", this.queryObs)
          if (this.queryObs)
             this.queryObs.subscribe (itm => {
                if (itm[0]) {
                  console.log("itm: ", itm[0].$key)
                  this.fireKey = itm[0].$key   // clé de l'enregistrement
                  this.place = itm[0]
                //  this.place.userKey = itm[0].userkey 
                }
             }); 
             //.subscribe( item => { item.filter(.userKey == this.uid}) //.filter(item => { return item[0].userKey == this.uid })  

          if (this.uidAuth)
              this.uidSubject.next(this.uidAuth)      
      } // end if
  }

  ngOnInit() {
     //this.uidAuth = this.navparams.get("uid") 
      console.log("placetobook OnInit UID: ", this.uidAuth);
      
      this.myForm = new FormGroup({
        adresse: new FormControl('', Validators.required),  // [ Validators.required, validateEmail]) plusieurs validateur
        ville : new FormControl('', Validators.required),   // , Validators.minLength(10)),
        noPostal : new FormControl('', Validators.required), 
        latitude : new FormControl('', Validators.required), 
        longitude : new FormControl('', Validators.required),
        prixPlace : new FormControl('', Validators.required),
        noPlace : new FormControl('', Validators.required),                
      });

      if (this.loader)
          this.hideLoading();

    //this.eNumberForm = this._formBuilder.group({   //formBuilder ne fonctionne pas avec ngModel
  }

  onSubmit(): void {
   //console.log(this.myForm.value, "inval adresse: ", this.myForm.controls.adresse.invalid );  
    console.log(this.myForm.value, "inval postal: ", this.myForm.valid);  
    event.preventDefault(); //??

    // get adresse(): any { return this.myForm.get('adresse'); }
  }

  //https://github.com/angular/angularfire2/issues/104
  // @Inject(FirebaseRef) private ref:Firebase

  //  let subscription = this.af.database.object('someLocation').subscribe(data=> {
    //do something with your data
  //})
  //Which is essentially the same as:
  // firebase.database().ref('someLocation').on('value', snapshot=>{
    //do something with your data
  //})

  filterBy(userKey: any) {
    this.uidSubject.next(userKey); 
  }
 
  placeUpdate() { 
    //console.log("authenticated key: ", this.fireSVC.authenticated, this.fireKey)
    if (this.fireSVC.authenticated && this.uidAuth) {

       if (this.myForm.valid){
          if (this.uidAuth != this.place.userKey && this.place.userKey != null) 
             console.log("Placetobook userid error !!!!",this.uidAuth ," / ",this.place.userKey)

          //this.fireKey = null;  //pour ajouter un nouvel enregistrement 
          //console.log("fireKey: " + this.fireKey)

          //affectation de tous les champs
          let item = this.updateField () 
      
          if (this.fireKey) { 
              console.log("update test");
              // item UPDATE
              this.succs = this.queryObs.update(this.fireKey, item); 
          } else  
              //item INSERT
              this.succs = this.queryObs.push(item);

          this.succs  //promisse
          .then(_ => { 
             console.log("success insert/update key: ",  this.fireKey)
             this.toastMsg._presentToast("Données sauvegardées");  
             //this.presentToast("Données sauvegardées")  
          }).catch(
             err => console.log(err, 'placetobook error in succs promisse!'));
      } else 
          this.toastMsg._presentToast("Données non sauvegardées (incomplètes)"); 
    }  // end if this.myForm.valid
  }

  updateField () { 
     return {
       userKey: this.uidAuth,
       adresse: this.place.adresse, 
       ville: this.place.ville,
       noPostal: this.place.noPostal,
       latitude: this.place.latitude,
       longitude: this.place.longitude,
       prixPlace: this.place.prixPlace,
       noPlace: this.place.noPlace
      }
  }

  //Gestion des disponibilités
  manageDispo() {
    if (this.fireKey) { //clé de l'enregistrement place -> doit exister pour saisir des dispo

       this.appCtrl.getRootNav().push(Routes.getPage(Routes.DISPOTOBOOK), {uid : this.uidAuth, placeKey: this.fireKey});
       //this.navCtrl.setRoot(Routes.getPage(Routes.DISPOTOBOOK), {uid : this.uidAuth, placeKey: this.fireKey});
  } else
       this.toastMsg._presentToast("vous devez avoir une place enregistrée"); 
  }

  getGeocode() {
    let adrGeocode = this.place.adresse + " " +  this.place.noPostal + " " +  this.place.ville;
    let geocodeAdresseOpt = {
	    'address' : adrGeocode,   
	    'region' : 'CH'
	  }

    this.geocoder = new google.maps.Geocoder;
    this.geocoder.geocode( geocodeAdresseOpt, (results, status) => {
      if( status == google.maps.GeocoderStatus.OK ) {
        //console.log("geocode result: ", results[0].geometry.location.lat());
        this.place.latitude = results[0].geometry.location.lat(); 
        this.place.longitude = results[0].geometry.location.lng(); 
        console.log("geocode result: ", results[0].geometry.location.lat()," place.lat: ", this.place.latitude);

        // show tha map
        let myLatLng = { lat: this.place.latitude, lng: this.place.longitude };

        // this.navCtrl.setRoot(Routes.getPage(Routes.LOCATEPLACETOBOOK), {uid : this.uidAuth, latLng : myLatLng, map: this.map});  //XXXXXXXXX carte s'affiche
        let popover = this.popoverCtrl.create(Routes.getPage(Routes.LOCATEPLACETOBOOK), {uid: this.uidAuth, latLng: myLatLng, map: this.map}); 
        popover.present(); //{ param: myEvent });

        this.toastMsg._presentToast("Points GPS codés selon l'adresse fournie");
      }
      else
        // this.toastMsg._presentToast("Adresse non decodée");
         this.toastMsg._showAlert("Adresse non decodée");
    });
    
   // this.geocoder.geocode( this.geocoderOptions, this.geocodingResult );  // perte de contexte !!
  }

  getPicture(){
      Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 200,
        targetHeight: 200
      }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (error) => {
        console.log("error ",error)
      });
  }

  ionViewDidLoad() {
     console.log("Placetobook DidLoad authUID: ", this.uidAuth)
  }

  public ionViewCanLeave() {   //code utile ??
    console.log("Placetobook CanLeave");  
   // here we can either return true or false
   // depending on if we want to leave this view
    //if(isValid(randomValue)){
        return true;
  }

  private hideLoading(){
       this.loader.dismiss();
  }

  onClickBack(){
    // this.navCtrl.pop()
  }

}
