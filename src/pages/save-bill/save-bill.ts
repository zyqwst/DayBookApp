import { Component } from '@angular/core';
import { LoadingController,AlertController } from 'ionic-angular';
import { DatePipe} from '@angular/common';


import { HttpService } from '../../providers/http-service';
import { BookService } from '../../service/BookService';
import { Dictionary } from '../../domain/Dictionary';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StorageService } from "../../providers/storage-service";
import { Constants } from "../../domain/Constants";
@Component({
  selector: 'page-save-bill',
  templateUrl: 'save-bill.html'
})

export class SaveBillPage{
 
  constructor(private bookService :BookService,
              private httpService :HttpService,
              public loadingCtrl: LoadingController,
              private storageService :StorageService,
              private datePipe :DatePipe,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController
              ){}
              localStorage;
  billTypes:Dictionary[];
  public defaultDate:string;
  public bookForm:FormGroup;
  ngOnInit(){
    var date = new Date();
    var str = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.defaultDate =str;
    this.init();
    this.initForm();
  }
 loader = this.httpService.loading();
  init(){
    var billtype = this.storageService.read<Dictionary[]>(Constants.BILL_TYPE);
    if(billtype!=null){
     this.billTypes=billtype;
    }else{
       this.loader.present();

       this.httpService.httpGetWithAuth("common/dictionary?typeid=1")
          .then(result =>{
            this.loader.dismiss();
            if(result.status==-1){
              this.httpService.alert(result.msg);
              return;
            }
            this.billTypes = result.object;
            this.storageService.write(Constants.BILL_TYPE,this.billTypes);
          })
          .catch(error =>{
            this.loader.dismiss();
            console.log(error);
          });
      
    }
		
  }

   initForm() {
        this.bookForm = this.formBuilder.group({
            id:[''],
            typeid: ['', Validators.required],
            val: ['', Validators.required],
            credate:[this.defaultDate, Validators.required],
            remark:['']
        });
    }
    logForm(){
        this.loader.present();
        this.bookService.saveBook(this.bookForm.value)
        .then(restEntity =>{
          this.loader.dismiss();
          if(restEntity.status==-1){
            this.httpService.alert(restEntity.msg);
          }else{
            this.initForm();
            this.httpService.toast("保存成功");
          }
        }).catch(
        error => {
          this.loader.dismiss();
         this.httpService.alert(error);
        }
        )
    }
    
    
}