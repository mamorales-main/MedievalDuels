import { NavController } from '@ionic/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private nav: NavController) {}

  goP() {
    this.nav.navigateRoot('/seleccionpersonaje');
  }
  goI() {
    this.nav.navigateRoot('/tabs/inicio');
  }
  goM() {
    this.nav.navigateRoot('/tabs/maingame');
  }
}
