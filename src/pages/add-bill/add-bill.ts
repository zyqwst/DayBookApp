import { Component } from '@angular/core';
import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service'; 

@Component({
  selector: 'page-add-bill',
  templateUrl: 'add-bill.html',
	providers:[BookService,HttpService]
})
export class AddBillPage {

		icons: string[];
  	items: Array<{title: string, amount: string,time:string, icon: string}>;

  	constructor(private bookService : BookService
								) {
			
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
		myclick(event) {
			this.bookService.findAll();
		}
}
