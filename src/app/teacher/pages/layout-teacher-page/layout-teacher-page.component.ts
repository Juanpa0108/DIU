import { Component, OnInit, inject } from '@angular/core';
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
export class LayoutTeacherPageComponent implements OnInit {
  
  constructor(private activatedRouter:ActivatedRoute,
              private router: Router,){
    
  }
  // private activatedRouter = inject(ActivatedRoute);
  id?:number;


  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      this.id=params['id']
    })
  }

}
