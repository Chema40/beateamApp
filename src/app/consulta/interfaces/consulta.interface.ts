export interface Respuesta{

    status?: number;
    message?: string;
    data: Datos[];
}

export interface Datos {
    id?:             string;
    referencia?:     string;
    logo?:           string;
    usuario?:        string;
    observacion?:    string;
    cantidad?:       string;
    estado?:         string;
    fecha?:          Date;
    tipo?:           string;
    codigo_cliente?: string;
    alias_cliente?:  string;

}

export interface Filtro {
    cliente: string;
    referencia: string;
    usuario: string;
    fecha1: Date;
    fecha2: Date;
    tipo: string;
    pendiente: boolean;
    recogiendo: boolean;
    recogida: boolean;
    desconsolidando: boolean;
    desconsolidada:boolean;
    entregada: boolean;
    inidicencia: boolean;
}