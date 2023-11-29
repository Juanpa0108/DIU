import { Component, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteUserComponent } from 'src/app/admin/components/dialog-delete-user/dialog-delete-user.component';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subir-nota',
  templateUrl: './subir-nota.component.html',
  styleUrls: ['./subir-nota.component.css']
})
export class SubirNotaComponent {
  constructor(
    public dialogo: MatDialogRef<DialogDeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    public campoNota: any
    public servicio = inject(TeacherServiceService) 
    private _snackBar = inject(MatSnackBar);

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.servicio.actualizarNota({curso: this.data.tabla, campo: this.data.nota, nota: this.campoNota, nombre: this.data.nombre}).subscribe(res => {
        this._snackBar.open("Nota registrada", "🫡", {
          duration: 3000, 
          verticalPosition: "top",
        });
      })
      this.dialogo.close(true);

    }
}
