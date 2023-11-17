import { Component, OnInit, inject } from '@angular/core';
import { curso, user } from 'src/app/admin/interfaces/user-data';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {

  private user!:any;
  private myService= inject(TeacherServiceService);
  public cursos:curso[] = [];
  public imagenes:string[] = [
    'assets/imagenes/1.png',
    'assets/imagenes/2.png',
    'assets/imagenes/3.png',
    'assets/imagenes/4.png',
    'assets/imagenes/5.png',
    'assets/imagenes/6.png'
  ];
  private router = inject(Router)

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user'); 

     this.myService.cursosDeProfesor(this.user).subscribe(res =>{
       this.cursos = res;
     },
     (error) => {console.log("error",error)})
  // console.log(this.user)
 }

 asignarImagen(): string{
  if(this.imagenes.length == 0) return '';

  const indiceAleatorio = Math.floor(Math.random()*this.imagenes.length)
  return this.imagenes[indiceAleatorio]
 }
 
 enviarACurso(index:any): void{
  sessionStorage.setItem('curso', JSON.stringify(index))
  this.router.navigateByUrl('/teacher/notes')
 }

}
