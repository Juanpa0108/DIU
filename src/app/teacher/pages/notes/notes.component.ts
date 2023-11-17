import { Component, OnInit, inject } from '@angular/core';
import { TeacherServiceService } from '../../services/teacher-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  private nombre:any;
  private myService = inject(TeacherServiceService)

  ngOnInit(): void {
    this.nombre = sessionStorage.getItem('curso')
    this.myService.tablaCurso({nombre: this.nombre}).subscribe(res =>{
      console.log(res)
    })

  }

}
