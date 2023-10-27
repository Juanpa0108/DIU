import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAdminPageComponent } from './pages/layout-admin-page/layout-admin-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CreateCourseComponent } from './pages/create-course/create-course.component';
import { GenerateReportsComponent } from './pages/generate-reports/generate-reports.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAdminPageComponent,
    children: [
      {path: 'admin', component: AdminPageComponent},
      {path: 'createUser', component: CreateUserComponent},
      {path: 'createCourse', component: CreateCourseComponent},
      {path: 'generateReports', component: GenerateReportsComponent},
      {path: '**', redirectTo: 'admin'}
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
