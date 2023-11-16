import { Component, OnInit, inject } from '@angular/core';
import { user } from 'src/app/admin/interfaces/user-data';
import { TeacherServiceService } from '../../services/teacher-service.service';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {

  private user!:any;
  private myService= inject(TeacherServiceService);

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user'); 
     this.myService.cursosDeProfesor(this.user.nombre).subscribe(res =>{
       console.log(res)
     },
     (error) => {console.log(error)})
  console.log(this.user)
 }

}
