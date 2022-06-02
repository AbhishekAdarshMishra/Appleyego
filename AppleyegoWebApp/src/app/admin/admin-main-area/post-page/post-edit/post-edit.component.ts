import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/post.model';
import { PoststorageService } from 'src/app/poststorage.service';
import { environment } from 'src/environments/environment';
import { PostSendService } from '../post-add/post-send.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { NgForm } from '@angular/forms';
import { CurrentEditPostService } from './current-editPost.service';
import { PostEditService } from './post-edit.service';
import { LoadUserService } from 'src/app/side-nav/load-user.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  // public Editor = ClassicEditor;
  icons:{_id:string;category:string; link: string; icon: string}[]=[];
  url = '';
  file!: File;
  errorimg:string = '';
  errormsg: string ='';
  category:string='';
  startDate:string='';
  endDate:string='';

  importantInformation:string='';
  details:string='';
  howTo:string='';
  someInfo:string='';
  links:string='';
  editPost:Post=new Post('','','','','','','','','','','','','','','');
  urlAp:string=environment.urlApi;
  constructor(private loadUserService: LoadUserService,private currentEditPostService:CurrentEditPostService,private postEditService:PostEditService,private router:Router,private poststorageService:PoststorageService) { }
  selectCategoryHandler (event: any) {
    this.category = event.target.value;
  }
  
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.file=event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if(event.target!=null)
        {
          this.url=event.target.result as string;
        }
      
      }
    }
  }

  public onChangeIMP( event: CKEditor4.EventInfo ) {
        this.importantInformation = event.editor.getData();

    }

  public onChangeDET( event: CKEditor4.EventInfo ) {
        this.details = event.editor.getData();

    }
  public onChangeHWT( event: CKEditor4.EventInfo ) {
        this.howTo = event.editor.getData();

    }

  public onChangeSMI( event: CKEditor4.EventInfo ) {
        this.someInfo = event.editor.getData();

    }

  public onChangeLNK( event: CKEditor4.EventInfo ) {
        this.links = event.editor.getData();
    }
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
    this.editPost=this.currentEditPostService.getPostParams();
    this.url=this.urlAp+this.editPost.image;
    const start = this.editPost.startDate.split("T");
    this.startDate=start[0];
    const end = this.editPost.endDate.split("T");
    this.endDate=end[0];
    this.category=this.editPost.category;
    this.importantInformation=this.editPost.importantInformation;
    this.details=this.editPost.details;
    this.howTo=this.editPost.howTo;
    this.someInfo=this.editPost.someInfo;
    this.links=this.editPost.links;
  }


  onSubmit(form: NgForm){
    this.errormsg='';
    if(!form.valid){
      return;
    }
    
    const title=form.value.title;
    const subTitle=form.value.subTitle;
    const category=this.category;
    const classs=form.value.class;
    const startDate=this.startDate;
    const endDate=this.endDate;
    const applyLink=form.value.applyLink;
    // const image=this.file;
    const author=form.value.author;
    const importantInformation=this.importantInformation;
    const details=this.details;
    const howTo=this.howTo;
    const someInfo=this.someInfo;
    const links=this.links;
    const _id=this.editPost._id;
    

    // console.log(title + " " + subTitle + " " + details + " "+category + " " +classs + " " +startDate +" " +endDate + " "+applyLink+" "+
    // author  + " " + importantInformation +" " +howTo + " "+ someInfo + " " +links+" ");
    // console.log('img'+image);

    if(this.validationform(title,category,applyLink,author)===false)
    {
      this.errormsg="Please Fill everything correctly";
      return;
    }

    this.postEditService.postEdit(_id,title,subTitle,category,classs,startDate,endDate,applyLink,author,importantInformation,details,howTo,someInfo,links)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.n=='1'&& responseData.nModified=='1'&& responseData.ok=='1'){
                                this.postEditService.postGetId(_id).subscribe(responseData => {
                              
                              if(responseData.code===200 && responseData.message==='Post Successfully found')
                                {
                                  let currPost:Post[]=responseData.post;
                                  console.log(currPost);
                                  this.poststorageService.updatePost(_id,currPost[0]);
                                }
                                else{
                                    console.log("Post Not Found !!!");
                                }
                            },
                            errorMessage=>{
                              console.log(errorMessage);
                            })
         
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-post-page']);
      }  
       else{
            this.errormsg="Something Went Wrong Or no changes Found !!!";
        }   
    },
    errorMessage=>{
      this.errormsg=" Something went wrong !!!";
      console.log(errorMessage);
    })
  }

 

    validationform(title:string,category:string,applyLink:string,author:string): boolean{
      if(category==='' || category==='category' || category==='')
      {
        return false;
      }
      // if(image===null || image===undefined){
      //   return false;
      // }
      if(title===null || title===''){
        return false;
      }
      if(applyLink===null || applyLink===''){
        return false;
      }
      if(author===null || author===''){
        return false;
      }

      return true;
      
      
    }

    onChangeImg(event:Event){
      
      // console.log(this.file);
        if(this.file===null || this.file===undefined){
          this.errorimg="No new Image Uploaded !!";
          return;
        }

        this.postEditService.postImageEdit(this.editPost._id,this.file)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.n=='1'&& responseData.nModified=='1'&& responseData.ok=='1'){
                                this.postEditService.postGetId(this.editPost._id).subscribe(responseData => {
                              
                              if(responseData.code===200 && responseData.message==='Post Successfully found')
                                {
                                  let currPost:Post[]=responseData.post;
                                  // console.log(currPost);
                                  this.poststorageService.updateImg(this.editPost._id,currPost[0]);
                                }
                                else{
                                    console.log("Post Not Found !!!");
                                }
                            },
                            errorMessage=>{
                              console.log(errorMessage);
                            })
         
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-post-page']);
      }  
       else{
            this.errormsg="Something Went Wrong Or no changes Found !!!";
        }   
    },
    errorMessage=>{
      this.errormsg=" Something went wrong !!!";
      console.log(errorMessage);
    })

    }
  

}
