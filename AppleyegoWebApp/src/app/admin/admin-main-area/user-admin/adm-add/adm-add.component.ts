import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdmSignupService } from '../adm-signup.service';

@Component({
  selector: 'app-adm-add',
  templateUrl: './adm-add.component.html',
  styleUrls: ['./adm-add.component.css']
})
export class AdmAddComponent implements OnInit {

  url = '';
  file!: File;
  errormsg: string ='';
  gender:string='';
  userRole:string='';
  dateOfBirth:string='';
  constructor(private router: Router,private admSignupService: AdmSignupService) { }

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

    // console.log(firstName + " " + lastName+" " + email + " " +password + " " + phoneNumber+" " + gender + " "+userRole);
    // console.log('dob'+dateOfBirth);
    // console.log('img'+userImg);

    if(this.validationform(email,password,firstName,lastName,gender,bio,dateOfBirth,phoneNumber,userImg,userRole)===false)
    {
      this.errormsg="Please Fill everything correctly and Upload Image on above !!!";
      return;
    }


    this.admSignupService.signupSession(email,password,firstName,lastName,gender,bio,dateOfBirth,phoneNumber,userImg,userRole)
    .subscribe(responseData => {
      // console.log(responseData);
        this.handleSignup(responseData.code,responseData.message);      
    },
    errorMessage=>{
      this.errormsg=" Something went wrong !!!";
      // console.log(errorMessage);
    })
  }

  handleSignup(code: number, message: string){
        if(code===200 && message==='User Successfully Submitted')
        {
            // console.log("SuccessFull");
            this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-user-admin'])
        }
        else{
            this.errormsg=message+" !!!";
        }
    }

    validationform(email:string, password:string,firstName:string,lastName:string,gender:string,bio:string,dateOfBirth:string,phoneNumber:string,userImg:File,userRole:string): boolean{
      if(gender==='' || gender==='gender' || gender==='')
      {
        return false;
      }
      if(userRole==='' || userRole==='userRole'|| userRole==='' )
      {
        return false;
      }
      if(dateOfBirth===''){
        return false;
      }
      if(userImg===null || userImg===undefined){
        return false;
      }
      if(email===null || email===''){
        return false;
      }
      if(password===null || password===''){
        return false;
      }
      if(firstName===null || firstName===''){
        return false;
      }
      if(lastName===null || lastName===''){
        return false;
      }
      if(bio===null || bio===''){
        return false;
      }
      if(phoneNumber===null || phoneNumber===''){
        return false;
      }

      return true;
      
      
    }

}
