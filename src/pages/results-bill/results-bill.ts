import { Component,Input } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QueryBook } from '../../domain/QueryBook';
@Component({
  selector: 'page-results-bill',
  templateUrl: 'results-bill.html',
})
export class ResultsBill {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  @Input()
  data:QueryBook[];

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultsBill');
  }

}
