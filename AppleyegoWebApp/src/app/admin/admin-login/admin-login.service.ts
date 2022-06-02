import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'
export interface AuthenticationResposeData{
    code: number;
    message: string;
    token?:string;
}
@Injectable()

export class AdminLoginService{
    constructor(private http: HttpClient){}

    loginSession(email:string, password:string){
        return this.http.post<AuthenticationResposeData>(environment.urlApi+'admin_login',{
            email:email,
            password:password,
        }).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }

    
}