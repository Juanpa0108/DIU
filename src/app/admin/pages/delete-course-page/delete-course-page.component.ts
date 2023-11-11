import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { curso } from '../../interfaces/user-data';
import { AdminServiceService } from '../../services/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteUserComponent } from '../../components/dialog-delete-user/dialog-delete-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-course-page',
  templateUrl: './delete-course-page.component.html',
  styleUrls: ['./delete-course-page.component.css']
})
export class DeleteCoursePageComponent implements OnInit{
  
  public cursos: curso[]=[];
  public dataCurso!:MatTableDataSource<curso>;
  public columCursos: string[]= ['codigo', 'nombreCurso', 'profesorAsignado', 'eliminar'];
  private myService = inject(AdminServiceService);
  private dialogo = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  @ViewChild('paginador') paginador!: MatPaginator;

  ngOnInit(): void {

    this.myService.traerCursos().subscribe((res) => {
      this.cursos=res; 
      this.dataCurso = new MatTableDataSource(this.cursos); 
      this.dataCurso.paginator = this.paginador;
    })
  }

  onPageChange(event: PageEvent) {
    if(this.dataCurso.paginator == null) return;
    this.dataCurso.paginator.pageIndex = event.pageIndex;
    this.dataCurso.paginator.pageSize = event.pageSize;
  }

  onDelete(curso: curso){
    this.dialogo
    .open(DialogDeleteUserComponent, {
      data: `Esta seguro que desea eliminar el curso de ${curso.nombreCurso}`
    })
    .afterClosed().subscribe(
      (confirmado: Boolean) => {
        if(!confirmado) return; 

        this.myService.eliminarCurso(curso.codigoCurso).subscribe(
          (res) =>{console.log('respuesta', res) },
          (error)=>{
            console.log('error', error)
          }
        )
      }
    )
  }
}
