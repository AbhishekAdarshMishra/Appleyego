import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Slider } from 'src/app/slider.model';
import { SliderCallService } from 'src/app/slidercall.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit ,OnDestroy {
  paramsSubscription: Subscription =new Subscription;
  slider:Slider[]=[];
  url:string=environment.urlApi;
  constructor(private sliderCallService: SliderCallService) { }
  condition:number =0;
  myIndex:number = 1;
  ngOnInit(): void {
    this.slider=[];
    this.sliderCallService.postSession().subscribe(responseData => {
      // console.log(responseData);
      if(responseData.code===200 && responseData.message==='Slider Successfully found')
        {
            if(responseData.result!=null )
             {
               this.slider=responseData.result; 
              //  console.log(this.slider);
              }
        }
        else{
            console.log("Slider Not Found !!!");
        }
    },
    errorMessage=>{
      console.log(errorMessage);
    })
    // console.log("slider");
    // console.log(this.slider);
    this.paramsSubscription =timer(5000, 8000).subscribe(x => {
      this.myIndex = this.myIndex % 7;                      // <<<---using ()=> syntax
      this.condition=this.myIndex;
      this.myIndex++;
    });
  }

  ngOnDestroy():void{
    this.paramsSubscription.unsubscribe();
  }
}
