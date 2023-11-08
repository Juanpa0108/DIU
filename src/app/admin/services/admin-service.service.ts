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
  public url2 = 'http://localhost/DIU/src/app/backend/login/';

  
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

  userId(codigo: string): Observable<user>{
    return this.http.post<user>(`${this.url2}userByCode.php`, {codigo});
  }

  courseId(codigo: string): Observable<curso>{
    return this.http.post<curso>(`${this.url2}courseByCode.php`, {codigo});
  }

  eliminarUsuario(codigo:number):Observable<any>{
    return this.http.post<any>(`${this.url}deleteUser.php`, {codigo});
  }

}
