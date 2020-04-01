import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PersonajesService } from 'src/app/services/personajes.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {Storage} from '@ionic/storage';
import { PostInterface, PersonajeDetallesInterface } from 'src/app/models/PersonajeInterface';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  clase: string;
  nombre: string;
  status: any;
  personaje: PostInterface;
  detalles = [];
  detallesActual: PersonajeDetallesInterface;
  ruta = '../../../assets/clases/';
  check = false;

  constructor(
    private _pS: PersonajesService,
    private _sT: Storage,
    private _uS: UsuarioService) { 
      setInterval(() => {
        this.reloadingData()
      }, 1000);
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
                  this.check = true;
                  if (this.clase !== 'Asesino' && this.clase !== 'Guerrero' && this.clase !== 'Mago' ) {
                    this.clase = 'Personalizado';
                  }

                });
                });
          });

  }



  ngOnInit() {
  }

}
