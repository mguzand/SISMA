import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallefichaPage } from './detalleficha';

@NgModule({
  declarations: [
    DetallefichaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallefichaPage),
  ],
})
export class DetallefichaPageModule {}
