import { Component, OnInit } from '@angular/core';
import { LoadUserService } from 'src/app/side-nav/load-user.service';

@Component({
  selector: 'app-home-feature',
  templateUrl: './home-feature.component.html',
  styleUrls: ['./home-feature.component.css']
})
export class HomeFeatureComponent implements OnInit {

  constructor(private loadUserService: LoadUserService) { }
  categories:{category:string; link: string; icon: string}[]=[];
  ngOnInit(): void {
    this.loadUserService.getIconsDetail().subscribe(response=>{
      if(response.code=== 200)
      { 
         for(let res of response.result){
          this.categories.push(res);
        }
      }
    });
  }
  
}
    

