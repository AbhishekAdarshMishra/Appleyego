import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SliderSendService } from './slider-send.service';

@Component({
  selector: 'app-slider-add',
  templateUrl: './slider-add.component.html',
  styleUrls: ['./slider-add.component.css']
})
export class SliderAddComponent implements OnInit {

  url = '';
  file!: File;
  errormsg: string ='';


  constructor(private router: Router,private sliderSendService:SliderSendService) { }

  
  
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
    
    const caption=form.value.caption;
    const link=form.value.link;
    const image=this.file;
    
    

    // console.log(caption + " " +link+" ");
    // console.log('img'+image);

    if(this.validationform(caption,link,image)===false)
    {
      this.errormsg="Please Fill everything correctly and Upload Image on above !!!";
      return;
    }

    this.sliderSendService.settingSession(caption,link,image)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.code===200 && responseData.message==='Slider Successfully Submitted'){
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-slider-page']);
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

 

    validationform(caption:string,link:string,image:File): boolean{
      if(caption===null || caption==='')
      {
        return false;
      }
      if(image===null || image===undefined){
        return false;
      }
      if(link===null || link===''){
        return false;
      }
      return true;      
    }


}
