import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTeacherPageComponent } from './pages/layout-teacher-page/layout-teacher-page.component';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutTeacherPageComponent,
    children:[
    {path:'teacher/:id', component: TeacherPageComponent},
    {path:'404', component: ErrorPageComponent},
    {path: '**', redirectTo: '404'}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
