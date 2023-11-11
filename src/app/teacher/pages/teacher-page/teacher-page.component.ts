import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/admin/interfaces/user-data';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.css']
})
export class TeacherPageComponent implements OnInit {

  private user:any;

  ngOnInit(): void {
    this.user = sessionStorage.getItem('user');
    console.log(this.user);
  }

}
