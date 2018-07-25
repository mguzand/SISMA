import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ValidateloginProvider } from '../providers/validatelogin/validatelogin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              validate: ValidateloginProvider) {

    platform.ready().then(() => {

      if(localStorage.getItem('Token')!=null){
        if(validate.getDate() > localStorage.getItem('Token') ){
          this.rootPage = LoginPage;
        }else{
          this.rootPage = TabsPage;
        }
      }else{
        this.rootPage = LoginPage;
      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
