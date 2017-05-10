import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { QueryBook } from '../../domain/QueryBook';
import { BookService } from "../../service/BookService";
import { HttpService } from "../../providers/http-service";
import { MonthPopPage } from "../month-pop-page/month-pop-page";
import { DateUtils } from "../../utils/date-utils";
import { IchartPage } from "../ichart-page/ichart-page";

@Component({
  selector: 'page-results-bill',
  templateUrl: 'results-bill.html',
})
export class ResultsBill {
  data:QueryBook[];
  params:Array<{key:string,value:any}>;//查询条件
  loader = this.httpService.loading();
  month:number;
  event:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private bookService :BookService,
              private httpService :HttpService,
              public popoverCtrl: PopoverController) {
  }
  

  ionViewDidLoad() {
    this.month = new Date().getMonth()+1;
    this.params = this.navParams.get("params");
    this.query();
  }
  query(){
    this.loader.present();
    this.bookService.findPage(this.params)
    .then(restEntity =>{
      this.loader.dismiss();
      if(restEntity.status==-1){
            this.httpService.alert(restEntity.msg);
          }else{
            this.data = restEntity.object.results;
          }
    })
    .catch(
      error => this.httpService.alert(error)
    )
    
  }
  doRefresh(event){
    this.event = event;
    this.bookService.findPage(this.params)
    .then(restEntity =>{
      event.complete();
      if(restEntity.status==-1){
            this.httpService.alert(restEntity.msg);
          }else{
            this.data = restEntity.object.results;
          }
    })
    .catch(
      error => this.httpService.alert(error)
    )
  }
  presentMonth(ev){
    let popover = this.popoverCtrl.create(MonthPopPage);
    popover.present({ev});
    popover.onDidDismiss((data)=>{
      if(data==null) return;
      let date = new Date();
      this.month = data;
      date.setMonth(data-1);
      let start = DateUtils.getStrFullDate(DateUtils.getBeginDate(DateUtils.getFirstDayOfMonth(date)));
      let end = DateUtils.getStrFullDate(DateUtils.getEndDate(DateUtils.getLastDayOfMonth(date)));
      this.params = [{key:"credate_between",value:start},{key:"credate_betweenand",value:end}];
      this.doRefresh(this.event);
    });
  }

  queryChart(){
    this.navCtrl.push(IchartPage,{'data':this.data});
  }
}
