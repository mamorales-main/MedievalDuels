import { ModalPage } from './modal/modal.page';
import { AlertasService } from 'src/app/services/alertas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
  styleUrls: ['./ajustes.page.scss'],
})
export class AjustesPage implements OnInit {
  faMapMarkerAlt = faMapMarkerAlt;

  public datos: boolean;


  constructor(
    private router: Router,
    public navCtrl: NavController,
    private natSt: NativeStorage,
    private alertas: AlertasService,
    public modalController: ModalController) {
  }
  creacionclase(){
    this.navCtrl.navigateForward('crearclase');
  }




async presentModal() {
  const modal = await this.modalController.create({
    component: ModalPage
  });
  return await modal.present();
}

  cerrarsesion() {
    this.natSt.remove('login');
    this.navCtrl.navigateRoot('/login');
  }


  ngOnInit() {
  }
  ionViewDidLeave(){
  }
}
