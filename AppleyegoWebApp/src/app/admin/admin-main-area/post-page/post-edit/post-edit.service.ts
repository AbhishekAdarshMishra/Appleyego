import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { BehaviorSubject,throwError } from "rxjs";
import {environment} from 'src/environments/environment'
import { Post } from "src/app/post.model";

export interface AuthenticationResposeData{
    code: number;
    message: string;
    post:Post[];
}
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

export class PostEditService{
    constructor(private http: HttpClient){}

    postEdit(_id:string,title: string,subTitle: string,category: string,classs: string,startDate:string,endDate:string,applyLink:string
        ,author:string,importantInformation:string,details:string,howTo:string,someInfo:string,links:string){
        let body=[
                {"propName": "title","value":title},
                {"propName": "subTitle","value":subTitle},
                {"propName": "category","value":category},
                {"propName": "class","value":classs},
                {"propName": "startDate","value":startDate},
                {"propName": "endDate","value":endDate},
                {"propName": "applyLink","value":applyLink},
                {"propName": "author","value":author},
                {"propName": "importantInformation","value":importantInformation},
                {"propName": "details","value":details},
                {"propName": "howTo","value":howTo},
                {"propName": "someInfo","value":someInfo},
                {"propName": "links","value":links},
                ]
        return this.http.post<AuthenticationResposeDataUpdate>(environment.urlApi+'update_post/'+_id,body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }

    postImageEdit(_id:string,image:File){
        let body = new FormData();
            body.append('image',image);
        return this.http.post<AuthenticationResposeDataUpdate>(environment.urlApi+'image_post/'+_id,body).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    postGetId(_id:string){
        return this.http.get<AuthenticationResposeData>(environment.urlApi+'get_post_id/'+_id).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }
    postDeleteId(_id:string){
        return this.http.delete<AuthenticationResposeDataDelete>(environment.urlApi+'update_post/'+_id).pipe(catchError(this.errorHandler),tap(responseData =>{
            // console.log(responseData);
        }))
    }



    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }

    
}