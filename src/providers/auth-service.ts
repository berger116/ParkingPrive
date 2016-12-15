import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods} from 'angularfire2';
//import { AuthProviders, FirebaseAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  //private authState: FirebaseAuthState;
 
  constructor(public af: AngularFire){}

  // constructor(public af: FirebaseAuth) {
  //   this.authState = auth$.getAuth();
  //   auth$.subscribe((state: FirebaseAuthState) => {
  //     this.authState = state;
  //   });
  // }

  // get authenticated(): boolean {
  //   return this.authState !== null;
  // }

  getAuthent(): any {
    console.log ("test SVC")

    this.af.auth.subscribe( auth => {
      if (auth) return auth
      else return null;
    })
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