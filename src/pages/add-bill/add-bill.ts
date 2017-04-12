import { Component } from '@angular/core';

@Component({
  selector: 'page-add-bill',
  templateUrl: 'add-bill.html'
})
export class AddBillPage {
	icons: string[];
  	items: Array<{title: string, amount: string,time:string, icon: string}>;

  	constructor() {
	    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
	    'american-football', 'boat', 'bluetooth', 'build'];

	    this.items = [];
	    for(let i = 1; i < 4; i++) {
	      this.items.push({
	        title: '零食小吃 ' + i,
	        amount:  "￥"+i+".00元",
	        time:'09:15',
	        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
	      });
	     }
 	}
}
