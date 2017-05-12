import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import {Validators, FormBuilder,FormGroup } from '@angular/forms';
import { Events } from 'ionic-angular';
import {Md5} from "ts-md5/dist/md5";

import { StorageService} from '../../providers/storage-service';
import { HttpService } from '../../providers/http-service';
import { User } from '../../domain/User';
import { Constants } from "../../domain/Constants";

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  loginForm:FormGroup;
  constructor(public viewCtrl: ViewController,
              public storageService:StorageService,
              public httpService :HttpService,
              private formBuilder: FormBuilder,
              public events:Events) {
                this.initForm();
  }
   initForm() {
        let user = this.storageService.read<User>(Constants.CURR_USER);
        this.loginForm = this.formBuilder.group({
            name:[user==null?'':user.alias,Validators.required], 
            password: ['', Validators.required]
        });
    }
  login(){
    let loader = this.httpService.loading();
    //发布登录成功消息，刷新首页信息
    this.viewCtrl.onDidDismiss(()=>{
      this.events.publish("LOGIN_SUCCESS");
    });
    loader.present();
    let pwd = this.loginForm.controls['password'].value;
    this.loginForm.controls['password'].setValue(Md5.hashStr(this.loginForm.controls['password'].value).toString());
    this.httpService.httpPostNoAuth("account/login",this.loginForm.value)
    .then(restEntity =>{
      loader.dismiss();
      this.loginForm.controls['password'].setValue(pwd);
      if(restEntity.status == -1){
        this.httpService.alert(restEntity.msg,"登录失败");
        return;
      }
        let user:User = restEntity.object;
        this.storageService.write(Constants.CURR_USER,user);
        this.events.publish(Constants.CURR_USER,user);
        this.viewCtrl.dismiss();
          
    })
    .catch(
      error => {
        loader.dismiss();
        this.loginForm.controls['password'].setValue(pwd);
      }
    );   
  }
  forgetPwd(){
    this.httpService.toast('功能完善中');
  }
  register(){
    this.httpService.toast('功能完善中');
  }

}
