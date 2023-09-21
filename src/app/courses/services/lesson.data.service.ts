import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Lesson } from "../model/lesson";


@Injectable()
export class LessonDataService extends DefaultDataService<Lesson>{
    constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator){
        super('Lesson',http,httpUrlGenerator);
    }

    getAll():Observable<Lesson[]>{
      return this.http.get('/api/lessons').pipe(
        map(res=>res["payload"])
      )  
    }
}