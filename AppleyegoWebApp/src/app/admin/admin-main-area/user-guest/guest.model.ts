export class Guest {
    public _id:string='';
    public email: string='';
    public password: string='';
    public firstName: string='';
    public lastName: string='';
    public gender: string='';
    public bio: string='';
    public dateOfBirth: string='';
    public phoneNumber: string='';
    public userImg: string='';

    constructor(_id:string,email: string,password:string,firstName: string,lastName: string,gender: string,bio: string,dateOfBirth: string,phoneNumber: string,userImg: string){
            this._id=_id;
            this.email=email;
            this.password=password;
            this.firstName=firstName;
            this.lastName=lastName;
            this.gender=gender;
            this.bio=gender;
            this.dateOfBirth=dateOfBirth;
            this.phoneNumber=phoneNumber;
            this.userImg=userImg;
    }
}