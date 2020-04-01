import { Injectable } from '@angular/core';
import {
    AdMobFree,
    AdMobFreeBannerConfig,
    AdMobFreeInterstitialConfig,
    AdMobFreeRewardVideoConfig
} from '@ionic-native/admob-free/ngx';
import { Platform, AlertController } from '@ionic/angular';

@Injectable()
export class AdmobFreeService {

    interstitialConfig: AdMobFreeInterstitialConfig = {
        autoShow: false,
        id: 'ca-app-pub-2020802267173869/5032329439'
    };

    RewardVideoConfig: AdMobFreeRewardVideoConfig = {
        autoShow: false,
        id: 'ca-app-pub-2020802267173869/9600800844'
    };

    constructor(
        private admobFree: AdMobFree,
        public platform: Platform,
        private alerts: AlertController
    ) {

        platform.ready().then(() => {

            // Load ad configuration
            this.admobFree.interstitial.config(this.interstitialConfig);
            //Prepare Ad to Show
            this.admobFree.interstitial.prepare()
                .then(() => {
                    // alert(1);
                }).catch(e => alert(e));


            // Load ad configuration
            this.admobFree.rewardVideo.config(this.RewardVideoConfig);
            //Prepare Ad to Show
            this.admobFree.rewardVideo.prepare()
                .then(() => {
                    // alert(2);
                }).catch(e => alert(e));

        });

        //Handle interstitial's close event to Prepare Ad again
        this.admobFree.on('admob.interstitial.events.CLOSE').subscribe(() => {
            this.admobFree.interstitial.prepare()
                .then(() => {
                    alert("Interstitial CLOSE");
                }).catch(e => alert(e));
        });
        //Handle Reward's close event to Prepare Ad again
        this.admobFree.on('admob.rewardvideo.events.CLOSE').subscribe(() => {
            this.admobFree.rewardVideo.prepare()
                .then(() => {
                    this.alertaVideo();
                }).catch(e => alert(e));
        });
    }
    
  public async alertaVideo() {
    const alert = await this.alerts.create({
      header: '¡Enhorabuena! Has conseguido:',
      cssClass: 'alerta',
      message: '50$ extra!!!',
      buttons: ['Seguir jugando']
    });
    await alert.present();
  }
    BannerAd() {
        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: false,
            autoShow: true,
            id: 'ca-app-pub-2020802267173869/1083198335'
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare().then(() => {
            // success
        }).catch(e => alert(e));
    }


    InterstitialAd() {
        this.admobFree.interstitial.isReady().then(() => {
            this.admobFree.interstitial.show().then(() => {
            })
                .catch(e => alert('show ' + e));
        })
            .catch(e => alert('isReady ' + e));
    }

    RewardVideoAd() {
        this.admobFree.rewardVideo.isReady().then(() => {
            this.admobFree.rewardVideo.show().then(() => {
            })
                .catch(e => alert('show ' + e));
        })
            .catch(e => alert('isReady ' + e));
    }


}
