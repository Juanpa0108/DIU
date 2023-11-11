export interface user {
    id?:number,
    codigo: number;
    nombre: string;
    password?: string;
    tipo: string;
}

export interface curso {
    codigo: number;
    nombre: string;
    profesorAsignado: string;
}