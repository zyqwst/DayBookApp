import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-month-pop-page',
  templateUrl: 'month-pop-page.html',
})
export class MonthPopPage {
  month:Array<number>;
  constructor(public viewCtrl: ViewController,public navParams:NavParams) {}

  close(m) {
    this.viewCtrl.dismiss(m);
  }

  ionViewDidLoad() {
    this.month = new Array();
    let m = new Date().getMonth()+1;
    for(let i = 1; i<=m;i++){
      this.month.push(i);
    }
    console.log(this.month);
  }

}
