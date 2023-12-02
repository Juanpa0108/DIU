import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { LayoutStudentPageComponent } from './pages/layout-student-page/layout-student-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { CalificacionesStudentComponent } from './pages/calificaciones-student/calificaciones-student.component';
import { MaterialModule } from '../material/material.module';
import { TotalNotasComponent } from './pages/total-notas/total-notas.component';


@NgModule({
  declarations: [
    LayoutStudentPageComponent,
    StudentPageComponent,
    CalificacionesStudentComponent,
    TotalNotasComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    MaterialModule
  ]
})
export class StudentModule { }
