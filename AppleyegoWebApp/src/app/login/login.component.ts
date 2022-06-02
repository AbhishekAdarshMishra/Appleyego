import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileInfoService } from '../profileInfo.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading: boolean = false;
  errormsg: string ='';
  constructor(private router: Router,private profileInfoService:ProfileInfoService,private loginService:LoginService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email=form.value.email;
    const password=form.value.password;
    this.isLoading=true;

    this.loginService.loginSession(email,password)
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
      console.log(errorMessage);
    })
  }

  handleLogin(code: number, message: string,token: string){
        if(code===200 && message==='Auth successful')
        {
            this.profileInfoService.setProfileInfo(token);
            console.log("Auth SuccessFull");
            this.router.navigate(['/side-nav/main-page/home-feature']);
            
        }
        else{
            this.errormsg="Incorrect Email or Password !!!";
        }
    }
}
