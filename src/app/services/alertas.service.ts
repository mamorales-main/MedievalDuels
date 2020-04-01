import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Injectable } from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController,private natSt: NativeStorage) { }

  public async alerta(titulo: string, mensaje: string, boton: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: [boton ]
    });
    await alert.present();

  }

  public async toast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      showCloseButton: true,
      closeButtonText: 'Cerrar'
    });
    await toast.present();
  }
  public checkMode() {
    this.natSt.getItem('dark').then(data => {
      if(data==true) {
        document.body.classList.toggle( 'dark' );
      }
    });
  }
}
