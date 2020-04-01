import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import {Router} from '@angular/router';
import {AlertasService} from '../../services/alertas.service';
import {PersonajesService} from '../../services/personajes.service';
import {PersonajeCreado, PersonajePlantilla, PlantillaSeleccionada, PostInterface, PreInterface} from '../../models/PersonajeInterface';
import {NgForm} from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
import {LoginInterface, TokenInterface} from '../../models/LoginInterface';
import {stringify} from 'querystring';

@Component({
  selector: 'app-creacionpersonaje',
  templateUrl: './creacionpersonaje.page.html',
  styleUrls: ['./creacionpersonaje.page.scss'],
})
export class CreacionpersonajePage implements OnInit {
  login: string;
  buttonColor: any = 'primary';
    constructor(private storage: Storage,
              private router: Router,
              private alert: AlertasService,
              private _pS: PersonajesService,
              private _uS: UsuarioService,
              private _aS: AlertasService) {
    this.getPlantillas();

  }


  public personajeCreado: PersonajeCreado = {
    login: '',
    nombre: '',
    nivel: 0,
    clase: '',
    fuerza: 0,
    destreza: 0,
    inteligencia: 0
  };
  public personajePlantilla: PersonajePlantilla = {
    nivel: 0,
    clase: '',
    fuerza: 0,
    destreza: 0,
    inteligencia: 0
  };
  public PlantillaSeleccionada: PlantillaSeleccionada = {
      status: '',
      plantillaseleccionada: [
      ],
  };
  public Usuario: LoginInterface = {
    login: '',
    password: ''
  };

  plantillasrecogidas = [];
  plantillaactual = [];

  getPlantillas() {
      this._uS.getToken()
          .then((token) => {
              this._pS.getplantillas(token)
                  .subscribe(resp => {
                      this.personajePlantilla = resp;
                      console.log(this.personajePlantilla);
                      this.storage.set('plantillas', this.personajePlantilla);
                      // tslint:disable-next-line:forin
                      for (const key in this.personajePlantilla) {
                          this.plantillasrecogidas.splice(0, 1, this.personajePlantilla[key]);
                      }
                  });
          });

  }

  public caca: any = {
      status: '',
      plantillaseleccionada: [],
  };

  getPlantillaSeleccionada($clase) {
      this._uS.getToken()
          .then((token) => {
              this._pS.getplantillaseleccionada($clase, token)
                  .subscribe(resp => {
                      this.PlantillaSeleccionada.plantillaseleccionada[0] = resp;
                      this.caca = this.PlantillaSeleccionada.plantillaseleccionada[0]
                      this.storage.remove('plantillaseleccionada');
                      this.storage.set('plantillaseleccionada', this.PlantillaSeleccionada);

                      console.log(this.caca.plantillaseleccionada[0].clase);
                  });
            });

  }

  newpersonaje2( fRegistro: NgForm ) {
    // tslint:disable-next-line:forin
   for (let key in this.PlantillaSeleccionada) {
      this.plantillaactual.splice(0, 1, this.PlantillaSeleccionada[key]);
   }
   console.log(this.plantillaactual );
   this.storage.get('user').then((login) => {this.personajeCreado.login = login.login.login; });
   console.log(this.personajeCreado );

   setTimeout(() => {
       this._uS.getToken()
           .then((token) => {
               this._pS.newpersonaje(
                   this.personajeCreado.login,
                   this.personajeCreado.nombre,
                   this.caca.plantillaseleccionada[0].nivel,
                   this.caca.plantillaseleccionada[0].clase,
                   this.caca.plantillaseleccionada[0].fuerza,
                   this.caca.plantillaseleccionada[0].destreza,
                   this.caca.plantillaseleccionada[0].inteligencia,
                   token)
                   .subscribe(resp => {
                           this.personajeCreado = resp;
                           console.log(this.personajeCreado);

                       }
                   );
           });
      this.router.navigateByUrl('/seleccionpersonaje', { skipLocationChange: true }).then(() => {
           this.router.navigate(['/seleccionpersonaje']);

      });
   }, 1000);

  }
    public reload() {
        location.reload();
    }

    ngOnInit() {
      this._aS.checkMode();
      console.log('initcreacionpersonaje')

    }
    ngOnDestroy() {
      console.log('destroycreacionpersonaje')

    }
    ionViewDidLeave(){
      this._aS.checkMode();
    }
    ionViewWillEnter(){
      this._aS.checkMode();
    }


}
