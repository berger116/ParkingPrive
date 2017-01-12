import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2'; 
import { FireService } from '../../providers/fireservice';
import { Subject } from 'rxjs/Subject';
import { ToastMsg } from '../../components/toast-msg/toast-msg';
import 'rxjs/add/operator/map';

import { DispoParking } from '../dispotobook/dispoparking';

@Component({
  selector: 'page-displaybooking',
  templateUrl: 'displaybooking.html'
})
export class DisplaybookingPage implements OnInit {
  private queryObsBook: FirebaseListObservable<any>
  //private queryObs: FirebaseListObservable<DispoParking>;
  private uidSubjectBook: Subject<any>;
  private uidSubjectPlace: Subject<any>;
  private queryPlaceObs: FirebaseListObservable<any>;
  private loader:any;

  private uidAuth: string;
 
  private displayBooks:Array<DispoParking> = [];
  //private displayBooks:Array<any> = [];
  private locateBooks:Array<any> = [];
  private toastMsg: ToastMsg;
  private allPlace:any[];
  
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
      console.log("DisplaybookingPage Cstr UID: ", this.uidAuth);

      //tmp  this.dispos = new DispoParking();    
      this.toastMsg = new ToastMsg(toastCtrl, alertCtrl);

      if (this.fireSVC.authenticated && this.uidAuth)  { 
          this.uidSubjectBook = new Subject();
          this.queryObsBook = this.fireSVC.getQueryBookDispo(this.uidAuth,  this.uidSubjectBook );
          this.uidSubjectPlace = new Subject();
          this.queryPlaceObs = this.fireSVC.getQueryPlace(this.uidAuth, this.uidSubjectPlace);
  
          this.getTabPlaces();
          this.displayBooks = [];
          this.locateBooks = [];

      }   
        //  if (this.uidAuth)
        //      this.uidSubjectBook.next(this.uidAuth)  //
   }

   ngOnInit() {
     console.log("DisplaybookingPage OnInit queryObs: ", this.queryObsBook)

      if (this.loader)
          this.hideLoading();
   }

   filterBy(userKey: any) {
     //this.uidSubjectBook.next(userKey); 
   }

   //ionViewDidLoad() {
   ionViewWillEnter() {
     console.log("DisplaybookingPage WillEnter authUID: ", this.uidAuth)

     this.displayBooks = [];
     this.locateBooks = [];

          console.log("DisplaybookingPage queryObs: ", this.queryObsBook," Null: ", this.queryObsBook==null )
          if (this.queryObsBook) {
              this.queryObsBook
                .distinctUntilChanged()
                .map(res =>{         
                    let filter= []
                    res.forEach( resx => {
                     // console.log ("userKey: ", resx.userKey)         
                      let obj = (resx.resNoplaque != "") ? resx: null;            
                      if (obj)
                          filter.push (obj) ;              
                    }) 
                    //console.log("filter: ", filter)
                    return filter        
                })
               .take(1).subscribe (itms => {  //.take(1) ??
                  if (itms)
                    this.displayBooks = itms;

                    console.log("displayBooks.length:", this.displayBooks.length )
                    if ( this.displayBooks.length > 0){
                        //this.locateBooks = [];
       
                        for (let i=0; i < this.displayBooks.length; i++) { 
                            //console.log(" displayBooks for: ", this.displayBooks[i])
                            this.completeLocate(i); // this.displayBooks[i]);
                        } // end for
                    } else {
                          this.toastMsg._presentToast("Aucune place reservée"); 
                          console.log("Aucune place reservée");     
                    }   
                }),
                (err =>{ 
                    console.log("aroundPlace subscribe erreur: ", err)
                }); 
          }

       if (this.uidAuth){
            this.uidSubjectBook.next(this.uidAuth) 
            console.log("DisplaybookingPage WillEnter2 authUID: ", this.uidAuth)
       }
     // }

  }

   // Stockage de toutes les places de parking  
   getTabPlaces () { 
      if (this.queryPlaceObs) {     
          this.queryPlaceObs   //.toPromise().then ( places =>{
         // .debounceTime(1000)
            .distinctUntilChanged()
            .subscribe( places => {
                //console.log("completeAddMarker subscribe places", places)
                this.allPlace = places; 
          }) 

          if (this.uidAuth) {
             this.uidSubjectPlace.next(null);  //on veut toutes les places
          } 
       }  //end if 
   }   // end getTabPlaces

   completeLocate (index) { 
       //console.log("allPlace.length:", this.allPlace.length);
      
       this.allPlace.forEach( place => {  
            if (place.userKey == this.displayBooks[index].userKey)  {
                let tab = this.displayBooks[index];
                let tabConcat:any = [];
        
                // merge d'objet
                for(var key in tab) tabConcat[key]=tab[key];
                for(var key in place) tabConcat[key]=place[key];
               // Object.keys(tab).forEach((key) => result[key] = tab[key]);
               // Object.keys(place).forEach((key) => result[key] = place[key]);

                this.locateBooks.push(tabConcat)
            }
       })
       //console.log("result : ",  this.locateBooks);
   }

//   deleteBook(key){
//     console.log("delete Key:", key);
//     this.queryObs.remove(key) 
//     .then(_=> { this.toastMsg._presentToast("Données effacées")})
//     .catch(err => { this.toastMsg._presentToast('error opération non effectuée' + err)})
     //  event.preventDefault(); 
//   }

  private hideLoading(){
       this.loader.dismiss();
  }

  public ionViewCanLeave() {   //code utile ??
    console.log("DisplaybookingPage CanLeave");

    // here we can either return true or false
    // depending on if we want to leave this view
    return true;
  }

  onClickBack(){
   // this.navCtrl.pop() 
  }
  
}


