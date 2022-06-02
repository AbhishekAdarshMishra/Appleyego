import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'
import { Post } from "src/app/post.model";

export interface AuthenticationResposeData{
    code: number;
    message: string;
    result?:{_id:string;category:string; link: string;image:string};
}
@Injectable()

export class SettingSendService{
    constructor(private http: HttpClient){}

    settingSession(category:string,link:string,icon:File){
        let body = new FormData();
            body.append('category',category);
            body.append('link',link);
            body.append('icon',icon);
            return this.http.post<AuthenticationResposeData>(environment.urlApi+'setting',body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }

    
}