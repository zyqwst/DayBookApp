import { Component } from '@angular/core';

import { LoadingController, NavController, Events } from 'ionic-angular';

import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service';
import { SaveBillPage } from '../../pages/save-bill/save-bill'
import { Constants } from "../../domain/Constants";
import { QueryBook } from "../../domain/QueryBook";
import { ResultsBill } from "../results-bill/results-bill";
import { DateUtils } from "../../utils/date-utils";
@Component({
	selector: 'page-add-bill',
	templateUrl: 'add-bill.html'
})
/**首页面 */
export class AddBillPage {
	amounts:Array<{type:number,amount:number,title:string,icon?:string,averageDay?:number}>;
	amount:number;
	books:Array<QueryBook>;
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
		let loader = this.httpService.loading();
		loader.present();
		this.bookService.findAll()
		.catch(error => loader.dismiss())
		.then(restEntity =>{
			loader.dismiss();
			if(restEntity.status==-1){
				this.httpService.alert(restEntity.msg);
				return;
			}
			this.books = restEntity.object.results;
			this.amounts = this.bookService.calAmount(this.books);
			if(this.amounts==null) return;
			this.amount = this.amounts[2].amount;
		});

	}
	addBill() {
		this.navCtrl.push(SaveBillPage);
	}
	/**跳转到月账单 */
	amountClick(type:number){
		let start = DateUtils.getStrDate(DateUtils.getFirstDayOfMonth(new Date()));
		let end = DateUtils.getStrDate(DateUtils.getLastDayOfMonth(new Date()));
		let params = [{key:"credate_between",value:start},{key:"credate_betweenand",value:end}];
		this.navCtrl.push(ResultsBill,{params:params});
	}
	doRefresh(event) {
		this.bookService.findAll()
		.catch(error => event.complete())
		.then(restEntity =>{
			event.complete();
			if(restEntity.status==-1){
				this.httpService.alert(restEntity.msg);
				return;
			}
			this.books = restEntity.object.results;
			this.amounts = this.bookService.calAmount(this.books);
			if(this.amounts==null) return;
			this.amount = this.amounts[2].amount;
		});
	}
	
}
