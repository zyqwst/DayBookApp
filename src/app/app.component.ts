import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, ToastController, Events, ModalController } from 'ionic-angular';

import { AddBillPage } from '../pages/add-bill/add-bill';
import { SearchBill } from '../pages/search-bill/search-bill';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Constants } from "../domain/Constants";
import { User } from "../domain/User";
import { LoginPage } from "../pages/login-page/login-page";
import { StorageService } from "../providers/storage-service";
import { HttpService } from "../providers/http-service";

@Component({
  selector: 'app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // make AddBill the root (or first) page
  rootPage = AddBillPage;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  pages: Array<{title: string, component: any}>;
  hiddenPages: Array<{title: string, component: any}>;
  curr_user:User;
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    public events :Events,
    public modalCtrl: ModalController,
    public storageService:StorageService,
    public httpService:HttpService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '记一笔', component: AddBillPage },
      { title: '月账单', component: SearchBill },
    ];
    this.initEvent();
  }
  initEvent(){
    //set curr_user after login
    this.events.subscribe(Constants.CURR_USER,user => this.curr_user = user );
    //set swipe enabled
    // this.events.subscribe(Constants.SWIPE_ENABLE,val => this.menu.swipeEnable(val));
  }
  

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //注册返回按键事件
      this.registerBackButtonAction();
      //登录认证
      this.authentication();

      this.initBillType();
    });
  }
  registerBackButtonAction(){
     this.platform.registerBackButtonAction((): any => {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        if(this.menu.isOpen()){
          this.menu.close();
          return;
        }
        //当前页面非tab栏
        if (!this.nav.canGoBack() || page instanceof LoginPage) {
          return this.showExit();
        }
        return this.nav.pop();
      }, 101);
  }
  initBillType(){
    let billtypes = this.storageService.read(Constants.BILL_TYPE);
    if(billtypes!=null) return;
    this.httpService.httpGetWithAuth("common/dictionary?typeid=1")
          .then(result =>{
            if(result.status==-1){
              this.httpService.alert(result.msg);
              return;
            }
            let billTypes = result.object;
            this.storageService.write(Constants.BILL_TYPE,billTypes);
          })
          .catch(error =>{
            console.log(error);
          });
  }
  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
   authentication(){
   if(!this.storageService.read(Constants.CURR_USER)){
      let modal = this.modalCtrl.create(LoginPage);
      modal.present();
   }
 }
  showExit() {
    if (this.backButtonPressed) this.platform.exitApp();  
    else {
      let toast = this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.backButtonPressed = true;
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000)
    }
  }
  logout(){
    this.menu.close();
    let activeVC = this.nav.getActive();
    let page = activeVC.instance;
    if(!(page instanceof AddBillPage)){
      this.nav.setRoot(this.rootPage);
    }
    this.storageService.remove(Constants.CURR_USER);
    this.authentication();
  }
}
