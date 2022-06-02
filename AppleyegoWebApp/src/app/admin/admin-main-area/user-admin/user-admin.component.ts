import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GuestHttpService } from '../user-guest/guest-http.service';
import { AdmCurrentService } from './adm-current.service';
import { AdmHttpService } from './adm-http.service';
import { Adm } from './adm.model';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

   guests:Adm[]=[];
  url:string=environment.urlApi;
  constructor(private admCurrentService: AdmCurrentService,private admHttpService:AdmHttpService, private router:Router) { }

  ngOnInit(): void {
    this.admHttpService.admGetUser().subscribe(response=>{
      if(response.code=== 200)
      { 
         this.guests=response.result;
      }
      
      else{
        console.log("Response not Found");
      }
    });
  }

  onDel(email:string){
    this.admHttpService.admDeleteId(email).subscribe(responseData => {
                              
                              if(responseData.n=='1' && responseData.ok=='1' && responseData.deletedCount=='1')
                                {
                                  const updatedguests=[...this.guests];
                                  const delIndex= this.guests.findIndex(p=>p.email === email);
                                  updatedguests.splice(delIndex, 1);
                                  this.guests = updatedguests;
                                }
                                else{
                                    console.log("Admin Not Found !!!");
                                }
                            },
                            errorMessage=>{
                              console.log(errorMessage);
                            })
    
  }
  onAdd(){
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/adm-add']);
  }
  onEdit(editGuest:Adm){
    this.admCurrentService.setAdmParams(editGuest);
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/adm-edit']);
  }

}
