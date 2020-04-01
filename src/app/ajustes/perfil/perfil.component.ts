import { AlertasService } from 'src/app/services/alertas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/usuario.service';
import {DetallesInterface, GetDetallesInterface} from '../../models/LoginInterface';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  constructor(private storage: Storage,
              private _uS: UsuarioService,
              private navCtrl: NavController,
              private natSt: NativeStorage,
              private alertS: AlertasService) {
                this.datos();


              }


  public datosusuario: GetDetallesInterface = {
    status: '',
    detallesusuario: {
      login: {
        login: '',
        password: ''
      },
      password: '',
      nombre: '',
      apellidos: '',
      pais: '',
      telefono: '',
      img: '',
      rol: ''
    }
  };
  login: string;
  url: string;

  public datos() {
    this.url = 'http://18.219.216.195/public/';
    this._uS.getToken()
        .then((token) => {
          this.storage.get('user').then((login) => {
            this.login = login.login.login;
            this._uS.getdetalles(this.login, token)
                .subscribe(resp => {
                  this.datosusuario = resp;
                });

          });
        });
  }
  public edit() {
    this.navCtrl.navigateRoot('ajustes/perfil/editar');
  }


    ngOnInit() {
      this.alertS.checkMode();

    }
    ionViewDidLeave(){
      this.alertS.checkMode();
    }
    ionViewWillEnter(){
      this.alertS.checkMode();
    }

}
