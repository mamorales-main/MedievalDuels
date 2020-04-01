import { UsuarioService } from './../../services/usuario.service';
import { PersonajesService } from 'src/app/services/personajes.service';
import { clasecreada } from './../../models/PersonajeInterface';
import { Component, OnInit } from '@angular/core';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faFistRaised, faRunning } from '@fortawesome/free-solid-svg-icons';
//import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-crearclase',
  templateUrl: './crearclase.page.html',
  styleUrls: ['./crearclase.page.scss'],
})
export class CrearclasePage implements OnInit {
  faGraduationCap = faGraduationCap;
  faFistRaised = faFistRaised;
  faRunning = faRunning;
  total: any = 0;

  constructor(/*private _V: Vibration*/private _pS: PersonajesService, private _uS: UsuarioService) { }

  public clasecreada: clasecreada = {
    clase: '',
    fuerza: 0,
    destreza: 0,
    inteligencia: 0
  };


  crearclase( ) {
    console.log(this.clasecreada)
    setTimeout(() => {
      this._uS.getToken()
          .then((token) => {
              this._pS.newclase(
                  this.clasecreada.fuerza,
                  this.clasecreada.destreza,
                  this.clasecreada.inteligencia,
                  this.clasecreada.clase,
                  token)
                  .subscribe(resp => {
                          this.clasecreada = resp;
                          console.log(this.clasecreada);

                      }
                  );
                });
          }, 1000);
        }

cambiarfuerza(event: any) {
  this.total = 0;
  this.clasecreada.fuerza = event.detail.value;
  this.total = this.clasecreada.fuerza + this.clasecreada.destreza + this.clasecreada.inteligencia;
  console.log(this.total);
  //if (this.total > 3000) {
  //  this._V.vibrate(1000);
  //}

}


cambiardestreza(event: any) {
  this.total = 0;
  this.clasecreada.destreza = event.detail.value;
  this.total = this.clasecreada.fuerza + this.clasecreada.destreza + this.clasecreada.inteligencia;
  console.log(this.total);
  //if (this.total > 3000) {
  //  this._V.vibrate(1000);
  //}
}


cambiarinteligencia(event: any) {
  this.total = 0;
  this.clasecreada.inteligencia = event.detail.value;
  this.total = this.clasecreada.fuerza + this.clasecreada.destreza + this.clasecreada.inteligencia;
  console.log(this.total);
  //if (this.total > 3000) {
  //  this._V.vibrate(1000);
  //}

}

ngOnInit() {
  }

}
