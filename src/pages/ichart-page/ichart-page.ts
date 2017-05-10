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
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public storageService:StorageService) {
  }

  ionViewDidLoad() {
    this.data = this.navParams.get('data');
    this.billtypes = this.storageService.read<Dictionary[]>(Constants.BILL_TYPE);
    this.init();
    console.log(this.pieChartLabels);
    console.log(this.pieChartData);
  }

  init(){
    if(this.data==null) return;
    this.pieChartLabels = new Array();
    this.pieChartData = new Array();
    for(let type of this.billtypes){
      let amount:number = 0;
      this.pieChartLabels.push(type.name);
      for(let val of this.data){
        if(val.typeid==type.id){
          amount += val.val;
        }
      }
      this.pieChartData.push(amount);
    }
  }

  
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
