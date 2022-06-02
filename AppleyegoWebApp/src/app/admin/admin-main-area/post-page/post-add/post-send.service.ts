import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'
import { Post } from "src/app/post.model";

export interface AuthenticationResposeData{
    code: number;
    message: string;
    Post?:Post;
}
@Injectable()

export class PostSendService{
    constructor(private http: HttpClient){}

    postSession(title: string,subTitle: string,category: string,classs: string,startDate:string,endDate:string,applyLink:string
        ,author:string,importantInformation:string,details:string,howTo:string,someInfo:string,links:string,image:File){
        let body = new FormData();
            body.append('title',title);
            body.append('subTitle',subTitle);
            body.append('category',category);
            body.append('class',classs);
            body.append('startDate',startDate);
            body.append('endDate',endDate);
            body.append('applyLink',applyLink);
            body.append('author',author);
            body.append('importantInformation',importantInformation);
            body.append('details',details);
            body.append('howTo',howTo);
            body.append('someInfo',someInfo);
            body.append('links',links);
            body.append('image',image);
        return this.http.post<AuthenticationResposeData>(environment.urlApi+'post',body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }

    
}