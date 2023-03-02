import { Injectable } from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { DataInterface } from './interface/data.interface';

@Injectable()
export class DataService
{
    private jsonFileURL:string = "./src/app/table/service/json/data.json";

    constructor(private http:Http)
    {
    }

    getData():Observable<Array<DataInterface>>
    {
        return this.http.get(this.jsonFileURL).map((response:Response) => {
            return <Array<DataInterface>> response.json()
        });
    }
}