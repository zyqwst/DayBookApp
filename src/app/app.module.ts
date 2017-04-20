import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AddBillPage } from '../pages/add-bill/add-bill';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpService } from '../providers/http-service';

import { BookService } from '../service/BookService';
import { SaveBillPage} from '../pages/save-bill/save-bill'; 
import { SearchBill} from '../pages/search-bill/search-bill';
import { StorageService} from '../service/StorageService';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePipe} from '@angular/common';
@NgModule({
  declarations: [
    MyApp,
    AddBillPage,
    ItemDetailsPage,
    ListPage,
    SaveBillPage,
    SearchBill
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
    ItemDetailsPage,
    ListPage,
    SaveBillPage,
    SearchBill
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    HttpService,
    BookService,
    StorageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
