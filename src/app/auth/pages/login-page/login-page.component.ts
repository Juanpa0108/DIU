import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  
  onLogin():void{
    this.miservice.consulta(this.myForm.value).subscribe( res => {
      if(res){
        this.router.navigateByUrl('/admin/admin');
      }else{
        // TODOOO: SANCKBAR CONFIGURATION
      }
    })
  }


}