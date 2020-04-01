import { Component, OnInit } from '@angular/core';
import {UserInterface} from '../../models/LoginInterface';
import {UsuarioService} from '../../services/usuario.service';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {NgForm} from '@angular/forms';
import {RegisterInterface} from '../../models/RegisterInterface';
import {AlertasService} from '../../services/alertas.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public respuesta: UserInterface = {
        status: '',
        token: '',
        user: {
            nombre: '',
            apellidos: '',
            login: '',
            pais: '',
            telefono: '',
            img: '',
            token: '',
            rol: ''
        },
    };

    public registerUser: RegisterInterface = {
        login: '',
        password: '',
        nombre: '',
        apellidos: '',
        pais: '',
        telefono: ''
    };

    // tslint:disable-next-line:max-line-length
    constructor(private _uS: UsuarioService,
                private storage: Storage,
                private router: Router,
                public alertCtrl: AlertController,
                private alert: AlertasService,) {   }
    public async presentAlert() {
        const alert = await this.alertCtrl.create({
            header: '¡Datos incorrectos!',
            message: 'Vuelve a introducir tus datos, por favor.',
            buttons: ['Volver a intentar' ]
        });
        await alert.present();

    }




    registro( fRegistro: NgForm ) {
        this._uS.registro(
            this.registerUser.login,
            this.registerUser.password,
            this.registerUser.nombre,
            this.registerUser.apellidos,
            this.registerUser.pais,
            this.registerUser.telefono)
            .subscribe(resp => {
                    this.respuesta = resp;
                    console.log(this.respuesta);
                    if (this.respuesta.status == 'success') {
                        this.storage.set('token', this.respuesta.token);
                        this.storage.set('user', this.respuesta.user);
                        this.alert.alerta(
                            'Aún no tienes personaje.',
                            'Redirigiendo a creación de personajes.',
                            ''
                        );
                        setTimeout(() => {
                            this.alert.alertCtrl.dismiss();
                            this.router.navigateByUrl('/creacionpersonaje');
                        }, 2000);

                    } else {
                        this.storage.clear();
                        this.presentAlert();
                    }
                }
            );
    }





    ngOnInit(): void {
    }
}

