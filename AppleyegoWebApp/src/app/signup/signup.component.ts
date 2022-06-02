import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  url = '';
  file!: File;
  errormsg: string ='';
  gender:string='';
  userRole:string='';
  dateOfBirth:string='';
  constructor(private router: Router,private signupService: SignupService) { }

  selectGenderHandler (event: any) {
    this.gender = event.target.value;
  }
  selectuserRoleHandler (event: any) {
    this.userRole = event.target.value;
  }
  
  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.file=event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        if(event.target!=null)
        {
          this.url=event.target.result as string;
        }
      
      }
    }
  }
  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    this.errormsg='';
    if(!form.valid){
      return;
    }
    
    const email=form.value.email;
    const password=form.value.password;
    const firstName=form.value.firstName;
    const lastName=form.value.lastName;
    const gender=this.gender;
    const bio=form.value.bio;
    const dateOfBirth=this.dateOfBirth;
    const phoneNumber=form.value.phoneNumber;
    const userImg=this.file;
    const userRole=this.userRole;

    // console.log(firstName + " " + lastName+" " + email + " " +password + " " + phoneNumber+" " + gender + " "+userRole+" "+bio);
    // console.log('dob'+dateOfBirth);
    // console.log('img'+userImg);

    if(this.validationform(email,password,firstName,lastName,gender,bio,dateOfBirth,phoneNumber,userImg,userRole)===false)
    {
      return;
    }


    this.signupService.signupSession(email,password,firstName,lastName,gender,bio,dateOfBirth,phoneNumber,userImg,userRole)
    .subscribe(responseData => {
      // console.log(responseData);
        this.handleSignup(responseData.code,responseData.message);      
    },
    errorMessage=>{
      this.errormsg=" Something went wrong !!!";
      console.log(errorMessage);
    })
  }

  handleSignup(code: number, message: string){
        if(code===200 && message==='User Successfully Submitted')
        {
            // console.log("SuccessFull");
            this.router.navigate(['/side-nav/main-page/login'])
        }
        else{
            this.errormsg=message+" !!!";
        }
    }

    validationform(email:string, password:string,firstName:string,lastName:string,gender:string,bio:string,dateOfBirth:string,phoneNumber:string,userImg:File,userRole:string): boolean{
      if(gender==='' || gender==='gender' || gender==='')
      {
        this.errormsg="Please Fill Gender on above Field !!!";
        return false;
      }
      // if(userRole==='' || userRole==='userRole'|| userRole==='' )
      // {
      //   console.log('userrole');
      //   return false;
      // }
      if(dateOfBirth===''){
        this.errormsg="Please Fill DOB on above Field !!!";
        return false;
      }
      if(userImg===null || userImg===undefined){
        this.errormsg="Please Fill Image on above Field !!!";
        return false;
      }
      if(email===null || email===''){
        this.errormsg="Please Fill Email on above Field !!!";
        return false;
      }
      if(password===null || password===''){
        this.errormsg="Please Fill password on above Field !!!";
        return false;
      }
      if(firstName===null || firstName===''){
        this.errormsg="Please Fill First Name on above Field !!!";
        return false;
      }
      if(lastName===null || lastName===''){
        this.errormsg="Please Fill Last Name on above Field !!!";
        return false;
      }
      // if(bio===null || bio===''){
      //   console.log('bio');
      //   return false;
      // }
      if(phoneNumber===null || phoneNumber===''){
        this.errormsg="Please Fill Phone Number on above Field !!!";
        return false;
      }

      return true;
      
      
    }

}
