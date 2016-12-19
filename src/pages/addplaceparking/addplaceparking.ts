import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';  //AuthProviders, AuthMethods
import { AuthService } from '../../providers/auth-service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

//import { IPlaceParking } from './placeparking';

//import {Observable} from 'rxjs/Observable';
//import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

/*
  Generated class for the Addplaceparking page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addplaceparking',
  templateUrl: 'addplaceparking.html'
})
export class AddplaceparkingPage {
  queryObs: FirebaseListObservable<any>;
  //items: Observable<any>; //FirebaseListObservable<any>;
  uidSubject: Subject<any>;
  scsUpd:any;

  fireKey:string;
  uid: string;
  adresse: string;
  ville: string;
  noPostal: string;
  latitude: string;
  longitude: string;

 // item: IPlaceParking;
  //itemKey: string;
 

  constructor(public navCtrl: NavController, public navparams: NavParams, public af: AngularFire, public authSVC: AuthService) {
     //this.items = af.database.list('/items', { preserveSnapshot: true });
     //this.items.subscribe(snapshots => {
       // snapshots.forEach(snapshot => {
        //console.log("snap key:" + snapshot.key)
        //console.log("snap val:" + snapshot.val().name)
      // });
     //});
     //// this.item.set({ size: 'name 4'});  a eviter

    this.uid = this.navparams.get("uid") // this.getUserUID ()
    console.log("addPlaceParking UID: ", this.uid);

    //  af.database.list('/items')   //code utile ?? 
    //  .subscribe((data)=>{
    //    this.itemstr = data;
    //  })

    //const promise = af.database.list('/items').remove();   //code utile
    //promise
    //  .then(_ => console.log('success'))
    //  .catch(err => console.log(err, 'You do not have access!'));

//.subscribe( item => { item.filter(.userKey == this.uid}) //.filter(item => { return item[0].userKey == this.uid })    //.$ref // '/dispo'
    this.uidSubject = new Subject();
    this.queryObs = authSVC.getQueryPkgPlace(this.uid,  this.uidSubject );
    //   this.queryObs = this.af.database.list('/items', {  //this.items
    //    query: {
          // orderByChild: 'ville',
    //       orderByChild: 'userKey',
    //       equalTo: this.uidSubject,
          //  orderByKey: true,   //un seul orderBy
          //  limitToFirst: 2,
          //  limitToLast: 2,
    //     }
    // })
    console.log("PlacePkg queryObs: ", this.queryObs)

    if (this.queryObs)
      this.queryObs.subscribe (itm => { 
          this.fireKey =  "-KZ7adwUf4BUQXKGsZ97"    //mis en dure  !!!!  //itm[0].$key
          this.adresse = itm[0].adresse 
          this.ville = itm[0].ville
          this.noPostal= itm[0].noPostal
          this.latitude= itm[0].latitude
          this.longitude= itm[0].longitude
      }); 

     if (this.uid)
         this.uidSubject.next(this.uid)

     //)  //.subscribe(itm => { console.log(itm)} );

    //this.items.map( item => { item.userKey == this.uid })
   //console.log("filter: " ,this.items.filter( item => { return item.userKey == this.uid }))

    // this.items.subscribe( itm => {
    // this.adresse = this.items[0].adresse;
    // this.ville = this.items.ville;
    // this.noPostal =this.items.noPostal;
    // })
   
    // console.log("addPlacePark: ", (this.items))
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
 
  itemUpdate() { 
    console.log("authenticated key: ", this.authSVC.authenticated, this.fireKey)
    if (this.authSVC.authenticated)
    {  
          //let authObj = this.authSVC.getAuthObj();
         // this.uid = this.getUserUID ();
          console.log("authUID: ", this.uid);

          if (this.uid){
            if (this.fireKey) {  //update
              this.scsUpd = this.queryObs.update(this.fireKey, {  // this.$key //this.scsIns.key
                userKey: this.uid,
                adresse: this.adresse, // this.adresse,
                ville: this.ville,
                noPostal: this.noPostal,
                latitude: this.latitude,
                longitude: this.longitude,
              // Latitude: this.newLatitude,
              //  Longitude: this.newLongitude,
              });
            } else {  //insert
              this.scsUpd = this.queryObs.push({ 
                  userKey: this.uid,
                  adresse: this.adresse, //this.adresse,
                  ville: this.ville,
                  noPostal: this.noPostal,
                  latitude: this.latitude,
                  longitude: this.longitude,
                //  Latitude: this.newLatitude,
                //  Longitude: this.newLongitude,
                });
            }
          
            this.scsUpd  //promisse
            .then(_ => { 
                console.log("success insert/update key: ",  this.fireKey)
            })
            .catch(err => console.log(err, 'You do not have access!'));
         }
    } 
  }

 // getUserUID () {
 //     let uid= null;
 //     let authObj = this.authSVC.getAuthObj();
 //     if (authObj){
 //         console.log("authObj uid: ", authObj.auth.uid)
 //         uid =  authObj.auth.uid;
 //         return uid;
 //     }
 //     return uid;
 // }

  //updateItem(key: string, newName: string, newPlaque: string) {
  //  this.items.update(key, { name: newName, plaque: newPlaque });
  //}
  deleteItem(key: string) { 
  //  this.items.remove(key); 
  }
  deleteEverything() {
  //  this.items.remove();
  }


  ionViewDidLoad() {
     console.log("DidLoad authUID: ", this.uid);
     //this.item
     //console.log("avant ", this.items)

     //this.uid = this.getUserUID ();
     //console.log("this.uid: ",this.uid )
     //if (this.uid){
       // this.items.map( item => { item.userKey == this.uid })
       // console.log("apres", this.items)
     //}

    console.log('Hello AddplaceparkingPage Page');
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
