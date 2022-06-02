import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/post.model';
import { PoststorageService } from 'src/app/poststorage.service';
import { LoadUserService } from 'src/app/side-nav/load-user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit,OnDestroy {

 constructor(private route:ActivatedRoute,private poststorageService:PoststorageService,private loadUserService: LoadUserService) { }

  paramsSubscription: Subscription =new Subscription;
  category:string='';
  post:Post[] = [];
  url:string=environment.urlApi;
  extension:string='jobs';
  ngOnInit(): void {
    this.paramsSubscription =this.route.params.subscribe((params:Params) =>{
      this.post=[];
      this.category = params.category;
      this.post=this.poststorageService.getPostCategory(this.category);
      this.post=this.post.reverse();
      this.loadUserService.getIconsDetail().subscribe(response=>{
      if(response.code=== 200)
      { 
         for(let res of response.result){
        if(res.link==this.category)
        {
          this.extension=res.icon;
        }
      }
      
      }
      else{
        console.log("Response not Found for Icons Detail");
      }
    });
    })
    
    

  }
  ngOnDestroy(): void {
      this.paramsSubscription.unsubscribe();
  }

}
