import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPostService } from 'src/app/current-post.service';
import { PathBackService } from 'src/app/path-back.service';
import { Post } from 'src/app/post.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catelog-card',
  templateUrl: './catelog-card.component.html',
  styleUrls: ['./catelog-card.component.css']
})
export class CatelogCardComponent implements OnInit {
  @Input()
  element!: Post;
  startDate:string='';
  endDate:string='';
  url:string=environment.urlApi;
  constructor(private router:Router, private currentPostService:CurrentPostService,private pathBackService:PathBackService) { }

  ngOnInit(): void {
  }
  
  detail(){
     this.currentPostService.setPostParams(this.element);
    this.pathBackService.onAddPath('/side-nav/main-page/home-feature');
    this.router.navigate(['/side-nav/main-page/detail-page']);
  }

}
