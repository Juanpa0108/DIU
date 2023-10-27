import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
      path:'admin',
      loadChildren:() => import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
      path: 'teacher',
      loadChildren:() => import('./teacher/teacher.module').then (m=>m.TeacherModule)
    },
    {
      path: 'student',
      loadChildren:() => import('./student/student.module').then(m=>m.StudentModule)
    },
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full'
    },
    {
      path:'err',
      component: ErrorPageComponent
    },
    {
      path: '**',
      redirectTo: 'err'
    }
];

@NgModule({
  imports: 
  [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
