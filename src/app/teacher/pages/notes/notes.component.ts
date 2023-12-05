import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/admin/interfaces/user-data';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { SubirNotaComponent } from '../../components/subir-nota/subir-nota.component';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  private nombre:any;
  private myService = inject(TeacherServiceService)
  private fb = inject(FormBuilder);
  public myForm:FormGroup = this.fb.group({
    seleccionarEstudiante: ['', [ Validators.required]]
  })
  public myForm2:FormGroup = this.fb.group({
    tipoNota: ['', [ Validators.required ]],
    porcentaje: ['', [ Validators.required ]]
  })
  public tiposNota=[
    {nombre:"Taller"}, 
    {nombre:"Quiz"}, 
    {nombre:"Parcial 1"}, 
    {nombre:"Parcial 2"}, 
    {nombre:"Participacion"}]
  public usuarios:any[] = []
  public step:number = 0
  public curso = sessionStorage.getItem('curso');
  private _snackBar = inject(MatSnackBar);
  public data!:MatTableDataSource<any>
  
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  public filaSeleccionada: any 
  public columnaSeleccionada: number = -1;
  public nombreColumna:string = "";
  private dialogo = inject(MatDialog);
  public camposDinamicos: { [nombreCampo: string]: number } = {};
  public datosTabla:any 
  public camposExcluidos:string[] = ['id', 'nombre', 'codigo', 'notaFinal']

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
 
  ngOnInit(): void {
    this.nombre = sessionStorage.getItem('curso')
    this.myService.tablaCurso({nombre: this.nombre}).subscribe(res =>{
    })

    this.completarTabla()

    //this.data.sort = this.sort;
    const camposDinamicosString = localStorage.getItem('camposDinamicos')
    if(camposDinamicosString){
      this.camposDinamicos = JSON.parse(camposDinamicosString)
    }
    
  }

  // calcularPromedioPonderado(datos:any[], camposDinamicos:{[nombreCampo:string]:number}, camposExcluidos:string[]=[]):{totalPonderado:number, promedio:number}{
  //   const totalPonderado = datos.reduce((total, fila)=>{
  //     const sumaPonderada = Object.keys(fila).reduce((suma, columna)=>{
  //       if(!camposExcluidos.includes(columna)){
  //         const valorNumerico = parseFloat(fila[columna]) || 0;
  //         return suma + valorNumerico * (camposDinamicos[columna]/100);
  //       }
  //       return suma;
  //     },0);
  //     return total + sumaPonderada;
  //   },0);
  //   const numeroCampos = Object.keys(camposDinamicos).length - camposExcluidos.length;
  //   const promedio = totalPonderado / (numeroCampos || 1);
  //   return {totalPonderado, promedio}; 
  // }

  obtenerEntradasCamposDinamicos(): { nombreCampo: string; porcentaje: number }[] {
    return Object.entries(this.camposDinamicos).map(([nombreCampo, porcentaje]) => ({ nombreCampo, porcentaje }));
  }

  agregarCampoDinamico() {

    const nombreCampo = this.myForm2.get('tipoNota')?.value as string;
    const porcentaje = this.myForm2.get('porcentaje')?.value as number;

    // Verificar que el nombre del campo no esté vacío y que el porcentaje sea válido
    if (nombreCampo && !isNaN(porcentaje)) {
      this.camposDinamicos[nombreCampo] = porcentaje;
      localStorage.setItem('camposDinamicos', JSON.stringify(this.camposDinamicos))
    } else {
      console.error('Nombre del campo o porcentaje inválido');
    }
}

  completarTabla(){
    this.myService.traerEstudiantes().subscribe(res =>{
      this.usuarios = res
      
    })

    this.myService.mostrarFilas({curso: this.nombre}).subscribe(res =>{
      this.data = new MatTableDataSource(res)
      this.datosTabla = res
    })

    this.myService.mostrarNombreColumnas({curso: this.nombre}).subscribe(res =>{
      this.displayedColumns = res
    })
  }

  activarEdicion(indice: number){
    this.filaSeleccionada = indice
    const nombre = this.filaSeleccionada.nombre
    this.subirNota({nombre: nombre, nota: this.nombreColumna, tabla: this.curso, porcentaje: this.camposDinamicos})
  }

  subirNota(data: any){
    this.dialogo
     .open(SubirNotaComponent, {
       data: data,
     })
     .afterClosed().subscribe(
       (confirmado: Boolean) => {
         if(!confirmado) return; 
        
         this.completarTabla()
        })
  }

  nombreDColumna(indice: number){
    this.nombreColumna = this.displayedColumns[indice]
  }

  addColumn() {
    const value = this.myForm2.get('tipoNota')!.value
    this.displayedColumns.push(value.toLowerCase());
    this.data.data.forEach(item => item[value] = '');
    this.completarTabla()
    //this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  onSave(){

    if(!this.myForm.valid) return;

    this.accordion.closeAll()
    
    const nombre = this.myForm.controls['seleccionarEstudiante'].value
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.nombre === nombre)

    if(usuarioEncontrado){
      const alumno = {'curso':this.curso, 'nombre':usuarioEncontrado.nombre, 'codigo':usuarioEncontrado.codigo}

      this.myService.verificarUsuaroExistente({curso:this.curso, codigo:usuarioEncontrado.codigo}).subscribe(res =>{
        if(!res){
          this.myService.addStudent(alumno).subscribe(
               (res)=> {
                  this._snackBar.open("Usuario ingresado", "😶‍🌫️", {
                    duration: 3000, 
                    verticalPosition: "top",
                  });
               
                       },
               (err)=> { 
                   console.log("error", err) 
                       }
            )
        }else{
          this._snackBar.open("Usuario ya existe", "😅", {
            duration: 3000, 
            verticalPosition: "top",
          });
        }
      })
    }

    this.completarTabla()
  }

  guardarNota(){

    if(!this.myForm2.valid) return;
    this.accordion.closeAll()
    this.agregarCampoDinamico();
    
    const tipo = this.myForm2.get('tipoNota')?.value.replace(/\s/g, '');
    this.myService.addcolumn({curso:this.nombre, tipo:tipo}).subscribe(res =>{
      console.log(res)
       this._snackBar.open("Campo agregado correctamente", "😎", {
         duration: 3000, 
         verticalPosition: "top",
       });
    }, (error)=>{
      this._snackBar.open("Este campo ya existe", "🙄", {
        duration: 3000, 
        verticalPosition: "top",
      });
    })

    this.completarTabla()
  }

  isValidField( field:string ){
    return this.myForm.controls[field].errors 
        && this.myForm.controls[field].touched;
  }

  getFieldError(field:string):string | null{

    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
            return 'Este campo es requerido';

      }
    }

    return null;

  }

  isValidField2( field:string ){
    return this.myForm2.controls[field].errors 
        && this.myForm2.controls[field].touched;
  }

  getFieldError2(field:string):string | null{

    if( !this.myForm2.controls[field] ) return null;

    const errors = this.myForm2.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
            return 'Este campo es requerido';

      }
    }

    return null;

  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
