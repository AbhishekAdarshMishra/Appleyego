import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { PathBackService } from 'src/app/path-back.service';
import { PostSearchService } from 'src/app/post-search.service';
import { Post } from 'src/app/post.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {
   paramsSubscription: Subscription =new Subscription;
  value:string='';
  post:Post[] = [];
  url:string=environment.urlApi;
  constructor(private route:ActivatedRoute,private pathBackService:PathBackService,private postSearchService: PostSearchService) { }

  ngOnInit(): void {

    this.paramsSubscription =this.route.params.subscribe((params:Params) =>{
      this.post=[];
      this.value = params.value;
      this.pathBackService.onAddPath('/side-nav/main-page/search/'+this.value);
      this.postSearchService.postSession(this.value).subscribe(responseData => {
      // console.log(responseData);
      if(responseData.code===200 && responseData.message==='Post Successfully found')
        {
          
            if(responseData.post!=null )
             {
              let postArray:Post[]=responseData.post;
                for(let pst of postArray){
                  this.post.push(new Post(pst._id,pst.title,pst.subTitle,pst.category,pst.class,pst.startDate?pst.startDate.split('T',1)[0]:pst.startDate,pst.endDate?pst.endDate.split('T',1)[0]:pst.endDate,pst.applyLink,pst.author, pst.importantInformation,pst.details,pst.howTo,pst.someInfo,pst.links,pst.image))
                }
            }
        }
        else{
            console.log("Post Not Found !!!");
        }
    },
    errorMessage=>{
      console.log(errorMessage);
    })




    })
  }
  ngOnDestroy(): void {
      this.paramsSubscription.unsubscribe();
  }

}
