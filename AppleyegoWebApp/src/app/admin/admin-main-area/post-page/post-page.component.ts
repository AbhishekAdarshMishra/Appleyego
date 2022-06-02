import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/post.model';
import { PoststorageService } from 'src/app/poststorage.service';
import { LoadUserService } from 'src/app/side-nav/load-user.service';
import { CurrentEditPostService } from './post-edit/current-editPost.service';
import { PostEditService } from './post-edit/post-edit.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit,OnDestroy {
  icons:{_id:string;category:string; link: string; icon: string}[]=[];
  postsCollection:Post[]=[];
  posts:Post[] = [];
  private postsSub:Subscription= new Subscription();
  constructor(private router: Router,private loadUserService: LoadUserService, private poststorageService:PoststorageService,private currentEditPostService:CurrentEditPostService,private postEditService:PostEditService) { }
  
  ngOnInit(): void {
    
    this.loadUserService.getIconsDetail().subscribe(response=>{
      if(response.code=== 200)
      { 
         for(let res of response.result){
        this.icons.push({_id:res._id,category:res.category ,link:res.link,icon:res.icon});
      }
      }
      else{
        console.log("Response not Found for Icons Detail");
      }
    //  console.log(this.icons);
    });
    this.postsCollection=this.poststorageService.getPosts();
    this.posts=this.postsCollection.reverse();
    this.postsSub= this.poststorageService.getPostUpdateListner().subscribe((posts:Post[])=>{
      this.posts=posts;
      this.posts=this.posts.reverse();
      // console.log("updated");
      // console.log(this.posts);
    })
  }

  onDel(id:string){
    // console.log(id);
    this.postEditService.postDeleteId(id).subscribe(responseData => {
                              
                              if(responseData.n=='1' && responseData.ok=='1' && responseData.deletedCount=='1')
                                {
                                  this.poststorageService.delPost(id);
                                }
                                else{
                                    console.log("Post Not Found !!!");
                                }
                            },
                            errorMessage=>{
                              console.log(errorMessage);
                            })
    
  }
  onAdd(){
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/post-add']);
  }
  onEdit(editPost:Post){
    this.currentEditPostService.setPostParams(editPost);
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/post-edit']);
  }
  selectCategoryHandler (event: any) {
    let category = event.target.value;
    if(category==='All')
    {
      this.posts=this.postsCollection;
    }
    else{
      this.posts= this.postsCollection.filter(post => post.category===category);
    }
    this.posts=this.posts.reverse();
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
