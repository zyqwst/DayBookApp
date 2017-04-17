import { Component,ViewChild } from '@angular/core';
import { LoadingController } from 'ionic-angular';


import { BookService } from '../../service/BookService';
import { HttpService } from '../../providers/http-service';
import { Dictionary } from '../../domain/Dictionary';
import { Constants } from '../../utils/Constant';
import { StorageService} from '../../service/StorageService';
@Component({
  selector: 'page-save-bill',
  templateUrl: 'save-bill.html',
	providers:[BookService,StorageService]
})

export class SaveBillPage{

  constructor(private httpService :HttpService,
              public loadingCtrl: LoadingController,
              private storageService :StorageService
              ){}
              localStorage;
  billTypes:Dictionary[];
  public defaultDate:string;
  ngOnInit(){
    this.defaultDate ="09-10 13:23";
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

       loader.dismiss().then(() => {
          this.httpService.httpGetWithAuth("common/dictionary?typeid=1")
          .then(result =>{
            this.billTypes = result.object;
            this.storageService.write(Constants.billType,this.billTypes);
          })
          .catch(error =>{
            console.log(error);
          });
       });
      
    }
		
  }

}