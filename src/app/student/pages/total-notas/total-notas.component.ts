import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { user } from 'src/app/admin/interfaces/user-data';
import { StudentServiceService } from '../../services/studentService.service';

@Component({
  selector: 'app-total-notas',
  templateUrl: './total-notas.component.html',
  styleUrls: ['./total-notas.component.css']
})
export class TotalNotasComponent implements OnInit {
 
  public dataSource = new MatTableDataSource<user>();
  public displayedColumns: string[] = ['codigo', 'nombre', 'notaFinal'];
  public codigoEstudiante: number = Number(sessionStorage.getItem('codigo'));
  public studentService = inject(StudentServiceService);


  ngOnInit(): void {
    this.studentService.todasLasNotas({codigo: this.codigoEstudiante}).subscribe(res => {
      this.dataSource = new MatTableDataSource(res)
      console.log(res);
    }, (error) => {
      console.log(error)
    })
  }
  
}
