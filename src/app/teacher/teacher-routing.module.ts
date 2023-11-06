import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutTeacherPageComponent } from './pages/layout-teacher-page/layout-teacher-page.component';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ReportsComponent } from './pages/reports/reports.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutTeacherPageComponent,
    children:[
    {path:'teacher/:id', component: TeacherPageComponent},
    {path:'courses', component: CoursesComponent},
    {path:'notes', component: NotesComponent},
    {path:'reports', component: ReportsComponent},
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
