import { Component,ViewChild } from '@angular/core';

import { BookService } from '../../service/BookService';
@Component({
  selector: 'page-save-bill',
  templateUrl: 'save-bill.html',
	providers:[BookService]
})
export class SaveBillPage{

}