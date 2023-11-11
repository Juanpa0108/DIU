export interface user {
    id?:number,
    codigo: number;
    nombre: string;
    password?: string;
    tipo: string;
}

export interface curso {
    codigoCurso: number;
    nombreCurso: string;
    profesorAsignado: string;
}