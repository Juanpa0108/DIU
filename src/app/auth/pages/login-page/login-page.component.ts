import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/admin/interfaces/user-data';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
              private miservice:AuthServiceService,
              private router:Router,
              private fb:FormBuilder
              ){}
  
  public myForm:FormGroup = this.fb.group({
    usuario: ['', [ Validators.required, Validators.minLength(3) ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]]
  })

  public hide:boolean = true;
  public usuario!:user;
  
  onLogin():void{
    this.miservice.consulta(this.myForm.value).subscribe( res => {
      if(res){
        this.router.navigateByUrl('/admin/admin');
      }else if(!res){
        this.miservice.userLogin(this.myForm.value).subscribe(res =>{
          if(res){
            this.usuario = res;
            if(this.usuario.tipo == 'profesor'){
              this.router.navigate(['/teacher/teacher', this.usuario.codigo])
            }else{
              this.router.navigate(['/student/student', this.usuario.codigo])
            }
          }
        })
      }else{
        // TODOOO: SANCKBAR CONFIGURATION
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

        case 'minlength':
            return `Minimo ${ errors['minlength'].requiredLength  } caracteres.`;
      }
    }

    return null;

  }


}