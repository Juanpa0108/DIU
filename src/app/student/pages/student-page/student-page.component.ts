import { Component, OnInit, inject } from '@angular/core';
import { StudentServiceService } from '../../services/studentService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {

  public userCodigo!:any;
  public imagenes:string[] = [
    'assets/imagenes/1.png',
    'assets/imagenes/2.png',
    'assets/imagenes/3.png',
    'assets/imagenes/4.png',
    'assets/imagenes/5.png',
    'assets/imagenes/6.png'
  ];
  public studentService = inject(StudentServiceService);
  public cursos:string[] = [];
  private router = inject(Router);

  ngOnInit(): void {
    this.userCodigo = sessionStorage.getItem('codigo');

    this.studentService.traerCursos({codigo: this.userCodigo}).subscribe(
      res => {
        this.cursos = res.filter(curso => curso !== "usuarios");
        console.log(this.cursos);
      }
    )
  }

  asignarImagen(): string{
    if(this.imagenes.length == 0) return '';
  
    const indiceAleatorio = Math.floor(Math.random()*this.imagenes.length)
    return this.imagenes[indiceAleatorio]
   }

   enviarACurso(index:any): void{
    sessionStorage.setItem('curso', JSON.stringify(index))
    this.router.navigateByUrl('/student/calificaciones')
   }

}
