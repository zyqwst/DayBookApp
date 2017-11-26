import { Component } from '@angular/core';
import { LoadingController,NavController, NavParams,AlertController } from 'ionic-angular';
import { DatePipe} from '@angular/common';

import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service';
import { Dictionary } from '../../domain/Dictionary';
import { ResultsBill } from '../../pages/results-bill/results-bill';
import { QueryBook } from '../../domain/QueryBook';
import { StorageService } from "../../providers/storage-service";
import { Constants } from "../../domain/Constants";
@Component({
  selector: 'page-search-bill',
  templateUrl: 'search-bill.html',
})
export class SearchBill {
  billTypes:Dictionary[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              private bookService :BookService,
              private httpService :HttpService,
              private storageService :StorageService,
              private datePipe :DatePipe,
              private alertCtrl: AlertController) {
  }
  
  ionViewDidLoad() {
    
  }
  loader = this.httpService.loading();
  
  date = new Date();
  str:string = this.datePipe.transform(this.date, 'yyyy-MM');
  credate_yearAndMonth:string = this.str;
  typeid_and:number;
  query(){
      let params = [{key:"credate_like",value:this.credate_yearAndMonth},
     {key:"typeid_and",value:(this.typeid_and===undefined ?"":this.typeid_and+"_LONG")}];
      this.navCtrl.push(ResultsBill,{params:params});
  }
 
}
