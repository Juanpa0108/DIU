import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';
import { user } from '../../interfaces/user-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor( 
    private myService:AdminServiceService,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar
    ){}

    public myForm:FormGroup = this.fb.group({
    codigoCurso: [0, [ Validators.required, Validators.max(9999) ]],
    nombre: ['', [ Validators.required ]],
    profesorAsignado: ['', [ Validators.required ]],
    })

    public teacher:user[] = []

  ngOnInit(): void {
    this.myService.traerProfesor().subscribe( res => {
      this.teacher = res
    })
  }

onSave(){
  if(this.myForm.valid){


  this.myService.crearCurso(this.myForm.value).subscribe(res=> {})
  this._snackBar.open("Curso creado correctamente", "😊", {
    duration: 3000, 
    verticalPosition: "top",
  });
  this.myForm.reset({codigoCurso: '', nombre:'', profesorAsignado: ''});
  this.myForm.valid == true;
}else{
  console.log("asdad");
  console.log(this.myForm.controls['codigoCurso'].errors)
}

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
      
      case 'max':
        return 'Maximo 4 caracteres'

    }
  }

  return null;

}

}
