import { AlertasService } from './../../services/alertas.service';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  url: string;
  resultado = false;

  result: NativeGeocoderResult = {
    latitude: '',
    longitude: '',
    countryCode: '',
    countryName: '',
    postalCode: '',
    administrativeArea: '',
    subAdministrativeArea: '',
    locality: '',
    subLocality: '',
    thoroughfare: '',
    subThoroughfare: '',
    areasOfInterest: []
  };

  constructor(
    private geo: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private alertas: AlertasService,
    private modal: ModalController,
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private socialS: SocialSharing
    ) { }

  async getGeo() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
    };
    this.geo.getCurrentPosition().then(resp =>  {
      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
            .then((result: NativeGeocoderResult[]) => {
              this.result = result[0];
              console.log(this.result)
              this.url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + this.result.locality + ',' + this.result.countryName +
              '&zoom=14&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:YO%7C' + this.result.latitude +
               ',' + this.result.longitude + '&key=AIzaSyAmlZChK-JoTUm6xZF4b5SLhzT58BZ1kdU';
              loading.dismiss();
              this.resultado = true;
            })
            .catch((error: any) => console.log(error));


    });
}



getGeo_() {
  const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };
  this.geo.getCurrentPosition().then(resp =>  {
    this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
          .then((result: NativeGeocoderResult[]) => {
            this.result = result[0];

            this.url = 'https://maps.googleapis.com/maps/api/staticmap?center=' + this.result.locality + ',' + this.result.countryName +
            '&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:YO%7C' +
             this.result.latitude +
             ',' + this.result.longitude + '&key=TU API KEY';

          })
          .catch((error: any) => console.log(error));


  });
}

share() {
  let ubi = this.result.countryName+','+this.result.subAdministrativeArea+','+this.result.locality;
  this.socialS.share('Hola, mi ubicación es: '+ubi,null,null,this.url)
  .then(() => {

  })
  .catch(() => {

  });
}

modalClose() {
  this.modal.dismiss();
}
  ngOnInit() {
    this.getGeo();

  }

  ionViewInit() {

  }


}
