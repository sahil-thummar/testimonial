import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
@Injectable()

export class HelperService {

    BASE_URL: string = 'http://localhost:4000/';
    constructor(public http: HttpClient) {
    }

    http_get_method_requester(api_name, response) {
        this.http.get(this.BASE_URL + api_name).pipe(map((res) => Object(res))).subscribe((responceData) => {
            response(responceData.data);
        }, (error) => {
            console.log(error)
            response({});
        });
    }
}