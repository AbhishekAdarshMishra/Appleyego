import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProfileInfoService } from 'src/app/profileInfo.service';
import { ProfileAdminInfoService } from '../../profile-admin-info.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  @Input() status:boolean=false;

  logged:boolean=false;
  userName:string='UserName';
  userImg:string='../../../assets/Avatar.svg';
  constructor(private profileAdminInfoService:ProfileAdminInfoService,private router:Router) { 
    
    
  }

  ngOnInit(): void {
    this.userName=this.profileAdminInfoService.firstName+' '+this.profileAdminInfoService.lastName;
    this.userImg=environment.urlApi+this.profileAdminInfoService.userImg;
  }
  logout(){
    // console.log("logout");
    this.profileAdminInfoService.logout();
    this.router.navigate(['/side-nav'])
   
  }

}
