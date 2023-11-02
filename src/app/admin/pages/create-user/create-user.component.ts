import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  constructor(
    private myService:AdminServiceService,
      private fb:FormBuilder,
      private _snackBar: MatSnackBar,
      private authService:AuthServiceService
    ){}

public myForm:FormGroup = this.fb.group({
codigoUsuario: ['', [ Validators.required, Validators.pattern('^[0-9]{7}$') ]],
usuario: ['', [ Validators.required ]],
password: ['', [ Validators.required ]],
rol: ['', [ Validators.required]],
})

//public valor:number = 0;

onSave(){
  if(!this.myForm.valid) return;
    //this.valor=this.myForm.get('codigoUsuario')?.value
  this.authService.confirmPassword(this.myForm.get('codigoUsuario')?.value).subscribe( res => {
    if(res){
      this.myService.crearUsuario(this.myForm.value).subscribe(res => {});
      this._snackBar.open("Usuario creado correctamente", "😊", {
        duration: 3000, 
        verticalPosition: "top",
      });
      this.myForm.reset({codigoUsuario: '', usaurio:'', password: '', rol:''});
      this.myForm.valid == true;
    }else{
      this._snackBar.open("Usuario ya existente", "😅", {
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
        return 'este campo solo admite 7 digitos';

    }
  }

  return null;

}

}
