import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutAdminPageComponent } from './pages/layout-admin-page/layout-admin-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { MaterialModule } from '../material/material.module';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { GenerateReportsComponent } from './pages/generate-reports/generate-reports.component';
import { DeleteUserPageComponent } from './pages/delete-user-page/delete-user-page.component';
import { DeleteCoursePageComponent } from './pages/delete-course-page/delete-course-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogDeleteUserComponent } from './components/dialog-delete-user/dialog-delete-user.component';



@NgModule({
  declarations: [
    LayoutAdminPageComponent,
    AdminPageComponent,
    CreateUserComponent,
    CreateCourseComponent,
    GenerateReportsComponent,
    DeleteUserPageComponent,
    DeleteCoursePageComponent,
    DialogDeleteUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
