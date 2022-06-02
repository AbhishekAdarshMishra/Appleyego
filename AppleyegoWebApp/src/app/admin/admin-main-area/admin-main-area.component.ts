import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-main-area',
  templateUrl: './admin-main-area.component.html',
  styleUrls: ['./admin-main-area.component.css']
})
export class AdminMainAreaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-post-page']);
  }

}
