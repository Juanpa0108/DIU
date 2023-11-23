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

  traerEstudiantes():Observable<user[]>{
    return this.http.get<user[]>(`${this.url}userBystudent.php`);
  }

  addStudent(estudiante:any):Observable<any>{
    const curoSinComillas= estudiante.curso.replace(/^"(.*)"$/, '$1');
    return this.http.post<any>(`${this.url}addStudent.php`, {curso: curoSinComillas, nombre:estudiante.nombre, codigo:estudiante.codigo});
  }

}
