import { Component } from '@angular/core';

import { LoadingController, NavController, Events } from 'ionic-angular';

import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service';
import { SaveBillPage } from '../../pages/save-bill/save-bill'
import { Constants } from "../../domain/Constants";
import { QueryBook } from "../../domain/QueryBook";
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
	amountClick(type:number){
		
	}
	doRefresh(event) {
		this.init();
		event.complete();
	}
	
}
