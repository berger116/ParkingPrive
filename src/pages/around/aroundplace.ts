import { Component, ViewChild, OnDestroy } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController, ModalController,  ToastController, AlertController } from 'ionic-angular';
import { Map } from '../../components/map/map';
import { Routes } from '../../app/app.routes';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
//import { PlaceParking } from './../placetobook/placeparking';
//import { DispoParking } from './../dispotobook/dispoparking';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import 'rxjs/Rx';

//import {
// GoogleMap,
// GoogleMapsEvent,
// GoogleMapsLatLng,
// CameraPosition,
// GoogleMapsMarkerOptions,
// GoogleMapsMarker } from 'ionic-native';
/*
  Generated class for the Around page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-around',
  templateUrl: 'aroundplace.html',
})
//@Directive({
//    selector: '[destroyDirective]'
//})

export class AroundplacePage {  //implements OnDestroy
  private uidSubject: Subject<any>;
  private queryObs: FirebaseListObservable<any>;
  private uidSubjectRechDispo: Subject<any>;
  private queryRechDispoObs: FirebaseListObservable<any>;  // <DispoParking>;

  private uidAuth: string;
  private dateRech: string;
  private loader:any;
  private toastMsg: ToastMsg;
  private dispo:any[];
  //private place:any[];
  private placeS:any[];

  //private markers:any[] =[];
  //private index = 0;
  //place = new PlaceParking();

  @ViewChild(Map)
  private map: Map;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public fireSVC: FireService,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
              public modalCtrl: ModalController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {

      //affichage du spinner
      this.loader = this.loadingCtrl.create({
        content: "Chargement..."
      });
      this.loader.present();

      this.uidAuth = this.navparams.get("uid");
      this.dateRech = this.navparams.get("dateRech");
      console.log("AroundplacePage uidAuth: ", this.uidAuth);
      console.log("AroundplacePage DateRech: ", this.dateRech);

      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      this.uidSubject = new Subject();
      this.queryObs = fireSVC.getQueryPlace(this.uidAuth, this.uidSubject);  //   this.uidAuth -> ctrl de l'authentification
      this.uidSubjectRechDispo = new Subject();
      this.queryRechDispoObs = fireSVC.getQueryRechDispo(this.uidAuth, this.uidSubjectRechDispo);
  }

  ionViewDidEnter() {
     this.map.initMap();

     if (this.fireSVC.authenticated && this.uidAuth && this.dateRech) {
     //if (this.queryRechDispoObs && this.uidAuth && this.dateRech) {
        console.log("Around queryRechDispoObs: ", this.queryRechDispoObs)

        if (this.uidAuth)
            this.uidSubjectRechDispo.next(null); //on prend les x dernieres dispos

        this.getTabPlaces();

        if (this.queryRechDispoObs)
          this.queryRechDispoObs
        //  .debounceTime(500)
          .distinctUntilChanged()
          .map(res =>{         
              let filter= []
              res.forEach( resx => {
                console.log ("userKey: ", resx.userKey, " Deb: ", resx.dateDebDispo, this.dateRech,
                              " inside: ", (resx.dateDebDispo <= this.dateRech && resx.dateFinDispo >= this.dateRech));          
                let obj = (resx.dateDebDispo <=this.dateRech && resx.dateFinDispo >= this.dateRech) ? resx: null;
              //  console.log ("userKey: ", resx.userKey, " Deb: ",resx.dateDebDispo,"2017-01-03T06:00:00Z",
              //                " inside: ",  (resx.dateDebDispo <= "2017-01-03T06:00:00Z" && resx.dateFinDispo >= "2017-01-03T06:00:00Z"));          
              //  let obj = (resx.dateDebDispo <= "2017-01-03T06:00:00Z" && resx.dateFinDispo >= "2017-01-03T06:00:00Z") ? resx: null;
                if (obj)
                    filter.push (obj) ;              
              }) 
              //console.log("filter: ", filter)
              return filter        
          })
          .subscribe( disp => {
                console.log("Success Response", disp);
                this.dispo = disp;

                if ( this.dispo.length > 0)
                    for (let i=0; i < this.dispo.length; i++) { 
                        //console.log(" ionViewDidEnter dsp: ", this.dispo[i])
                        this.completeAddMarker(this.dispo[i]);
                    } // end for
                else 
                  this.toastMsg._presentToast("Aucune place trouvée pour votre recherche");   

                // on execute plus en boucle mais l'un à la suite de l'autre
          //      console.log("subscribe index:", this.index, "Dispo.length:",this.dispo.length )
          //      if (this.index < this.dispo.length)
          //          this.completeAddMarker(this.dispo[this.index]);
          //      else {
          //         this.index = 0;
          //         this.markers=[];
          //      }    
                }),
                (err =>{ 
                    console.log("aroundPlace subscribe erreur: ", err)
                });   
     } // end if
     
     if (this.loader)
            this.hideLoading();
   } // end ionViewDidEnter

   // Stockage de toutes les places de parking  
   getTabPlaces () { 
      if (this.queryObs) {     
          this.queryObs   //.toPromise().then ( places =>{
         // .debounceTime(1000)
            .distinctUntilChanged()
            .subscribe( places => {
                //console.log("completeAddMarker subscribe places", places)
                this.placeS = places; 
          }) 

          if (this.uidAuth) {
             this.uidSubject.next(null);
          } 
       }  //end if 
   }   // end completeAddMarker

   completeAddMarker (dispo) { 
       this.placeS.forEach( plc => {  //voir avec un map ???
            if (plc.userKey == dispo.userKey)  {
                let marker = this.map.addMarker(plc.latitude, plc.longitude);  
                this.addMarkerlistener(marker, plc, dispo);
            }
       })
   }

   addMarkerlistener(marker, place, dsp) {
       console.log("In addMarkerlistener dsp: ", dsp);
       console.log( "AroundPlace addlistener: uid: ", this.uidAuth);
       marker.addListener('click', (res => {
        
           let popover = this.popoverCtrl.create(Routes.getPage(Routes.PLACEINFOPOP), {uid : this.uidAuth, place : place, dispo: dsp }); 
           popover.present(); //{ param: myEvent });
       } ));

       // on execute plus en boucle mais l'un à la suite de l'autre
 //      this.index++;
       //console.log("---- > avant dsp.", this.index,"dsp ",this.dispo)
      // if(this.dispo[this.index]) {
 //      if (this.index < this.dispo.length) {
 //          console.log("---- > dsp.", this.dispo[this.index],"dispo.length", this.dispo.length ) 
 //          this.completeAddMarker(this.dispo[this.index]);
 //      }   else console.log ("in else index: ", this.index) //this.index=0;

   }


  //   completeAddMarker (dispo) { 
  //      if (this.queryObs) {
          //(console.log("Around completeAddmarker QueryObs: ", this.queryObs)
  //        console.log("completeAddmarker disp: ", dispo)
      
  //        this.queryObs   //.toPromise().then ( places =>{
         // .debounceTime(1000)
  //        .distinctUntilChanged()
  //        .subscribe( places => {
  //            console.log("completeAddMarker subscribe places", places)
  //            this.place = places;
         
  //            let marker = this.map.addMarker(this.place[0].latitude, this.place[0].longitude);  
              //console.log("marker:", marker);
  //            this.markers.push(marker);
              //console.log( 'completeAddMarker addlistener place: ', this.place[0]);
              //console.log( 'completeAddMarker addlistener disop: ', dispo);
  //            this.addMarkerlistener(marker, this.place[0], dispo);
  //        }) 

  //        if (this.uidAuth) {
  //          console.log("----> dispo.userKey", dispo["userKey"])
  //          this.uidSubject.next(dispo["userKey"]);  //on veut la place correpondant à la dispo en cours
  //        }
   
  //     }  //end if 
  // }   // end completeAddMarker


  // public ngOnDestroy(){
   ////public ionViewCanLeave() {  
   //   console.log("on leave Destroy:", this.index);
   //   this.index = 0;
   //   for (let i=0; i < this.markers.length; i++) {
   //     this.markers[i].removeListerner('click');
   //     this.markers.shift();
   //   }
   //   return true;
   //}

   private hideLoading(){
      this.loader.dismiss();
   }

   onClickBack(){
      this.navCtrl.setRoot(Routes.getPage(Routes.RECHERCHE), {uid : this.uidAuth, dateRech : this.dateRech}); 
    // this.navCtrl.pop()
  }

}
