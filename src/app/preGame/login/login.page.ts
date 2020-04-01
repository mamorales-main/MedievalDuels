import {Component, OnInit, Injectable, enableProdMode} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { LoginInterface, UserInterface } from '../../models/LoginInterface';
import { PreInterface} from '../../models/PersonajeInterface';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {AlertasService} from '../../services/alertas.service';
import {PersonajesService} from '../../services/personajes.service';
import {AppModule} from '../../app.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {environment} from '../../../environments/environment';
import { defineCustomElements } from 'gl-ionic-background-video/dist/loader';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import {ModalController, NavController} from '@ionic/angular';
import { FingerprintAIO , FingerprintOptions} from '@ionic-native/fingerprint-aio/ngx';



if (environment.production) {
    enableProdMode();
}



defineCustomElements(window);

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    fingerprintOptions: FingerprintOptions;
    cont = 0;
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

    public loginUser: LoginInterface = {
        login: '',
        password: ''
    };


    public personaje: PreInterface = {
        status: '',
        personajes: {
            login: '',
            nombre: '',
            personajes: ''
        }
    };
    public user: any;

    constructor(private _uS: UsuarioService,
                private storage: Storage,
                private router: Router,
                private alert: AlertasService,
                private _pS: PersonajesService,
                private _V: Vibration,
                private platform: Platform,
                private natSt: NativeStorage,
                private navCtrl: NavController,
                private Fingerprint: FingerprintAIO) {

setTimeout(() => {
    this.prueba();
}, 2500);


    }

    login(fLogin: NgForm) {
        this._uS.login(this.loginUser.login, this.loginUser.password)
            .subscribe(resp => {
                this.respuesta = resp;
                console.log (this.respuesta);
                if (this.respuesta.status == 'success') {
                    this.storage.set('token', this.respuesta.token);
                    this.storage.set('user', this.respuesta.user);
                    setTimeout(() => {
                        this.preJoin();
                    }, 1000);
                    this.natSt.setItem('login', {email: this.loginUser.login, password: this.loginUser.password})
                    .then(
                      () => console.log('Stored item!'),
                      error => console.error('Error storing item', error)
                    );
                } else {
                    this.storage.clear();
                    this.loginUser.login = null;
                    this.loginUser.password = null;
                    this.alert.alerta(
                        '¡Error! Usuario/Contraseña incorrectos.',
                        'Porfavor, introduzca de nuevo sus datos.',
                        'Volver a intentar'
                    );
                }
            });
        this._V.vibrate(1000);
    }
prueba() {
    let data: {
        email: '',
        password: ''
    };
    console.log('prueba');
    this.natSt.getItem('login').then(data => {
       if (!data) {
        } else {
            this.fingerprintOptions = {
                clientId: 'Confirma tu huella para continuar',
            };
            this.Fingerprint.isAvailable().then(result => {
                console.log(result);
                this.Fingerprint.show(this.fingerprintOptions)
                    .then((result: any) => {
                        this.sender(data.email, data.password);
                        console.log(result);
                         })
                    .catch((error: any) => {
                        console.log(error.code);
                });
            });
        }
    },
    );
}



public sender(email, password) {
    this._uS.login(email, password)
    .subscribe(resp => {
        this.respuesta = resp;
        if (this.respuesta.status == 'success') {
            this.storage.set('token', this.respuesta.token);
            this.storage.set('user', this.respuesta.user);

            setTimeout(() => {
                this._uS.getToken()
                .then((token) => {
                    this._pS.getpersonajes(email, token)
                        .subscribe(resp => {
                            this.personaje = resp;
                            this.storage.set('personajes', this.personaje.personajes);
                        });
                    setTimeout(() => {
                    if (this.personaje.status == 'success') {
                        this.alert.alerta(
                            'Personajes cargados',
                            'Redireccionando a selección de personaje',
                        '');
                        setTimeout(() => {
                            this.alert.alertCtrl.dismiss();
                            this.navCtrl.navigateForward('/seleccionpersonaje');
                        }, 1000);

                    } else {
                        this.alert.alerta(
                            'Aún no tienes personaje.',
                            'Redirigiendo a creación de personajes.',
                            '');
                        setTimeout(() => {this.alert.alertCtrl.dismiss();
                                          this.navCtrl.navigateForward('/creacionpersonaje');
                        }, 1000);
                    }

                }, 2000);
                });
            }, 1000);
        }
    });
}
preJoin() {
    this._uS.getToken()
        .then((token) => {
            this._pS.getpersonajes(this.loginUser.login, token)
                .subscribe(resp => {
                    this.personaje = resp;
                    console.log(resp);
                    this.storage.set('personajes', this.personaje.personajes);
                });

            setTimeout(() => {
            if (this.personaje.status == 'success') {
                this.alert.alerta(
                    'Personajes cargados',
                    'Redireccionando a selección de personaje',
                   '');
                setTimeout(() => {
                    this.alert.alertCtrl.dismiss();
                    this.router.navigateByUrl('/seleccionpersonaje', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/seleccionpersonaje']);
                    });
                }, 1000);

            } else {
                console.log(this.personaje.status);
                this.alert.alerta(
                    'Aún no tienes personaje.',
                    'Redirigiendo a creación de personajes.',
                    '');
                this.router.navigateByUrl('/creacionpersonaje', { skipLocationChange: true }).then(() => {
                    this.router.navigate(['/creacionpersonaje']);
                });
                setTimeout(() => {this.alert.alertCtrl.dismiss(); this.router.navigateByUrl('/creacionpersonaje');
                }, 1000);
            }

        }, 2000);
        });
}

    registrate() {this.router.navigateByUrl('/register'); }



    ngOnInit(): void {
    }
}

