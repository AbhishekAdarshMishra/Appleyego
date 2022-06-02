import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadUserService } from 'src/app/side-nav/load-user.service';
import { environment } from 'src/environments/environment';
import { CategSettingService } from './categ-setting.service';
import { CurrentCategService } from './current-categ.service';

@Component({
  selector: 'app-category-setting',
  templateUrl: './category-setting.component.html',
  styleUrls: ['./category-setting.component.css']
})
export class CategorySettingComponent implements OnInit{
  icons:{_id:string;category:string; link: string; icon: string}[]=[];
  url:string=environment.urlApi;
  constructor(private loadUserService: LoadUserService, private categSettingService:CategSettingService,private router:Router,private currentCategService:CurrentCategService) { }

  ngOnInit(): void {
    this.loadUserService.getIconsDetail().subscribe(response=>{
      if(response.code=== 200)
      { 
         for(let res of response.result){
        this.icons.push({_id:res._id,category:res.category ,link:res.link,icon:res.icon});
      }
      }
      else{
        // console.log("Response not Found for Icons Detail");
      }
    //  console.log(this.icons);
    });
  }

  onDel(id:string){
    console.log(id);
    this.categSettingService.settingDeleteId(id).subscribe(responseData => {
                              
                              if(responseData.n=='1' && responseData.ok=='1' && responseData.deletedCount=='1')
                                {
                                  const updatedicons=[...this.icons];
                                  const delIndex= this.icons.findIndex(p=>p._id === id);
                                  updatedicons.splice(delIndex, 1);
                                  this.icons = updatedicons;
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
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/setting-add']);
  }
  onEdit(editIcon:{_id:string,category:string; link: string; icon: string}){
    this.currentCategService.setCategParams(editIcon);
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/setting-edit']);
  }

}
