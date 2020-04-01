export interface LoginInterface {
    login: string;
    password: string;
}
export interface UsuarioInterface {
    login: string;
    token: string;
    nombre: string;
    apellidos: string;
    pais: string;
    telefono: string;
    img: string;
    rol: string;
}
export interface UserInterface {
    status?: string;
    token?: string;
    user: UsuarioInterface;

}
export interface TokenInterface {
    token?: string;
}
export interface DetallesInterface {
    login: LoginInterface;
    password: string;
    nombre: string;
    apellidos: string;
    pais: string;
    telefono: string;
    img: string;
    rol: string;
}
export interface GetDetallesInterface {
    status?: string;
    detallesusuario: DetallesInterface;


}
export interface EditarInterface {
    login: string;
    password: string;
    nombre: string;
    apellidos: string;
    pais: string;
    telefono: string;
}

export interface ImagenInterface {
    login: string;
    base64: string;
    status: any;
}




