import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { user, curso } from '../../interfaces/user-data';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements AfterViewInit, OnInit{
  constructor(
    private myService: AdminServiceService
  ){}

  public usuarios: user[]=[]
  dataSource = new MatTableDataSource<user>([]);

  public cursos: curso[]=[]
  dataCurso = new MatTableDataSource<curso>([]);

  ngOnInit(): void {
    this.myService.traerUsuarios().subscribe((res) => {
      this.usuarios=res; 
      this.dataSource = new MatTableDataSource(this.usuarios); })

    this.myService.traerCursos().subscribe((res) => {
      this.cursos=res; 
      this.dataCurso = new MatTableDataSource(this.cursos); })
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild('paginator') paginator!:MatPaginator;
  // @ViewChild('paginador') paginador!:MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator= this.paginator;
    //this.dataCurso.paginator= this.paginador;
  }

  displayedColumns: string[] = ['codigo', 'nombre', 'tipo'];
  columCursos: string[]= ['codigo', 'nombreCurso', 'profesorAsignado'];


}
