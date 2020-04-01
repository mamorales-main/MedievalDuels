import { Component, OnDestroy, OnInit, OnChanges, AfterContentInit} from '@angular/core';
import { PreInterface, PostInterface } from '../../models/PersonajeInterface';
import { PersonajesService } from 'src/app/services/personajes.service';
import { AlertasService } from 'src/app/services/alertas.service';
import { Router } from '@angular/router';
import { LoginInterface } from 'src/app/models/LoginInterface';
import {Storage} from '@ionic/storage';
import {ModalController, NavController} from '@ionic/angular';
import {UsuarioService} from '../../services/usuario.service';

@Component({
    selector: 'app-seleccionpersonaje',
    templateUrl: './seleccionpersonaje.page.html',
    styleUrls: ['./seleccionpersonaje.page.scss'],
})

export class SeleccionpersonajePage implements OnInit, OnDestroy, OnChanges, AfterContentInit {

    constructor(
        private storage: Storage,
        private router: Router,
        private alert: AlertasService,
        private _pS: PersonajesService,
        private navCtrl: NavController,
        private _uS: UsuarioService,
        private modalController: ModalController) {   }

    public personajes: PreInterface = {
        status: '',
        personajes: {
            login: '',
            nombre: '',
            personajes: ''
        }
    };
    public personajesdetalles: PostInterface = {
        status: '',
        personajesdetalles: {
            login: '',
            nombre: '',
            nivel: 0,
            clase: '',
            fuerza: 0,
            destreza: 0,
            inteligencia: 0,
            exp: 0,
            expreq: 0,
            saldo: 0
        }
    };
    public Usuario: LoginInterface = {
        login: '',
        password: ''
    };
    nombre: string;
    personajescargados = [];

    detallespersonajeseleccionado = [];
    mySubscription: any;
    $nombresmostrados: HTMLElement;


    public cargarpersonajes() {
        this._uS.getToken()
            .then((token) => {
                this.storage.get('user').then((login) => {
                    this.Usuario.login = login.login.login;

                    this._pS.getpersonajes(this.Usuario.login, token)
                            .subscribe(resp => {
                                this.personajes = resp;
                                this.storage.set('personajes', this.personajes.personajes);

                            });
                    setTimeout(() => {
                            this.storage.get('personajes').then((val) => {
                                this.personajescargados.push(val);

                            });

                        }, 2000);
                    setTimeout(() => {
                            if (this.personajes.status == 'success') {
                                this.alert.toast('Personajes cargados correctamente.');

                            } else {
                                this.alert.alerta(
                                    'Aún no tienes personajee.',
                                    'Redirigiendo a creación de personajes.',
                                    '');
                                setTimeout(() => {
                                    this.alert.alertCtrl.dismiss();
                                    this.navCtrl.navigateForward('/creacionpersonaje');
                                }, 1000);
                            }

                        }, 2000);
                    });
            });
    }
    mostrar($personaje) {
        var cardpersonajes = document.getElementsByClassName('CardPersonajes') as HTMLCollectionOf<HTMLElement>;
        for (let index = 0; index < cardpersonajes.length; index++) {
            cardpersonajes[index].style.backgroundColor = 'rgba(103, 0, 0, 1)';
        }
        var texto = document.getElementsByClassName('texto') as HTMLCollectionOf<HTMLElement>;
        for (let index = 0; index < texto.length; index++) {
            texto[index].style.color = 'black';
        }
        console.log($personaje);
        this._uS.getToken()
            .then((token) => {
                this._pS.getdetallespersonajes($personaje, token)
                    .subscribe(resp => {
                        this.personajesdetalles = resp;
                        for (var key in this.personajesdetalles) {
                            this.detallespersonajeseleccionado.splice(0, 1, this.personajesdetalles[key]);
                        }
                    });
            });
        setTimeout(() => {
            this.storage.set('personajeseleccionado', this.detallespersonajeseleccionado[0][0]);
        }, 1000);

        console.log(this.personajesdetalles);
    }
    nuevopersonaje() {
        this.navCtrl.navigateRoot('/creacionpersonaje');
       // this.router.navigateByUrl('/creacionpersonaje', { skipLocationChange: true }).then(() => {
       //     this.router.navigate(['/creacionpersonaje']);
       // });
    }

        duplicado($nombre) {
            this.$nombresmostrados = document.getElementById($nombre);
                if (this.$nombresmostrados != null ) {
                    console.log('se ha encontrado'); return  true;  }
                else { console.log('duplicado'); return false; }
          //  return true;
        }

    go() {
        this.navCtrl.navigateRoot('tabs/maingame');

    }

    ngOnInit(  ) {
        this.alert.checkMode();
        console.log('init');
        this.cargarpersonajes();

    }
    ngOnDestroy(): void {
        console.log('destroy');
    }
    ngAfterContentInit(  ) {
        console.log('aftercontentinit');

    }
    ngOnChanges(  ) {
        console.log('onchanges');

    }

}
