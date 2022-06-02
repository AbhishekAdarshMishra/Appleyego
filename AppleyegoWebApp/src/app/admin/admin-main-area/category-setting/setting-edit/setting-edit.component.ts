import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategSettingService } from '../categ-setting.service';
import { CurrentCategService } from '../current-categ.service';
import { SettingSendService } from '../setting-add/setting.send.service';

@Component({
  selector: 'app-setting-edit',
  templateUrl: './setting-edit.component.html',
  styleUrls: ['./setting-edit.component.css']
})
export class SettingEditComponent implements OnInit {

  urlApi: string=environment.urlApi;
  url = '';
  file!: File;
  errormsg: string ='';
  errorimg: string ='';

  setting:{_id:string;category:string; link: string; icon: string}={_id:'',category:'',link:'',icon:''};


  constructor(private router: Router,private settingSendService:SettingSendService,private currentCategService:CurrentCategService,private categSettingService:CategSettingService) { }

  
  
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.file=event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); 

      reader.onload = (event) => { 
        if(event.target!=null)
        {
          this.url=event.target.result as string;
        }
      
      }
    }
  }

  ngOnInit(): void {
    this.setting=this.currentCategService.getCategParams();
    this.url=this.urlApi+this.setting.icon;
  }
  onSubmit(form: NgForm){
    this.errormsg='';
    if(!form.valid){
      return;
    }
    
    const category=form.value.category;
    const link=form.value.link;
    
    

    // console.log(category + " " +link+" ");

    if(this.validationform(category,link)===false)
    {
      this.errormsg="Please Fill everything correctly and Upload Image on above !!!";
      return;
    }


    this.categSettingService.settingEdit(this.setting._id,category,link)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.n=='1'&& responseData.nModified=='1'&& responseData.ok=='1'){         
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-category-setting']);
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

 

    validationform(category:string,link:string): boolean{
      if(category===null || category==='')
      {
        return false;
      }
      if(link===null || link===''){
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

        this.categSettingService.settingImageEdit(this.setting._id,this.file)
          .subscribe(responseData => {
            // console.log(responseData);
            if(responseData.n=='1'&& responseData.nModified=='1'&& responseData.ok=='1'){

              this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-category-setting']);
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
