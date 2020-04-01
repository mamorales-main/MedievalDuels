import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {UsuarioService} from '../../../services/usuario.service';
import {EditarInterface, GetDetallesInterface} from '../../../models/LoginInterface';
import {NgForm} from '@angular/forms';
import {PersonajesService} from '../../../services/personajes.service';
import {AlertasService} from '../../../services/alertas.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss'],
})
export class EditarComponent implements OnInit {

  constructor(private storage: Storage,
              private _uS: UsuarioService,
              private _pS: PersonajesService,
              private _aS: AlertasService,
              private navCtrl: NavController) { this.datos(); }
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
  public editarusuario: EditarInterface = {
    login: '',
    password: '',
    nombre: '',
    apellidos: '',
    pais: '',
    telefono: ''
  };
  status: any;
  login: string;
  password: string;
  url: string;
  public datos() {
      this._uS.getToken()
          .then((token) => {
              this.storage.get('user').then((login) => {
                  this.login = login.login.login;
                  this._uS.getdetalles(this.login, token)
                      .subscribe(resp => {
                          this.datosusuario = resp;
                          this.url = 'http://18.219.216.195/public/';

                          if (this.editarusuario.nombre === '') {
                              this.editarusuario.nombre = this.datosusuario.detallesusuario.nombre;
                          }
                          if (this.editarusuario.apellidos == '') {
                              this.editarusuario.apellidos = this.datosusuario.detallesusuario.apellidos;
                          }
                          if (this.editarusuario.password == '') {
                              this.editarusuario.password = this.datosusuario.detallesusuario.password;
                          }
                          if (this.editarusuario.pais == '') {
                              this.editarusuario.pais = this.datosusuario.detallesusuario.pais;
                          }
                          if (this.editarusuario.telefono == '') {
                              this.editarusuario.telefono = this.datosusuario.detallesusuario.telefono;
                          }
                          if (this.editarusuario.password == null) {
                              this.editarusuario.password = this.datosusuario.detallesusuario.login.password;
                          }

                      });

              });
          });
  }

  editar( feditar: NgForm ) {
      this._uS.getToken()
          .then((token) => {

              this._uS.editar(
                  this.login,
                  this.editarusuario.password,
                  this.editarusuario.nombre,
                  this.editarusuario.apellidos,
                  this.editarusuario.pais,
                  this.editarusuario.telefono,
                  token)

                  .subscribe(resp => {
                          this.status = resp;
                          console.log(this.status);
                          this._aS.toast('Perfil guardado correctamente.');
                          this.navCtrl.navigateBack('ajustes/perfil');
                          this._aS.checkMode();
                      }
                  );
          });
  }
    public edit() {
        this.navCtrl.navigateRoot('ajustes/perfil/camara');
    }

    ngOnInit() {
        this._aS.checkMode();
  
      }
      ionViewDidLeave(){
        this._aS.checkMode();
      }
      ionViewWillEnter(){
        this._aS.checkMode();
      }

}
