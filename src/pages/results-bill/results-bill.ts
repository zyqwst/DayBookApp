import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QueryBook } from '../../domain/QueryBook';
@Component({
  selector: 'page-results-bill',
  templateUrl: 'results-bill.html',
})
export class ResultsBill {
  data:QueryBook[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  

  ionViewDidLoad() {
    this.data = this.navParams.get("data");
  }

}
