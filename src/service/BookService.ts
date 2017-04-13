import { Injectable } from '@angular/core';
import { HttpService } from '../providers/http-service';
@Injectable()
export class BookService{
    constructor(
        private httpService :HttpService
        ){}
    public findAll(){
        var url = "http://192.168.1.104:8080/book/list";
        return this.httpService.httpGetWithAuth(url);
    }
}