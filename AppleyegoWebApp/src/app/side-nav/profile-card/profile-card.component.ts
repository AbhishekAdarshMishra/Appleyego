import { Component, Input, OnInit } from '@angular/core';
import { ProfileInfoService } from 'src/app/profileInfo.service';
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {

  @Input() status:boolean=false;

  logged:boolean=false;
  userName:string='UserName';
  userImg:string='../../../assets/Avatar.svg';
  constructor(private profileInfoService:ProfileInfoService) { 
    this.profileInfoService.nameUpated.subscribe(
      (user:string)=>this.userName=user
    )
    this.profileInfoService.imgUpated.subscribe(
      (img:string)=>this.userImg=img
    )
    this.profileInfoService.statusUpdated.subscribe(
      (status:boolean)=>{
        this.logged=status;
      }
    )
  }

  ngOnInit(): void {
  }
  logout(){
    // console.log("logout");
    this.profileInfoService.logout();
   
  }

}
