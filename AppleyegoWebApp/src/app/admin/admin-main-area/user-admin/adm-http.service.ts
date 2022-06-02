import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'
import { Adm } from "./adm.model";



export interface AuthenticationResposeDataUpdate{
    n:string,
    nModified: string,
    ok: string;
}
export interface AuthenticationResposeDataDelete{
    n:string,
    ok: string,
    deletedCount:string;
}
export interface AuthenticationResposeData{
    code: number;
    message: string;
    result:Adm[];
}
@Injectable()

export class AdmHttpService{
    constructor(private http: HttpClient){}

    admGetUser(){
        return this.http.get<AuthenticationResposeData>(environment.urlApi+'get_admin_user').pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }

    admEdit(_id:string,email:string,firstName:string,lastName: string,gender: string,bio: string,dateOfBirth:string,userRole:string,phoneNumber:string){
        let body=[
                {"propName": "firstName","value":firstName},
                {"propName": "lastName","value":lastName},
                {"propName": "gender","value":gender},
                {"propName": "bio","value":bio},
                {"propName": "dateOfBirth","value":dateOfBirth},
                {"propName": "userRole","value":userRole},
                {"propName": "phoneNumber","value":phoneNumber},
                ]
        return this.http.post<AuthenticationResposeDataUpdate>(environment.urlApi+'update_admin/'+email,body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }

    admImageEdit(email:string,image:File){
        let body = new FormData();
            body.append('userImg',image);
        return this.http.post<AuthenticationResposeDataUpdate>(environment.urlApi+'image_admin/'+email,body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    admDeleteId(email:string){
        return this.http.delete<AuthenticationResposeDataDelete>(environment.urlApi+'update_admin/'+email).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }

    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }

    
}