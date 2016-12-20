import { Injectable } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AngularFire, AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
//import { AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FireService {
  private authState: FirebaseAuthState;
  private authObj: any;

  queryObs: FirebaseListObservable<any>;

  constructor(public fba: FirebaseAuth, public af: AngularFire) {
     this.authState = fba.getAuth();
     fba.subscribe((state: FirebaseAuthState) => {
       this.authState = state;
     })

     af.auth.subscribe(auth => {
        if (auth) { 
          this.authObj = auth;
        }
     });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  getAuthObj(): any {
    console.log ("test SVC")
    return this.authObj;
  }
  
  getQueryPlace(uid, uidSubject):FirebaseListObservable<any> {
    this.queryObs = null;

    if (uid) {
      this.queryObs = this.af.database.list('/places', {  //  '/items'
              query: {
                // orderByChild: 'ville',
                orderByChild: 'userKey',
                equalTo: uidSubject,
                //  orderByKey: true,   //un seul orderBy
                //  limitToFirst: 2,
                //  limitToLast: 2,
              }
          });

      //this.uidSubject.next(uid)
    }
    console.log("authSVC queryObs: ", this.queryObs)
    return this.queryObs
  }

  getQueryDispo(uid, uidSubject):FirebaseListObservable<any> {
    this.queryObs = null;

    if (uid) {
      this.queryObs = this.af.database.list('/dispo', {  //  '/items'
              query: {
                // orderByChild: 'ville',
                orderByChild: 'userKey',
                equalTo: uidSubject,
                //  orderByKey: true,   //un seul orderBy
                //  limitToFirst: 2,
                //  limitToLast: 2,
              }
          });

      //this.uidSubject.next(uid)
    }
    console.log("authSVC queryObs: ", this.queryObs)
    return this.queryObs
  }

    //InWithFacebook(): firebase.Promise<FirebaseAuthState> {
    //   return this.auth$.login({
    //     provider: AuthProviders.Facebook,
    //     method: AuthMethods.Popup
    //   });
    // }

    // signOut(): void {
    //   this.auth$.logout();
    // }

    // displayName(): string {
    //   if (this.authState != null) {
    //     return this.authState.facebook.displayName;
    //   } else {
    //     return '';
    //   }
    // } 

}