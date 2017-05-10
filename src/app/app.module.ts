import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AddBillPage } from '../pages/add-bill/add-bill';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpService } from '../providers/http-service';

import { BookService } from '../service/BookService';
import { SaveBillPage} from '../pages/save-bill/save-bill'; 
import { SearchBill} from '../pages/search-bill/search-bill';
import { ResultsBill } from '../pages/results-bill/results-bill';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePipe } from '@angular/common';
import { StorageService } from "../providers/storage-service";
import { LoginPage } from "../pages/login-page/login-page";
import { Dialogs } from "@ionic-native/dialogs";
import { StickyDirevtive } from "../components/sticky-direvtive/sticky-direvtive";
import { MonthPopPage } from "../pages/month-pop-page/month-pop-page";
import { IchartPage } from "../pages/ichart-page/ichart-page";
@NgModule({
  declarations: [
    MyApp,
    AddBillPage,
    SaveBillPage,
    SearchBill,
    ResultsBill,
    LoginPage,
    MonthPopPage,
    StickyDirevtive,
    IchartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    JsonpModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddBillPage,
    SaveBillPage,
    SearchBill,
    ResultsBill,
    LoginPage,
    MonthPopPage,
    IchartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    HttpService,
    BookService,
    StorageService,
    Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
