import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private http = inject(HttpClient);
  private url = "http://localhost/DIU/src/app/backend/student/";

  traerCursos(codigo:any):Observable<string[]>{
    const codigoSinComillas = codigo.codigo.replace(/^"(.*)"$/, '$1');
    return this.http.post<string[]>(`${this.url}consultarTabla.php`, {codigo:codigoSinComillas})
  }

  datosTablaEstudiante(params:any):Observable<any>{
    const codigoSinComillas = params.codigo.replace(/^"(.*)"$/, '$1');
    const nombreSinComillas = params.nombre.replace(/^"(.*)"$/, '$1');
    return this.http.post(`${this.url}datosTablaEstudiante.php`, {nombre:nombreSinComillas, codigo:codigoSinComillas})
  }

  mostrarNombreColumnas(curso:any):Observable<string[]>{
    const cursoSinComillas = curso.curso.replace(/^"(.*)"$/, '$1');
    return this.http.post<string[]>(`${this.url}mostrarColumnaEstudiante.php`, {curso:cursoSinComillas});
  }

  todasLasNotas(data:any):Observable<any>{
    return this.http.post(`${this.url}todasLasNotas.php`, {codigo:data.codigo})
  }

}
