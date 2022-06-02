import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Slider } from 'src/app/slider.model';
import { SliderCallService } from 'src/app/slidercall.service';
import { environment } from 'src/environments/environment';
import { CurrentSliderService } from './current-slider.service';
import { SliderService } from './slider.service';

@Component({
  selector: 'app-slider-page',
  templateUrl: './slider-page.component.html',
  styleUrls: ['./slider-page.component.css']
})
export class SliderPageComponent implements OnInit {
  sliders:{_id:string;caption:string;link: string; image: string}[]=[];
  url:string=environment.urlApi;
  constructor(private router:Router,private sliderCallService:SliderCallService,private sliderService:SliderService,private currentSliderService:CurrentSliderService) { }

  ngOnInit(): void {
    this.sliders=[];
    this.sliderCallService.postSession().subscribe(responseData => {
      // console.log(responseData);
      if(responseData.code===200 && responseData.message==='Slider Successfully found')
        {
            if(responseData.result!=null )
             {
               this.sliders=responseData.result; 
              }
        }
        else{
            console.log("Slider Not Found !!!");
        }
    },
    errorMessage=>{
      console.log(errorMessage);
    })
  }

  onDel(id:string){
    // console.log(id);
    this.sliderService.sliderDeleteId(id).subscribe(responseData => {
                              
                              if(responseData.n=='1' && responseData.ok=='1' && responseData.deletedCount=='1')
                                {
                                  const updatedsliders=[...this.sliders];
                                  const delIndex= this.sliders.findIndex(p=>p._id === id);
                                  updatedsliders.splice(delIndex, 1);
                                  this.sliders = updatedsliders;
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
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/slider-add']);
  }
  onEdit(editSlider:Slider){
    this.currentSliderService.setCategParams(editSlider);
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/slider-edit']);
  }


}
