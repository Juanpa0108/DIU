import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthInterfaces } from '../interfaces/auth-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  public url = 'http://localhost/proyectoDIU/src/app/backend/admin/';

  consulta(data: AuthInterfaces):Observable<[]>{
    return this.http.post<[]>(`${this.url}readAdmin.php`, data);
  }

}
