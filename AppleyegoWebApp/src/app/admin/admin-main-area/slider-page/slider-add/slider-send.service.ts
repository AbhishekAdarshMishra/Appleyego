import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'
import { Post } from "src/app/post.model";
import { Slider } from "src/app/slider.model";

export interface AuthenticationResposeData{
    code: number;
    message: string;
    result?:Slider;
}
@Injectable()

export class SliderSendService{
    constructor(private http: HttpClient){}

    settingSession(caption:string,link:string,image:File){
        let body = new FormData();
            body.append('caption',caption);
            body.append('link',link);
            body.append('image',image);
            return this.http.post<AuthenticationResposeData>(environment.urlApi+'slider',body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }

    
}