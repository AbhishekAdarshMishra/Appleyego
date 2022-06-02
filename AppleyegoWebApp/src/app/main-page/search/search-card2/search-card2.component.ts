import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPostService } from 'src/app/current-post.service';
import { PathBackService } from 'src/app/path-back.service';
import { Post } from 'src/app/post.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-card2',
  templateUrl: './search-card2.component.html',
  styleUrls: ['./search-card2.component.css']
})
export class SearchCard2Component implements OnInit {

  @Input()
  element:Post=new Post('','','','','','','','','','','','','','','');
  constructor(private router:Router,private currentPostService:CurrentPostService , private pathBackService:PathBackService) { }

  url:string=environment.urlApi;
  ngOnInit(): void {  
  }
  detail(){
    this.currentPostService.setPostParams(this.element);
    
    this.router.navigate(['/side-nav/main-page/detail-page']);
  }
}
