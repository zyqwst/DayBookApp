import { Injectable } from '@angular/core';
import { DatePipe} from '@angular/common';
import { HttpService } from '../providers/http-service';
import { DateUtils } from "../utils/date-utils";
import { QueryBook } from "../domain/QueryBook";
@Injectable()
export class BookService{
    constructor(
        private httpService :HttpService,private datePipe :DatePipe
        ){}
    /**查询当天前后三十天的数据 */
    public findAll(){
        let start = this.datePipe.transform(DateUtils.getDateAfterDays(-30),'yyyy-MM-dd');
        let end = this.datePipe.transform(DateUtils.getDateAfterDays(30),'yyyy-MM-dd');
        return this.httpService.httpGetWithAuth(`book/list?credate_between=${start}&&credate_betweenand=${end}`);
    }
    public findToday(){
        var date = new Date();
        var str = this.datePipe.transform(date, 'yyyy-MM-dd');
        return this.httpService.httpGetWithAuth(`book/list?credate_like=${str}`);
    }
    public calAmount(books:Array<QueryBook>):Array<{type:number,amount:number,title:string,averageDay?:number}>{
        if(books==null) return null;
        let todayAmount=0,weekAmount=0,monthAmount=0;
        let amounts:Array<any> = new Array();
        for(let book of books){
            let credate = DateUtils.getBeginDate(new Date(book.credate.replace(/-/g,"/")));
            let firstDayOfWeek = DateUtils.getBeginDate(DateUtils.getFirstDayOfWeek(new Date()));
            let lastDayOfWeek = DateUtils.getBeginDate(DateUtils.getLastDayOfWeek(new Date()));
            let firstDayOfMonth = DateUtils.getBeginDate(DateUtils.getFirstDayOfMonth(new Date()));
            let lastDayOfMonth = DateUtils.getBeginDate(DateUtils.getLastDayOfMonth(new Date()));
            
            if(credate>= DateUtils.getBeginDate(new Date()) && credate<=DateUtils.getEndDate(new Date())){
                todayAmount += book.val;
            }
            if(credate >= firstDayOfWeek && credate <= lastDayOfWeek){
                weekAmount += book.val;
            }
            if(credate >= firstDayOfMonth && credate <= lastDayOfMonth){
                monthAmount += book.val;
            }
        }
        amounts.push({type:0,amount:todayAmount,title:'今天',icon:'ios-calendar-outline'});
        amounts.push({type:1,amount:weekAmount,title:'本周',icon:'md-calendar'});
        amounts.push({type:2,amount:monthAmount,title:'本月',icon:'ios-calendar'});
        return amounts;
    }
   
    public saveBook(body:any){
        return this.httpService.httpPostWithAuth(`book/save`,body);
    }
    public findPage(params:Array<{key:string,value:any}>){
        let url:string = "book/list?";
        for(let param of params ){
            url = url + param.key + "=" +param.value+"&&";
        }
        return this.httpService.httpGetWithAuth(url);
    }
}