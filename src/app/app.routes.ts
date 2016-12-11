import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {TabsPage} from '../pages/tabs/tabs';
//import {AddPage} from '../pages/add/add';
//import {FriendsPage} from '../pages/friends/friends';
import { AroundPage } from '../pages/around/around';
import { AddplaceparkingPage } from '../pages/addplaceparking/addplaceparking';
//import {LoginPage} from '../login/login';
//import {PlacesPage} from '../pages/places/places';
//import {SignupPage} from '../pages/signup/signup';
//import {PlacePage} from '../pages/place/place';
//import {SettingsPage} from '../pages/settings/settings';

export class Routes {

  static HOME:string="home";
  static LOGIN:string="login";
  static TABS:string="tabs";  
  static ADDPLACES:string="addplaces";
 // static PLACES:string="places";
  static AROUND:string="around";
 // static SIGNUP:string="signup";

  static pages = {
    [Routes.LOGIN]: LoginPage,
    [Routes.HOME]: HomePage,
    [Routes.TABS]: TabsPage,
    [Routes.ADDPLACES]: AddplaceparkingPage,
    [Routes.AROUND]: AroundPage,
 //   [Routes.ADD]: AddPage,
 //   [Routes.PLACES]: PlacesPage,
 //   [Routes.AROUND]: AroundPage,
 //   [Routes.FRIENDS]: FriendsPage,
 //   [Routes.SIGNUP]: SignupPage,
 //   [Routes.PLACE]: PlacePage,
 //   [Routes.SETTINGS]: SettingsPage,
  };

  static getPage(id){
    console.log ("getPage " + id);
    const route = Routes.pages[id];
   // alert ("page " + route);
    return route;
  }

  static getRootPage(authenticated){
    console.log ("getRoutePage " + authenticated );
    let root = (authenticated) ? Routes.getPage(Routes.TABS) : Routes.getPage(Routes.HOME);
    return root;
  }

  static getPages(){
    const pages = []
    for (var key in Routes.pages) {
      pages.push(Routes.pages[key]);
    }
    return pages;
  }

  static getDeepLinkerConfig(){
    const config = {links:[]}
    for (var key in Routes.pages) {
      config.links.push({ component: Routes.pages[key], name: key});
    }
    return config;
  }
}
