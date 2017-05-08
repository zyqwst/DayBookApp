import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QueryBook } from '../../domain/QueryBook';
import { BookService } from "../../service/BookService";
import { HttpService } from "../../providers/http-service";
@Component({
  selector: 'page-results-bill',
  templateUrl: 'results-bill.html',
})
export class ResultsBill {
  data:QueryBook[];
  params:Array<{key:string,value:any}>;//查询条件
  loader = this.httpService.loading();
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private bookService :BookService,
              private httpService :HttpService,) {
  }
  

  ionViewDidLoad() {
    this.params = this.navParams.get("params");
    this.query();
  }
  query(){
    console.log(this.params);
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
}
