import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {

  private http = inject(HttpClient)
  private url = "http://localhost/DIU/src/app/backend/teacher/"

  
}
