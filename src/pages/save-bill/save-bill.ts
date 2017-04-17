import { Component,ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { DatePipe} from '@angular/common';

import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service';
import { Dictionary } from '../../domain/Dictionary';
import { Constants } from '../../utils/Constant';
import { Book } from '../../domain/Book';

import { StorageService} from '../../service/StorageService';
import {Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'page-save-bill',
  templateUrl: 'save-bill.html',
	providers:[BookService,StorageService]
})

export class SaveBillPage{
 
  constructor(private httpService :HttpService,
              public loadingCtrl: LoadingController,
              private storageService :StorageService,
              private datePipe :DatePipe,
              private formBuilder: FormBuilder
              ){}
              localStorage;
  billTypes:Dictionary[];
  public defaultDate:string;
  public book;
  ngOnInit(){
    var date = new Date();
    var str = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.defaultDate =str;
    this.init();
  }

  init(){
    let loader = this.loadingCtrl.create({
				spinner:"dots",
				content:"loading...",
				dismissOnPageChange:true, // 是否在切换页面之后关闭loading框 
				showBackdrop:false //是否显示遮罩层
			});
      
    var billtype = this.storageService.read<Dictionary[]>(Constants.billType);
    if(billtype!=null){
     this.billTypes=billtype;
    }else{
       loader.present();

       this.httpService.httpGetWithAuth("common/dictionary?typeid=1")
          .then(result =>{
            loader.dismiss();
            this.billTypes = result.object;
            this.storageService.write(Constants.billType,this.billTypes);
          })
          .catch(error =>{
            loader.dismiss();
            console.log(error);
          });
      
    }
		
  }

   ionViewLoaded() {
        this.book = this.formBuilder.group({
            id:[''],
            typeid: ['', Validators.required],
            val: ['', Validators.required],
            credate:[this.defaultDate, Validators.required] 
        });
    }
    logForm(){
        console.log(this.book.value)
    }
  save(){
    let loader = this.loadingCtrl.create({
				spinner:"dots",
				content:"loading...",
				dismissOnPageChange:true, // 是否在切换页面之后关闭loading框 
				showBackdrop:false //是否显示遮罩层
			});
      alert("保存成功");
  }
}