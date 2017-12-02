import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { LoadingController,Loading,ToastController  } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { RestEntity } from '../domain/RestEntity';
import { User } from "../domain/User";
import { Constants } from "../domain/Constants";
import { StorageService } from "./storage-service";

@Injectable()
export class HttpService {
    hostUrl:string = "localhost:9971";
    TIME_OUT:number = 30000;
    constructor(
        private http: Http,
        public loadingCtrl: LoadingController ,
        public dialogs: Dialogs,
        public storageService:StorageService,
        public toastCtrl: ToastController
        ) {
        //this.local = new Storage(LocalStorage);
    }
    /**带身份验证的get请求 */
    public httpGetWithAuth(url: string):Promise<RestEntity> {
        url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        let token = this.getToken();
        if(token==null) {
            this.alert('异常','Token获取错误');
            return;
        }
        headers.append(Constants.AUTHORIZATION, token);
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(url,options).timeout(this.TIME_OUT).toPromise()
            .then(res => res.json() as RestEntity)
            .catch(err => {
                this.handleError(err);
            });
    } 
    /**不需身份验证的get请求 */
    public httpGetNoAuth(url: string) {

        var headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).timeout(this.TIME_OUT).toPromise()
            .then(res => res.json())
            .catch(err => {
                console.log('访问错误：'+err);
                this.handleError(err);
            });
    }
     /**不带身份验证的post请求 */
    public httpPostNoAuth(url: string, body: any) :Promise<RestEntity>{
          url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body,options).timeout(this.TIME_OUT).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }
    public httpPostWithAuth(url: string, body: any) :Promise<RestEntity>{
          url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        let token = this.getToken();
        if(token==null) {
            this.alert('异常','Token获取错误');
            return;
        }
        headers.append('Content-Type', 'application/json');
        headers.append(Constants.AUTHORIZATION, token);
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body,options).timeout(this.TIME_OUT).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }

    private handleError(error: Response) {
        this.alert("提示",error.toString());
        return Observable.throw(error.json().error || 'Server Error');
    }

    public loading():Loading{
       let loader = this.loadingCtrl.create({
				spinner:"dots",
				content:"loading...",
				dismissOnPageChange:true, // 是否在切换页面之后关闭loading框 
				showBackdrop:false //是否显示遮罩层
			});
        return loader;
    }
    public alert(msg:string,title?:string) {
        if(title==null) title='提示';
        this.dialogs.alert(msg,title);
    }
    public toast(msg:string,time?:number) {
        if(!time) time = 3000;
        let toast = this.toastCtrl.create({
            message: msg,
            duration: time
        });
        toast.present();
    }
    /**当前登录用户 */
    public getCurrUser():User{
       return this.storageService.read<User>(Constants.CURR_USER);
    }
    public getToken():string{
        let user = this.getCurrUser(); 
        if(user==null || user.id==null || user.token==null){this.alert('Token错误，请登录后重试');}
        let token = user.id+"_"+user.token;
        return token;
    }
}