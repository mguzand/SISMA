import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, MenuController, Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { ValidateloginProvider } from '../../providers/validatelogin/validatelogin';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  credenciales = { usuario: '', contrasena: '' };
  SolRealizadas: any;
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public validate: ValidateloginProvider,
    public events: Events,

    public http: Http, public menu: MenuController) {
       
      if(localStorage.getItem('Token')!=null){
        if(validate.getDate() > localStorage.getItem('Token') ){
          let alert = this.alertCtrl.create({
              title: 'Sesión Finalizada',
              subTitle: 'La sesión a finalizado',
              buttons: ['Salir']
          });
          alert.present();
          localStorage.removeItem('Token'); 
          
        }
      }

       


    }
    
    
    iniciarSesion() {
      let Usuario = this.credenciales.usuario;
      let Password = this.credenciales.contrasena;
      this.http.get('http://appi.sismapnh.com/?action=login&usename='+Usuario+'&Password='+Password+'').map(res => res.json()).subscribe(data => {
          this.SolRealizadas = data;
         
          
         
          if (this.SolRealizadas[0].length > 0) {
            this.validate.getDateLogin();
            localStorage.setItem('Usuario', this.SolRealizadas[0][0]['usuNombre'] );
            localStorage.setItem('Cargo', this.SolRealizadas[0][0]['usuCargo'] );

        
          } else {
              let alert = this.alertCtrl.create({
                  title: 'Error',
                  subTitle: 'Usuario y/o contraseña incorrecta.',
                  buttons: ['Salir']
              });
              alert.present();
          }
  
       });
  
      }





}
