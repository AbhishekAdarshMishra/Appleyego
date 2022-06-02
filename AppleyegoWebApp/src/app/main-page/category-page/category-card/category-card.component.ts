import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPostService } from 'src/app/current-post.service';
import { PathBackService } from 'src/app/path-back.service';
import { Post } from 'src/app/post.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input()
  element:Post=new Post('','','','','','','','','','','','','','','');
  constructor(private router:Router,private currentPostService:CurrentPostService , private pathBackService:PathBackService) { }

  url:string=environment.urlApi;
  ngOnInit(): void {
  }
  onClickFunction(){
    this.currentPostService.setPostParams(this.element);
    this.pathBackService.onAddPath('/side-nav/main-page/category-page/'+this.element.category);
    this.router.navigate(['/side-nav/main-page/detail-page']);
  }

}
