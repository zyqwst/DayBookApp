import { Injectable } from '@angular/core';
import { DatePipe} from '@angular/common';
import { HttpService } from '../providers/http-service';
@Injectable()
export class BookService{
    constructor(
        private httpService :HttpService,private datePipe :DatePipe
        ){}
    public findAll(){
        return this.httpService.httpGetWithAuth("book/list");
    }
    public findToday(){
        var date = new Date();
        var str = this.datePipe.transform(date, 'yyyy-MM-dd');
        return this.httpService.httpGetWithAuth(`book/list?credate_like=${str}`);
    }
    public getCurMonthAmount(){
        var date = new Date();
        var str = this.datePipe.transform(date, 'yyyy-MM');
         return this.httpService.httpGetWithAuth(`book/month/?yearAndMonth=${str}`);
    }
}