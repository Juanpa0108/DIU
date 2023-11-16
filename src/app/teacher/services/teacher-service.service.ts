import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { curso } from 'src/app/admin/interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  private http = inject(HttpClient)
  private url = "http://localhost/DIU/src/app/backend/teacher/"

  cursosDeProfesor(nombre:string):Observable<curso[]>{
    return this.http.post<curso[]>(`${this.url}courseByTeacher.php`, {nombre});
  }
}
