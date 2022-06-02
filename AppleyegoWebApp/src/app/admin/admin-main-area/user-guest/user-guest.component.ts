import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GuestCurrentService } from './guest-current.service';
import { GuestHttpService } from './guest-http.service';
import { Guest } from './guest.model';

@Component({
  selector: 'app-user-guest',
  templateUrl: './user-guest.component.html',
  styleUrls: ['./user-guest.component.css']
})
export class UserGuestComponent implements OnInit {

  guests:Guest[]=[];
  url:string=environment.urlApi;
  constructor(private guestCurrentService: GuestCurrentService,private guestHttpService:GuestHttpService, private router:Router) { }

  ngOnInit(): void {
    this.guestHttpService.guestGetUser().subscribe(response=>{
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
    this.guestHttpService.guestDeleteId(email).subscribe(responseData => {
                              
                              if(responseData.n=='1' && responseData.ok=='1' && responseData.deletedCount=='1')
                                {
                                  const updatedguests=[...this.guests];
                                  const delIndex= this.guests.findIndex(p=>p.email === email);
                                  updatedguests.splice(delIndex, 1);
                                  this.guests = updatedguests;
                                }
                                else{
                                    console.log("Guest Not Found !!!");
                                }
                            },
                            errorMessage=>{
                              console.log(errorMessage);
                            })
    
  }
  onAdd(){
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/guest-add']);
  }
  onEdit(editGuest:Guest){
    this.guestCurrentService.setGuestParams(editGuest);
    this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/guest-edit']);
  }

}
