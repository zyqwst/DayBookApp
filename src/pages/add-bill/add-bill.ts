import { Component } from '@angular/core';

import { LoadingController, NavController, Events } from 'ionic-angular';

import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service';
import { QueryBook } from '../../domain/QueryBook';
import { SaveBillPage } from '../../pages/save-bill/save-bill'
import { Constants } from "../../domain/Constants";
@Component({
	selector: 'page-add-bill',
	templateUrl: 'add-bill.html'
})
/**首页面 */
export class AddBillPage {
	books_today: QueryBook[];
	amount: number;
	amount_today: number;
	constructor(public bookService: BookService,
		public httpService: HttpService,
		public loadingCtrl: LoadingController,
		public navCtrl: NavController,
		public events: Events) {

	}
	ionViewDidEnter() {
		console.log('ionViewDidEnter');
		this.events.publish(Constants.SWIPE_ENABLE, true);
		if(this.httpService.getCurrUser()){
			this.init();
		}
	}
	ionViewDidLeave() {
		console.log('ionViewDidLeave');
		this.events.publish(Constants.SWIPE_ENABLE, false);
	}
	ionViewDidLoad() {
		
	}
	init() {
		let loader = this.httpService.loading();
		loader.present();
		Promise.all([this.bookService.findToday(), this.bookService.getCurMonthAmount()])
			.then(results => {
				loader.dismiss();
				console.log(results);
				if(results[0].status==-1){
					this.httpService.alert('提示',results[0].msg);
					return;
				}
				if(results[1].status==-1){
					this.httpService.alert('提示',results[1].msg);
					return;
				}
				this.books_today = results[0].object.results;

				this.amount = results[1].object;

				this.amount_today = 0;

				for (let a of this.books_today) {
					this.amount_today += a.val;
				}

				
			})
			.catch(
				error => {
					loader.dismiss();
				}
			);
	}
	addBill() {
		this.navCtrl.push(SaveBillPage);
	}
	doRefresh(event) {
		this.init();
		event.complete();
	}
}
