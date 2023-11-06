import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';
import { Router } from '@angular/router';

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
    private route: Router
    
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

    //arreglar el error con el manejo de los datos
    this.miService.changePassword(this.cambiarContrasenia.value).subscribe( (data) => {
      this._snackBar.open("Usario no encontrado", "😶‍🌫️", {
        duration: 3000, 
        verticalPosition: "top",
      });
    },(error)=>{
      
        this._snackBar.open("Cambio de contraseña exitoso", "😁", {
          duration: 3000, 
          verticalPosition: "top",
        });
    })
    this.route.navigate(['/auth/login'])
  }

}
