import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-layout-teacher-page',
  templateUrl: './layout-teacher-page.component.html',
  styles: [`
  span{cursor:pointer}
  `
  ]
})
export class LayoutTeacherPageComponent {
  constructor(
    private route:Router, 
    private activatedRouter:ActivatedRoute
    ){
    
  }

  id?:number;
  prueba(){
    this.activatedRouter.params.pipe(
      switchMap(({id})=>this.id=id)
    )
    
  }
}
