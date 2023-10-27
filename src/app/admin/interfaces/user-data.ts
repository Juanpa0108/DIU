export interface user {
    codigo: number;
    nombre: string;
    password?: string;
    tipo: string;
}

export interface curso {
    codigoCurso: number;
    nombre: string;
    profesorAsignado: string;
}