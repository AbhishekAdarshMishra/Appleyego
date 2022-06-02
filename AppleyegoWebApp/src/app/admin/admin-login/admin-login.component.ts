import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from './admin-login.service';
import { ProfileAdminInfoService } from '../profile-admin-info.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  isLoading: boolean = false;
  errormsg: string ='';
  constructor(private router: Router,private profileAdminInfoService:ProfileAdminInfoService,private adminLoginService:AdminLoginService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password=form.value.password;
    this.isLoading=true;

    this.adminLoginService.loginSession(email,password)
    .subscribe(responseData => {
      this.isLoading=false;
      // console.log(responseData);
      if(responseData.token!=null) {
        this.handleLogin(responseData.code,responseData.message,responseData.token);
      }
      else{
        this.handleLogin(responseData.code,responseData.message,'');
      }
      
    },
    errorMessage=>{
      this.isLoading=false;
      this.errormsg='Incorrect Email or Password !!!';
      // console.log(errorMessage);
    })
  }

  handleLogin(code: number, message: string,token: string){
        if(code===200 && message==='Auth successful')
        {
            this.profileAdminInfoService.setProfileInfo(token);
            this.router.navigate(['/admin-page/admin-side-nav']);
        }
        else{
            this.errormsg="Incorrect Email or Password !!!";
        }
    }

}
