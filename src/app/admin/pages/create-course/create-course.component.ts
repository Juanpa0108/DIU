import { Component, OnInit, inject } from '@angular/core';
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

  private myService = inject(AdminServiceService);
  private fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);
  public myForm:FormGroup = this.fb.group({
    codigoCurso: ['', [ Validators.required, Validators.pattern('^[0-9]{4}$') ]],
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
    if(! this.myForm.valid) return;

    this.myService.courseId(this.myForm.get('codigoCurso')!.value).subscribe(res =>{
      if(!res){
        this.myService.crearCurso(this.myForm.value).subscribe(res=> {})
        this._snackBar.open("Curso creado correctamente", "😊", {
          duration: 3000, 
          verticalPosition: "top",
        });
        this.myForm.reset({codigoCurso: '', nombre:'', profesorAsignado: ''});
        this.myForm.valid == true;
      }else{
        this._snackBar.open("El curso ya existe", "😅", {
          duration: 3000, 
          verticalPosition: "top",
        });
      }
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

        case 'pattern':
          return 'Este campo solo admite 4 digitos';

      }
    }

    return null;

  }

}