import { WrappedNodeExpr } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadUserService } from './load-user.service';
import { environment } from "../../environments/environment";
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  status: boolean = true;
  srch: boolean = true;
  icons:{category:string; link: string; icon: string}[]=[];
  url:string=environment.urlApi;
  constructor(private loadUserService: LoadUserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserService.getIconsDetail().subscribe(response=>{
      if(response.code=== 200)
      { 
         for(let res of response.result){
        this.icons.push({category:res.category ,link:res.link,icon:res.icon});
      }
      }
      else{
        console.log("Response not Found for Icons Detail");
      }
    //  console.log(this.icons);
    });
  }


  hamburger()
  {
    this.status=!this.status;
  }
  search_open(){
    this.srch=!this.srch;
  }
  onSearch(value: string)
  {
    this.router.navigate(['/side-nav/main-page/search/'+value]);
  }

}
