export interface user {
    id?:number,
    codigo: number;
    nombre: string;
    password?: string;
    tipo: string;
}

export interface curso {
    nombreCurso?:string;
    codigo: number;
    nombre: string;
    profesorAsignado: string;
}