import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SecondaryrouterPage } from './secondaryrouter.page';

const routes: Routes = [
  {
    path: '',
    component: SecondaryrouterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SecondaryrouterPage]
})
export class SecondaryrouterPageModule {}
