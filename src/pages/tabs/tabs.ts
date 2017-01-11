import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PlacetobookPage } from '../placetobook/placetobook';
import { RecherchePage } from '../recherche/recherche';
import { DisplaybookingPage } from '../displaybooking/displaybooking';
import { UserprofilePage } from '../userprofile/userprofile';
import { Routes } from '../../app/app.routes';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = RecherchePage;
  tab2Root: any = PlacetobookPage;
  tab3Root: any = DisplaybookingPage;
  tab4Root: any = UserprofilePage;

  uidAuth: string;
  chatParams: any;

  constructor(public navCtrl: NavController,
               public navparams: NavParams,
               public af: AngularFire) {  
     
       this.uidAuth = this.navparams.get("uid");
       console.log ("Tabs Cstr uid: ", this.uidAuth);
  }

  ngOnInit() {
      this.chatParams = {
        uid: this.uidAuth 
      }; 
  }

  logout() {
    // this.auth.logout();
    console.log("tabs logout")
    this.af.auth.logout();
    this.navCtrl.pop(Routes.getPage(Routes.TABS)); 
  
    this.navCtrl.setRoot(Routes.getRootPage(false));
  }
  
}
