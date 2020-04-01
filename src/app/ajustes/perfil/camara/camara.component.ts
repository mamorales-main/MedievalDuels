import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {UsuarioService} from '../../../services/usuario.service';
import {ImagenInterface} from '../../../models/LoginInterface';
import {Storage} from '@ionic/storage';
import {NavController} from '@ionic/angular';
import {AlertasService} from '../../../services/alertas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit {

  foto: any;

  respuesta: ImagenInterface = {
    login: '',
    base64: '',
    status: ''
}




  constructor(private camera: Camera,
              private storage: Storage,
              private _uS: UsuarioService,
              private navCtrl: NavController,
              private _aS: AlertasService,
              private router: Router) { }

  hacerFoto() {
    this.camera.Direction = {BACK: 0, FRONT: 1};
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      allowEdit: true,
      correctOrientation: true,
      targetHeight: 400,
      targetWidth: 400,
      cameraDirection: 1
    }
    this.camera.getPicture(options).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.respuesta.base64 = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  public imagen() {
    this._uS.getToken()
        .then((token) => {
          this.storage.get('user').then((login) => {
            this.respuesta.login = login.login.login;
            this._uS.imagen(this.respuesta.login, this.respuesta.base64, token)
                .subscribe(resp => {
                  console.log(this.respuesta.base64);
                  this.respuesta.status = resp;
                  console.log(this.respuesta.status);


                });

          });
        });
  }
  volver() {
    this.imagen();
    this._aS.toast('Foto de perfil actualizada.');
    setTimeout(() => {
      this.router.navigateByUrl('ajustes/perfil/editar', { skipLocationChange: true }).then(() => {
        this.router.navigate(['ajustes/perfil/editar']);
      });
    }, 2000);
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
