import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { LayoutTeacherPageComponent } from './pages/layout-teacher-page/layout-teacher-page.component';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page.component';


@NgModule({
  declarations: [
    LayoutTeacherPageComponent,
    TeacherPageComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
