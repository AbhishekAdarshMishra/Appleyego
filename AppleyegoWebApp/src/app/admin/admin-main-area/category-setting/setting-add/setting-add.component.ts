import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingSendService } from './setting.send.service';

@Component({
  selector: 'app-setting-add',
  templateUrl: './setting-add.component.html',
  styleUrls: ['./setting-add.component.css']
})
export class SettingAddComponent implements OnInit {

  
  url = '';
  file!: File;
  errormsg: string ='';


  constructor(private router: Router,private settingSendService:SettingSendService) { }

  
  
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

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.errormsg='';
    if(!form.valid){
      return;
    }
    
    const category=form.value.category;
    const link=form.value.link;
    const icon=this.file;
    
    

    // console.log(category + " " +link+" ");
    // console.log('img'+icon);

    if(this.validationform(category,link,icon)===false)
    {
      this.errormsg="Please Fill everything correctly and Upload Image on above !!!";
      return;
    }

    this.settingSendService.settingSession(category,link,icon)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.code===200 && responseData.message==='Setting Successfully Submitted'){
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-category-setting']);
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

 

    validationform(category:string,link:string,icon:File): boolean{
      if(category===null || category==='')
      {
        return false;
      }
      if(icon===null || icon===undefined){
        return false;
      }
      if(link===null || link===''){
        return false;
      }
      return true;
      
      
    }

}
