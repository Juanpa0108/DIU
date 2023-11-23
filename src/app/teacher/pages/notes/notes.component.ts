import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/admin/interfaces/user-data';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    {nombre:"Participación"}, 
    {nombre:"Opcional 1"}, 
    {nombre:"Opcional 2"}]
  public usuarios:user[] = []
  public step:number = 0
  public curso = sessionStorage.getItem('curso');
  private _snackBar = inject(MatSnackBar);
 
  ngOnInit(): void {
    this.nombre = sessionStorage.getItem('curso')
    this.myService.tablaCurso({nombre: this.nombre}).subscribe(res =>{
    })

    this.myService.traerEstudiantes().subscribe(res =>{
      this.usuarios = res
   
    })

  }

  onSave(){

    if(!this.myForm.valid) return;

    this.accordion.closeAll()
    
    const nombre = this.myForm.controls['seleccionarEstudiante'].value
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.nombre === nombre)

    if(usuarioEncontrado){
      const alumno = {'curso':this.curso, 'nombre':usuarioEncontrado.nombre, 'codigo':usuarioEncontrado.codigo}

      this.myService.addStudent(alumno).subscribe(
        (res)=> {
          //TODO: arreglar que no se puedan añadir usuarios ya existentes e la tabla
          this._snackBar.open("Usuario creado correctamente", "😅", {
            duration: 3000, 
            verticalPosition: "top",
          });
                },
        (err)=> { 
            console.log("error", err) 
                }
      )
    }
  }

  guardarNota(){
    this.accordion.closeAll()
    
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
