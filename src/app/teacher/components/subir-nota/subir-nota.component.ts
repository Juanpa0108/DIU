import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDeleteUserComponent } from 'src/app/admin/components/dialog-delete-user/dialog-delete-user.component';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subir-nota',
  templateUrl: './subir-nota.component.html',
  styleUrls: ['./subir-nota.component.css']
})
export class SubirNotaComponent implements OnInit {
  constructor(
    public dialogo: MatDialogRef<DialogDeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
 
    public campoNota: any
    public servicio = inject(TeacherServiceService) 
    private _snackBar = inject(MatSnackBar);
    public camposDinamicos: { [nombreCampo: string]: number } = this.data.porcentaje;
    public nombreCampo:string = this.data.nota;
    public sumaCampos:number = 0;
    public sumaPorcentajes:number = 0;


    ngOnInit(): void {
      const nota = sessionStorage.getItem('notaFinal');
      this.sumaCampos = Number(nota);

      const porcentaje = sessionStorage.getItem('porcentajes');
      this.sumaPorcentajes = Number(porcentaje); 

    }



    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
        this.servicio.actualizarNota({curso: this.data.tabla, campo: this.data.nota, nota: this.campoNota, nombre: this.data.nombre}).subscribe(res => {
          this.calcularPonderacion(this.campoNota, this.data.nota);
          this._snackBar.open("Nota registrada", "🫡", {
            duration: 3000, 
            verticalPosition: "top",
          });
        })
        this.dialogo.close(true);
       this.calcularPonderacion(this.campoNota, this.nombreCampo);
      
      

    }

    calcularPonderacion(nota: number, nombreKey: string): void {
      let sumaCampos = 0;
      let sumaPorcentajes = 0;
      let ponderacionTotal = 0;
  
      if (this.camposDinamicos.hasOwnProperty(nombreKey)) {
        const porcentaje = this.camposDinamicos[nombreKey];


        sumaCampos = (nota * porcentaje)  + this.sumaCampos;
        if(sumaPorcentajes < 100){
          sumaPorcentajes = (porcentaje * 1) + this.sumaPorcentajes;
          sessionStorage.setItem('porcentajes', JSON.stringify(sumaPorcentajes));
          sessionStorage.setItem('notaFinal', JSON.stringify(sumaCampos));

          ponderacionTotal = sumaCampos/sumaPorcentajes;
        }else{
          sessionStorage.setItem('porcentajes', JSON.stringify(sumaPorcentajes));
          sessionStorage.setItem('notaFinal', JSON.stringify(sumaCampos));
  
          ponderacionTotal = sumaCampos/sumaPorcentajes;
        }
        
      } else {
        console.error(`La key "${nombreKey}" no existe en el objeto.`);
      }
      

      this.servicio.subirNotaFinal({curso:this.data.tabla, notaFinal: ponderacionTotal , nombre:this.data.nombre, }).subscribe(res => {
        console.log(res)
      }, (error) => {
        console.log(error);
      })
      
    }



}
