import { clasecreada } from './../models/PersonajeInterface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import {EstadoInterface, PersonajeCreado, PersonajeInterface, PersonajePlantilla, PostInterface} from '../models/PersonajeInterface';
import {Storage} from '@ionic/storage';
import {UsuarioInterface} from '../models/LoginInterface';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  token: string = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };
  ruta: string;
  params: string;
  personajeSt: PersonajeInterface = {
    nombre: '',
    login: '',
    personajes: ''
  };
  estado: EstadoInterface = {
    status: ''
  };
  constructor(private http: HttpClient, private _st: Storage) { }

  getStorage(parametro) {
    return new Promise<UsuarioInterface> (
        resolve => {
          this._st.get('personajeseleccionado').then((val) => {
            resolve(val);
          });
        });
  }
  public getpersonajes(login: string, token: string) {
    const data = { login, token };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/seleccionpersonaje`;

    return (this.http.post<PersonajeInterface>(this.ruta, this.params, this.httpOptions));
  }
  public getdetallespersonajes(nombre: string, token: string) {
    const data = { nombre, token };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/detallespersonajes`;

    return (this.http.post<PostInterface>(this.ruta, this.params, this.httpOptions));
  }
  public getplantillas(token: string) {
    const tk = { token };
    let datos = JSON.stringify(tk);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/personajeplantillas`;

    return (this.http.post<PersonajePlantilla>(this.ruta, this.params, this.httpOptions));
  }

  public getplantillaseleccionada(clase: string, token: string) {
    const data = { clase, token };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/getplantilla`;

    return (this.http.post<PersonajePlantilla>(this.ruta, this.params, this.httpOptions));
  }

  newpersonaje(login: string,
               nombre: string,
               nivel: number,
               clase: string,
               fuerza: number,
               destreza: number,
               inteligencia: number,
               token: string) {
    const data = { login, nombre, nivel, clase, fuerza, destreza, inteligencia, token };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/newpersonaje`;

    return (this.http.post<PersonajeCreado>(this.ruta, this.params, this.httpOptions));
  }

  tap(nombre: string) {
    const data = { nombre };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/tap`;

    return (this.http.post<EstadoInterface>(this.ruta, this.params, this.httpOptions));
  }
  reward(nombre: string) {
    const data = { nombre };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/reward`;

    return (this.http.post<EstadoInterface>(this.ruta, this.params, this.httpOptions));
  }
  newclase(
    fuerza: number,
    destreza: number,
    inteligencia: number,
    clase: string,
    token: string) {
const data = { clase, fuerza, destreza, inteligencia, token };
let datos = JSON.stringify(data);
this.params = `data=${datos}`;
this.ruta = `${URL}/crearclase`;

return (this.http.post<clasecreada>(this.ruta, this.params, this.httpOptions));
}
}
