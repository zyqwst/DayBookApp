import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import { QueryBook } from '../../domain/QueryBook';
import { BookService } from "../../service/BookService";
import { HttpService } from "../../providers/http-service";
import { MonthPopPage } from "../month-pop-page/month-pop-page";
import { DateUtils } from "../../utils/date-utils";
import { IchartPage } from "../ichart-page/ichart-page";
import { Dictionary } from '../../domain/Dictionary';
import { Constants } from '../../domain/Constants';
import { StorageService } from '../../providers/storage-service';

@Component({
  selector: 'page-results-bill',
  templateUrl: 'results-bill.html',
})
export class ResultsBill {
  data:QueryBook[];
  params:Array<{key:string,value:any}>;//查询条件
  loader ;
  month:any;
  event:any;
  billTypes:Dictionary[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private bookService :BookService,
              private httpService :HttpService,
              private storageService :StorageService,
              public popoverCtrl: PopoverController) {
  }
  typeid_and:number=-1;
  sumamount:number;//本月总消费
  ionViewDidLoad() {
    this.params = this.navParams.get("params");
    this.month = this.params[0].value;
    this.query();
    this.init();
  }
  init(){
    var billtype = this.storageService.read<Dictionary[]>(Constants.BILL_TYPE);
    if(billtype!=null){
     this.billTypes=billtype;
    }else{
       this.loader.present();
       this.httpService.httpGetWithAuth("common/dictionary?typeid=1")
          .then(result =>{
            this.loader.dismiss();
            this.billTypes = result.object;
            this.storageService.write(Constants.BILL_TYPE,this.billTypes);
          })
          .catch(error =>{
            this.loader.dismiss();
            console.log(error);
          });
      
    }
		billtype.splice(0,0,new Dictionary(-1,"全部类型",null,null));
  }
  typeChanged(){
    this.query();
  }
  query(){
    this.params.push({key:"typeid_and",value:(this.typeid_and==-1 ?"":this.typeid_and+"_LONG")});
    this.loader = this.httpService.loading();
    this.loader.present();
    this.bookService.findPage(this.params)
    .then(restEntity =>{
      this.loader.dismiss();
      if(restEntity.status==-1){
            this.httpService.alert(restEntity.msg);
          }else{
            this.data = restEntity.object.results;
            this.sumamount = 0;
            for(let q of this.data){
              this.sumamount += q.val;
            }
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
    console.log(ev);
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
      this.query();
    });
  }

  queryChart(){
    this.navCtrl.push(IchartPage,{'data':this.data,'month':this.month});
  }
}
