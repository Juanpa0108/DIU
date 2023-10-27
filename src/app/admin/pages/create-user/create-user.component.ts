import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  constructor(
    private myService:AdminServiceService,
      private fb:FormBuilder
    ){}

public myForm:FormGroup = this.fb.group({
codigoUsuario: [0, [ Validators.required, Validators.minLength(3) ]],
usuario: ['', [ Validators.required ]],
password: ['', [ Validators.required, Validators.minLength(8) ]],
rol: ['', [ Validators.required]],
})

onSave(){
  this.myService.crearUsuario(this.myForm.value).subscribe(res => {});
  this.myForm.reset({codigoUsuario: 0, usaurio:'', password: '', rol:''});
}

}
