import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods} from 'angularfire2';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  private authObj: any;

  constructor(public fba: FirebaseAuth,public af: AngularFire) {
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

  // signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
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