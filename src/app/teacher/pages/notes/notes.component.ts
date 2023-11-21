import { Component, OnInit, inject } from '@angular/core';
import { TeacherServiceService } from '../../services/teacher-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  private nombre:any;
  private myService = inject(TeacherServiceService)
  private fb = inject(FormBuilder);
  public myForm:FormGroup = this.fb.group({
    seleccionarEstudiante: ['', [ Validators.required]]
  })
  public myForm2:FormGroup = this.fb.group({
    tipoNota: ['', [ Validators.required ]],
    porcentaje: ['', [ Validators.required ]]
  })
  public tiposNota=[
    {nombre:"Taller"}, 
    {nombre:"Quiz"}, 
    {nombre:"Parcial 1"}, 
    {nombre:"Parcial 2"}, 
    {nombre:"Participación"}, 
    {nombre:"Opcional 1"}, 
    {nombre:"Opcional 2"}]
  public addUsuario:boolean = false
  public addNota:boolean = false

  ngOnInit(): void {
    this.nombre = sessionStorage.getItem('curso')
    this.myService.tablaCurso({nombre: this.nombre}).subscribe(res =>{
      console.log(res)
    })

  }

  onSave(){
    this.addUsuario=false
  }

  guardarNota(){
    this.addNota=false
  }


}
