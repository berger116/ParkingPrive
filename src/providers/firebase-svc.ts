import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseSVC provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseSVC {

  fireAuth:any;
  user:any;
  userPlaces: any;
  userDisp: any;


  constructor(public http: Http) {
    console.log('Hello FirebaseSVC Provider');
    this.fireAuth = firebase.auth();
    this.userPlaces = firebase.database().ref('/userPlaces');
  //  this.userWallet = firebase.database().ref('/userWallet');
  
  }

  //loginUser(email: string, password: string): any {
  //  return this.fireAuth.signInWithEmailAndPassword(email, password);
  //}

  setCurrentUserWallet(uid, userWallet){
    this.wallet = firebase.database().ref('/wallet/'+ uid)
    this.currentUserWallet = userWallet;
  }

  setUserSolde(uid){
    let userSoleRef = this.userSolde.child(uid)
    userSoleRef.once('value', (snapshot)=> {
      if(snapshot.val() != null){
        this.walletSolde = snapshot.val().solde
        //console.log('userSole ->', this.walletSolde)
      }
    });
  }

  //saveUserWallet(totalWallet, amountItem, categorie, status, uid){
  //  return this.userSolde.child(uid).set({
  //    solde: totalWallet
  //  })
  //  .then(()=>{
  //    this.userWallet.child(uid).push({
  //          price: amountItem,
  //          category: categorie,
  //          status: status,
  //          timestamp: Date.now()
  //        })
  //  })

}
