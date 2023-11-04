import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  
  constructor(
    private fb:FormBuilder,
    private miService:AuthServiceService,
    private _snackBar: MatSnackBar,
    
  ){}

  // private miService = inject(AuthServiceService);
  // private fb = inject(FormBuilder);
  public hide:boolean = true;

  public cambiarContrasenia:FormGroup = this.fb.group({
    codigoUsuario: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]]
  })


  onLogin(){
    if(!this.cambiarContrasenia.valid) return;

    
    this.miService.changePassword(this.cambiarContrasenia.value).subscribe( (data) => {
      
    },(error)=>{
      this._snackBar.open("Cambio de contraseña exitoso", "😁", {
        duration: 3000, 
        verticalPosition: "top",
      });
    })
  }

}
