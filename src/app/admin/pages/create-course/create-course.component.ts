import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';
import { user } from '../../interfaces/user-data';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  constructor( 
    private myService:AdminServiceService,
    private fb:FormBuilder
    ){}

    public myForm:FormGroup = this.fb.group({
    codigoCurso: [0, [ Validators.required, Validators.minLength(3) ]],
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
  this.myService.crearCurso(this.myForm.value).subscribe(res=> {})
  this.myForm.reset({codigoCurso: '', nombre:'', profesorAsignado: ''});
}

}
