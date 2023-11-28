import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { curso, user } from 'src/app/admin/interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  private http = inject(HttpClient)
  private url = "http://localhost/DIU/src/app/backend/teacher/"

  cursosDeProfesor(nombre:any):Observable<curso[]>{
    return this.http.post<curso[]>(`${this.url}courseByTeacher.php`, {nombre});
  }

  tablaCurso(nombre:any){
    const nombreSinComillas = nombre.nombre.replace(/^"(.*)"$/, '$1');
    return this.http.post<any>(`${this.url}tablaCursos.php`, {nombre: nombreSinComillas });
  }

  traerEstudiantes():Observable<any[]>{
    return this.http.get<any[]>(`${this.url}userBystudent.php`);
  }

  addStudent(estudiante:any):Observable<any>{
    const curoSinComillas= estudiante.curso.replace(/^"(.*)"$/, '$1');
    return this.http.post<any>(`${this.url}addStudent.php`, {curso: curoSinComillas, nombre:estudiante.nombre, codigo:estudiante.codigo});
  }

  verificarUsuaroExistente(user:any):Observable<any>{
    const curoSinComillas= user.curso.replace(/^"(.*)"$/, '$1');
    return this.http.post<any>(`${this.url}userByCode.php`, {curso:curoSinComillas, codigo:user.codigo});
  }

  addcolumn(curso:any):Observable<boolean>{
    const cursoSinComillas = curso.curso.replace(/^"(.*)"$/, '$1');
    const tipoSinComillas = curso.tipo.replace(/^"(.*)"$/, '$1');
    return this.http.post<boolean>(`${this.url}addcolumn.php`, {curso:cursoSinComillas, tipo:tipoSinComillas});
  }

  mostrarNombreColumnas(curso:any):Observable<string[]>{
    const cursoSinComillas = curso.curso.replace(/^"(.*)"$/, '$1');
    return this.http.post<string[]>(`${this.url}mostrarColumnas.php`, {curso:cursoSinComillas});
  }

  mostrarFilas(curso:any):Observable<string[]> {
    const cursoSinComillas = curso.curso.replace(/^"(.*)"$/, '$1');
    return this.http.post<string[]>(`${this.url}userByCourse.php`, {curso:cursoSinComillas});
  }
}
