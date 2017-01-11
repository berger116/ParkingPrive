import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController, ToastController, AlertController } from 'ionic-angular';
import { Map } from '../../components/map/map';
import { Routes } from '../../app/app.routes';
import { FirebaseListObservable} from 'angularfire2';
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
//import { PlaceParking } from './../placetobook/placeparking';
//import { DispoParking } from './../dispotobook/dispoparking';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import 'rxjs/Rx';

@Component({
  selector: 'page-around',
  templateUrl: 'aroundplace.html',
})
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
  private allPlace:any[];

  @ViewChild(Map)
  private map: Map;

  constructor(public navCtrl: NavController,
              public navparams: NavParams,
              public fireSVC: FireService,
              public loadingCtrl: LoadingController,
              public popoverCtrl: PopoverController,
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
     
   } // end Cstr

   ngOnInit() {
      this.map.initMap();

      if (this.fireSVC.authenticated && this.uidAuth && this.dateRech) {
        console.log("Around queryRechDispoObs: ", this.queryRechDispoObs)

        this.getTabPlaces();

        if (this.queryRechDispoObs)
          //on filtre sur les dates corr. à la recherche et en prenant que les places non reservées
          this.queryRechDispoObs
        //  .debounceTime(500)
          .distinctUntilChanged()
          .map(res =>{         
              let filter= []
              res.forEach( resx => {
                console.log ("userKey: ", resx.userKey, " Deb: ", resx.dateDebDispo, this.dateRech,
                              " inside: ", (resx.dateDebDispo <= this.dateRech && resx.dateFinDispo >= this.dateRech));          
                let obj = (resx.dateDebDispo <= this.dateRech && resx.dateFinDispo >= this.dateRech && resx.resNoplaque == "") ? resx: null;

                if (obj)
                    filter.push (obj) ;              
              }) 
              //console.log("filter: ", filter)
              return filter        
          })
          .take(1).subscribe( disp => {
                console.log("Success Response", disp);
                this.dispo = disp;

                console.log("dispo.length:", this.dispo.length )
                if ( this.dispo.length > 0)
                    for (let i=0; i < this.dispo.length; i++) { 
                        //console.log(" ionViewDidEnter dsp: ", this.dispo[i])
                        this.completeAddMarker(this.dispo[i]);
                    } // end for
                else {
                      this.toastMsg._presentToast("Aucune place trouvée pour votre recherche"); 
                      console.log("Aucune place trouvée pour votre recherche");     
                }    
            }),
            (err =>{ 
                console.log("aroundPlace subscribe erreur: ", err)
            }); 

            if (this.uidAuth)
                this.uidSubjectRechDispo.next(null); //on prend les x dernieres dispos
     } // end if

        if (this.loader)
            this.hideLoading();
   }

   // Stockage de toutes les places de parking  
   getTabPlaces () { 
      if (this.queryObs) {     
          this.queryObs   //.toPromise().then ( places =>{
         // .debounceTime(1000)
            .distinctUntilChanged()
            .subscribe( places => {
                //console.log("completeAddMarker subscribe places", places)
                this.allPlace = places; 
          }) 

          if (this.uidAuth) {
             this.uidSubject.next(null);  //on veut toutes les places
          } 
       }  // end if
   }   // end getTabPlaces

   completeAddMarker (dispo) { 
       this.allPlace.forEach( plc => {  //map ?
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
      // if(this.dispo[this.index]) {
 //      if (this.index < this.dispo.length) {
 //          console.log("---- > dsp.", this.dispo[this.index],"dispo.length", this.dispo.length ) 
 //          this.completeAddMarker(this.dispo[this.index]);
 //      }   else console.log ("in else index: ", this.index) //this.index=0;
   }


  // public ngOnDestroy(){   //ne marche pas...n'est pas invoqué 
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
     //tmp  this.navCtrl.setRoot(Routes.getPage(Routes.RECHERCHE), {uid : this.uidAuth, dateRech : this.dateRech}); 
     this.navCtrl.pop()
  }

}
