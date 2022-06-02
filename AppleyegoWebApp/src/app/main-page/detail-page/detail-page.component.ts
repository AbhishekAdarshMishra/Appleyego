import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPostService } from 'src/app/current-post.service';
import { PathBackService } from 'src/app/path-back.service';
import { Post } from 'src/app/post.model';
import { environment } from 'src/environments/environment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(private router: Router, private currentPostService: CurrentPostService,private pathBackService:PathBackService) { }
  post:Post= new Post('','','','','','','','','','','','','','','');
   url:string=environment.urlApi;
  ngOnInit(): void {
    this.post=this.currentPostService.getPostParams();
  }
  onBack():void {
    this.router.navigate([this.pathBackService.getPath()]);
  }

}
