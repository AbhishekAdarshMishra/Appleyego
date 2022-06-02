import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Slider } from 'src/app/slider.model';
import { environment } from 'src/environments/environment';
import { CurrentSliderService } from '../current-slider.service';
import { SliderSendService } from '../slider-add/slider-send.service';
import { SliderService } from '../slider.service';

@Component({
  selector: 'app-slider-edit',
  templateUrl: './slider-edit.component.html',
  styleUrls: ['./slider-edit.component.css']
})
export class SliderEditComponent implements OnInit {

  
  urlApi: string=environment.urlApi;
  url = '';
  file!: File;
  errormsg: string ='';
  errorimg: string ='';

  slider:Slider = new Slider('','','','');


  constructor(private router: Router,private sliderSendService:SliderSendService,private currentSliderService:CurrentSliderService,private sliderService:SliderService) { }

  
  
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
    this.slider=this.currentSliderService.getCategParams();
    this.url=this.urlApi+this.slider.image;
  }
  onSubmit(form: NgForm){
    this.errormsg='';
    if(!form.valid){
      return;
    }
    
    const caption=form.value.caption;
    const link=form.value.link;
    
    

    // console.log(caption + " " +link+" ");

    if(this.validationform(caption,link)===false)
    {
      this.errormsg="Please Fill everything correctly and Upload Image on above !!!";
      return;
    }


    this.sliderService.sliderEdit(this.slider._id,caption,link)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.n=='1'&& responseData.nModified=='1'&& responseData.ok=='1'){         
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-slider-page']);
      }  
       else{
            this.errormsg="Something Went Wrong Or no changes Found !!!";
        }   
    },
    errorMessage=>{
      this.errormsg=" Something went wrong !!!";
      // console.log(errorMessage);
    })
  }

 

    validationform(caption:string,link:string): boolean{
      if(caption===null || caption==='')
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

        this.sliderService.sliderImageEdit(this.slider._id,this.file)
          .subscribe(responseData => {
            // console.log(responseData);
            if(responseData.n=='1'&& responseData.nModified=='1'&& responseData.ok=='1'){

              this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-slider-page']);
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
