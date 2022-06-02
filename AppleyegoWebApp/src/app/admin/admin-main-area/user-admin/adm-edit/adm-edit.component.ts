import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AdmCurrentService } from '../adm-current.service';
import { AdmHttpService } from '../adm-http.service';
import { Adm } from '../adm.model';

@Component({
  selector: 'app-adm-edit',
  templateUrl: './adm-edit.component.html',
  styleUrls: ['./adm-edit.component.css']
})
export class AdmEditComponent implements OnInit {

  
  
  url = '';
  file!: File;
  errormsg: string ='';
  errorimg:string = '';
  gender:string='';
  userRole:string = '';
  dateOfBirth:string='';
  editGuest:Adm=new Adm('','','','','','','','','','','')
  urlAp:string=environment.urlApi;
  constructor(private router: Router,private admHttpService:AdmHttpService,private admCurrentService:AdmCurrentService) { }

  selectGenderHandler (event: any) {
    this.gender = event.target.value;
  }
  selectUserRoleHandler (event: any) {
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
    this.editGuest=this.admCurrentService.getAdmParams();
    this.url=this.urlAp+this.editGuest.userImg;
    const myArr = this.editGuest.dateOfBirth.split("T");
    this.dateOfBirth=myArr[0];
    this.gender=this.editGuest.gender;
    this.userRole=this.editGuest.userRole;
  }
  onSubmit(form: NgForm){
    this.errormsg='';
    if(!form.valid){
      return;
    }
    
    const email=this.editGuest.email;
    const firstName=form.value.firstName;
    const lastName=form.value.lastName;
    const gender=this.gender;
    const userRole=this.userRole;
    const bio=form.value.bio;
    const dateOfBirth=this.dateOfBirth;
    const phoneNumber=form.value.phoneNumber;

    // console.log(firstName + " " + lastName+" " + email + " " + phoneNumber+" " + gender+" "+userRole );
    // console.log('dob'+dateOfBirth);

    if(this.validationform(email,firstName,lastName,gender,bio,dateOfBirth,userRole,phoneNumber)===false)
    {
      this.errormsg="Please Fill everything correctly and Upload Image on above !!!";
      return;
    }


    
    this.admHttpService.admEdit(this.editGuest._id,email,firstName,lastName,gender,bio,dateOfBirth,userRole,phoneNumber)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.n=='1'&& responseData.nModified=='1'&& responseData.ok=='1'){         
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-user-admin']);
      }  
       else{
            this.errormsg="Something Went Wrong Or no changes Found !!!";
        }   
    },
    errorMessage=>{
      this.errormsg=" Something went wrong !!!";
      console.log(errorMessage);
    })
  }

 

    validationform(email:string,firstName:string,lastName:string,gender:string,bio:string,dateOfBirth:string,userRole:string,phoneNumber: string): boolean{
      if(gender==='' || gender==='gender' || gender==='')
      {
        return false;
      }
      if(dateOfBirth===''){
        return false;
      }
      if(email===null || email===''){
        return false;
      }
      if(userRole==='' || userRole==='userRole'|| userRole==='' )
      {
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

    onChangeImg(event:Event){
      
      // console.log(this.file);
        if(this.file===null || this.file===undefined){
          this.errorimg="No new Image Uploaded !!";
          return;
        }

        this.admHttpService.admImageEdit(this.editGuest.email,this.file)
    .subscribe(responseData => {
      // console.log(responseData);
      if(responseData.n=='1'&& responseData.nModified=='1'&& responseData.ok=='1'){
         this.router.navigate(['/admin-page/admin-side-nav/admin-main-area/admin-user-admin']);
      }  
       else{
            this.errormsg="Something Went Wrong Or no changes Found !!!";
        }   
    },
    errorMessage=>{
      this.errormsg=" Something went wrong !!!";
      console.log(errorMessage);
    })

    }

}
