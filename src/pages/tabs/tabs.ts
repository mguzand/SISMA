import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {NavController} from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage { 
  Nombre:any;
  Cargo:any;
  foto = 'http://www.taaz.com/images/2DABDA40E719CFA8339FCE4A4DFA14DA.jpg';
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public navCtrl: NavController) {
    this.Nombre = localStorage.getItem("Usuario");
    this.Cargo = localStorage.getItem("Cargo");
  }


  ionViewDidLoad() {
   
    
  }

 

  CerrarSesion(){
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }


}
