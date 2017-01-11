import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuth, FirebaseAuthState, FirebaseListObservable} from 'angularfire2';


@Injectable()
export class FireService {
  private authState: FirebaseAuthState;
  private authObj: any;

  constructor(public fba: FirebaseAuth, public af: AngularFire) {
     //this.authState = fba.getAuth();  // methode dépreciée, supprimée par la suite
     fba.subscribe((state: FirebaseAuthState) => {
       this.authState = state;
     })

     af.auth.subscribe(auth => {
        if (auth) { 
          this.authObj = auth;
        }
       // this.name = auth.auth.displayName
       // this.email = auth.auth.displayName
     });
  }

 // getUserUID () {  //exemple d'utilisation
 //     let uid= null;
 //     let authObj = this.authSVC.getAuthObj();
 //     if (authObj){
 //         console.log("authObj uid: ", authObj.auth.uid)
 //         uid =  authObj.auth.uid;
 //         return uid;
 //     }
 //     return uid;
 // }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  getAuthObj(): any {
    console.log ("test SVC")
    return this.authObj;
  }
  
  getQueryPlace(uidAuth, uidSubject):FirebaseListObservable<any> {
    let queryObs: FirebaseListObservable<any> = null;

    if (uidAuth) {
       queryObs = this.af.database.list('/places', {  
              query: {
                orderByChild: 'userKey',
                equalTo: uidSubject,
                //  orderByKey: true,   //un seul orderBy
                //  limitToFirst: 2,
                //  limitToLast: 2,
              }
          });
    }
    console.log("authSVC Places queryObs: ", queryObs)
    return queryObs
  }

  getQueryDispo(uidAuth, uidSubject):FirebaseListObservable<any> {
    let queryObs: FirebaseListObservable<any> = null;
    //console.log ("fireService uid: ", uid);

    if (uidAuth) {
      queryObs = this.af.database.list('/dispos', {  //  '/items'
              query: {
                orderByChild: 'userKey',
                equalTo: uidSubject,
                //  orderByKey: true,   //un seul orderBy
                //  limitToFirst: 2,
                //  limitToLast: 2,
              }
          });
    }
    console.log("authSVC Dispos queryObs: ", queryObs)
    return queryObs
  }

  getQueryRechDispo(uidAuth, uidSubject):FirebaseListObservable<any> {
    let queryObs: FirebaseListObservable<any> = null;
    //console.log ("fireService uid: ", uid);

    if (uidAuth) {
      queryObs = this.af.database.list('/dispos' ,{
              query: {
                orderByChild: 'userKey',  //'dateDebDispo',  
                equalTo: uidSubject,
                //  orderByKey: true,   //un seul orderBy
                //  limitToFirst: 2,
     //           limitToLast: 5,
              }
            });
    }
    console.log("authSVC Dispos queryObsRechDispo: ", queryObs)
    return queryObs
  }

   getQueryBookDispo(uidAuth, uidSubject):FirebaseListObservable<any> {
    let queryObs: FirebaseListObservable<any> = null;
    //console.log ("fireService uid: ", uid);

    if (uidAuth) {
      queryObs = this.af.database.list('/dispos' ,{
              query: {
                orderByChild: 'userbookKey',  
                equalTo: uidSubject,
                //  orderByKey: true,   //un seul orderBy
                //  limitToFirst: 2,
                limitToLast: 5,
              }
            });
    }
    console.log("authSVC Dispos getQueryBookDispo: ", queryObs)
    return queryObs
  }

  getQueryUser(uidAuth, uidSubject):FirebaseListObservable<any> {
    let queryObs: FirebaseListObservable<any> = null;
    //console.log ("fireService uid: ", uid);

    if (uidAuth) {
      queryObs = this.af.database.list('/users' ,{
              query: {
                orderByChild: 'userKey',  
                equalTo: uidSubject,
                //  orderByKey: true,   //un seul orderBy
                //  limitToFirst: 2,
                limitToLast: 5,
              }
            });
    }
    console.log("authSVC Users getQueryUser: ", queryObs)
    return queryObs
  }

    //InWithFacebook(): firebase.Promise<FirebaseAuthState> {
    //   return this.auth$.login({
    //     provider: AuthProviders.Facebook,
    //     method: AuthMethods.Popup
    //   });
    // }


    // displayName(): string {
    //   if (this.authState != null) {
    //     return this.authState.facebook.displayName;
    //   } else {
    //     return '';
    //   }
    // } 

}