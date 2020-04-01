import { TabsPageModule } from './tabs/tabs.module';
import { ModalPage } from './ajustes/modal/modal.page';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {IonicStorageModule} from '@ionic/storage';
import {Camera} from '@ionic-native/camera/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobFreeService } from './services/admobfree.service';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({

  declarations: [AppComponent, ModalPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TabsPageModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    NativeStorage,
    SocialSharing,
    StatusBar,
    OneSignal,
    SplashScreen,
    AdMobFree,
    AdmobFreeService,
    Camera,
    Vibration,
    NativeAudio,
    FingerprintAIO,
    NativeGeocoder,
    Geolocation
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule  {  }
