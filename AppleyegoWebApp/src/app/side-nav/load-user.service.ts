import { Injectable } from "@angular/core";
import {HttpClient,HttpErrorResponse} from "@angular/common/http";
import {environment} from "src/environments/environment"
import { throwError } from "rxjs";
import { catchError , tap } from "rxjs/operators";
export interface categories{
    code: number;
    message: string;
    result: {category: string; link: string}[];
}
export interface icons{
    code: number;
    message: string;
    result: {_id:string;category:string ; link: string; icon: string}[];
}

@Injectable()

export class LoadUserService{

    constructor(private http: HttpClient){}

    getIconsDetail(){
        return this.http.get<icons>(environment.urlApi+'setting')
        .pipe(catchError(this.errorHandler))
    }

    private errorHandler(errRes: HttpErrorResponse){
        console.error(errRes.error.status_message)
        return throwError(errRes);
    }
}