import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { user, curso } from '../../interfaces/user-data';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit{

  private myService = inject(AdminServiceService);
  public usuarios: user[]=[];
  public dataSource = new MatTableDataSource<user>();
  public cursos: curso[]=[];
  public dataCurso!:MatTableDataSource<curso>;
  public displayedColumns: string[] = ['codigo', 'nombre', 'tipo'];
  public columCursos: string[]= ['codigo', 'nombreCurso', 'profesorAsignado'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('paginador') paginador!: MatPaginator;

  ngOnInit(): void {
    
      this.myService.traerUsuarios().subscribe((res) => {
        this.usuarios=res; 
        this.dataSource = new MatTableDataSource(this.usuarios) 
        this.dataSource.paginator= this.paginator;
      })

      this.myService.traerCursos().subscribe((res) => {
        this.cursos=res; 
        this.dataCurso = new MatTableDataSource(this.cursos); 
        this.dataCurso.paginator = this.paginador;
      })
    }

  onPageChange(event: PageEvent) {
    if(this.dataSource.paginator == null) return;
    this.dataSource.paginator.pageIndex = event.pageIndex;
    this.dataSource.paginator.pageSize = event.pageSize;
  }

 


}
