import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
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
 
  constructor(public navCtrl: NavController,public af: AngularFire) {
  
    //  this.item = af.database.object('/items');
     this.numberSubject = new Subject();
     this.items = af.database.list('/items', { preserveSnapshot: true });
     this.items.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
        //console.log("snap key:" + snapshot.key)
        //console.log("snap val:" + snapshot.val().name)
       });
     });

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

    //  af.database.list('/items')    
    //  .subscribe((data)=>{
    //    this.itemstr = data;
    //  })

    //const promise = af.database.list('/items').remove();   //code utile
    //promise
    //  .then(_ => console.log('success'))
    //  .catch(err => console.log(err, 'You do not have access!'));

     console.log("addPlacePark: "+(this.items))
  }

 filterBy(plaq: any) {
    this.numberSubject.next(plaq); 
  }

  addItem(newAdresse: string, newVille: string, newNoPostal: string ) {
   // this.items.push({ name: newName, plaque: newPlaque });
    this.items.push({ 
      adresse: newAdresse,
      ville: newVille,
      noPostal: newNoPostal,
    });
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
