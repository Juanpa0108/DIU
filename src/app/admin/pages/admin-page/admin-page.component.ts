import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  codigo: number;
  Tipo: string;
  Nombre: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {codigo: 1, Tipo: 'Hydrogen', Nombre: 'Mbappe'},
  {codigo: 2, Tipo: 'Helium', Nombre: 'Mbappe'},
  {codigo: 3, Tipo: 'Lithium', Nombre: 'Mbappe'},
  {codigo: 4, Tipo: 'Beryllium', Nombre: 'Mbappe'},
  {codigo: 1, Tipo: 'Hydrogen', Nombre: 'Mbappe'},
  {codigo: 2, Tipo: 'Helium', Nombre: 'Mbappe'},
  {codigo: 3, Tipo: 'Lithium', Nombre: 'Mbappe'},
  {codigo: 4, Tipo: 'Beryllium', Nombre: 'Mbappe'},
];

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator= this.paginator;
  }

  displayedColumns: string[] = ['codigo', 'Tipo', 'Nombre'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


}
