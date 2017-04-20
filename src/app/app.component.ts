import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav,ToastController } from 'ionic-angular';

import { AddBillPage } from '../pages/add-bill/add-bill';
import { ListPage } from '../pages/list/list';
import { SearchBill } from '../pages/search-bill/search-bill';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: '记一笔', component: AddBillPage },
      { title: '月账单', component: SearchBill },
      { title: '流水分析', component: ListPage }
    ];
   
  }

  

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
       //注册返回按键事件
      this.platform.registerBackButtonAction((): any => {
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        //当前页面非tab栏
        if (!(page instanceof AddBillPage)) {
          if (!this.nav.canGoBack()) {
            return this.showExit();
          }
          return this.nav.pop();
        }
      }, 101);
    });
  }
  
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  
  //双击退出提示框，这里使用Ionic2的ToastController
  showExit() {
    if (this.backButtonPressed) this.platform.exitApp();  //当触发标志为true时，即2秒内双击返回按键则退出APP
    else {
      let toast = this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.backButtonPressed = true;
      //2秒内没有再次点击返回则将触发标志标记为false
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000)
    }
  }
}
