import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthInterfaces } from '../interfaces/auth-interfaces';
import { user } from 'src/app/admin/interfaces/user-data';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  public url = 'http://localhost/DIU/src/app/backend/admin/';
  public url2 = 'http://localhost/DIU/src/app/backend/login/';

  consulta(data: AuthInterfaces):Observable<[]>{
    return this.http.post<[]>(`${this.url}readAdmin.php`, data);
  }

  userLogin(data:AuthInterfaces):Observable<user>{
    return this.http.post<user>(`${this.url2}userLogin.php`, data);
  }

  changePassword(formulario:AuthInterfaces):Observable<any>{
    return this.http.post<any>(`${this.url2}changePassword.php`, formulario);
  }
  
  

}
