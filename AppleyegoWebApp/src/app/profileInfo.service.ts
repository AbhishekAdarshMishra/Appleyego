import { EventEmitter } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
export interface profileInfo{
    email:string;
    firstName:string;
    lastName:string;
    gender:string;
    bio:string;
    dateOfBirth:string;
    phoneNumber:string;
    userImg:string;
}
export class ProfileInfoService{
    public email:string='';
    public firstName:string='';
    public lastName:string='';
    public gender:string='';
    public bio:string='';
    public dateOfBirth:string='';
    public phoneNumber:string='';
    public userImg:string='';
    public loginStatus:boolean=false;

    nameUpated=new EventEmitter<string>();
    imgUpated=new EventEmitter<string>();
    statusUpdated=new EventEmitter<boolean>();
    setProfileInfo(token:string){
        var decoded:profileInfo = jwt_decode(token);
        // console.log(decoded);
         this.email=decoded.email;
         this.firstName=decoded.firstName;
         this.lastName=decoded.lastName;
         this.gender=decoded.gender;
         this.bio=decoded.bio;
         this.dateOfBirth=decoded.dateOfBirth;
         this.phoneNumber=decoded.phoneNumber;
         this.userImg=decoded.userImg;
         this.loginStatus=true;
         this.nameUpated.emit(this.firstName+' '+this.lastName);
         this.imgUpated.emit(environment.urlApi+this.userImg);
         this.statusUpdated.emit(this.loginStatus);
    }

    logout(){
         this.email='';
         this.firstName='';
         this.lastName='';
         this.gender='';
         this.bio='';
         this.dateOfBirth='';
         this.phoneNumber='';
         this.userImg='';
         this.loginStatus=false;
         this.nameUpated.emit('UserName');
         this.imgUpated.emit('../../../assets/Avatar.svg');
         this.statusUpdated.emit(this.loginStatus);
    }
    
}