import { AlertasService } from 'src/app/services/alertas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {AdmobFreeService} from '../../services/admobfree.service';
import {PersonajesService} from '../../services/personajes.service';
import {Storage} from '@ionic/storage';
import {UsuarioService} from '../../services/usuario.service';
import {PersonajeDetallesInterface, PostInterface} from '../../models/PersonajeInterface';
import {Router} from '@angular/router';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import {Platform} from '@ionic/angular';


@Component({
  selector: 'app-maingame',
  templateUrl: './maingame.page.html',
  styleUrls: ['./maingame.page.scss'],
})
export class MaingamePage implements OnInit {
  canvasElement: any;
  coordsX: number;
  coordsY: number;
  contador = 0;
  constructor(
      private admobFreeService: AdmobFreeService,
      private _pS: PersonajesService,
      private _sT: Storage,
      private _uS: UsuarioService,
      private router: Router,
      private sonido: NativeAudio,
      private platform: Platform,
      private _aS: AlertasService
  ) {
      this.reloadingData();


      this.platform.ready().then(() => {
          this.sonido.preloadSimple('uniqueId1', 'assets/quack.mp3').then((success) => {
              console.log('success');
          }, (error) => {
              console.log(error);
          });
      });
      setInterval(() => {
      const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 1000, 1000);
    }, 700);

      //this.admobFreeService.BannerAd();

  }

  ruta = '../../../assets/clases/';
  clase: string;
  nombre: string;
  status: any;
  personaje: PostInterface;
  detalles = [];
  detallesActual: PersonajeDetallesInterface;
  check = false;

  public tap() {
    this._sT.get('personajeseleccionado').then((nombre) => {
      this.nombre = nombre.nombre;

      this._pS.tap(this.nombre)
          .subscribe(resp => {
            this.status = resp;

          });
      this.contador += 1;
      if(this.contador === 150) {
        this.contador = 0;
        this.admobFreeService.RewardVideoAd();
        this.reward();

      }
    });

    this.tocar();
    this.sonido.play('uniqueId1').then((success) => {
          console.log('success playing');
      }, (error) => {
          console.log(error);
      });
  }
  public reward() {
    this._sT.get('personajeseleccionado').then((nombre) => {
      this.nombre = nombre.nombre;

      this._pS.reward(this.nombre)
          .subscribe(resp => {
            this.status = resp;

          });
      });
  }
  public tocar() {
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;

    const ctx = canvas.getContext('2d');
    ctx.font = '13pt Calibri';
    ctx.fillStyle = '#06FF1F';
    const random = Math.floor(Math.random() * 20);
    ctx.fillText('+1$', 130 + random, 100 + random);


  }

  public reloadingData() {
    this._uS.getToken()
        .then((token) => {
          this._sT.get('personajeseleccionado').then((nombre) => {
            this.nombre = nombre.nombre;
            this._pS.getdetallespersonajes(this.nombre, token)
                .subscribe(resp => {
                  this.personaje = resp;
                  for (const key in this.personaje) {
                    this.detalles.splice(0, 1, this.personaje[key]);
                  }
                  this.detallesActual = this.detalles[0][0];
                  this.clase = this.detallesActual.clase;
                  if (!this.check) {
                    this.check = true;
                  }
                  if (this.clase !== 'Asesino' && this.clase !== 'Guerrero' && this.clase !== 'Mago' ) {
                    this.clase = 'Personalizado';
                    document.getElementsByTagName('canvas')[0].setAttribute('class', 'personalizado');
                  }
                  if (this.clase === 'Asesino') {
                    document.getElementsByTagName('canvas')[0].setAttribute('class', 'asesino');

                  } else if (this.clase === 'Mago') {
                    document.getElementsByTagName('canvas')[0].setAttribute('class', 'mago');

                  } else if (this.clase === 'Guerrero') {
                    document.getElementsByTagName('canvas')[0].setAttribute('class', 'guerrero');

                  }

                });
                });
          });

  }

ngOnInit() {

}
ionViewDidLeave() {
}
ionViewDidEnter() {
}
}



  // showBanner() {
  //  this.admobFreeService.BannerAd();
  // }

  // showInterstitial() {
  //  this.admobFreeService.InterstitialAd();
  // }

  // showRewardVideo() {
  //  this.admobFreeService.RewardVideoAd();
  // }


