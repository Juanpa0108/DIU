import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user, curso } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  public url: string = 'http://localhost/DIU/src/app/backend/admin/';

  crearUsuario(form: user): Observable<[]>{
    return this.http.post<[]>(`${this.url}createUser.php`, form);
  }

  crearCurso(form: curso): Observable<[]>{
    return this.http.post<[]>(`${this.url}createCourse.php`, form);
  }

  traerUsuarios(): Observable<user[]>{
    return this.http.get<user[]>(`${this.url}allUsers.php`);
  }

  traerCursos(): Observable<curso[]>{
    return this.http.get<curso[]>(`${this.url}allCourses.php`);
  }

  traerProfesor(): Observable<user[]> {
    return this.http.get<user[]>(`${this.url}userByteacher.php`)
  }

}