import { Injectable } from '@angular/core';
import { DatePipe} from '@angular/common';
import { HttpService } from '../providers/http-service';
import { DateUtils } from "../utils/date-utils";
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
    public getTodayAmount(){
        let date = new Date();
        let str = this.datePipe.transform(date, 'yyyy-MM-dd');
        return this.httpService.httpGetWithAuth(`book/amount?credate_and=${str}`);
    }
    public getCurWeekAmount(){
        let date = new Date();
        let start = this.datePipe.transform(DateUtils.getFirstDayOfWeek(date), 'yyyy-MM-dd');
        let end = this.datePipe.transform(DateUtils.getLastDayOfWeek(date), 'yyyy-MM-dd');
        return this.httpService.httpGetWithAuth(`book/amount?credate_between=${start}&&credate_betweenand=${end}`);
    }
    public getCurMonthAmount(){
        let date = new Date();
        let start = this.datePipe.transform(DateUtils.getFirstDayOfMonth(date), 'yyyy-MM-dd');
        let end = this.datePipe.transform(DateUtils.getLastDayOfMonth(date), 'yyyy-MM-dd');
        return this.httpService.httpGetWithAuth(`book/amount?credate_between=${start}&&credate_betweenand=${end}`);
    }
    public saveBook(body:any){
        return this.httpService.httpPostNoAuth(`book/save`,body);
    }
    public findPage(params:Array<{key:string,value:any}>){
        let url:string = "book/list?";
        for(let param of params ){
            url = url + param.key + "=" +param.value+"&&";
        }
        
        console.log(url);
        return this.httpService.httpGetWithAuth(url);
    }
}