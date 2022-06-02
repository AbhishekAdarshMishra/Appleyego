import { Component, OnInit } from '@angular/core';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostSendService } from './post-send.service';
import { Post } from 'src/app/post.model';
import { PoststorageService } from 'src/app/poststorage.service';
import { LoadUserService } from 'src/app/side-nav/load-user.service';



@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  // public Editor = ClassicEditor;
  
  icons:{_id:string;category:string; link: string; icon: string}[]=[];
  url = '';
  file!: File;
  errormsg: string ='';
  category:string='';
  startDate:string='';
  endDate:string='';

  importantInformation:string='';
  details:string='';
  howTo:string='';
  someInfo:string='';
  links:string='';

  addPost?:Post=new Post('','','','','','','','','','','','','','','');

  constructor(private router: Router,private loadUserService: LoadUserService,private postSendService:PostSendService,private poststorageService:PoststorageService) { }

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
        this.details =  event.editor.getData();

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
    const image=this.file;
    const author=form.value.author;
    const importantInformation=this.importantInformation;
    const details=this.details;
    const howTo=this.howTo;
    const someInfo=this.someInfo;
    const links=this.links;
    

    // console.log(title + " " + subTitle + " " + details + " "+category + " " +classs + " " +startDate +" " +endDate + " "+applyLink+" "+
    // author  + " " + importantInformation +" " +howTo + " "+ someInfo + " " +links+" ");
    // console.log('img'+image);

    if(this.validationform(title,category,applyLink,author,image)===false)
    {
      this.errormsg="Please Fill everything correctly and Upload Image on above !!!";
      return;
    }

    this.postSendService.postSession(title,subTitle,category,classs,startDate,endDate,applyLink,author,importantInformation,details,howTo,someInfo,links,image)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.code===200 && responseData.message==='Post Successfully Submitted'){
        //  this.showToaster(responseData.message);
         if(responseData.Post){
          this.addPost=responseData.Post;
          this.poststorageService.addPost(this.addPost);
         }
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-post-page']);
         

      }  
       else{
            this.errormsg=responseData.message+" !!!";
        }   
    },
    errorMessage=>{
      this.errormsg=" Something went wrong !!!";
      console.log(errorMessage);
    })
  }

 

    validationform(title:string,category:string,applyLink:string,author:string,image:File): boolean{
      if(category==='' || category==='category' || category==='')
      {
        return false;
      }
      if(image===null || image===undefined){
        return false;
      }
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

}
