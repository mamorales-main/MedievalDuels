
export interface PersonajeInterface {
    login: string;
    nombre: string;
    personajes: any;

}
export interface PreInterface {
    status?: string;
    personajes: PersonajeInterface;
}
export interface PersonajeDetallesInterface {
    login: string;
    nombre: string;
    nivel: number;
    clase: string;
    fuerza: number;
    destreza: number;
    inteligencia: number;
    exp: number;
    expreq: number;
    saldo: number;
}
export interface PostInterface {
    status?: string;
    personajesdetalles: PersonajeDetallesInterface;
}
export interface PersonajeCreado {
    login: string;
    nombre: string;
    nivel: number;
    clase: string;
    fuerza: number;
    destreza: number;
    inteligencia: number;
}
export interface PersonajePlantilla {
    nivel: number;
    clase: string;
    fuerza: number;
    destreza: number;
    inteligencia: number;
}

export interface PlantillaSeleccionada {
    status: string;
    plantillaseleccionada: Array<PlantillaActualmente>;
}
export interface PlantillaActualmente {
    nivel: number;
    clase: string;
    fuerza: number;
    destreza: number;
    inteligencia: number;
}

export interface EstadoInterface {
    status: string;
}

export interface clasecreada {
    clase: string;
    fuerza: number;
    destreza: number;
    inteligencia: number;
}