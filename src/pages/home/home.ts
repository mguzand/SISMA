import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {DetallefichaPage}  from '../detalleficha/detalleficha';

import {QRScanner, QRScannerStatus} from '@ionic-native/qr-scanner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;
  scanSub:any;
  constructor(public navCtrl: NavController,
             public http: Http,
             private qrScanner: QRScanner,
             public loadingCtrl: LoadingController,
  	          public alertCtrl: AlertController) {

  }

  async scanPatient():Promise<string> {
    let hash:string = '';
    try {
        hash = await this.scaner();
    }
    catch(err) {
        throw err;
    }

    return hash;
}



    scanCode($id) {
   
      let prompt = this.alertCtrl.create({
        title: 'Buscar Identidad',
        inputs: [
          {
            name: 'title',
            placeholder: 'Identidad'
          },
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: data => {
              
            }
          },
          {
            text: 'Buscar',
            handler: data => {
              this.BusquedaGeneral(data.title);
            }
          }
        ]
      });
      prompt.present();
    }


    private scaner():Promise<any> {
      // Optionally request the permission early
      return this.qrScanner.prepare()
          .then((status: QRScannerStatus) => {
              return new Promise((resolve, reject) => {
                  if (status.authorized) {
                      // camera permission was granted

                      const ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
                      // start scanning
                      let scanSub = this.qrScanner.scan().subscribe((text: string) => {
                     
                        this.BusquedaGeneral(text);
                      
                          this.qrScanner.hide(); // hide camera preview
                          scanSub.unsubscribe(); // stop scanning

                          // hack to hide the app and show the preview
                          ionApp.style.display = "block";

                          resolve(text);
                      });

                      // show camera preview
                      ionApp.style.display = "none";
                      this.qrScanner.show();
                  } else if (status.denied) {
                      // camera permission was permanently denied
                      // you must use QRScanner.openSettings() method to guide the user to the settings page
                      // then they can grant the permission from there
                      this.qrScanner.openSettings();
                      reject(new Error('MESSAGES.QRSCANNER.CHANGE_SETTINGS_ERROR'));
                  } else {
                      // permission was denied, but not permanently. You can ask for permission again at a later time.
                      reject(new Error('MESSAGES.QRSCANNER.PERMISSION_DENIED_ERROR'));
                  }
              })
          })
  }


  public BusquedaGeneral(id){
     this.cargando();
     this.http.get('http://appi.sismapnh.com/?action=Ficha&identidad='+id+'').map(res => res.json()).subscribe(data => {
        this.loading.dismiss();
        console.log(data[0].length);
        if(data[0].length>0){
          localStorage.setItem('Ficha', JSON.stringify(data));
          this.openNavDetailsPage(); 
        }else{
          this.showAlert();
        }
      },
      error => {
        this.loading.dismiss();
        this.showAlert();
     });
     //this.openNavDetailsPage(); 
  }


  public scaner2(){
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        console.log('Camera Permission Given');
        this.showCamera();
         this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);
         this.qrScanner.hide();
         this.scanSub.unsubscribe(); 
        
        });

        this.qrScanner.show();
      } else if (status.denied) {
        console.log('Camera permission denied');
      } else {
        console.log('Permission denied for this runtime.');
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }


  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }
  
  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }


  ionViewWillEnter(){
    this.showCamera();
    }
    ionViewWillLeave(){
        this.hideCamera(); 
    }





  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error...',
      subTitle: 'Identidad no encontrada',
      buttons: ['OK']
    });
    alert.present();
  }


 public cargando(){
    this.loading = this.loadingCtrl.create({
      content: 'Cargando',
      duration: 10000
    });
   this.loading.present();
  }


  openNavDetailsPage() {
    this.navCtrl.push(DetallefichaPage);
  }





}
