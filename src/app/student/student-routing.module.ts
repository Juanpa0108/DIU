import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutStudentPageComponent } from './pages/layout-student-page/layout-student-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { ErrorPageComponent } from '../shared/error-page/error-page.component';
import { CursosStudentPageComponent } from './pages/cursos-student-page/cursos-student-page.component';
import { CalificacionesStudentComponent } from './pages/calificaciones-student/calificaciones-student.component';

const routes: Routes = [
  {
    path:'',
    component: LayoutStudentPageComponent,
    children: [
      {path:'student', component: StudentPageComponent},
      {path:'curso', component: CursosStudentPageComponent},
      {path: 'calificaciones', component: CalificacionesStudentComponent},
      {path:'404', component: ErrorPageComponent},
      {path: '**', redirectTo: 'student'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
