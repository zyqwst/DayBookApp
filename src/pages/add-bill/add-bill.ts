import { Component } from '@angular/core';

import { LoadingController, NavController, Events } from 'ionic-angular';

import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service';
import { SaveBillPage } from '../../pages/save-bill/save-bill'
import { Constants } from "../../domain/Constants";
@Component({
	selector: 'page-add-bill',
	templateUrl: 'add-bill.html'
})
/**首页面 */
export class AddBillPage {
	amounts:Array<{type:number,amount:number,title:string,averageDay?:number}>;
	amount:number;
	constructor(public bookService: BookService,
		public httpService: HttpService,
		public loadingCtrl: LoadingController,
		public navCtrl: NavController,
		public events: Events) {
		this.initEvent();
	}

	initEvent(){
    	this.events.subscribe("LOGIN_SUCCESS",()=>this.init() );
  	}

	ionViewDidEnter() {
		if(this.httpService.getCurrUser()){
			this.init();
		}
	}
	ionViewDidLeave() {
		console.log('ionViewDidLeave');
	}
	ionViewDidLoad() {
		
	}
	init() {
		this.amounts = new Array();
		let loader = this.httpService.loading();
		loader.present();
		Promise.all([this.bookService.getTodayAmount(),this.bookService.getCurWeekAmount(), this.bookService.getCurMonthAmount()])
			.then(results => {
				loader.dismiss();
				if(results[0].status==-1){
					this.httpService.alert(results[0].msg);
					return;
				}
				if(results[1].status==-1){
					this.httpService.alert(results[1].msg);
					return;
				}
				if(results[2].status==-1){
					this.httpService.alert(results[2].msg);
					return;
				}
				this.amounts.push({type:0,amount:results[0].object,title:'当天消费'});
				this.amounts.push({type:1,amount:results[1].object,title:'本周消费',averageDay:results[1].object/7});
				this.amounts.push({type:2,amount:results[2].object,title:'本月消费',averageDay:results[2].object/30});
				this.amount = results[2].object;
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
	amountClick(type:number){
		
	}
	doRefresh(event) {
		this.init();
		event.complete();
	}

}
