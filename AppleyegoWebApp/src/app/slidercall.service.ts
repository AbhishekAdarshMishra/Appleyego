import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'
import { Post } from "./post.model";
import { Slider } from "./slider.model";

export interface AuthenticationResposeData{
    code: number;
    message: string;
    result:Slider[];
}
@Injectable()

export class SliderCallService{
    constructor(private http: HttpClient){}

    postSession(){
        return this.http.get<AuthenticationResposeData>(environment.urlApi+'slider').pipe(catchError(this.errorHandler),tap(responseData =>{
        }))
    }
    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }
}