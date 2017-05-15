import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { QueryBook } from "../../domain/QueryBook";
import { Dictionary } from "../../domain/Dictionary";
import { StorageService } from "../../providers/storage-service";
import { Constants } from "../../domain/Constants";

/**
 * Generated class for the IchartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-ichart-page',
  templateUrl: 'ichart-page.html',
})
export class IchartPage {
  data:Array<QueryBook>;
  billtypes:Dictionary[];
  pieChartLabels:string[];
  pieChartData:number[];
  pieChartType:string = 'pie';
  pieChartOptions:any={position:"bottom"};
  sumamount:number;//本月总消费
  month:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storageService:StorageService) {
    this.init();
  }
  
  ionViewDidLoad() {
    
  }

  //初始化chart数据，必须放在constructor中，否则chart无法正常加载
  init(){
    this.data = this.navParams.get('data');
    this.month = this.navParams.get('month');
    this.billtypes = this.storageService.read<Dictionary[]>(Constants.BILL_TYPE);

    this.sumamount = 0;
    for(let q of this.data){
      this.sumamount += q.val;
    }

    if(this.data==null) return;
    this.pieChartLabels = new Array();
    this.pieChartData = new Array();
    for(let type of this.billtypes){
      let amount:number = 0;
      for(let val of this.data){
        if(val.typeid==type.id){
          amount += val.val;
        }
      }
      this.pieChartData.push(parseFloat(amount.toFixed(2)));
      this.pieChartLabels.push(type.name);
    }
    console.log(this.pieChartLabels);
    console.log(this.pieChartData);

  }

  
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
