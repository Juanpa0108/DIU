import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/admin/interfaces/user-data';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


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
    {nombre:"Participacion"}, 
    {nombre:"Opcional 1"}, 
    {nombre:"Opcional 2"}]
  public usuarios:any[] = []
  public step:number = 0
  public curso = sessionStorage.getItem('curso');
  private _snackBar = inject(MatSnackBar);
  public data!:MatTableDataSource<any>
  
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  public filaSeleccionada: number = -1;
  public columnaSeleccionada: number = -1;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
 
  ngOnInit(): void {
    this.nombre = sessionStorage.getItem('curso')
    this.myService.tablaCurso({nombre: this.nombre}).subscribe(res =>{
    })

    this.myService.traerEstudiantes().subscribe(res =>{
      this.usuarios = res
      
    })

    this.myService.mostrarFilas({curso: this.nombre}).subscribe(res =>{
      this.data = new MatTableDataSource(res)
    })

    this.myService.mostrarNombreColumnas({curso: this.nombre}).subscribe(res =>{
      
      this.displayedColumns = res
    })

    this.data.sort = this.sort;

    
  }

  activarEdicion(indice: number){
    const nombreColumna = this.displayedColumns[indice];
    
    this.filaSeleccionada = indice
    console.log(this.filaSeleccionada, nombreColumna)
  }

  addColumn() {
    const value = this.myForm2.get('tipoNota')!.value
    this.displayedColumns.push(value.toLowerCase());
    this.data.data.forEach(item => item[value] = '');
    
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
  }

  guardarNota(){

    if(!this.myForm2.valid) return;
    this.accordion.closeAll()
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
