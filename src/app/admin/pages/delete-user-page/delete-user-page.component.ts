import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { user } from '../../interfaces/user-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AdminServiceService } from '../../services/admin-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteUserComponent } from '../../components/dialog-delete-user/dialog-delete-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user-page',
  templateUrl: './delete-user-page.component.html',
  styleUrls: ['./delete-user-page.component.css']
})
export class DeleteUserPageComponent implements OnInit {
  
   private myService = inject(AdminServiceService);
   public usuarios: user[]=[];
   private dialogo = inject(MatDialog);
   private _snackBar = inject(MatSnackBar);
   public dataSource = new MatTableDataSource<user>();
   public displayedColumns: string[] = ['codigo', 'nombre', 'tipo', 'eliminar'];
   @ViewChild(MatPaginator) paginator!: MatPaginator;

   ngOnInit(): void {
     this.traerUsuario();
   }

   onPageChange(event: PageEvent) {
     if(this.dataSource.paginator == null) return;
     this.dataSource.paginator.pageIndex = event.pageIndex;
     this.dataSource.paginator.pageSize = event.pageSize;
   }

   onDelete(user:user){
     this.dialogo
     .open(DialogDeleteUserComponent, {
       data: `Esta seguro que desea eliminar a ${user.nombre}`
     })
     .afterClosed().subscribe(
       (confirmado: Boolean) => {
         if(!confirmado) return; 

        this.myService.eliminarUsuario(user.codigo).subscribe(
          (res) =>{ 
            this._snackBar.open("Usuario eliminado", "😎", {
              duration: 1500,
              verticalPosition: "top"
            })
            this.traerUsuario();
           },
          (error)=>{
              console.log("Error", error)
          }
        )
       }
     )
   }
  
   traerUsuario():void{
    this.myService.traerUsuarios().subscribe((res) => {
      this.usuarios=res; 
      this.dataSource = new MatTableDataSource(this.usuarios) 
      this.dataSource.paginator= this.paginator;
      })
   }
}
