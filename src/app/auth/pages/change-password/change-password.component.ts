import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  
  constructor(
    private fb:FormBuilder,
    private miService:AuthServiceService
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
      console.log(data);
    })
  }

}
