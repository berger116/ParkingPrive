import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable} from 'angularfire2';  //AuthProviders, AuthMethods
import { AuthService } from '../../providers/auth-service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

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
  //items: FirebaseObjectObservable<any>;
  //item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any>;
  numberSubject: Subject<any>;
  scs:any;

  uid: string;
  newAdresse: string;
  newVille: string;
  newNoPostal: string;
  newLatitude: string;
  newLongitude: string;

  constructor(public navCtrl: NavController, public af: AngularFire, private authSVC: AuthService) {
  
    // this.item = af.database.object('/items');
    this.numberSubject = new Subject();
     //this.auth = af.auth;
     //console.log("YYYY this.auth " + this.auth.auth.uid);

     //this.items = af.database.list('/items', { preserveSnapshot: true });
     //this.items.subscribe(snapshots => {
       // snapshots.forEach(snapshot => {
        //console.log("snap key:" + snapshot.key)
        //console.log("snap val:" + snapshot.val().name)
      // });
     //});

     // this.item.update({ siz: 'name 5'});
     //// this.item.set({ size: 'name 4'});  a eviter

     this.items = af.database.list('/items', {   // '/dispo'
         query: {
           orderByChild: 'plaque',
           equalTo: this.numberSubject,
        //  orderByKey: true,   //un seul orderBy
        //  limitToFirst: 2,
        //  limitToLast: 2,
         }
     });
      //this.items.push({ plaque: "1234" });
     // this.items.update({ plaque: "1234" });  items.update('key-of-some-data', { size: newSize });

    //  af.database.list('/items')   //code utile ?? 
    //  .subscribe((data)=>{
    //    this.itemstr = data;
    //  })

    //const promise = af.database.list('/items').remove();   //code utile
    //promise
    //  .then(_ => console.log('success'))
    //  .catch(err => console.log(err, 'You do not have access!'));

     console.log("addPlacePark: "+ (this.items))
  }

 filterBy(plaq: any) {
    this.numberSubject.next(plaq); 
  }

  addItem() { 
   // this.af.auth.subscribe(auth => {
    console.log("authenticated: ", this.authSVC.authenticated)
    if (this.authSVC.authenticated)
    {
        let authObj = this.authSVC.getAuthObj();
        if (authObj){
          console.log("authObj: ", authObj);
          this.uid = authObj.auth.uid;

          let scs = this.items.push({ 
            userKey: this.uid,
            adresse: this.newAdresse,
            ville: this.newVille,
            noPostal: this.newNoPostal,
          //  Latitude: this.newLatitude,
          //  Longitude: this.newLongitude,
          });

          this.scs  //promisse
          .then(_ => {
            console.log('success push')
          })
          .catch(err => console.log(err, 'You do not have access!'));
       }
    }

   // })  
  }

  itemUpdate() { 
   // this.af.auth.subscribe(auth => {
    console.log("authenticated key: ", this.authSVC.authenticated, this.scs.key)
    if (this.authSVC.authenticated)
    {
        let authObj = this.authSVC.getAuthObj();
        if (authObj){
          console.log("authObj: ", authObj)
          let uid = authObj.auth.uid;

          let scs = this.items.update( this.scs.key, { 
            userKey: this.uid,
            adresse: this.newAdresse,
            ville: this.newVille,
            noPostal: this.newNoPostal,
          // Latitude: this.newLatitude,
          //  Longitude: this.newLongitude,
          });
          
          scs  //promisse
          .then(_ => console.log('success push'))
          .catch(err => console.log(err, 'You do not have access!'));
       }
    }

   // })  
  }


  updateItem(key: string, newName: string, newPlaque: string) {
    this.items.update(key, { name: newName, plaque: newPlaque });
  }
  deleteItem(key: string) { 
    this.items.remove(key); 
  }
  deleteEverything() {
    this.items.remove();
  }


  ionViewDidLoad() {
    console.log('Hello AddplaceparkingPage Page');
  }

}
