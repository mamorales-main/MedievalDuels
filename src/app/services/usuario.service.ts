import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import {EditarInterface, GetDetallesInterface, ImagenInterface, UserInterface, UsuarioInterface, TokenInterface} from '../models/LoginInterface';
import {Storage} from '@ionic/storage';
import {promise} from 'selenium-webdriver';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  ruta: string;
  params: string;
  usuarioSt: UsuarioInterface = {
    nombre: '',
    apellidos: '',
    telefono: '',
    pais: '',
    login: '',
    img: '',
    token: '',
    rol: ''


  };
  imageni: ImagenInterface = {
    login: '',
    base64: '',
    status: ''
  };

  constructor(private http: HttpClient, private _st: Storage) { }
  getStorage(parametro) {
    return new Promise<UsuarioInterface> (
        resolve => {
          this._st.get('user').then((val) => {
            resolve(val);
          });
        });
  }
  getToken() {
    return this._st.get('token');
  }

  login(login: string, password: string) {
    const data = { login, password };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/login`;

    return (this.http.post<UserInterface>(this.ruta, this.params, this.httpOptions));
  }


  registro(login: string, password: string, nombre: string, apellidos: string, pais: string, telefono: string) {
    const data = { login, password, nombre, apellidos, pais, telefono };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/register`;

    return (this.http.post<UserInterface>(this.ruta, this.params, this.httpOptions));
  }

  getdetalles(login: string, token: string) {
    const data = { login, token };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/usuario/getdetalles`;

    return (this.http.post<GetDetallesInterface>(this.ruta, this.params, this.httpOptions));
  }
  editar(login: string, password: string, nombre: string, apellidos: string, pais: string, telefono: string, token: string) {
    const data = { login, password, nombre, apellidos, pais, telefono, token };
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/usuario/update`;

    return (this.http.post<EditarInterface>(this.ruta, this.params, this.httpOptions));
  }

  imagen(login: string, base64: string, token: string) {
    const data = {login, base64, token};
    let datos = JSON.stringify(data);
    this.params = `data=${datos}`;
    this.ruta = `${URL}/imagen`;

    return (this.http.post<ImagenInterface>(this.ruta, this.params, this.httpOptions));
  }

}






