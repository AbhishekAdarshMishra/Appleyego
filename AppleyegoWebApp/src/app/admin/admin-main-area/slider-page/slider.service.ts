import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'


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

@Injectable()

export class SliderService{
    constructor(private http: HttpClient){}

    sliderEdit(_id:string,caption:string,link:string){
        let body=[
                {"propName": "link","value":link},
                {"propName": "caption","value":caption}
                ]
        return this.http.post<AuthenticationResposeDataUpdate>(environment.urlApi+'update_slider/'+_id,body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }

    sliderImageEdit(_id:string,image:File){
        let body = new FormData();
            body.append('image',image);
        return this.http.post<AuthenticationResposeDataUpdate>(environment.urlApi+'image_slider/'+_id,body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    sliderDeleteId(_id:string){
        return this.http.delete<AuthenticationResposeDataDelete>(environment.urlApi+'update_slider/'+_id).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }

    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }

    
}