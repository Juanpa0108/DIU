import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { user } from 'src/app/admin/interfaces/user-data';

@Component({
  selector: 'app-total-notas',
  templateUrl: './total-notas.component.html',
  styleUrls: ['./total-notas.component.css']
})
export class TotalNotasComponent {
  public dataSource = new MatTableDataSource<user>();
  public displayedColumns: string[] = ['codigo', 'nombre', 'notaFinal'];

  
}
