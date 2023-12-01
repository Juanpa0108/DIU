import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentServiceService } from '../../services/studentService.service';

@Component({
  selector: 'app-calificaciones-student',
  templateUrl: './calificaciones-student.component.html',
  styleUrls: ['./calificaciones-student.component.css']
})
export class CalificacionesStudentComponent implements OnInit {

  public curso!:any;
  public codigo!:any;
  public data!:MatTableDataSource<any>
  displayedColumns: string[] = [];
  public studentService = inject(StudentServiceService);

  ngOnInit(): void {
    this.curso = sessionStorage.getItem('curso');
    this.codigo = sessionStorage.getItem('codigo');

    this.studentService.datosTablaEstudiante({nombre: this.curso, codigo:this.codigo}).subscribe(
      res => {
        this.data = new MatTableDataSource(res);
      }
    )

    this.studentService.mostrarNombreColumnas({curso: this.curso}).subscribe(
      res => {
        this.displayedColumns = res
      }
    )
  }

}
