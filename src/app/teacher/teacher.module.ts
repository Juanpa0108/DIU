import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { LayoutTeacherPageComponent } from './pages/layout-teacher-page/layout-teacher-page.component';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page.component';
import { MaterialModule } from '../material/material.module';
import { CoursesComponent } from './pages/courses/courses.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LayoutTeacherPageComponent,
    TeacherPageComponent,
    CoursesComponent,
    NotesComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class TeacherModule { }
