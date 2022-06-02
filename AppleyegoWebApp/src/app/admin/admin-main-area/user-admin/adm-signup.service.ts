import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'

export interface AuthenticationResposeData{
    code: number;
    message: string;
}
@Injectable()

export class AdmSignupService{
    constructor(private http: HttpClient){}

    signupSession(email:string, password:string,firstName:string,lastName:string,gender:string,bio:string,dateOfBirth:string,phoneNumber:string,userImg:File,userRole:string){
        let body = new FormData();
            body.append('email',email);
            body.append('password',password);
            body.append('firstName',firstName);
            body.append('lastName',lastName);
            body.append('gender',gender);
            body.append('bio',bio);
            body.append('dateOfBirth',dateOfBirth);
            body.append('phoneNumber',phoneNumber);
            body.append('userRole',userRole);
            body.append('userImg',userImg);
        return this.http.post<AuthenticationResposeData>(environment.urlApi+'admin_register',body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }

    
}