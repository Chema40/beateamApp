export interface Respuesta{

    status?: number;
    message?: string;
    data: Datos[];
}

export interface Consulta{
    fecha?: {
        inicio?: string,
        final?: string,
    },
    referencia?: string,
    cliente?:string,
    usuario?:string,
    estado?: string[],
    tipo?:string[],
}

export interface Tipos{
    status?: number;
    message?: string;
    data: string[];
}

export interface Estados{
    status?: number;
    message?: string;
    data: string[];
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
    fecha1: string;
    fecha2: string;
    tipo: string;
    estado: string[];
}