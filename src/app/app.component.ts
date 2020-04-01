import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { AlertController, Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {UserInterface, UsuarioInterface} from './models/LoginInterface';
import {UsuarioService} from './services/usuario.service';
import {OneSignal} from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  showSplash = true;

  public usuarioSt: UsuarioInterface;
  constructor(
      private platform: Platform,
      private splashScreen: SplashScreen,
      private statusBar: StatusBar,
      private _uS: UsuarioService,
      private oneSignal: OneSignal,
      private alertCtrl: AlertController,
      private navCtrl: NavController
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      console.log('initializeAPP');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => {this.showSplash = false; } );
      this.checkDarkTheme();

      if (this.platform.is('cordova')) {
        this.setupPush();
      }
    });
  }

  setupPush() {
    // Se recomienda poner la siguiente línea en environment.ts
    this.oneSignal.startInit('eadd7080-df9e-4a6e-be2c-fdc7a89e3186', '209180188787');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData.task);
    });

    // Notification was really clicked/opened
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Just a note that the data is a different place here!
      let additionalData = data.notification.payload.additionalData;

      this.showAlert('Notification opened', 'You already read this before', additionalData.task);
    });

    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {
            // E.g: Navigate to a specific screen
          }
        }
      ]
    });
    alert.present();
  }


  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if ( prefersDark.matches ) {
      document.body.classList.toggle( 'dark' );
    }
  }

  async mostrar() {
    this.usuarioSt = await this._uS.getStorage('user');
    console.log(this.usuarioSt);
  }



}
