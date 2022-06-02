import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../post.model';
import { PostCallService } from '../postcall.service';
import { PoststorageService } from '../poststorage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  
  constructor(private router: Router,private postCallService:PostCallService,private poststorageService:PoststorageService) { }
  ngOnInit(): void {
    this.router.navigate(['/side-nav/main-page/home-feature']);

    
      this.postCallService.postSession().subscribe(responseData => {
      // console.log(responseData);
      if(responseData.code===200 && responseData.message==='Post Successfully found')
        {
          this.poststorageService.setEmpty();
            // console.log(responseData.post);
            // console.log("Posts Found SuccessFull");
            if(responseData.post!=null )
             {
              //  console.log('hello');
              let postArray:Post[]=responseData.post;
            for(let eachpost of postArray){
             
              let _id='';
              let title = '';
              let subTitle='';
              let category = '';
              let classs='';
              let startDate='';
              let endDate='';
              let applyLink=[];
              let author='';
              let importantInformation='';
              let details='';
              let howTo='';
              let someInfo='';
              let links='';
              let image='';

              _id= eachpost._id===undefined ?'':eachpost._id;
              title = eachpost.title ===undefined ?'':eachpost.title;
              subTitle =  eachpost.subTitle===undefined ?'': eachpost.subTitle;
              category = eachpost.category===undefined ?'':eachpost.category;
              classs=eachpost.class===undefined ?'':eachpost.class;
              startDate = eachpost.startDate===undefined ?'':eachpost.startDate;
              endDate = eachpost.startDate===undefined ?'':eachpost.startDate;
              applyLink = eachpost.applyLink;
              author = eachpost.author===undefined ?'':eachpost.author;
              importantInformation = eachpost.importantInformation===undefined ?'':eachpost.importantInformation;
              details = eachpost.details===undefined ?'':eachpost.details;
              howTo = eachpost.howTo===undefined ?'':eachpost.howTo;
              someInfo = eachpost.someInfo===undefined ?'':eachpost.someInfo;
              links=eachpost.links===undefined ?'':eachpost.links;
              image=eachpost.image===undefined ?'':eachpost.image;
              
              this.poststorageService.setPosts(_id,title,subTitle,category,classs,startDate,endDate,applyLink,author,importantInformation,details,howTo,someInfo,links,image);
              
          }
            }
            // this.poststorageService.getPosts();
        }
        else{
            console.log("Post Not Found !!!");
        }
    },
    errorMessage=>{
      console.log(errorMessage);
    })
  }

}
