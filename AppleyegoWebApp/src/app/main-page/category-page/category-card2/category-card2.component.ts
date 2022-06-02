import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPostService } from 'src/app/current-post.service';
import { PathBackService } from 'src/app/path-back.service';
import { Post } from 'src/app/post.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-card2',
  templateUrl: './category-card2.component.html',
  styleUrls: ['./category-card2.component.css']
})
export class CategoryCard2Component implements OnInit {

   @Input()
  element:Post=new Post('','','','','','','','','','','','','','','');
  constructor(private router:Router,private currentPostService:CurrentPostService , private pathBackService:PathBackService) { }

  url:string=environment.urlApi;
  ngOnInit(): void {
  }
  detail(){
    this.currentPostService.setPostParams(this.element);
    this.pathBackService.onAddPath('/side-nav/main-page/category-page/'+this.element.category);
    this.router.navigate(['/side-nav/main-page/detail-page']);
  }
}
